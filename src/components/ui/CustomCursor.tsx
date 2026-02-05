import { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';
import { useIsMobile } from '@/hooks/use-mobile';

// Configuration du spring pour le trailing dot (plus lent)
const TRAIL_SPRING_CONFIG = {
  damping: 20,
  stiffness: 150,
  mass: 0.8,
};

// Styles précalculés pour éviter les recalculs
const CURSOR_STYLES = {
  default: {
    size: 24,
    borderColor: 'rgba(218, 165, 32, 0.6)',
    backgroundColor: 'transparent',
  },
  button: {
    size: 60,
    borderColor: 'rgba(218, 165, 32, 1)',
    backgroundColor: 'rgba(218, 165, 32, 0.1)',
  },
  card: {
    size: 80,
    borderColor: 'rgba(218, 165, 32, 1)',
    backgroundColor: 'rgba(218, 165, 32, 0.05)',
  },
  link: {
    size: 40,
    borderColor: 'rgba(218, 165, 32, 0.8)',
    backgroundColor: 'transparent',
  },
} as const;

/**
 * Curseur personnalisé "Viseur Temporel" - Version Optimisée
 * 
 * Optimisations appliquées:
 * - useMotionValue au lieu de useState pour la position (0 re-render)
 * - useSpring de Framer Motion pour l'animation fluide
 * - transform: translate3d() via motion.div pour GPU acceleration
 * - pointer-events: none pour ne pas bloquer les clics
 * - will-change: transform pour optimiser le compositing
 * - Suppression totale du DOM sur mobile via useIsMobile
 */
const CustomCursor = () => {
  const isMobile = useIsMobile();
  
  // Retour anticipé sur mobile - supprime complètement le curseur du DOM
  if (isMobile) return null;

  return <CursorContent />;
};

/**
 * Contenu du curseur - rendu uniquement sur desktop
 * Séparé pour permettre le early return conditionnel sans violer les règles des hooks
 */
const CursorContent = () => {
  const { x, y, isHovering, hoverType } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  // Spring values pour le trailing dot (suit avec plus de retard)
  const trailX = useSpring(x, TRAIL_SPRING_CONFIG);
  const trailY = useSpring(y, TRAIL_SPRING_CONFIG);

  // Taille animée du curseur principal
  const targetSize = useMotionValue<number>(CURSOR_STYLES.default.size);
  const size = useSpring(targetSize, { damping: 20, stiffness: 300 });

  // Offset pour centrer le curseur (size / 2)
  const offsetX = useTransform(size, (s) => -s / 2);
  const offsetY = useTransform(size, (s) => -s / 2);

  // Afficher le curseur après un court délai pour éviter le flash initial
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  // Mise à jour de la taille selon le type de hover
  useEffect(() => {
    targetSize.set(CURSOR_STYLES[hoverType].size);
  }, [hoverType, targetSize]);

  // Styles mémorisés
  const currentStyle = useMemo(() => CURSOR_STYLES[hoverType], [hoverType]);

  return (
    <>
      {/* Curseur principal (cercle) - GPU Accelerated */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 will-change-transform"
        style={{
          x,
          y,
          width: size,
          height: size,
          marginLeft: offsetX,
          marginTop: offsetY,
          borderColor: currentStyle.borderColor,
          backgroundColor: currentStyle.backgroundColor,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        {/* Inner dot */}
        {!isHovering && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
            style={{
              x: '-50%',
              y: '-50%',
              backgroundColor: 'rgba(218, 165, 32, 0.8)',
            }}
          />
        )}

        {/* Crosshair lines pour le mode button */}
        {hoverType === 'button' && (
          <>
            <div className="absolute top-1/2 left-2 right-2 h-px bg-gold/40 -translate-y-1/2" />
            <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gold/40 -translate-x-1/2" />
          </>
        )}
      </motion.div>

      {/* Trailing dot (effet de traînée) - GPU Accelerated */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-2 h-2 rounded-full will-change-transform"
        style={{
          x: trailX,
          y: trailY,
          marginLeft: -4,
          marginTop: -4,
          backgroundColor: 'rgba(218, 165, 32, 0.3)',
          opacity: isVisible && !isHovering ? 0.6 : 0,
        }}
      />

      {/* Masquer le curseur natif via style inline pour performance */}
      <style>{`
        *,
        *::before,
        *::after {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
