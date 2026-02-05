import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuiz } from '@/hooks/useQuiz';
import { useAudioContext } from '@/contexts/AudioContext';
import { QUIZ_QUESTIONS } from '@/constants';

interface ChronoQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChronoQuiz = ({ isOpen, onClose }: ChronoQuizProps) => {
  const {
    currentStep,
    answers,
    result,
    totalQuestions,
    currentQuestion,
    handleAnswer,
    resetQuiz,
    scrollToResult,
  } = useQuiz();
  const { playSound } = useAudioContext();

  const handleAnswerWithSound = (value: 'A' | 'B' | 'C') => {
    playSound('click');
    handleAnswer(value);
  };

  const handleReserve = () => {
    playSound('success');
    onClose();
    resetQuiz();
    setTimeout(scrollToResult, 300);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetQuiz, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gold/20 to-gold-dark/20 p-6 border-b border-border">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <DialogTitle className="font-serif text-xl text-foreground">
                  Définissons votre profil temporel
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {result ? 'Votre destination idéale' : `Question ${currentStep + 1} sur ${totalQuestions}`}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-6">
          {!result ? (
            // Questions
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground text-center">
                {currentQuestion.question}
              </h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerWithSound(option.value)}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 text-left flex items-center gap-4 group hover:border-gold hover:bg-gold/5 ${
                      answers[currentStep] === option.value
                        ? 'border-gold bg-gold/10'
                        : 'border-border bg-secondary/50'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-foreground font-medium group-hover:text-gold transition-colors">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center gap-2 pt-4">
                {QUIZ_QUESTIONS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index <= currentStep ? 'bg-gold' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Result
            <div className="space-y-6 animate-fade-in">
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <img
                  src={result.image}
                  alt={result.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-gold text-sm font-medium">{result.period}</p>
                  <h3 className="font-serif text-2xl text-foreground">{result.title}</h3>
                </div>
              </div>

              <p className="text-muted-foreground text-center leading-relaxed">
                {result.shortDescription}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={resetQuiz}
                  className="flex-1 px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refaire le quiz
                </button>
                <button
                  onClick={handleReserve}
                  className="flex-1 btn-gold py-3 flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Réserver cette époque
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChronoQuiz;
