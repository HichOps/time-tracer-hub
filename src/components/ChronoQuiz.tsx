import { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ChronoQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

type Answer = 'A' | 'B' | 'C' | null;

interface Destination {
  id: string;
  name: string;
  period: string;
  image: string;
  description: string;
}

const destinations: Record<string, Destination> = {
  paris: {
    id: 'paris-1889',
    name: 'Paris 1889',
    period: "L'Exposition Universelle",
    image: 'https://i.imgur.com/XSMPDtu.jpeg',
    description: "Vivez l'effervescence de la Belle Époque et admirez la Tour Eiffel dans sa splendeur originelle.",
  },
  cretace: {
    id: 'cretace',
    name: 'Le Crétacé',
    period: '-66 millions d\'années',
    image: 'https://i.imgur.com/icPa5lp.jpeg',
    description: 'Partez en safari préhistorique et observez les géants qui dominaient la Terre.',
  },
  florence: {
    id: 'florence-1504',
    name: 'Florence 1504',
    period: 'La Renaissance',
    image: 'https://i.imgur.com/qyQcyGq.jpeg',
    description: 'Plongez dans le cœur artistique de la Renaissance aux côtés des plus grands maîtres.',
  },
};

const questions = [
  {
    id: 1,
    question: 'Quelle est votre envie du moment ?',
    options: [
      { value: 'A' as const, label: 'Découverte & Innovation', icon: '💡' },
      { value: 'B' as const, label: 'Nature Sauvage & Frissons', icon: '🦕' },
      { value: 'C' as const, label: 'Art & Culture', icon: '🎨' },
    ],
  },
  {
    id: 2,
    question: 'Votre ambiance idéale ?',
    options: [
      { value: 'A' as const, label: 'Foule festive et électrique', icon: '✨' },
      { value: 'B' as const, label: 'Solitude et grands espaces', icon: '🌅' },
      { value: 'C' as const, label: 'Raffinement et architecture', icon: '🏛️' },
    ],
  },
];

const ChronoQuiz = ({ isOpen, onClose }: ChronoQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([null, null]);
  const [result, setResult] = useState<Destination | null>(null);

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Calculate result
      setTimeout(() => calculateResult(newAnswers), 300);
    }
  };

  const calculateResult = (finalAnswers: Answer[]) => {
    const counts = { A: 0, B: 0, C: 0 };
    finalAnswers.forEach((answer) => {
      if (answer) counts[answer]++;
    });

    let winner: 'A' | 'B' | 'C' = 'A';
    if (counts.B > counts.A && counts.B >= counts.C) winner = 'B';
    else if (counts.C > counts.A && counts.C > counts.B) winner = 'C';

    const destinationMap = { A: 'paris', B: 'cretace', C: 'florence' };
    setResult(destinations[destinationMap[winner]]);
  };

  const handleReserve = () => {
    if (!result) return;
    
    onClose();
    resetQuiz();
    
    // Scroll to the destination card
    setTimeout(() => {
      const element = document.getElementById(result.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a highlight effect
        element.classList.add('ring-2', 'ring-gold', 'ring-offset-2', 'ring-offset-background');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-gold', 'ring-offset-2', 'ring-offset-background');
        }, 2000);
      }
    }, 300);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([null, null]);
    setResult(null);
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
                  {result ? 'Votre destination idéale' : `Question ${currentStep + 1} sur ${questions.length}`}
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
                {questions[currentStep].question}
              </h3>
              <div className="space-y-3">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
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
                {questions.map((_, index) => (
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
                  alt={result.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-gold text-sm font-medium">{result.period}</p>
                  <h3 className="font-serif text-2xl text-foreground">{result.name}</h3>
                </div>
              </div>

              <p className="text-muted-foreground text-center leading-relaxed">
                {result.description}
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
