// ============================================
// Types & Interfaces - TimeTravel Agency
// ============================================

/**
 * Destination temporelle complète
 * Source de vérité unique pour toutes les destinations
 */
export interface Destination {
  id: string;
  title: string;
  period: string;
  image: string;
  imageAlt?: string;
  description: string;
  shortDescription: string;
  ambiance: string;
  badges: string[];
}

/**
 * Option de réponse pour le quiz
 */
export interface QuizOption {
  value: 'A' | 'B' | 'C';
  label: string;
  icon: string;
}

/**
 * Question du ChronoQuiz
 */
export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

/**
 * Mapping des résultats du quiz vers les destinations
 */
export type QuizResultMapping = Record<'A' | 'B' | 'C', string>;

/**
 * Feature de l'ExperienceSection
 * Utilise des noms d'icônes Lucide (strings) pour garder les constantes pures
 */
export interface Feature {
  iconName: 'Shield' | 'Compass' | 'Sparkles' | 'Clock';
  title: string;
  description: string;
}

/**
 * Pattern de réponse du chatbot
 */
export interface ChatResponsePattern {
  keywords: string[];
  response: string;
}

/**
 * Message du chat
 */
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'chronos';
  timestamp: Date;
}

/**
 * IDs des sections pour la navigation
 */
export type SectionId = 'destinations' | 'experience';
