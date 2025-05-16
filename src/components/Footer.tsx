
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-accent py-8 text-accent-foreground mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">EventsManager</h3>
            <p className="text-sm">
              Votre plateforme de gestion d'événements professionnels et personnels.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm hover:text-primary transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm hover:text-primary transition-colors">
                  Politique de cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-sm space-y-1">
              <p>123 Rue de l'Événement</p>
              <p>75000 Paris, France</p>
              <p className="mt-2">
                <a href="mailto:contact@eventsmanager.com" className="hover:text-primary transition-colors">
                  contact@eventsmanager.com
                </a>
              </p>
              <p>
                <a href="tel:+33123456789" className="hover:text-primary transition-colors">
                  +33 1 23 45 67 89
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EventsManager. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
