'use client';

import { useState, useEffect, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { JiraTicket } from '@/lib/types';
import JiraDetails from '@/components/JiraDetails';
import DoRChecklist from '@/components/DoRChecklist';
import DescriptionEditor from '@/components/DescriptionEditor';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface JiraPageProps {
  params: Promise<{ key: string }>;
}

function LoadingSpinner({ jiraKey }: { jiraKey: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500" />
        <p className="text-slate-600 dark:text-slate-400">
          Fetching <span className="font-mono font-semibold">{jiraKey.toUpperCase()}</span>...
        </p>
      </div>
    </div>
  );
}

function JiraPageContent({ jiraKey }: { jiraKey: string }) {
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState<JiraTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChecklistMode, setIsChecklistMode] = useState(false);
  const [isDescriptionMode, setIsDescriptionMode] = useState(false);

  // Helper to enter checklist mode (closes description mode if open)
  const enterChecklistMode = () => {
    setIsDescriptionMode(false);
    setIsChecklistMode(true);
  };

  // Helper to enter description mode (closes checklist mode if open)
  const enterDescriptionMode = () => {
    setIsChecklistMode(false);
    setIsDescriptionMode(true);
  };

  useEffect(() => {
    const fetchJira = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query string with optional type parameter
        const typeParam = searchParams.get('type');
        const queryString = typeParam ? `?type=${encodeURIComponent(typeParam)}` : '';
        
        // Fetch from our API route
        const response = await fetch(`/api/jira/${jiraKey}${queryString}`);
        const data = await response.json();

        if (data.success && data.data) {
          setTicket(data.data);
        } else {
          setError(data.error || 'Failed to fetch JIRA');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch JIRA');
      } finally {
        setLoading(false);
      }
    };

    fetchJira();
  }, [jiraKey, searchParams]);

  if (loading) {
    return <LoadingSpinner jiraKey={jiraKey} />;
  }

  if (error || !ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
        <Card variant="bordered" className="max-w-md p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                className="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
            Failed to Load JIRA
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            {error || `Could not find JIRA ${jiraKey.toUpperCase()}`}
          </p>
          <Link href="/">
            <Button variant="primary">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top navigation */}
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-blue-100 px-3 py-1 font-mono text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {ticket.key}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              ticket.issueType.toLowerCase() === 'bug'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                : ticket.issueType.toLowerCase() === 'story'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
            }`}>
              {ticket.issueType}
            </span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {isChecklistMode ? (
          /* Split view mode - Checklist */
          <div className="grid min-h-[calc(100vh-8rem)] gap-6 lg:grid-cols-2">
            {/* Left side - JIRA details */}
            <div className="h-full">
              <JiraDetails
                ticket={ticket}
                onStartChecklist={enterChecklistMode}
                onStartDescription={enterDescriptionMode}
                isChecklistMode={true}
                isDescriptionMode={false}
              />
            </div>

            {/* Right side - Checklist */}
            <div className="h-full">
              <DoRChecklist 
                issueType={ticket.issueType} 
                onClose={() => setIsChecklistMode(false)} 
              />
            </div>
          </div>
        ) : isDescriptionMode ? (
          /* Split view mode - Description Editor */
          <div className="grid min-h-[calc(100vh-8rem)] gap-6 lg:grid-cols-2">
            {/* Left side - JIRA details */}
            <div className="h-full">
              <JiraDetails
                ticket={ticket}
                onStartChecklist={enterChecklistMode}
                onStartDescription={enterDescriptionMode}
                isChecklistMode={false}
                isDescriptionMode={true}
              />
            </div>

            {/* Right side - Description Editor */}
            <div className="h-full">
              <DescriptionEditor 
                issueType={ticket.issueType} 
                onClose={() => setIsDescriptionMode(false)} 
              />
            </div>
          </div>
        ) : (
          /* Normal view mode */
          <div className="mx-auto max-w-4xl">
            <JiraDetails
              ticket={ticket}
              onStartChecklist={enterChecklistMode}
              onStartDescription={enterDescriptionMode}
              isChecklistMode={false}
              isDescriptionMode={false}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default function JiraPage({ params }: JiraPageProps) {
  const { key } = use(params);

  return (
    <Suspense fallback={<LoadingSpinner jiraKey={key} />}>
      <JiraPageContent jiraKey={key} />
    </Suspense>
  );
}
