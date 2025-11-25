'use client';

import { JiraTicket } from '@/lib/types';
import { getIssueTypeDisplayName } from '@/lib/checklist-data';
import Button from './ui/Button';
import Card from './ui/Card';
import MarkdownRenderer from './MarkdownRenderer';

interface JiraDetailsProps {
  ticket: JiraTicket;
  onStartChecklist: () => void;
  onStartDescription: () => void;
  isChecklistMode: boolean;
  isDescriptionMode: boolean;
}

export default function JiraDetails({
  ticket,
  onStartChecklist,
  onStartDescription,
  isChecklistMode,
  isDescriptionMode,
}: JiraDetailsProps) {
  const isSplitMode = isChecklistMode || isDescriptionMode;
  const displayIssueType = getIssueTypeDisplayName(ticket.issueType);
  
  const issueTypeColor = 
    ticket.issueType.toLowerCase() === 'bug'
      ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
      : ticket.issueType.toLowerCase() === 'story'
      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';

  return (
    <div className="flex h-full flex-col">
      {/* Header - always visible */}
      {!isSplitMode && (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-blue-100 px-3 py-1.5 font-mono text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {ticket.key}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${issueTypeColor}`}>
              {displayIssueType}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                ticket.status.toLowerCase() === 'done'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : ticket.status.toLowerCase() === 'in progress'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {ticket.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="md" onClick={onStartDescription}>
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Prepare Description
            </Button>
            <Button variant="success" size="md" onClick={onStartChecklist}>
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Prepare DoR Checklist
            </Button>
          </div>
        </div>
      )}

      {/* Title */}
      <h1
        className={`font-bold text-slate-900 dark:text-white ${
          isSplitMode ? 'mb-4 text-xl' : 'mb-6 text-2xl sm:text-3xl'
        }`}
      >
        {isSplitMode && (
          <span className="mr-2 font-mono text-base font-semibold text-blue-600 dark:text-blue-400">
            {ticket.key}:
          </span>
        )}
        {ticket.summary}
      </h1>

      {/* Issue type badge in split mode */}
      {isSplitMode && (
        <div className="mb-4 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${issueTypeColor}`}>
            {displayIssueType}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isChecklistMode 
              ? `Using ${displayIssueType} DoR Checklist`
              : `Using ${displayIssueType} Description Template`
            }
          </span>
        </div>
      )}

      {/* Description */}
      <Card variant="bordered" className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 sm:p-6">
          {ticket.description ? (
            <MarkdownRenderer content={ticket.description} />
          ) : (
            <p className="italic text-slate-500 dark:text-slate-400">
              No description provided
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
