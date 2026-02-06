import { useState, useRef, useEffect, useCallback } from 'react';
import { CHAT_WELCOME_MESSAGE } from '@/constants';
import { sendToMistral, resetConversationHistory, isMistralConfigured } from '@/services/mistralService';
import type { ChatMessage } from '@/types';

interface UseChatbotReturn {
  /** Indique si la fenêtre de chat est ouverte */
  isOpen: boolean;
  /** Bascule la visibilité du chat */
  toggleChat: () => void;
  /** Ferme la fenêtre de chat */
  closeChat: () => void;
  /** Liste des messages */
  messages: ChatMessage[];
  /** Valeur actuelle de l'input */
  inputValue: string;
  /** Met à jour la valeur de l'input */
  setInputValue: (value: string) => void;
  /** Indique si Chronos est en train d'écrire */
  isTyping: boolean;
  /** Indique si l'IA Mistral est connectée */
  isAIConnected: boolean;
  /** Envoie le message actuel */
  sendMessage: () => void;
  /** Gère les événements clavier (Entrée pour envoyer) */
  handleKeyPress: (e: React.KeyboardEvent) => void;
  /** Référence du conteneur de scroll */
  scrollRef: React.RefObject<HTMLDivElement>;
  /** Référence de l'input */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Force le focus sur l'input */
  focusInput: () => void;
}

/**
 * Hook pour gérer la logique du chatbot Chronos
 * Intégration Mistral AI avec fallback sur réponses locales
 * Gère les messages, l'état de frappe et l'auto-scroll
 */
export const useChatbot = (): UseChatbotReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: CHAT_WELCOME_MESSAGE,
      sender: 'chronos',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAIConnected] = useState(() => isMistralConfigured());
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll fluide sur nouveaux messages et pendant le streaming
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isTyping]);

  // Focus input à l'ouverture du chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Refocus input dès que l'IA a fini de répondre (isTyping repasse à false)
  useEffect(() => {
    if (!isTyping && isOpen && inputRef.current) {
      // Petit délai pour s'assurer que le champ n'est plus disabled
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [isTyping, isOpen]);

  // Fonction pour forcer le focus sur l'input
  const focusInput = useCallback(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  // Réinitialise l'historique Mistral à la fermeture du chat
  useEffect(() => {
    if (!isOpen) {
      resetConversationHistory();
    }
  }, [isOpen]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Appel asynchrone à Mistral (avec fallback intégré)
      const response = await sendToMistral(userMessage.content);
      
      const chronosMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'chronos',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, chronosMessage]);
    } catch (error) {
      console.error('[Chronos] Erreur inattendue:', error);
      // Message d'erreur élégant
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Pardonnez-moi, une perturbation temporelle m\'empêche de vous répondre. Veuillez réessayer dans quelques instants. ⏳',
        sender: 'chronos',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  return {
    isOpen,
    toggleChat,
    closeChat,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    isAIConnected,
    sendMessage,
    handleKeyPress,
    scrollRef,
    inputRef,
    focusInput,
  };
};
