import DestinationCard from './DestinationCard';

const destinations = [
  {
    id: 'paris-1889',
    image: 'https://i.imgur.com/XSMPDtu.jpeg',
    title: 'Paris 1889',
    description:
      "L'Exposition Universelle comme vous ne l'avez jamais vue. Admirez la Tour Eiffel dans sa couleur rouge d'origine sous les projecteurs de la nuit parisienne.",
    ambiance: 'Nocturne, électrique, foule élégante',
    badges: ['Romance', 'Gastronomie', 'Guide Inclus'],
  },
  {
    id: 'cretace',
    image: 'https://i.imgur.com/icPa5lp.jpeg',
    title: 'Crétacé (-66M)',
    description:
      'Observez les géants de la préhistoire dans leur habitat naturel. Un safari au crépuscule, entre volcans et forêts primitives.',
    ambiance: 'Coucher de soleil intense, brume, nature sauvage',
    badges: ['Aventure', 'Nature Sauvage', 'Sécurité Max'],
  },
  {
    id: 'florence-1504',
    image: 'https://i.imgur.com/qyQcyGq.jpeg',
    title: 'Florence 1504',
    description:
      'Rencontrez Michel-Ange au cœur de la Renaissance. Flânez sur la Piazza della Signoria parmi les marchands et les artistes.',
    ambiance: 'Ensoleillée, architecturale, historique',
    badges: ['Art & Histoire', 'Architecture', 'Costume d\'époque'],
  },
];

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-24 md:py-32 bg-background">
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
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.title}
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
