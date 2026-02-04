import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              <h4 className="font-semibold text-background">Guide Temporel</h4>
              <p className="text-xs text-background/70">En ligne</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-background/70 hover:text-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 h-64 overflow-y-auto">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-gold" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-none p-4 max-w-[80%]">
              <p className="text-foreground text-sm leading-relaxed">
                Bonjour, je suis votre guide temporel. Quelle époque
                souhaitez-vous découvrir ?
              </p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Écrivez votre message..."
              className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
            <button className="w-10 h-10 rounded-xl bg-gold hover:bg-gold-dark flex items-center justify-center transition-colors">
              <Send className="w-4 h-4 text-background" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-bubble ${isOpen ? 'rotate-0' : ''}`}
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
