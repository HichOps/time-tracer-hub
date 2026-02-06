import { motion } from 'framer-motion';
import type { Feature } from '@/types';

/**
 * Visuels animés pour les cartes de la section Expérience
 * Chaque composant utilise SVG + framer-motion pour un rendu performant
 * Palette : lueurs dorées (#D4AF37, #FFD700) sur fond sombre
 */

// ============================================
// 1. Bouclier Hexagonal Holographique
// ============================================
const ShieldVisual = () => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
    <svg
      viewBox="0 0 200 200"
      className="absolute -right-8 -top-8 w-48 h-48 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
    >
      {/* Hexagon pulsing */}
      <motion.polygon
        points="100,20 170,55 170,125 100,160 30,125 30,55"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeOpacity="0.3"
        animate={{
          strokeOpacity: [0.15, 0.4, 0.15],
          scale: [0.95, 1, 0.95],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.polygon
        points="100,35 160,63 160,117 100,145 40,117 40,63"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.5"
        animate={{
          strokeOpacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.5 }}
      />
      {/* Scan line */}
      <motion.line
        x1="40"
        y1="90"
        x2="160"
        y2="90"
        stroke="#FFD700"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={{ y1: [55, 145, 55], y2: [55, 145, 55] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
      />
    </svg>
    {/* Ambient glow */}
    <motion.div
      className="absolute -right-4 -top-4 w-32 h-32 rounded-full bg-gold/5 blur-2xl"
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
    />
  </div>
);

// ============================================
// 2. Boussole Astrale / Constellation
// ============================================
const CompassVisual = () => {
  const stars = [
    { cx: 140, cy: 30 }, { cx: 165, cy: 55 }, { cx: 180, cy: 40 },
    { cx: 155, cy: 70 }, { cx: 175, cy: 80 }, { cx: 145, cy: 50 },
    { cx: 160, cy: 25 }, { cx: 185, cy: 60 },
  ];

  const connections = [
    [0, 1], [1, 3], [2, 4], [0, 5], [5, 3], [6, 0], [2, 7], [4, 7],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <svg
        viewBox="0 0 200 100"
        className="absolute right-0 top-0 w-full h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      >
        {/* Connection lines */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={`line-${i}`}
            x1={stars[from].cx}
            y1={stars[from].cy}
            x2={stars[to].cx}
            y2={stars[to].cy}
            stroke="#D4AF37"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeOut' as const, repeat: Infinity, repeatType: 'reverse' as const, repeatDelay: 2 }}
          />
        ))}
        {/* Star nodes */}
        {stars.map((star, i) => (
          <motion.circle
            key={`star-${i}`}
            cx={star.cx}
            cy={star.cy}
            r="2"
            fill="#FFD700"
            animate={{
              opacity: [0.3, 0.9, 0.3],
              r: [1.5, 2.5, 1.5],
            }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' as const }}
          />
        ))}
      </svg>
      {/* Slow rotating compass needle (CSS only for perf) */}
      <motion.div
        className="absolute right-8 top-6 w-10 h-10 opacity-0 group-hover:opacity-60 transition-opacity duration-700"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' as const }}
      >
        <svg viewBox="0 0 40 40">
          <line x1="20" y1="4" x2="20" y2="36" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
          <line x1="4" y1="20" x2="36" y2="20" stroke="#D4AF37" strokeWidth="0.5" strokeLinecap="round" strokeOpacity="0.5" />
          <polygon points="20,4 17,14 23,14" fill="#FFD700" fillOpacity="0.6" />
        </svg>
      </motion.div>
    </div>
  );
};

// ============================================
// 3. Particules Bokeh Dorées
// ============================================
const SparklesVisual = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 140,
    y: 20 + Math.random() * 80,
    size: 3 + Math.random() * 6,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${(p.x / 200) * 100}%`,
            top: `${(p.y / 120) * 100}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(255,215,0,0) 70%)`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -10, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
      {/* Main glow blob */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gold/3 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
      />
    </div>
  );
};

// ============================================
// 4. Sablier / Cadran Oscillant
// ============================================
const ClockVisual = () => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
    <svg
      viewBox="0 0 120 120"
      className="absolute -right-2 -bottom-2 w-36 h-36 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
    >
      {/* Clock face */}
      <circle cx="60" cy="60" r="45" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeOpacity="0.15" />
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 60 + 38 * Math.sin(angle);
        const y1 = 60 - 38 * Math.cos(angle);
        const x2 = 60 + 42 * Math.sin(angle);
        const y2 = 60 - 42 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#D4AF37"
            strokeWidth={i % 3 === 0 ? '1.5' : '0.5'}
            strokeOpacity="0.4"
          />
        );
      })}
      {/* Center dot */}
      <circle cx="60" cy="60" r="2" fill="#FFD700" fillOpacity="0.6" />
      {/* Hour hand - slow oscillation */}
      <motion.line
        x1="60" y1="60" x2="60" y2="30"
        stroke="#FFD700"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
        animate={{ rotate: [0, 30, -15, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        style={{ transformOrigin: '60px 60px' }}
      />
      {/* Minute hand - gentle sweep */}
      <motion.line
        x1="60" y1="60" x2="60" y2="24"
        stroke="#D4AF37"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.35"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' as const }}
        style={{ transformOrigin: '60px 60px' }}
      />
    </svg>
    {/* Stardust particles around the clock */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gold/40"
        style={{
          right: `${10 + i * 12}%`,
          bottom: `${5 + i * 8}%`,
          width: 2 + i,
          height: 2 + i,
        }}
        animate={{
          opacity: [0, 0.6, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2.5,
          delay: i * 0.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
    ))}
  </div>
);

// ============================================
// Map des visuels par iconName
// ============================================
const visualMap: Record<Feature['iconName'], React.FC> = {
  Shield: ShieldVisual,
  Compass: CompassVisual,
  Sparkles: SparklesVisual,
  Clock: ClockVisual,
};

interface FeatureVisualProps {
  iconName: Feature['iconName'];
}

/**
 * Composant wrapper qui rend le visuel animé correspondant à l'iconName
 * Utilisé en arrière-plan des cartes ExperienceSection
 */
const FeatureVisual = ({ iconName }: FeatureVisualProps) => {
  const Visual = visualMap[iconName];
  return <Visual />;
};

export default FeatureVisual;
