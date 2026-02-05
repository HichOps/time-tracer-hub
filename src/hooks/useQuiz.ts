import { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS, calculateQuizResult, DESTINATIONS_MAP } from '@/constants';
import type { Destination } from '@/types';

export type QuizAnswer = 'A' | 'B' | 'C' | null;

interface UseQuizReturn {
  /** Current question index (0-based) */
  currentStep: number;
  /** Array of user answers */
  answers: QuizAnswer[];
  /** Calculated destination result (null if quiz not completed) */
  result: Destination | null;
  /** Total number of questions */
  totalQuestions: number;
  /** Current question data */
  currentQuestion: typeof QUIZ_QUESTIONS[number];
  /** Whether quiz is completed */
  isCompleted: boolean;
  /** Handle user answer selection */
  handleAnswer: (answer: QuizAnswer) => void;
  /** Reset quiz to initial state */
  resetQuiz: () => void;
  /** Scroll to result card and highlight it */
  scrollToResult: () => void;
}

/**
 * Hook pour gérer la logique du ChronoQuiz
 * Gère les états, transitions entre questions et calcul du résultat
 */
export const useQuiz = (): UseQuizReturn => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>(
    Array(QUIZ_QUESTIONS.length).fill(null)
  );
  const [result, setResult] = useState<Destination | null>(null);

  const handleAnswer = useCallback((answer: QuizAnswer) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      // Move to next question with delay for UX
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    } else {
      // Calculate and set result
      setTimeout(() => {
        const destinationId = calculateQuizResult(newAnswers);
        const destination = DESTINATIONS_MAP[destinationId];
        if (destination) {
          setResult(destination);
        }
      }, 300);
    }
  }, [answers, currentStep]);

  const resetQuiz = useCallback(() => {
    setCurrentStep(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setResult(null);
  }, []);

  const scrollToResult = useCallback(() => {
    if (!result) return;

    const element = document.getElementById(result.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add temporary highlight effect
      element.classList.add('ring-2', 'ring-gold', 'ring-offset-2', 'ring-offset-background');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-gold', 'ring-offset-2', 'ring-offset-background');
      }, 2000);
    }
  }, [result]);

  return {
    currentStep,
    answers,
    result,
    totalQuestions: QUIZ_QUESTIONS.length,
    currentQuestion: QUIZ_QUESTIONS[currentStep],
    isCompleted: result !== null,
    handleAnswer,
    resetQuiz,
    scrollToResult,
  };
};
