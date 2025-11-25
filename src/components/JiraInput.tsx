'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from './ui/Button';
import Input from './ui/Input';
import { extractJiraKey } from '@/lib/jira-utils';

export default function JiraInput() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setError('');

    if (!input.trim()) {
      setError('Please enter a JIRA number or URL');
      return;
    }

    const jiraKey = extractJiraKey(input);
    if (!jiraKey) {
      setError('Invalid JIRA format. Enter a key like "PROJ-123" or a JIRA URL');
      return;
    }

    setIsLoading(true);
    router.push(`/jira/${jiraKey}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter JIRA key (e.g., RHOAIENG-123) or URL"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            error={error}
            disabled={isLoading}
            autoFocus
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading || !input.trim()}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading
            </span>
          ) : (
            <span className="flex items-center gap-2">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Fetch
            </span>
          )}
        </Button>
      </div>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Paste a JIRA URL or enter the issue key directly
      </p>
    </form>
  );
}

