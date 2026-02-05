/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode } from 'react';
import { useAudio } from '@/hooks/useAudio';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isLoaded: boolean;
  toggleMute: () => void;
  startAmbient: () => void;
  playSound: (sound: 'click' | 'whoosh' | 'success') => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

/**
 * Provider pour le contexte audio global
 * Permet d'accéder aux contrôles audio depuis n'importe quel composant
 */
export const AudioProvider = ({ children }: AudioProviderProps) => {
  const audio = useAudio();

  return (
    <AudioContext.Provider value={audio}>
      {children}
    </AudioContext.Provider>
  );
};

/**
 * Hook pour accéder au contexte audio
 */
export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};
