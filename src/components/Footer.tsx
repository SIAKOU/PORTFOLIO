import { motion } from 'framer-motion';
import { Shield, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-mono text-sm gradient-text">PORTFOLIO SIAKOU</span>
            </motion.div>
            <p className="text-xs text-muted-foreground text-center md:text-left italic">
              © {currentYear} SIAKOU Komi Stanislas. Tous droits réservés.
            </p>
          </div>

          {/* Center - Security Badge */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono">Connexion sécurisée • TLS 1.3</span>
          </div>

          {/* Made with */}
          
        </div>

        {/* Bottom Links */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Mentions Légales
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Politique de Confidentialité
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Conditions d'Utilisation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
