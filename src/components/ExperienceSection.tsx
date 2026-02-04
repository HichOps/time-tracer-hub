import { useEffect, useRef, useState } from 'react';
import { Shield, Compass, Sparkles, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Sécurité Absolue',
    description:
      'Nos capsules temporelles utilisent une technologie brevetée garantissant un retour dans votre époque à la seconde près.',
  },
  {
    icon: Compass,
    title: 'Guides Experts',
    description:
      'Accompagnés par des historiens et scientifiques, vivez chaque époque avec un regard privilégié.',
  },
  {
    icon: Sparkles,
    title: 'Immersion Totale',
    description:
      'Costumes d\'époque, monnaie locale, dialectes : chaque détail est pensé pour une expérience authentique.',
  },
  {
    icon: Clock,
    title: 'Durée Flexible',
    description:
      'De quelques heures à plusieurs jours, adaptez la durée de votre voyage selon vos envies.',
  },
];

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
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
          {features.map((feature, index) => (
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
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 group-hover:text-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
