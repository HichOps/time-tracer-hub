import type { QuizQuestion, QuizResultMapping } from '@/types';

// ============================================
// ChronoQuiz - Questions & Logique
// ============================================

/**
 * Questions du quiz pour déterminer la destination idéale
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Quelle est votre envie du moment ?',
    options: [
      { value: 'A', label: 'Découverte & Innovation', icon: '💡' },
      { value: 'B', label: 'Nature Sauvage & Frissons', icon: '🦕' },
      { value: 'C', label: 'Art & Culture', icon: '🎨' },
    ],
  },
  {
    id: 2,
    question: 'Votre ambiance idéale ?',
    options: [
      { value: 'A', label: 'Foule festive et électrique', icon: '✨' },
      { value: 'B', label: 'Solitude et grands espaces', icon: '🌅' },
      { value: 'C', label: 'Raffinement et architecture', icon: '🏛️' },
    ],
  },
];

/**
 * Mapping des réponses vers les IDs de destinations
 * A → Paris 1889 (Innovation)
 * B → Crétacé (Nature)
 * C → Florence 1504 (Art)
 */
export const QUIZ_RESULT_MAPPING: QuizResultMapping = {
  A: 'paris-1889',
  B: 'cretace',
  C: 'florence-1504',
};

/**
 * Calcule la destination recommandée en fonction des réponses
 */
export const calculateQuizResult = (answers: ('A' | 'B' | 'C' | null)[]): string => {
  const counts = { A: 0, B: 0, C: 0 };
  
  answers.forEach((answer) => {
    if (answer) counts[answer]++;
  });

  let winner: 'A' | 'B' | 'C' = 'A';
  if (counts.B > counts.A && counts.B >= counts.C) winner = 'B';
  else if (counts.C > counts.A && counts.C > counts.B) winner = 'C';

  return QUIZ_RESULT_MAPPING[winner];
};
