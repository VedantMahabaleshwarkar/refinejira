import { NextRequest, NextResponse } from 'next/server';
import { JiraApiResponse, JiraTicket } from '@/lib/types';

// Force dynamic rendering to ensure env vars are read at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// JIRA REST API integration
async function fetchJiraFromApi(key: string): Promise<{ ticket: JiraTicket | null; error?: string }> {
  // Read env vars at runtime (not cached)
  const jiraBaseUrl = process.env.JIRA_BASE_URL;
  const jiraToken = process.env.JIRA_API_TOKEN;
  const jiraEmail = process.env.JIRA_EMAIL;
  
  // Debug logging
  console.log('[JIRA API] Environment check:', {
    hasBaseUrl: !!jiraBaseUrl,
    hasToken: !!jiraToken,
    hasEmail: !!jiraEmail,
    baseUrl: jiraBaseUrl || '(not set)',
  });
  
  if (!jiraBaseUrl) {
    return { ticket: null, error: 'JIRA_BASE_URL environment variable is not set' };
  }
  
  if (!jiraToken) {
    return { ticket: null, error: 'JIRA_API_TOKEN environment variable is not set' };
  }
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
  };
  
  // Add auth - try Basic auth first if email is provided, otherwise Bearer
  if (jiraToken && jiraEmail) {
    headers['Authorization'] = `Basic ${Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64')}`;
    console.log('[JIRA API] Using Basic auth with email');
  } else if (jiraToken) {
    // For PAT tokens, use Bearer
    headers['Authorization'] = `Bearer ${jiraToken}`;
    console.log('[JIRA API] Using Bearer token auth');
  }
  
  const apiUrl = `${jiraBaseUrl}/rest/api/2/issue/${key}?fields=summary,description,status,priority,assignee,reporter,issuetype`;
  console.log('[JIRA API] Fetching:', apiUrl);
  
  try {
    const response = await fetch(apiUrl, { 
      headers,
      cache: 'no-store', // Disable caching to ensure fresh data
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[JIRA API] Error: ${response.status} ${response.statusText}`, errorText);
      return { ticket: null, error: `JIRA API returned ${response.status}: ${response.statusText}` };
    }
    
    const data = await response.json();
    
    return {
      ticket: {
        key: data.key,
        summary: data.fields.summary || '',
        description: data.fields.description || null,
        status: data.fields.status?.name || 'Unknown',
        priority: data.fields.priority?.name || 'Medium',
        assignee: data.fields.assignee?.displayName || data.fields.assignee?.name || null,
        reporter: data.fields.reporter?.displayName || data.fields.reporter?.name || null,
        issueType: data.fields.issuetype?.name || 'Task',
      }
    };
  } catch (error) {
    console.error('[JIRA API] Fetch failed:', error);
    return { ticket: null, error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
): Promise<NextResponse<JiraApiResponse>> {
  const { key } = await params;
  const upperKey = key.toUpperCase();
  
  // Try to get issue type from query params (fallback if API fails)
  const searchParams = request.nextUrl.searchParams;
  const typeFromQuery = searchParams.get('type');
  
  // Try to fetch from JIRA API
  const { ticket, error } = await fetchJiraFromApi(upperKey);
  
  if (ticket) {
    return NextResponse.json({
      success: true,
      data: ticket,
    });
  }
  
  // If API fetch failed but we have a type from query params, return partial data
  if (typeFromQuery) {
    return NextResponse.json({
      success: true,
      data: {
        key: upperKey,
        summary: `JIRA Ticket ${upperKey}`,
        description: null,
        status: 'Unknown',
        priority: 'Medium',
        assignee: null,
        reporter: null,
        issueType: typeFromQuery,
      },
    });
  }
  
  return NextResponse.json({
    success: false,
    error: error || `Could not fetch JIRA ${upperKey}. Please ensure JIRA_BASE_URL and JIRA_API_TOKEN environment variables are set, or provide ?type=Bug|Story|Task query parameter.`,
  });
}
