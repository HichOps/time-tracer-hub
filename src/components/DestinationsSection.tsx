import DestinationCard from './DestinationCard';
import { DESTINATIONS, SECTION_IDS } from '@/constants';

const DestinationsSection = () => {
  return (
    <section id={SECTION_IDS.DESTINATIONS} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
            Destinations
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Voyagez à travers{' '}
            <span className="text-gradient-gold">le temps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chaque époque vous attend. Choisissez votre aventure parmi nos
            destinations les plus prisées.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              {...destination}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
