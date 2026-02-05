import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { getDestinationLabel } from '@/constants';

interface BookingFormData {
  name: string;
  destination: string;
  email: string;
}

interface BookingFormErrors {
  name: boolean;
  destination: boolean;
  email: boolean;
}

const initialFormData: BookingFormData = {
  name: '',
  destination: '',
  email: '',
};

const initialErrors: BookingFormErrors = {
  name: false,
  destination: false,
  email: false,
};

interface UseBookingReturn {
  /** Données du formulaire */
  formData: BookingFormData;
  /** Erreurs de validation */
  errors: BookingFormErrors;
  /** Met à jour un champ du formulaire */
  updateField: (field: keyof BookingFormData, value: string) => void;
  /** Valide et soumet le formulaire */
  handleSubmit: (onSuccess: () => void) => void;
  /** Réinitialise le formulaire et ferme la modale */
  handleClose: (onClose: () => void) => void;
}

/**
 * Hook pour gérer la logique du formulaire de réservation
 * Gère la validation, soumission, confettis et toasts
 */
export const useBooking = (): UseBookingReturn => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<BookingFormErrors>(initialErrors);

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Gold confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f5b942', '#d4a033', '#ffd700', '#ffffff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f5b942', '#d4a033', '#ffd700', '#ffffff'],
      });
    }, 250);
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: BookingFormErrors = {
      name: formData.name.trim() === '',
      destination: formData.destination === '',
      email: formData.email.trim() === '' || !formData.email.includes('@'),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }, [formData]);

  const updateField = useCallback((field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  }, [errors]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  }, []);

  const handleSubmit = useCallback((onSuccess: () => void) => {
    if (validateForm()) {
      const destinationLabel = getDestinationLabel(formData.destination);
      
      onSuccess();
      resetForm();

      // Show toast
      toast.success('Voyage confirmé ! Préparez vos valises.', {
        description: `Destination : ${destinationLabel}`,
        duration: 5000,
        style: {
          background: 'hsl(222 40% 8%)',
          border: '1px solid hsl(38 85% 55% / 0.3)',
          color: 'hsl(45 20% 95%)',
        },
      });

      // Trigger confetti
      setTimeout(triggerConfetti, 100);
    }
  }, [validateForm, formData.destination, resetForm, triggerConfetti]);

  const handleClose = useCallback((onClose: () => void) => {
    resetForm();
    onClose();
  }, [resetForm]);

  return {
    formData,
    errors,
    updateField,
    handleSubmit,
    handleClose,
  };
};
