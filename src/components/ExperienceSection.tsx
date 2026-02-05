import { Shield, Compass, Sparkles, Clock, type LucideIcon } from 'lucide-react';
import { EXPERIENCE_FEATURES, SECTION_IDS } from '@/constants';
import { useIntersection } from '@/hooks/useIntersection';
import type { Feature } from '@/types';

// Mapping des noms d'icônes vers les composants Lucide
const iconMap: Record<Feature['iconName'], LucideIcon> = {
  Shield,
  Compass,
  Sparkles,
  Clock,
};

const ExperienceSection = () => {
  const { ref: sectionRef, isVisible } = useIntersection<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      id={SECTION_IDS.EXPERIENCE}
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
            L'Expérience
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Un voyage{' '}
            <span className="text-gradient-gold">sans compromis</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nous redéfinissons les standards du voyage temporel avec une
            attention méticuleuse à chaque aspect de votre expérience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {EXPERIENCE_FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName];
            return (
              <div
                key={feature.title}
                className={`p-8 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all duration-500 group ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <IconComponent className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4 group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
