'use client';

import { useChecklist } from '@/hooks/useChecklist';
import { getIssueTypeDisplayName } from '@/lib/checklist-data';
import Question from './Question';
import ChecklistResult from './ChecklistResult';
import Card from './ui/Card';

interface DoRChecklistProps {
  issueType: string;
  onClose: () => void;
}

export default function DoRChecklist({ issueType, onClose }: DoRChecklistProps) {
  const {
    answers,
    currentIndex,
    isComplete,
    currentQuestion,
    totalQuestions,
    checklist,
    setAnswer,
    goNext,
    goPrev,
    reset,
    getCurrentAnswer,
  } = useChecklist(issueType);

  const displayIssueType = getIssueTypeDisplayName(issueType);

  if (isComplete) {
    return (
      <Card variant="elevated" className="flex h-full flex-col p-6">
        <ChecklistResult 
          answers={answers} 
          checklist={checklist}
          issueType={issueType}
          onReset={reset} 
        />
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            DoR Checklist
          </h3>
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
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
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

      {/* Category indicator for Story checklist */}
      {currentQuestion?.category && (
        <div className="mb-4 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {currentQuestion.category}
          </span>
        </div>
      )}

      {/* Question */}
      <div className="flex-1">
        {currentQuestion && (
          <Question
            question={currentQuestion}
            currentAnswer={getCurrentAnswer()}
            onAnswer={(value) => setAnswer(currentQuestion.id, value)}
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            onPrev={goPrev}
            onSkip={goNext}
            canGoPrev={currentIndex > 0}
            canGoNext={currentIndex < totalQuestions - 1}
          />
        )}
      </div>
    </Card>
  );
}
