import type { Destination } from '@/types';

// ============================================
// Destinations - Source de vérité unique
// ============================================

/**
 * Liste complète des destinations temporelles
 * Fusionne les 3 versions précédentes (DestinationsSection, BookingModal, ChronoQuiz)
 */
export const DESTINATIONS: Destination[] = [
  {
    id: 'paris-1889',
    title: 'Paris 1889',
    period: "L'Exposition Universelle",
    image: 'https://i.imgur.com/XSMPDtu.jpeg',
    imageAlt: 'Vue nocturne de la Tour Eiffel illuminée lors de l\'Exposition Universelle de Paris en 1889, avec la foule élégante de la Belle Époque',
    description:
      "L'Exposition Universelle comme vous ne l'avez jamais vue. Admirez la Tour Eiffel dans sa couleur rouge d'origine sous les projecteurs de la nuit parisienne.",
    shortDescription:
      "Vivez l'effervescence de la Belle Époque et admirez la Tour Eiffel dans sa splendeur originelle.",
    ambiance: 'Nocturne, électrique, foule élégante',
    badges: ['Romance', 'Gastronomie', 'Guide Inclus'],
  },
  {
    id: 'cretace',
    title: 'Crétacé (-66M)',
    period: '-66 millions d\'années',
    image: 'https://i.imgur.com/icPa5lp.jpeg',
    imageAlt: 'Paysage préhistorique du Crétacé au coucher du soleil avec des dinosaures silhouettés devant un volcan actif',
    description:
      'Observez les géants de la préhistoire dans leur habitat naturel. Un safari au crépuscule, entre volcans et forêts primitives.',
    shortDescription:
      'Partez en safari préhistorique et observez les géants qui dominaient la Terre.',
    ambiance: 'Coucher de soleil intense, brume, nature sauvage',
    badges: ['Aventure', 'Nature Sauvage', 'Sécurité Max'],
  },
  {
    id: 'florence-1504',
    title: 'Florence 1504',
    period: 'La Renaissance',
    image: 'https://i.imgur.com/qyQcyGq.jpeg',
    imageAlt: 'Piazza della Signoria à Florence en 1504, baignée de lumière toscane avec des artistes et marchands de la Renaissance',
    description:
      'Rencontrez Michel-Ange au cœur de la Renaissance. Flânez sur la Piazza della Signoria parmi les marchands et les artistes.',
    shortDescription:
      'Plongez dans le cœur artistique de la Renaissance aux côtés des plus grands maîtres.',
    ambiance: 'Ensoleillée, architecturale, historique',
    badges: ['Art & Histoire', 'Architecture', "Costume d'époque"],
  },
];

/**
 * Map des destinations par ID pour accès rapide O(1)
 */
export const DESTINATIONS_MAP: Record<string, Destination> = DESTINATIONS.reduce(
  (acc, dest) => ({ ...acc, [dest.id]: dest }),
  {}
);

/**
 * Helper pour transformer les destinations en options de sélection (dropdown)
 */
export const getDestinationSelectOptions = (): { value: string; label: string }[] =>
  DESTINATIONS.map((dest) => ({
    value: dest.id,
    label: dest.title,
  }));

/**
 * Helper pour récupérer le label d'une destination par son ID
 */
export const getDestinationLabel = (id: string): string | undefined =>
  DESTINATIONS_MAP[id]?.title;
