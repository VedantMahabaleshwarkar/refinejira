'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDescriptionTemplate, getTemplateDisplayName } from '@/lib/description-templates';
import Card from './ui/Card';
import Button from './ui/Button';

interface DescriptionEditorProps {
  issueType: string;
  onClose: () => void;
}

export default function DescriptionEditor({ issueType, onClose }: DescriptionEditorProps) {
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Load template on mount or when issue type changes
  useEffect(() => {
    const template = getDescriptionTemplate(issueType);
    setContent(template);
  }, [issueType]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [content]);

  const templateName = getTemplateDisplayName(issueType);

  const issueTypeColor =
    issueType.toLowerCase() === 'bug'
      ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
      : issueType.toLowerCase() === 'story'
      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';

  return (
    <Card variant="elevated" className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Description Template
          </h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${issueTypeColor}`}>
            {templateName}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label="Close editor"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Instructions */}
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Edit the template below, then copy to clipboard when ready.
      </p>

      {/* Textarea */}
      <div className="flex-1 min-h-0">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-400"
          placeholder="Enter your description..."
          spellCheck={false}
        />
      </div>

      {/* Copy button */}
      <div className="mt-4 flex justify-end">
        <Button
          variant={copied ? 'success' : 'primary'}
          size="md"
          onClick={handleCopy}
          className="min-w-[160px]"
        >
          {copied ? (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy to Clipboard
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

