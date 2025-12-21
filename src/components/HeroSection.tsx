import { motion } from 'framer-motion';
import { ChevronDown, Download, Eye, Shield, Code, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const handleScroll = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingIcons = [
    { Icon: Shield, delay: 0, x: '10%', y: '20%' },
    { Icon: Code, delay: 0.5, x: '85%', y: '30%' },
    { Icon: Lock, delay: 1, x: '15%', y: '70%' },
  ];

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: delay + 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay }}
          >
            <Icon className="w-12 h-12 text-primary/30" />
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">
              Système en ligne • Prêt à collaborer
            </span>
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block text-foreground mb-2">SIAKOU Komi Stanislas</span>
            <span className="block gradient-text text-glow-blue">
              Étudiant — Administration Réseaux & Cybersécurité
            </span>
          </motion.h1>

          {/* Subtitle with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-lg sm:text-xl text-muted-foreground font-mono">
              <span className="text-primary">&gt;</span> Administration Réseau{' '}
              <span className="text-secondary">•</span> Développement{' '}
              <span className="text-secondary">•</span> Sécurité des SI
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Étudiant en fin de parcours à IAI‑TOGO, je me spécialise en administration
            réseaux, sécurité des systèmes et administration système. Je suis titulaire
            de la certification CCNA 2 et j'ai participé à des projets académiques
            et des stages pratiques orientés surveillance réseau, sécurité et
            automatisation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => handleScroll('#projets')}
              className="group w-full sm:w-auto"
            >
              <Eye className="w-5 h-5 transition-transform group-hover:scale-110" />
              Explorer les Projets
            </Button>
            <Button
              variant="heroSecondary"
              size="xl"
              onClick={() => handleScroll('#apropos')}
              className="group w-full sm:w-auto"
            >
              <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              Voir le CV
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: 'IAI‑TOGO', label: 'Formation' },
              { value: 'CCNA 2', label: 'Certification' },
              { value: 'Stages & Projets', label: 'Expérience pratique' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1, type: 'spring' }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-muted-foreground font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => handleScroll('#apropos')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
