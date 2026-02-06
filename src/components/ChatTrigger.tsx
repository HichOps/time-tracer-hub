import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Composant de déclenchement du chatbot avec animations "Dark & Gold"
 * - Pulsation dorée subtile pour attirer l'attention
 * - Speech bubble proactive après 3s d'inactivité
 */
const ChatTrigger = ({ isOpen, onToggle }: ChatTriggerProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  // Affiche le tooltip après 3s si le chat n'est pas ouvert
  useEffect(() => {
    if (isOpen || tooltipDismissed) {
      setShowTooltip(false);
      return;
    }

    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, [isOpen, tooltipDismissed]);

  // Auto-hide tooltip après 8s
  useEffect(() => {
    if (!showTooltip) return;

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      setTooltipDismissed(true);
    }, 8000);

    return () => clearTimeout(hideTimer);
  }, [showTooltip]);

  // Reset tooltipDismissed quand le chat se ferme (pour réapparaître plus tard)
  useEffect(() => {
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setTooltipDismissed(false);
      }, 30000); // Réapparaît après 30s d'inactivité
      return () => clearTimeout(resetTimer);
    }
  }, [isOpen]);

  const handleTooltipClick = () => {
    setShowTooltip(false);
    setTooltipDismissed(true);
    onToggle();
  };

  const handleDismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setTooltipDismissed(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speech Bubble Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-full right-0 mb-3 w-64 md:w-72"
          >
            <div 
              onClick={handleTooltipClick}
              className="relative bg-card border border-gold/30 rounded-2xl p-4 shadow-xl cursor-pointer hover:border-gold/50 transition-colors"
            >
              {/* Close button */}
              <button
                onClick={handleDismissTooltip}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
              
              {/* Content */}
              <div className="flex items-start gap-3 pr-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-gold" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-semibold text-gold">Chronos</span> est prêt pour votre voyage. Une question ?
                </p>
              </div>

              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-gold/30 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsating Ring (visible only when chat is closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.6, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full bg-gold/40"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1.2],
                opacity: [0.4, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.3,
              }}
              className="absolute inset-0 rounded-full bg-gold/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark shadow-lg shadow-gold/25 flex items-center justify-center transition-colors hover:shadow-gold/40"
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-background" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-background" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatTrigger;
