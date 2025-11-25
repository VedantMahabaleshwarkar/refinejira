'use client';

import { ChecklistQuestion, AnswerValue } from '@/lib/types';
import Button from './ui/Button';

interface QuestionProps {
  question: ChecklistQuestion;
  currentAnswer: AnswerValue;
  onAnswer: (value: AnswerValue) => void;
  questionNumber: number;
  totalQuestions: number;
  onPrev: () => void;
  onSkip: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export default function Question({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
  onPrev,
  onSkip,
  canGoPrev,
  canGoNext,
}: QuestionProps) {
  const answerButtons: { value: AnswerValue; label: string; color: 'success' | 'secondary' | 'warning' }[] = [
    { value: 'yes', label: 'Yes', color: 'success' },
    { value: 'no', label: 'No', color: 'secondary' },
    { value: 'na', label: 'N/A', color: 'warning' },
  ];

  return (
    <div className="animate-slide-in flex h-full flex-col">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600 dark:text-slate-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="font-mono text-slate-500 dark:text-slate-500">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          {question.question}
        </h2>

        {question.subItems.length > 0 && (
          <div className="mb-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Instructions
            </p>
            <ul className="space-y-1.5">
              {question.subItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Answer buttons */}
        <div className="flex flex-wrap gap-3">
          {answerButtons.map(({ value, label, color }) => (
            <Button
              key={value}
              variant={currentAnswer === value ? color : 'ghost'}
              size="lg"
              onClick={() => onAnswer(value)}
              className={`min-w-[100px] ${
                currentAnswer === value
                  ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900'
                  : 'border border-slate-300 dark:border-slate-600'
              }`}
            >
              {currentAnswer === value && (
                <svg
                  className="mr-1.5 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
        <Button
          variant="ghost"
          size="md"
          onClick={onPrev}
          disabled={!canGoPrev}
          className="gap-1"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === questionNumber - 1
                  ? 'bg-blue-500'
                  : i < questionNumber - 1
                  ? 'bg-emerald-500'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="md"
          onClick={onSkip}
          disabled={!canGoNext}
          className="gap-1"
        >
          Skip
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

