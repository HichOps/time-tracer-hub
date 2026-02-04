import { useEffect, useRef, useState } from 'react';

interface DestinationCardProps {
  image: string;
  title: string;
  description: string;
  ambiance: string;
  delay?: number;
}

const DestinationCard = ({
  image,
  title,
  description,
  ambiance,
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
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`card-destination group cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } transition-all duration-700`}
    >
      {/* Image Container */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
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
          <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button className="btn-gold px-6 py-3 text-sm">
              Découvrir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
