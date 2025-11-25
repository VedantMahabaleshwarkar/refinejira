'use client';

import { useState } from 'react';
import { AnswerValue, ChecklistQuestion } from '@/lib/types';
import { formatChecklistOutput } from '@/lib/jira-utils';
import { getIssueTypeDisplayName } from '@/lib/checklist-data';
import Button from './ui/Button';
import Card from './ui/Card';

interface ChecklistResultProps {
  answers: Record<string, AnswerValue>;
  checklist: ChecklistQuestion[];
  issueType: string;
  onReset: () => void;
}

export default function ChecklistResult({ answers, checklist, issueType, onReset }: ChecklistResultProps) {
  const [copied, setCopied] = useState(false);

  const formattedOutput = formatChecklistOutput(checklist, answers);
  const displayIssueType = getIssueTypeDisplayName(issueType);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Count answers
  const counts = {
    yes: Object.values(answers).filter((a) => a === 'yes').length,
    no: Object.values(answers).filter((a) => a === 'no').length,
    na: Object.values(answers).filter((a) => a === 'na').length,
  };

  return (
    <div className="animate-fade-in flex h-full flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
          <svg
            className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Checklist Complete!
            </h2>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              issueType.toLowerCase() === 'bug'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                : issueType.toLowerCase() === 'story'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
            }`}>
              {displayIssueType}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Copy the formatted checklist below
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mb-4 flex gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {counts.yes}
          </span>
          <span className="text-xs text-slate-500">Yes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-semibold text-slate-600 dark:text-slate-400">
            {counts.no}
          </span>
          <span className="text-xs text-slate-500">No</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-semibold text-amber-600 dark:text-amber-400">
            {counts.na}
          </span>
          <span className="text-xs text-slate-500">N/A</span>
        </div>
      </div>

      {/* Output */}
      <Card variant="bordered" className="flex-1 overflow-hidden">
        <pre className="h-full overflow-y-auto whitespace-pre-wrap p-4 font-mono text-sm text-slate-700 dark:text-slate-300">
          {formattedOutput}
        </pre>
      </Card>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={handleCopy}
          className="flex-1"
        >
          {copied ? (
            <>
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy to Clipboard
            </>
          )}
        </Button>
        <Button variant="secondary" size="lg" onClick={onReset}>
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Redo
        </Button>
      </div>
    </div>
  );
}
