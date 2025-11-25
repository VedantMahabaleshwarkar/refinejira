'use client';

import { useState, useCallback, useMemo } from 'react';
import { AnswerValue, ChecklistState, ChecklistQuestion } from '@/lib/types';
import { getChecklistForIssueType } from '@/lib/checklist-data';

export function useChecklist(issueType: string) {
  const checklist = useMemo(() => getChecklistForIssueType(issueType), [issueType]);
  
  const [state, setState] = useState<ChecklistState>({
    answers: {},
    currentIndex: 0,
    isComplete: false,
  });

  const totalQuestions = checklist.length;
  const currentQuestion = checklist[state.currentIndex];
  const progress = Math.round((Object.keys(state.answers).length / totalQuestions) * 100);

  const setAnswer = useCallback((questionId: string, value: AnswerValue) => {
    setState((prev) => {
      const newAnswers = { ...prev.answers, [questionId]: value };
      const answeredCount = Object.keys(newAnswers).length;
      const isComplete = answeredCount === totalQuestions;

      // Auto-advance to next question if not complete
      const nextIndex = isComplete
        ? prev.currentIndex
        : Math.min(prev.currentIndex + 1, totalQuestions - 1);

      return {
        answers: newAnswers,
        currentIndex: nextIndex,
        isComplete,
      };
    });
  }, [totalQuestions]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setState((prev) => ({
        ...prev,
        currentIndex: index,
      }));
    }
  }, [totalQuestions]);

  const goNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, totalQuestions - 1),
    }));
  }, [totalQuestions]);

  const goPrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      answers: {},
      currentIndex: 0,
      isComplete: false,
    });
  }, []);

  const getCurrentAnswer = useCallback((): AnswerValue => {
    return state.answers[currentQuestion?.id] ?? null;
  }, [state.answers, currentQuestion]);

  return {
    // State
    answers: state.answers,
    currentIndex: state.currentIndex,
    isComplete: state.isComplete,
    currentQuestion,
    totalQuestions,
    progress,
    checklist,

    // Actions
    setAnswer,
    goToQuestion,
    goNext,
    goPrev,
    reset,
    getCurrentAnswer,
  };
}
