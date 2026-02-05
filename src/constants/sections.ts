import type { SectionId } from '@/types';

// ============================================
// Navigation - Section IDs
// ============================================

/**
 * IDs des sections pour la navigation par ancres
 * Centralise les identifiants pour éviter les erreurs de typo
 */
export const SECTION_IDS: Record<Uppercase<SectionId>, SectionId> = {
  DESTINATIONS: 'destinations',
  EXPERIENCE: 'experience',
} as const;

/**
 * Labels de navigation associés aux sections
 */
export const SECTION_LABELS: Record<SectionId, string> = {
  destinations: 'Destinations',
  experience: "L'Expérience",
} as const;

/**
 * Helper pour scroller vers une section
 */
export const scrollToSection = (id: SectionId): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
