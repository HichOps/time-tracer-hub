import { Volume2, VolumeX } from 'lucide-react';
import { useAudioContext } from '@/contexts/AudioContext';

/**
 * Bouton Mute/Unmute discret pour le Header
 */
const MuteButton = () => {
  const { isMuted, toggleMute, isLoaded } = useAudioContext();

  if (!isLoaded) return null;

  return (
    <button
      onClick={toggleMute}
      className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-300"
      aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
      title={isMuted ? 'Activer le son' : 'Couper le son'}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </button>
  );
};

export default MuteButton;
