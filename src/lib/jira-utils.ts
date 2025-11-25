import { ChecklistQuestion } from './types';

/**
 * Extract JIRA key from various input formats
 * Supports:
 * - Direct key: "PROJ-123"
 * - Jira URL: "https://issues.redhat.com/browse/PROJ-123"
 * - Jira URL with query params: "https://issues.redhat.com/browse/PROJ-123?someparam=value"
 */
export function extractJiraKey(input: string): string | null {
  const trimmed = input.trim();
  
  // Pattern for JIRA key: PROJECT-NUMBER (e.g., RHOAIENG-123, PROJ-456)
  const keyPattern = /^[A-Z][A-Z0-9]+-\d+$/i;
  
  // Check if it's already a valid key
  if (keyPattern.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  
  // Try to extract from URL
  try {
    const url = new URL(trimmed);
    // Match /browse/KEY pattern
    const browseMatch = url.pathname.match(/\/browse\/([A-Z][A-Z0-9]+-\d+)/i);
    if (browseMatch) {
      return browseMatch[1].toUpperCase();
    }
    
    // Match /projects/PROJ/issues/KEY pattern (some Jira instances)
    const projectMatch = url.pathname.match(/\/issues\/([A-Z][A-Z0-9]+-\d+)/i);
    if (projectMatch) {
      return projectMatch[1].toUpperCase();
    }
  } catch {
    // Not a valid URL, try regex extraction from the string
    const match = trimmed.match(/([A-Z][A-Z0-9]+-\d+)/i);
    if (match) {
      return match[1].toUpperCase();
    }
  }
  
  return null;
}

/**
 * Validate if a string is a valid JIRA key format
 */
export function isValidJiraKey(key: string): boolean {
  return /^[A-Z][A-Z0-9]+-\d+$/i.test(key.trim());
}

/**
 * Format the checklist output based on answers
 * Supports category headers for Story checklist
 */
export function formatChecklistOutput(
  questions: ChecklistQuestion[],
  answers: Record<string, 'yes' | 'no' | 'na' | null>
): string {
  const lines: string[] = [];
  let currentCategory: string | undefined;
  
  for (const q of questions) {
    // Add category header if this question has a different category
    if (q.category && q.category !== currentCategory) {
      if (currentCategory !== undefined) {
        lines.push(''); // Add blank line between categories
      }
      lines.push(`${q.category}:`);
      lines.push('');
      currentCategory = q.category;
    }
    
    const answer = answers[q.id];
    let checkbox: string;
    
    switch (answer) {
      case 'yes':
        checkbox = '(/)';
        break;
      case 'na':
        checkbox = '[N/A]';
        break;
      default:
        checkbox = '[ ]';
    }
    
    lines.push(`${checkbox} ${q.question}`);
    
    // Add sub-items with indentation
    for (const subItem of q.subItems) {
      lines.push(`    ${subItem}`);
    }
    
    // Add blank line between questions for readability (only if has sub-items)
    if (q.subItems.length > 0) {
      lines.push('');
    }
  }
  
  return lines.join('\n');
}
