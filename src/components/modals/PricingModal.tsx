import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Compass, Rocket } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    name: 'Explorateur',
    icon: Compass,
    price: '2 490',
    period: '/ voyage',
    description: 'L\'initiation temporelle idéale pour les curieux.',
    features: [
      'Accès à 3 époques classiques',
      'Guide holographique de base',
      'Combinaison temporelle standard',
      'Assurance paradoxe niveau I',
      'Départ depuis Perrache, Lyon',
    ],
    highlight: false,
  },
  {
    name: 'Chronos',
    icon: Crown,
    price: '5 990',
    period: '/ voyage',
    description: 'L\'expérience signature — comme en 1986 à Lyon.',
    features: [
      'Accès illimité à toutes les époques',
      'Agent Chronos IA personnel',
      'Suite VIP dans le Flux Temporel',
      'Assurance paradoxe niveau III',
      'Conciergerie 24/7 trans-époque',
      'Capsule privée haut de gamme',
    ],
    highlight: true,
  },
  {
    name: 'Odyssée',
    icon: Rocket,
    price: '12 500',
    period: '/ voyage',
    description: 'Le summum du luxe temporel. Sur-mesure absolu.',
    features: [
      'Voyages multi-époques enchaînés',
      'Vaisseau temporel privatisé',
      'Chef étoilé à bord',
      'Protection paradoxe quantique totale',
      'Accès aux époques classifiées',
      'Majordome temporel dédié',
      'Ligne directe avec Heisenberg',
    ],
    highlight: false,
  },
] as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.4, ease: 'easeOut' as const },
  }),
};

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={overlayVariants}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-gold/20 shadow-2xl"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-gold/20 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold">
                    Nos <span className="text-gradient-gold">Tarifs</span>
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Depuis 1986, le luxe temporel a un prix. Perrache, Lyon.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => {
                  const Icon = plan.icon;
                  return (
                    <motion.div
                      key={plan.name}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className={`relative rounded-xl p-6 border transition-colors ${
                        plan.highlight
                          ? 'bg-gradient-to-b from-gold/10 to-transparent border-gold/40 shadow-lg shadow-gold/10'
                          : 'bg-secondary/50 border-border hover:border-gold/20'
                      }`}
                    >
                      {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-gold-dark text-background text-xs font-bold px-4 py-1 rounded-full">
                          Recommandé
                        </div>
                      )}

                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        plan.highlight ? 'bg-gold/20' : 'bg-muted'
                      }`}>
                        <Icon className={`w-6 h-6 ${plan.highlight ? 'text-gold' : 'text-muted-foreground'}`} />
                      </div>

                      <h3 className="font-serif text-xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                      <div className="flex items-baseline gap-1 mb-6">
                        <span className={`text-3xl font-bold ${plan.highlight ? 'text-gold' : 'text-foreground'}`}>
                          {plan.price}€
                        </span>
                        <span className="text-muted-foreground text-sm">{plan.period}</span>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              plan.highlight ? 'bg-gold' : 'bg-muted-foreground'
                            }`} />
                            <span className="text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={onClose}
                        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                          plan.highlight
                            ? 'btn-gold'
                            : 'border border-border hover:border-gold/50 hover:text-gold'
                        }`}
                      >
                        <span className="relative z-10">Choisir {plan.name}</span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-center text-muted-foreground text-xs mt-8">
                Tous les tarifs incluent l'équipement temporel standard et l'assurance de base.
                Paiement sécurisé par cryptomonnaie trans-époque.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
