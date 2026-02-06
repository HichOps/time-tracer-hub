import { MessageCircle, X, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatbot } from '@/hooks/useChatbot';

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

/**
 * Formate le contenu avec du markdown basique (bold)
 */
const formatMessageContent = (content: string) => {
  return content.split('**').map((part, index) =>
    index % 2 === 1 ? <strong key={index} className="font-semibold">{part}</strong> : part
  );
};

const ChatWidget = () => {
  const {
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
  } = useChatbot();

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
              <h4 className="font-semibold text-background flex items-center gap-2">
                Chronos
                {isAIConnected && (
                  <span className="text-[10px] font-normal bg-background/20 px-1.5 py-0.5 rounded-full">
                    IA
                  </span>
                )}
              </h4>
              <p className="text-xs text-background/70">
                Guide Temporel • {isAIConnected ? 'Mistral AI' : 'En ligne'}
              </p>
            </div>
          </div>
          <button
            onClick={closeChat}
            className="text-background/70 hover:text-background transition-colors p-1 rounded-full hover:bg-background/10"
            aria-label="Fermer le chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-80">
          <div className="p-4 space-y-4">
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
            {/* Anchor element for smooth auto-scroll with bottom margin */}
            <div ref={scrollRef} className="h-2" aria-hidden="true" />
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
              onClick={sendMessage}
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
        onClick={toggleChat}
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
