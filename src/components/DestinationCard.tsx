import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface DestinationCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  ambiance: string;
  badges?: string[];
  delay?: number;
}

const DestinationCard = ({
  id,
  image,
  title,
  description,
  ambiance,
  badges = [],
  delay = 0,
}: DestinationCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      id={id}
      ref={cardRef}
      className={`card-destination group cursor-pointer transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {/* Image Container */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-gold/5 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="bg-background/60 backdrop-blur-sm border-gold/30 text-gold/90 text-xs font-medium px-3 py-1 hover:bg-gold/10 transition-colors duration-300"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-foreground/90 text-lg leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Ambiance Tag */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gold font-medium tracking-wide uppercase">
              Ambiance
            </span>
            <span className="text-sm text-muted-foreground">
              {ambiance}
            </span>
          </div>

          {/* Hover CTA */}
          <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <button className="btn-gold px-6 py-3 text-sm">
              <span className="relative z-10">Découvrir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
