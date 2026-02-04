import { Clock, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Clock className="w-5 h-5 text-background" />
              </div>
              <span className="font-serif text-xl font-semibold">
                TimeTravel <span className="text-gradient-gold">Agency</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Pionniers du voyage temporel depuis 2035. Nous vous offrons des
              expériences uniques à travers les âges, dans le luxe et la
              sécurité absolue.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#destinations"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  L'Expérience
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Tarifs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  FAQ Temporelle
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Paris, France — 2050</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-gold" />
                <span>voyage@timetravel.agency</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-gold" />
                <span>+33 1 XX XX XX XX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2050 TimeTravel Agency. Tous droits réservés à travers le temps.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              Mentions Légales
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              Politique Temporelle
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
