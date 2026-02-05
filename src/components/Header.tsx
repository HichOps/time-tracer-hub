import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { SECTION_IDS, scrollToSection } from '@/constants';
import MuteButton from '@/components/ui/MuteButton';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <Clock className="w-5 h-5 text-background" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              TimeTravel <span className="text-gradient-gold">Agency</span>
            </span>
          </div>

          {/* Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button
                onClick={() => scrollToSection(SECTION_IDS.DESTINATIONS)}
                className="nav-link font-medium"
              >
                Destinations
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(SECTION_IDS.EXPERIENCE)}
                className="nav-link font-medium"
              >
                L'Expérience
              </button>
            </li>
            <li>
              <MuteButton />
            </li>
            <li>
              <button
                onClick={() => scrollToSection('destinations')}
                className="btn-gold text-sm px-6 py-2"
              >
                Réserver
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
