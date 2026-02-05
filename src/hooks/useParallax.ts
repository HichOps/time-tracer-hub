import { useState, useEffect, useCallback, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseParallaxReturn {
  /** Style transform à appliquer à l'élément */
  transform: string;
  /** Handler pour le mouseMove (optionnel si on utilise le ref) */
  handleMouseMove: (e: React.MouseEvent) => void;
  /** Handler pour le mouseLeave */
  handleMouseLeave: () => void;
}

interface UseParallaxOptions {
  /** Intensité de l'effet (défaut: 20) */
  intensity?: number;
  /** Inverser l'effet */
  invert?: boolean;
  /** Activer le scale au hover */
  scale?: number;
}

/**
 * Hook pour créer un effet de parallaxe basé sur le mouvement de la souris
 */
export const useParallax = (
  ref?: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): UseParallaxReturn => {
  const { intensity = 20, invert = false, scale = 1.02 } = options;
  
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const element = ref?.current || (e.currentTarget as HTMLElement);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Position relative au centre (-1 à 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setPosition({ x, y });
    setIsHovering(true);
  }, [ref]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  // Calcul du transform
  const multiplier = invert ? -1 : 1;
  const translateX = position.x * intensity * multiplier;
  const translateY = position.y * intensity * multiplier;
  const currentScale = isHovering ? scale : 1;
  
  const transform = isHovering
    ? `translate3d(${translateX}px, ${translateY}px, 0) scale(${currentScale})`
    : 'translate3d(0, 0, 0) scale(1)';

  return {
    transform,
    handleMouseMove,
    handleMouseLeave,
  };
};
