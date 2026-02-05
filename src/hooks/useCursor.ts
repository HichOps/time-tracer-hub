import { useEffect, useState, useCallback } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

type HoverType = 'default' | 'button' | 'card' | 'link';

interface UseCursorReturn {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isHovering: boolean;
  hoverType: HoverType;
}

// Configuration du spring pour une animation fluide
const SPRING_CONFIG = {
  damping: 25,
  stiffness: 400,
  mass: 0.5,
};

/**
 * Hook optimisé pour le curseur personnalisé
 * Utilise useMotionValue pour éviter les re-renders React
 * L'animation est gérée directement par Framer Motion (GPU-accelerated)
 */
export const useCursor = (): UseCursorReturn => {
  // MotionValues - ne provoquent PAS de re-render
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs connectés aux MotionValues
  const x = useSpring(mouseX, SPRING_CONFIG);
  const y = useSpring(mouseY, SPRING_CONFIG);

  // Seuls états qui nécessitent un re-render (changement de style)
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<HoverType>('default');

  // Suivi de la souris - mise à jour des MotionValues (pas de re-render)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Détection des éléments interactifs
  const updateHoverState = useCallback((target: HTMLElement) => {
    // Boutons de réservation et CTA
    if (
      target.closest('.btn-gold') ||
      target.closest('[data-cursor="button"]') ||
      target.closest('button')
    ) {
      setIsHovering(true);
      setHoverType('button');
      return;
    }

    // Cartes de destination
    if (target.closest('.card-destination')) {
      setIsHovering(true);
      setHoverType('card');
      return;
    }

    // Liens
    if (target.closest('a') || target.closest('.nav-link')) {
      setIsHovering(true);
      setHoverType('link');
      return;
    }

    setIsHovering(false);
    setHoverType('default');
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      updateHoverState(e.target as HTMLElement);
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [updateHoverState]);

  return { x, y, isHovering, hoverType };
};
