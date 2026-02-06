import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-red-500/5 blur-3xl animate-float animation-delay-200" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Glitching 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-gold animate-pulse" />
          </div>
          <h1
            className="font-serif text-8xl md:text-9xl font-bold text-gradient-gold"
            style={{ textShadow: '0 0 80px rgba(212,175,55,0.3)' }}
          >
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Paradoxe <span className="text-gradient-gold">Temporel</span> Détecté
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Le continuum espace-temps ne reconnaît pas la coordonnée
            <span className="text-gold font-mono text-sm ml-1">« {location.pathname} »</span>.
          </p>
          <p className="text-muted-foreground text-sm mb-10">
            Le protocole Heisenberg a sécurisé votre position. Aucun paradoxe créé.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="btn-gold px-8 py-4 text-base flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span className="relative z-10">Retour à l'Agence</span>
          </Link>
        </motion.div>

        {/* Footer info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-muted-foreground/50 text-xs flex items-center justify-center gap-2"
        >
          <Clock className="w-3 h-3" />
          Heisenberg Prod. — Sécurité temporelle depuis 1986
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
