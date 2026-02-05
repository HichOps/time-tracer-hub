import { useState } from 'react';
import { ChevronDown, Compass } from 'lucide-react';
import { SECTION_IDS, scrollToSection } from '@/constants';
import { useAudioContext } from '@/contexts/AudioContext';
import ChronoQuiz from './ChronoQuiz';

const HeroSection = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const { startAmbient, playSound } = useAudioContext();

  const handleStartJourney = () => {
    startAmbient(); // Démarre la nappe sonore
    playSound('whoosh');
    scrollToSection(SECTION_IDS.DESTINATIONS);
  };

  const handleOpenQuiz = () => {
    playSound('click');
    setIsQuizOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-venetian/5 blur-3xl animate-float animation-delay-200" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-sunset/5 blur-3xl animate-float animation-delay-400" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Eyebrow */}
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-6 animate-fade-in-up">
              Voyages Temporels de Luxe
            </p>

            {/* Main Title */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 animate-fade-in-up animation-delay-200">
              Explorez l'histoire,{' '}
              <span className="text-gradient-gold">réinventée</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
              De la Belle Époque aux origines du monde, vivez l'impossible.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
              <button
                onClick={handleStartJourney}
                className="btn-gold text-lg px-10 py-5 animate-pulse-glow"
              >
                <span className="relative z-10">Commencer le voyage</span>
              </button>
              <button
                onClick={handleOpenQuiz}
                className="px-8 py-4 rounded-lg border-2 border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300 font-semibold flex items-center gap-2"
              >
                <Compass className="w-5 h-5" />
                Me conseiller une époque
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float">
            <button
              onClick={() => scrollToSection(SECTION_IDS.DESTINATIONS)}
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      <ChronoQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};

export default HeroSection;
