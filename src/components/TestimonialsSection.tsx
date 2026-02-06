import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useIntersection } from '@/hooks/useIntersection';

interface Testimonial {
  name: string;
  role: string;
  epoch: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Isabelle M.',
    role: 'Historienne de l\'art',
    epoch: 'Florence 1504',
    quote:
      'J\'ai vu Michel-Ange frapper le marbre du David de mes propres yeux. Un silence sacré régnait dans l\'atelier, ponctué par le son du ciseau. 40 minutes hors du temps — littéralement. L\'équipe Chronos m\'a fait vivre ce que 20 ans de carrière n\'avaient pu m\'offrir.',
    rating: 5,
  },
  {
    name: 'Thomas R.',
    role: 'Entrepreneur, Lyon',
    epoch: 'Paris 1889',
    quote:
      'La Tour Eiffel rouge vénitien sous les lumières électriques de l\'Exposition Universelle… J\'ai trinqué au champagne à 300 mètres de hauteur en 1889, puis je suis rentré à temps pour mon meeting de 9h. Le luxe temporel a un nom : Heisenberg.',
    rating: 5,
  },
  {
    name: 'Dr. Claire V.',
    role: 'Paléontologue, CNRS',
    epoch: 'Crétacé, -66M années',
    quote:
      'J\'ai passé ma vie à étudier des fossiles. Grâce à TimeTravel Agency, j\'ai observé un Tyrannosaure vivant au coucher du soleil. Le Bouclier Temporel m\'a rendue invisible. Le plus beau jour de ma carrière — et de ma vie.',
    rating: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.15, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const TestimonialsSection = () => {
  const { ref: sectionRef, isVisible } = useIntersection<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
            Témoignages
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Paroles de{' '}
            <span className="text-gradient-gold">Voyageurs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ils ont traversé le temps. Voici leurs récits.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              className="relative p-8 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all duration-500 group"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20">
                  <Quote className="w-4 h-4 text-background" />
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-foreground/85 text-sm leading-relaxed mb-6 italic">
                « {testimonial.quote} »
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}
                </p>
                <p className="text-gold/70 text-xs mt-1 font-medium tracking-wide uppercase">
                  {testimonial.epoch}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
