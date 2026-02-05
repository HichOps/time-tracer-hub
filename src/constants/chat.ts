import type { ChatResponsePattern } from '@/types';

// ============================================
// Chatbot Chronos - Logique de réponses
// ============================================

/**
 * Message d'accueil du chatbot
 */
export const CHAT_WELCOME_MESSAGE =
  "Bonjour, je suis Chronos, votre guide temporel. Quelle époque souhaitez-vous découvrir aujourd'hui ?";

/**
 * Réponse par défaut si aucun pattern ne correspond
 */
export const CHAT_DEFAULT_RESPONSE =
  "C'est une excellente question. En tant que votre guide temporel, je peux vous aider à choisir votre destination idéale, vous informer sur nos protocoles de sécurité, ou vous présenter nos tarifs. Que souhaitez-vous explorer ?";

/**
 * Patterns de réponses du chatbot
 * L'ordre est important : le premier pattern qui match sera utilisé
 */
export const CHAT_RESPONSE_PATTERNS: ChatResponsePattern[] = [
  // Prix / Tarif / Coût
  {
    keywords: ['prix', 'tarif', 'coût', 'combien'],
    response:
      "Excellente question ! Nos voyages temporels débutent à partir de **15,000 Crédits Temporels**, tout inclus. Ce forfait comprend les costumes d'époque authentiques, notre protocole de sécurité avancé, ainsi qu'un hébergement de luxe adapté à chaque destination. Souhaitez-vous en savoir plus sur une destination en particulier ?",
  },
  // Danger / Sécurité / Risque
  {
    keywords: ['danger', 'sécurité', 'risque', 'sûr'],
    response:
      "Votre sécurité est notre priorité absolue. Chaque voyageur est équipé de notre technologie exclusive de **Bouclier Temporel**, une barrière invisible qui vous protège de tout danger physique. De plus, nos guides experts vous accompagnent à chaque instant. En 50 ans d'activité, nous n'avons jamais eu le moindre incident. Vous pouvez voyager l'esprit serein.",
  },
  // Conseil / Où aller / Recommandation
  {
    keywords: ['conseil', 'où aller', 'recommand', 'suggestion', 'choisir'],
    response:
      "Avec plaisir ! Permettez-moi de vous guider. Dites-moi, êtes-vous plutôt attiré par :\n\n🎨 **L'Art et la Culture** → Je vous recommande Florence 1504\n🦕 **La Nature Sauvage** → Le Crétacé vous émerveillera\n💡 **L'Innovation et la Modernité** → Paris 1889 est fait pour vous\n\nQuelle sensibilité vous parle le plus ?",
  },
  // Paris 1889
  {
    keywords: ['paris', '1889', 'tour eiffel', 'exposition'],
    response:
      "Ah, Paris 1889 ! Un choix magnifique. Saviez-vous que la Tour Eiffel était initialement peinte en **rouge vénitien** ? À l'époque, beaucoup la considéraient comme une « monstruosité de fer », mais elle est devenue le symbole de l'innovation humaine. Vous pourrez assister à l'Exposition Universelle, croiser Gustave Eiffel lui-même, et danser dans les premiers cabarets de Montmartre. Une époque électrisante !",
  },
  // Florence 1504
  {
    keywords: ['florence', '1504', 'renaissance', 'michel-ange', 'michelangelo'],
    response:
      "Florence 1504, le cœur battant de la Renaissance ! Vous arriverez juste à temps pour voir Michel-Ange achever son **David**, ce chef-d'œuvre de 5 mètres taillé dans un bloc de marbre que tous pensaient inutilisable. Vous pourrez flâner sur la Piazza della Signoria, négocier avec les marchands de soie, et peut-être croiser un jeune Raphaël dans les ateliers. La lumière toscane y est incomparable.",
  },
  // Crétacé / Dinosaures
  {
    keywords: ['crétacé', 'dinosaure', 'préhistoire', 'jurassique', 'safari'],
    response:
      "Le Crétacé, il y a 66 millions d'années... Notre destination la plus spectaculaire ! Imaginez : des forêts de fougères géantes, des volcans fumants à l'horizon, et des créatures colossales comme le **Tyrannosaurus Rex** et le Tricératops. Notre safari au crépuscule vous permettra d'observer ces géants depuis notre plateforme sécurisée. C'est un spectacle que les mots ne peuvent décrire.",
  },
  // Salutations
  {
    keywords: ['bonjour', 'salut', 'hello', 'bonsoir'],
    response:
      'Bienvenue chez TimeTravel Agency ! Je suis ravi de vous accueillir. Puis-je vous aider à planifier votre prochaine aventure à travers le temps ? Nous proposons actuellement trois destinations extraordinaires : Paris 1889, Florence 1504 et le Crétacé.',
  },
  // Remerciements
  {
    keywords: ['merci', 'thanks'],
    response:
      "Je vous en prie, c'est un plaisir de vous accompagner dans cette aventure temporelle ! N'hésitez pas si vous avez d'autres questions. Je suis à votre entière disposition.",
  },
];

/**
 * Génère une réponse du chatbot en fonction du message utilisateur
 */
export const getChronosResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  for (const pattern of CHAT_RESPONSE_PATTERNS) {
    if (pattern.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return pattern.response;
    }
  }

  return CHAT_DEFAULT_RESPONSE;
};
