import { useState, useEffect, useCallback, useRef } from 'react';

interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  isLoaded: boolean;
}

interface UseAudioReturn extends AudioState {
  /** Bascule entre muet/son */
  toggleMute: () => void;
  /** Démarre le son ambiant (appeler après une interaction utilisateur) */
  startAmbient: () => void;
  /** Joue un effet sonore ponctuel */
  playSound: (sound: 'click' | 'whoosh' | 'success') => void;
}

// URLs des sons (hébergés sur des CDN publics pour le MVP)
const SOUND_URLS = {
  ambient: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2554/2554-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
} as const;

/**
 * Hook pour gérer l'audio immersif
 * - Nappe ambiante en boucle
 * - Effets sonores ponctuels
 * - Chargement asynchrone pour ne pas bloquer le rendu
 */
export const useAudio = (): UseAudioReturn => {
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isMuted: false,
    isLoaded: false,
  });

  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({});

  // Chargement asynchrone des sons
  useEffect(() => {
    // Créer l'élément audio ambient
    const ambient = new Audio();
    ambient.src = SOUND_URLS.ambient;
    ambient.loop = true;
    ambient.volume = 0.15; // Volume discret
    ambient.preload = 'none'; // Ne charge pas tant que non demandé
    ambientRef.current = ambient;

    // Précharger les effets sonores en background
    const preloadSounds = async () => {
      const soundTypes = ['click', 'whoosh', 'success'] as const;
      
      for (const type of soundTypes) {
        const audio = new Audio();
        audio.src = SOUND_URLS[type];
        audio.volume = 0.3;
        audio.preload = 'auto';
        soundsRef.current[type] = audio;
      }

      setState(prev => ({ ...prev, isLoaded: true }));
    };

    // Différer le chargement pour ne pas bloquer le rendu initial
    const timeoutId = setTimeout(preloadSounds, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
    };
  }, []);

  const startAmbient = useCallback(() => {
    if (ambientRef.current && !state.isPlaying && !state.isMuted) {
      // Fade in progressif
      ambientRef.current.volume = 0;
      ambientRef.current.play().then(() => {
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol += 0.01;
          if (ambientRef.current) {
            ambientRef.current.volume = Math.min(vol, 0.15);
          }
          if (vol >= 0.15) clearInterval(fadeIn);
        }, 50);
      }).catch(() => {
        // L'utilisateur n'a pas encore interagi - silencieux
      });
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [state.isPlaying, state.isMuted]);

  const toggleMute = useCallback(() => {
    setState(prev => {
      const newMuted = !prev.isMuted;
      
      if (ambientRef.current) {
        if (newMuted) {
          ambientRef.current.pause();
        } else if (prev.isPlaying) {
          ambientRef.current.play().catch(() => {});
        }
      }
      
      return { ...prev, isMuted: newMuted };
    });
  }, []);

  const playSound = useCallback((sound: 'click' | 'whoosh' | 'success') => {
    if (state.isMuted) return;
    
    const audio = soundsRef.current[sound];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, [state.isMuted]);

  return {
    ...state,
    toggleMute,
    startAmbient,
    playSound,
  };
};
