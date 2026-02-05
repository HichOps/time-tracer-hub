// ============================================
// Tailwind Style Constants - DRY Patterns
// ============================================

/**
 * Classes Tailwind réutilisables pour éviter la duplication
 * Utilisez ces constantes dans les composants au lieu de répéter les classes
 */

// ============================================
// Glassmorphism & Cards
// ============================================

/** Effet glass premium avec blur et bordure dorée subtile */
export const GLASS_CARD = 
  'bg-card/80 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl shadow-gold/10';

/** Card avec effet glass léger */
export const GLASS_CARD_LIGHT = 
  'bg-card border border-border hover:border-gold/30 rounded-2xl';

/** Modal glass effect */
export const GLASS_MODAL = 
  'bg-card border-gold/30 backdrop-blur-xl';

// ============================================
// Gradients
// ============================================

/** Gradient doré horizontal (pour headers, boutons) */
export const GRADIENT_GOLD = 
  'bg-gradient-to-r from-gold to-gold-dark';

/** Gradient doré subtil (pour backgrounds) */
export const GRADIENT_GOLD_SUBTLE = 
  'bg-gradient-to-r from-gold/20 to-gold-dark/20';

/** Gradient de fade vers le background */
export const GRADIENT_FADE_UP = 
  'bg-gradient-to-t from-background via-background/50 to-transparent';

// ============================================
// Typography
// ============================================

/** Titre principal hero (responsive) */
export const TITLE_HERO = 
  'font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight';

/** Titre de section (responsive) */
export const TITLE_SECTION = 
  'font-serif text-4xl md:text-5xl lg:text-6xl font-bold';

/** Titre de carte */
export const TITLE_CARD = 
  'font-serif text-3xl md:text-4xl font-bold';

/** Label de section (eyebrow text) */
export const LABEL_SECTION = 
  'text-gold font-medium tracking-widest uppercase text-sm';

/** Texte descriptif */
export const TEXT_MUTED = 
  'text-muted-foreground leading-relaxed';

// ============================================
// Buttons
// ============================================

/** Bouton primaire doré (utiliser avec btn-gold de CSS) */
export const BTN_GOLD_BASE = 
  'btn-gold';

/** Bouton outline doré */
export const BTN_OUTLINE_GOLD = 
  'px-8 py-4 rounded-lg border-2 border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300 font-semibold';

/** Bouton icon rond */
export const BTN_ICON_ROUND = 
  'w-10 h-10 rounded-full flex items-center justify-center transition-colors';

// ============================================
// Interactive States
// ============================================

/** Hover avec bordure dorée */
export const HOVER_GOLD_BORDER = 
  'hover:border-gold/30 transition-all duration-300';

/** Focus ring doré pour inputs */
export const FOCUS_GOLD = 
  'focus:border-gold/50 focus:ring-gold/20';

/** Animation de transition standard */
export const TRANSITION_BASE = 
  'transition-all duration-300';

/** Animation de transition lente */
export const TRANSITION_SLOW = 
  'transition-all duration-500';

// ============================================
// Layout
// ============================================

/** Container de section standard */
export const SECTION_CONTAINER = 
  'py-24 md:py-32';

/** Centrage flexbox */
export const FLEX_CENTER = 
  'flex items-center justify-center';

/** Icon container rond doré */
export const ICON_CONTAINER_GOLD = 
  'rounded-full bg-gold/20 flex items-center justify-center';

// ============================================
// Animations d'apparition
// ============================================

/** Classes pour animation fade-in sur scroll */
export const ANIMATE_VISIBLE = 'opacity-100 translate-y-0';
export const ANIMATE_HIDDEN = 'opacity-0 translate-y-8';

/**
 * Helper pour générer les classes d'animation conditionnelles
 */
export const getAnimationClasses = (isVisible: boolean, hiddenOffset = 8): string =>
  isVisible 
    ? 'opacity-100 translate-y-0' 
    : `opacity-0 translate-y-${hiddenOffset}`;
