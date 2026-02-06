import confetti from 'canvas-confetti';

/**
 * Couleurs "Luxe" dorées et métalliques pour Heisenberg Prod.
 */
const PREMIUM_COLORS = [
  '#FFD700', // Or pur
  '#FFA500', // Orange doré
  '#D4AF37', // Or métallique
  '#C0C0C0', // Argent
  '#F5DEB3', // Blé doré
  '#DAA520', // Goldenrod
];

/**
 * Déclenche une explosion de confettis dorés premium
 * Animation "Luxe" pour célébrer la sélection d'un voyage
 */
export const triggerPremiumConfetti = (): void => {
  // Explosion centrale principale
  confetti({
    particleCount: 150,
    spread: 100,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.5 },
    colors: PREMIUM_COLORS,
    shapes: ['square', 'circle'],
    gravity: 0.8,
    scalar: 1.2,
    drift: 0,
    ticks: 200,
    disableForReducedMotion: true, // Respect des préférences d'accessibilité
  });

  // Seconde vague légèrement décalée pour plus de richesse
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 120,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.6 },
      colors: PREMIUM_COLORS,
      shapes: ['square', 'circle'],
      gravity: 1,
      scalar: 0.9,
      ticks: 150,
      disableForReducedMotion: true,
    });
  }, 150);
};

/**
 * Déclenche des confettis depuis les côtés (effet canon)
 * Variante pour des moments encore plus spéciaux
 */
export const triggerSideConfetti = (): void => {
  const end = Date.now() + 500;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: PREMIUM_COLORS,
      shapes: ['square', 'circle'],
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: PREMIUM_COLORS,
      shapes: ['square', 'circle'],
      disableForReducedMotion: true,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};
