import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Le voyage temporel est-il vraiment sûr ?',
    answer:
      'Absolument. Depuis notre fondation en 1986 à Lyon, nous avons effectué plus de 12 000 voyages sans aucun incident majeur. Chaque capsule est équipée d\'un stabilisateur de flux quantique de dernière génération et d\'un système de rappel d\'urgence. Notre taux de satisfaction est de 99,7 % — les 0,3 % restants ont simplement voulu rester dans l\'époque visitée.',
  },
  {
    question: 'Que se passe-t-il si je crée un paradoxe temporel ?',
    answer:
      'Nos agents Chronos, propulsés par l\'IA Mistral, surveillent en temps réel les lignes temporelles. En cas de paradoxe détecté (modification involontaire d\'un événement passé), le protocole "Heisenberg" s\'active automatiquement : vous êtes ramené à votre point de départ en moins de 3 secondes. L\'assurance Paradoxe, incluse dans toutes nos formules, couvre l\'intégralité des corrections temporelles.',
  },
  {
    question: 'Où se situe le terminal de départ ?',
    answer:
      'Notre terminal principal se trouve au 12 bis Cour de Verdun Gensoul, 69002 Lyon, à deux pas de la gare de Perrache. L\'accès se fait par une entrée discrète marquée du logo Heisenberg Prod. Un voiturier temporel est disponible sur rendez-vous. Nous disposons également d\'un terminal secondaire classifié pour les clients Odyssée.',
  },
  {
    question: 'Puis-je ramener des objets de l\'époque visitée ?',
    answer:
      'La réglementation temporelle internationale (Convention de Genève Trans-Époque, 2019) autorise le transport de souvenirs immatériels : photos holographiques, enregistrements sensoriels et cartes mémoire émotionnelles. Les objets physiques sont strictement interdits pour préserver l\'intégrité du continuum. Exception : les clients Odyssée bénéficient d\'une licence spéciale pour les artefacts de moins de 100 grammes.',
  },
  {
    question: 'Comment fonctionne l\'agent Chronos ?',
    answer:
      'Chronos est notre assistant IA personnel, intégré directement dans votre interface de voyage. Alimenté par Mistral AI, il vous accompagne avant, pendant et après votre voyage. Il peut recommander des époques selon vos goûts, répondre à vos questions historiques en temps réel, et même ajuster votre itinéraire en cours de route. Il est accessible via la bulle de chat en bas à droite de votre écran.',
  },
];

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

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.35, ease: 'easeOut' as const },
  }),
};

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

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
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-gold/20 shadow-2xl"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-gold/20 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold">
                    FAQ <span className="text-gradient-gold">Temporelle</span>
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Tout ce que vous devez savoir avant de traverser le temps.
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

            {/* FAQ Items */}
            <div className="p-6 space-y-3">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className={`rounded-xl border transition-colors ${
                    openIndex === index
                      ? 'bg-gold/5 border-gold/30'
                      : 'bg-secondary/50 border-border hover:border-gold/20'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-sm md:text-base pr-4">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 transition-colors ${
                        openIndex === index ? 'text-gold' : 'text-muted-foreground'
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <p className="text-center text-muted-foreground text-xs pt-4">
                Vous avez d'autres questions ? Notre agent Chronos est disponible 24/7 via le chat.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FAQModal;
