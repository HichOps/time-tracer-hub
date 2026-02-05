import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions {
  threshold?: number;
  delay?: number;
  triggerOnce?: boolean;
}

/**
 * Hook pour détecter la visibilité d'un élément dans le viewport
 * Optimisé pour les animations d'apparition
 */
export const useIntersection = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  delay = 0,
  triggerOnce = true,
}: UseIntersectionOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          
          // Disconnect after first trigger if triggerOnce
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, delay, triggerOnce]);

  return { ref, isVisible };
};
