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
  playSound: (sound: 'click' | 'whoosh' | 'success' | 'notify') => void;
}

// URLs des sons (hébergés sur des CDN publics pour le MVP)
const SOUND_URLS = {
  // Pas de nappe ambiante pour éviter la nuisance - désactivé
  ambient: null,
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2554/2554-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  // Son cristallin court pour notification chatbot
  notify: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
} as const;

// Durée du fade-in en ms
const FADE_IN_DURATION = 2000;
const FADE_STEP_INTERVAL = 50;
const TARGET_AMBIENT_VOLUME = 0.15;

/**
 * Hook pour gérer l'audio immersif
 * - Nappe ambiante avec fade-in de 2 secondes (déclenchée par interaction)
 * - Effets sonores ponctuels
 * - Son de notification pour le chatbot
 * - Respecte les politiques d'Autoplay des navigateurs
 */
export const useAudio = (): UseAudioReturn => {
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isMuted: false,
    isLoaded: false,
  });

  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({});
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Chargement asynchrone des sons - PAS d'autoplay
  useEffect(() => {
    // Ambient désactivé - pas de nappe sonore intrusive
    ambientRef.current = null;

    // Précharger les effets sonores en background
    const preloadSounds = async () => {
      const soundTypes = ['click', 'whoosh', 'success', 'notify'] as const;
      
      for (const type of soundTypes) {
        const audio = new Audio();
        audio.src = SOUND_URLS[type];
        audio.volume = type === 'notify' ? 0.25 : 0.3; // Notify plus discret
        audio.preload = 'auto';
        soundsRef.current[type] = audio;
      }

      setState(prev => ({ ...prev, isLoaded: true }));
    };

    // Différer le chargement pour ne pas bloquer le rendu initial
    const timeoutId = setTimeout(preloadSounds, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  /**
   * Placeholder pour l'ambient - désactivé pour éviter la nuisance sonore
   * Joue juste le whoosh d'interaction à la place
   */
  const startAmbient = useCallback(() => {
    // Ambient désactivé - on joue juste un effet subtil
    if (!state.isMuted) {
      const whoosh = soundsRef.current['whoosh'];
      if (whoosh) {
        whoosh.currentTime = 0;
        whoosh.volume = 0.15; // Plus discret
        whoosh.play().catch(() => {});
      }
    }
    setState(prev => ({ ...prev, isPlaying: true }));
  }, [state.isMuted]);

  /**
   * Coupe ou réactive instantanément toutes les sources audio
   */
  const toggleMute = useCallback(() => {
    setState(prev => {
      const newMuted = !prev.isMuted;
      
      // Coupe immédiatement l'ambient
      if (ambientRef.current) {
        if (newMuted) {
          // Stop le fade-in en cours si présent
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
          ambientRef.current.pause();
          ambientRef.current.volume = 0;
        } else if (prev.isPlaying) {
          // Reprend avec fade-in
          ambientRef.current.volume = 0;
          ambientRef.current.play().then(() => {
            const steps = FADE_IN_DURATION / FADE_STEP_INTERVAL;
            const volumeIncrement = TARGET_AMBIENT_VOLUME / steps;
            let currentVolume = 0;
            
            fadeIntervalRef.current = setInterval(() => {
              currentVolume += volumeIncrement;
              if (ambientRef.current) {
                ambientRef.current.volume = Math.min(currentVolume, TARGET_AMBIENT_VOLUME);
              }
              if (currentVolume >= TARGET_AMBIENT_VOLUME) {
                if (fadeIntervalRef.current) {
                  clearInterval(fadeIntervalRef.current);
                  fadeIntervalRef.current = null;
                }
              }
            }, FADE_STEP_INTERVAL);
          }).catch(() => {});
        }
      }

      // Stoppe tous les effets sonores en cours
      if (newMuted) {
        Object.values(soundsRef.current).forEach(audio => {
          audio.pause();
          audio.currentTime = 0;
        });
      }
      
      return { ...prev, isMuted: newMuted };
    });
  }, []);

  /**
   * Joue un effet sonore ponctuel (one-shot)
   */
  const playSound = useCallback((sound: 'click' | 'whoosh' | 'success' | 'notify') => {
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
