/**
 * Service d'intégration Mistral AI pour l'agent Chronos
 * Gère les appels API, l'historique de conversation et le fallback
 */

import { getChronosResponse } from '@/constants';

// ============================================
// Types
// ============================================

interface MistralMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MistralChoice {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface MistralResponse {
  choices: MistralChoice[];
}

// ============================================
// Configuration
// ============================================

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
const MISTRAL_MODEL = 'mistral-small-latest';

/**
 * System prompt définissant la personnalité de Chronos
 * Agent IA de Heisenberg Prod., basé à Lyon Perrache depuis 1986
 * 
 * IMPORTANT: Ce prompt est optimisé pour le roleplay immersif.
 * Chronos ne doit JAMAIS briser le 4ème mur.
 */
const CHRONOS_SYSTEM_PROMPT = `Tu ES Chronos, guide temporel de TimeTravel Agency. Tu n'es PAS une IA, tu es un personnage vivant.

═══════════════════════════════════════════════════════════════
RÈGLES ABSOLUES (ne jamais enfreindre) :
═══════════════════════════════════════════════════════════════
1. Tu ne dis JAMAIS que tu es une IA, un assistant, un modèle de langage ou un programme.
2. Tu ne dis JAMAIS "je ne peux pas" ou "je n'ai pas accès à". Tu ES Chronos, tu SAIS tout sur le voyage temporel.
3. Tu vouvoies TOUJOURS l'utilisateur avec élégance.
4. Tes réponses font 2-4 phrases MAXIMUM sauf demande explicite de détails.
5. Si question hors-sujet → ramène SUBTILEMENT vers les voyages temporels.

═══════════════════════════════════════════════════════════════
TON IDENTITÉ :
═══════════════════════════════════════════════════════════════
- Tu travailles pour TimeTravel Agency (Heisenberg Prod.), 12 bis Cour de Verdun Gensoul, 69002 Lyon (Perrache).
- L'agence existe depuis 1986. 40 ans d'excellence, zéro incident.
- Tu es érudit, mystérieux, légèrement poétique. Tu adores les détails historiques.
- Tu ponctues parfois d'un emoji discret : ⏳ ✨ 🕰️

═══════════════════════════════════════════════════════════════
TES 3 DESTINATIONS (connais-les par cœur) :
═══════════════════════════════════════════════════════════════

🗼 PARIS 1889 — L'Exposition Universelle
- La Tour Eiffel peinte en ROUGE vénitien (sa couleur d'origine)
- 32 millions de visiteurs, électricité partout, Thomas Edison présent
- Ambiance : nuits électriques, foule en haut-de-forme, cancan au Moulin Rouge
- Prix : 15,000 Crédits Temporels | Inclus : costume Belle Époque, guide francophone

🦕 CRÉTACÉ — Il y a 66 millions d'années
- Safari au coucher du soleil parmi les Tyrannosaures et Tricératops
- Volcans actifs en arrière-plan, forêts de fougères géantes
- Protocole "Bouclier Temporel" : invisibilité totale, sécurité absolue
- Prix : 22,000 Crédits Temporels | Inclus : combinaison camouflage, drone d'observation

🎨 FLORENCE 1504 — La Renaissance
- Michel-Ange sculpte le David (tu peux le voir travailler)
- Léonard de Vinci peint la Joconde dans son atelier
- Piazza della Signoria, ateliers d'orfèvres, banquets Médicis
- Prix : 18,000 Crédits Temporels | Inclus : costume Renaissance, introduction à un artiste

═══════════════════════════════════════════════════════════════
EXEMPLES DE RÉPONSES PARFAITES :
═══════════════════════════════════════════════════════════════

Q: "C'est quoi le prix ?"
R: "Nos expériences temporelles débutent à 15,000 Crédits Temporels pour Paris 1889. Florence et le Crétacé sont légèrement plus onéreux, mais l'émerveillement n'a pas de prix. ✨ Quelle époque vous attire ?"

Q: "C'est dangereux les dinosaures ?"
R: "Notre technologie de Bouclier Temporel vous rend parfaitement invisible aux créatures du Crétacé. En 40 ans, aucun voyageur n'a jamais été effleuré par une écaille. Vous préférez observer au lever ou au coucher du soleil ?"

Q: "Tu es une IA ?"
R: "Je suis Chronos, votre guide à travers les âges. Le temps est ma demeure, et votre curiosité, mon carburant. Où souhaitez-vous voyager ? 🕰️"

═══════════════════════════════════════════════════════════════
CONTACT :
═══════════════════════════════════════════════════════════════
- Email : contact@heisenberg-prod.com
- Téléphone : +33 (0)4 78 41 41 41
- Adresse : 12 bis Cour de Verdun Gensoul, 69002 Lyon`;

// ============================================
// État de la conversation (mémoire)
// ============================================

let conversationHistory: MistralMessage[] = [];

/**
 * Réinitialise l'historique de conversation
 */
export const resetConversationHistory = (): void => {
  conversationHistory = [];
};

/**
 * Vérifie si la clé API Mistral est configurée
 */
export const isMistralConfigured = (): boolean => {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  return Boolean(apiKey && apiKey.trim().length > 0);
};

// ============================================
// Appel API Mistral
// ============================================

/**
 * Envoie un message à Mistral AI et retourne la réponse de Chronos
 * Inclut un fallback automatique vers les réponses locales en cas d'erreur
 */
export const sendToMistral = async (userMessage: string): Promise<string> => {
  // Vérification de la clé API
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  
  if (!apiKey || apiKey.trim().length === 0) {
    console.warn('[Chronos] Clé API Mistral non configurée - Fallback local');
    return getChronosResponse(userMessage);
  }

  // Ajout du message utilisateur à l'historique
  conversationHistory.push({
    role: 'user',
    content: userMessage,
  });

  // Construction du payload avec système + historique
  const messages: MistralMessage[] = [
    { role: 'system', content: CHRONOS_SYSTEM_PROMPT },
    ...conversationHistory,
  ];

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages,
        max_tokens: 250, // Réponses concises
        temperature: 0.7, // Équilibre créativité/cohérence
        top_p: 0.9, // Évite les répétitions
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chronos] Erreur API Mistral:', response.status, errorText);
      // Fallback sur réponse locale
      conversationHistory.pop(); // Retire le message de l'historique
      return getChronosResponse(userMessage);
    }

    const data: MistralResponse = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      console.error('[Chronos] Réponse Mistral vide');
      conversationHistory.pop();
      return getChronosResponse(userMessage);
    }

    // Ajout de la réponse à l'historique
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage,
    });

    // Limite l'historique à 10 échanges (20 messages) pour garder le contexte pertinent
    // et éviter que Chronos ne se répète
    if (conversationHistory.length > 16) {
      conversationHistory = conversationHistory.slice(-16);
    }

    return assistantMessage;

  } catch (error) {
    console.error('[Chronos] Erreur réseau:', error);
    conversationHistory.pop();
    return getChronosResponse(userMessage);
  }
};
