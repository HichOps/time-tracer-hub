import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'chronos';
  timestamp: Date;
}

const WELCOME_MESSAGE = "Bonjour, je suis Chronos, votre guide temporel. Quelle époque souhaitez-vous découvrir aujourd'hui ?";

const getChronosResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Prix / Tarif / Coût
  if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût') || lowerMessage.includes('combien')) {
    return "Excellente question ! Nos voyages temporels débutent à partir de **15,000 Crédits Temporels**, tout inclus. Ce forfait comprend les costumes d'époque authentiques, notre protocole de sécurité avancé, ainsi qu'un hébergement de luxe adapté à chaque destination. Souhaitez-vous en savoir plus sur une destination en particulier ?";
  }

  // Danger / Sécurité / Risque
  if (lowerMessage.includes('danger') || lowerMessage.includes('sécurité') || lowerMessage.includes('risque') || lowerMessage.includes('sûr')) {
    return "Votre sécurité est notre priorité absolue. Chaque voyageur est équipé de notre technologie exclusive de **Bouclier Temporel**, une barrière invisible qui vous protège de tout danger physique. De plus, nos guides experts vous accompagnent à chaque instant. En 50 ans d'activité, nous n'avons jamais eu le moindre incident. Vous pouvez voyager l'esprit serein.";
  }

  // Conseil / Où aller / Recommandation
  if (lowerMessage.includes('conseil') || lowerMessage.includes('où aller') || lowerMessage.includes('recommand') || lowerMessage.includes('suggestion') || lowerMessage.includes('choisir')) {
    return "Avec plaisir ! Permettez-moi de vous guider. Dites-moi, êtes-vous plutôt attiré par :\n\n🎨 **L'Art et la Culture** → Je vous recommande Florence 1504\n🦕 **La Nature Sauvage** → Le Crétacé vous émerveillera\n💡 **L'Innovation et la Modernité** → Paris 1889 est fait pour vous\n\nQuelle sensibilité vous parle le plus ?";
  }

  // Paris 1889
  if (lowerMessage.includes('paris') || lowerMessage.includes('1889') || lowerMessage.includes('tour eiffel') || lowerMessage.includes('exposition')) {
    return "Ah, Paris 1889 ! Un choix magnifique. Saviez-vous que la Tour Eiffel était initialement peinte en **rouge vénitien** ? À l'époque, beaucoup la considéraient comme une « monstruosité de fer », mais elle est devenue le symbole de l'innovation humaine. Vous pourrez assister à l'Exposition Universelle, croiser Gustave Eiffel lui-même, et danser dans les premiers cabarets de Montmartre. Une époque électrisante !";
  }

  // Florence 1504
  if (lowerMessage.includes('florence') || lowerMessage.includes('1504') || lowerMessage.includes('renaissance') || lowerMessage.includes('michel-ange') || lowerMessage.includes('michelangelo')) {
    return "Florence 1504, le cœur battant de la Renaissance ! Vous arriverez juste à temps pour voir Michel-Ange achever son **David**, ce chef-d'œuvre de 5 mètres taillé dans un bloc de marbre que tous pensaient inutilisable. Vous pourrez flâner sur la Piazza della Signoria, négocier avec les marchands de soie, et peut-être croiser un jeune Raphaël dans les ateliers. La lumière toscane y est incomparable.";
  }

  // Crétacé / Dinosaures
  if (lowerMessage.includes('crétacé') || lowerMessage.includes('dinosaure') || lowerMessage.includes('préhistoire') || lowerMessage.includes('jurassique') || lowerMessage.includes('safari')) {
    return "Le Crétacé, il y a 66 millions d'années... Notre destination la plus spectaculaire ! Imaginez : des forêts de fougères géantes, des volcans fumants à l'horizon, et des créatures colossales comme le **Tyrannosaurus Rex** et le Tricératops. Notre safari au crépuscule vous permettra d'observer ces géants depuis notre plateforme sécurisée. C'est un spectacle que les mots ne peuvent décrire.";
  }

  // Salutations
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || lowerMessage.includes('bonsoir')) {
    return "Bienvenue chez TimeTravel Agency ! Je suis ravi de vous accueillir. Puis-je vous aider à planifier votre prochaine aventure à travers le temps ? Nous proposons actuellement trois destinations extraordinaires : Paris 1889, Florence 1504 et le Crétacé.";
  }

  // Remerciements
  if (lowerMessage.includes('merci') || lowerMessage.includes('thanks')) {
    return "Je vous en prie, c'est un plaisir de vous accompagner dans cette aventure temporelle ! N'hésitez pas si vous avez d'autres questions. Je suis à votre entière disposition.";
  }

  // Réponse par défaut
  return "C'est une excellente question. En tant que votre guide temporel, je peux vous aider à choisir votre destination idéale, vous informer sur nos protocoles de sécurité, ou vous présenter nos tarifs. Que souhaitez-vous explorer ?";
};

const TypingIndicator = () => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
      <MessageCircle className="w-4 h-4 text-gold" />
    </div>
    <div className="bg-secondary rounded-2xl rounded-tl-none px-4 py-3">
      <div className="flex items-center gap-1">
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: WELCOME_MESSAGE,
      sender: 'chronos',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay (1-2 seconds)
    const typingDelay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      const response = getChronosResponse(userMessage.content);
      const chronosMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'chronos',
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, chronosMessage]);
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting for bold text
    return content.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="font-semibold">{part}</strong> : part
    );
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 md:w-96 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gold to-gold-dark p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-background" />
            </div>
            <div>
              <h4 className="font-semibold text-background">Chronos</h4>
              <p className="text-xs text-background/70">Guide Temporel • En ligne</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-background/70 hover:text-background transition-colors p-1 rounded-full hover:bg-background/10"
            aria-label="Fermer le chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-80">
          <div ref={scrollRef} className="p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {message.sender === 'chronos' && (
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-gold" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-gold to-gold-dark text-background rounded-tr-none'
                      : 'bg-secondary text-foreground rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {formatMessageContent(message.content)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-gold hover:bg-gold-dark flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4 text-background" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-bubble ${isOpen ? 'rotate-0' : ''}`}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-background" />
        ) : (
          <MessageCircle className="w-6 h-6 text-background" />
        )}
      </button>
    </>
  );
};

export default ChatWidget;
