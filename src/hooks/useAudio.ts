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
  // Nappe ambiante drone subtile (loop: false, on gère manuellement)
  ambient: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
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
    // Créer l'élément audio ambient (ne joue PAS automatiquement)
    const ambient = new Audio();
    ambient.src = SOUND_URLS.ambient;
    ambient.loop = true; // Loop géré manuellement avec fade
    ambient.volume = 0; // Commence à 0 pour le fade-in
    ambient.preload = 'none'; // Ne charge pas tant que non demandé
    ambientRef.current = ambient;

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
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
    };
  }, []);

  /**
   * Démarre la nappe ambiante avec un fade-in progressif de 2 secondes
   * Ne se déclenche qu'après une interaction utilisateur (respect Autoplay)
   */
  const startAmbient = useCallback(() => {
    if (ambientRef.current && !state.isPlaying && !state.isMuted) {
      const audio = ambientRef.current;
      audio.volume = 0;
      
      audio.play().then(() => {
        // Fade-in progressif sur 2 secondes
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
      }).catch(() => {
        // L'utilisateur n'a pas encore interagi - silencieux
        console.debug('[Audio] Autoplay bloqué - interaction requise');
      });
      
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [state.isPlaying, state.isMuted]);

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
