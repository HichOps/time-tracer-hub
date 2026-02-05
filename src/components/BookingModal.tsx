import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBooking } from '@/hooks/useBooking';
import { getDestinationSelectOptions } from '@/constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const destinationOptions = getDestinationSelectOptions();

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { formData, errors, updateField, handleSubmit, handleClose } = useBooking();

  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose(onClose)}>
      <DialogContent className="sm:max-w-[500px] bg-card border-gold/30 backdrop-blur-xl p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="relative p-6 pb-4 border-b border-gold/20">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
          <DialogHeader className="relative">
            <DialogTitle className="font-serif text-2xl md:text-3xl text-foreground text-center">
              Réservez votre{' '}
              <span className="text-gradient-gold">voyage</span>
            </DialogTitle>
            <p className="text-muted-foreground text-center mt-2">
              Préparez-vous à vivre l'extraordinaire
            </p>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Nom du Voyageur
            </Label>
            <Input
              id="name"
              placeholder="Entrez votre nom complet"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className={`bg-background/50 border-border focus:border-gold/50 focus:ring-gold/20 transition-all duration-300 ${
                errors.name ? 'border-destructive ring-1 ring-destructive' : ''
              }`}
            />
            {errors.name && (
              <p className="text-destructive text-sm">Ce champ est requis</p>
            )}
          </div>

          {/* Destination Field */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-foreground font-medium">
              Destination Temporelle
            </Label>
            <Select
              value={formData.destination}
              onValueChange={(value) => updateField('destination', value)}
            >
              <SelectTrigger
                id="destination"
                className={`bg-background/50 border-border focus:border-gold/50 focus:ring-gold/20 transition-all duration-300 ${
                  errors.destination ? 'border-destructive ring-1 ring-destructive' : ''
                }`}
              >
                <SelectValue placeholder="Choisissez votre époque" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-[100]">
                {destinationOptions.map((dest) => (
                  <SelectItem
                    key={dest.value}
                    value={dest.value}
                    className="focus:bg-gold/10 focus:text-gold cursor-pointer"
                  >
                    {dest.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.destination && (
              <p className="text-destructive text-sm">Veuillez sélectionner une destination</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email de contact
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={`bg-background/50 border-border focus:border-gold/50 focus:ring-gold/20 transition-all duration-300 ${
                errors.email ? 'border-destructive ring-1 ring-destructive' : ''
              }`}
            />
            {errors.email && (
              <p className="text-destructive text-sm">Email invalide</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit(onClose)}
            className="btn-gold w-full text-lg py-4 mt-4"
          >
            <span className="relative z-10">Valider le départ</span>
          </button>

          {/* Footer note */}
          <p className="text-xs text-muted-foreground text-center">
            Confirmation envoyée par email sous 24h
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
