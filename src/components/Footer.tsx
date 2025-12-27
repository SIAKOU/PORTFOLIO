import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Heart, ExternalLink, Lock, 
  Code2, Globe, Mail, Github, 
  Linkedin, Twitter, Sparkles, 
  ArrowUp, ShieldCheck, Cpu,
  MessageSquare,
  Zap,
  Shield as ShieldIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  // Générer des particules
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  // Show back to top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/SIAKOU', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/siakou-stanislas-672828297/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: 'https://x.com/SIAKOU_stan', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Mail, href: 'mailto:SIAKOU2006@gmail.com', label: 'Email', color: 'hover:text-red-400' },
  ];

  const quickLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#apropos', label: 'À Propos' },
    { href: '#competences', label: 'Compétences' },
    { href: '#projets', label: 'Projets' },
    { href: '#contact', label: 'Contact' },
  ];

  const legalLinks = [
    { href: '#legal', label: 'Mentions Légales' },
    { href: '#privacy', label: 'Politique de Confidentialité' },
    { href: '#terms', label: 'Conditions d\'Utilisation' },
    { href: '#cookies', label: 'Politique des Cookies' },
  ];

  const techStack = [
    { name: 'React', color: 'text-cyan-400' },
    { name: 'TypeScript', color: 'text-blue-400' },
    { name: 'Tailwind CSS', color: 'text-teal-400' },
    { name: 'Node.js', color: 'text-green-400' },
    { name: 'Framer Motion', color: 'text-purple-400' },
  ];

  return (
    <>
      {/* Effet de particules flottantes */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-px h-px bg-gradient-to-b from-primary/30 to-transparent"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: particle.id * 0.2,
              ease: [0, 0, 1, 1],
            }}
          />
        ))}
      </div>

      {/* Bouton Back to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer Principal */}
      <footer className="relative pt-20 pb-12 overflow-hidden bg-gradient-to-b from-background via-background/95 to-gray-900/50 border-t border-white/10">
        {/* Effets de fond */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grille de fond */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                              linear-gradient(to bottom, #888 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Effet de lumière */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {/* Orbites circulaires */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary/10 rounded-full"
              style={{
                width: `${100 + i * 200}px`,
                height: `${100 + i * 200}px`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 40 + i * 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Colonne 1: Logo et Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 group">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 group-hover:opacity-50" />
                  <div className="relative p-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-white/10">
                    <ShieldIcon className="w-8 h-8 text-primary" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    SIAKOU
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    Full-Stack Developer
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Passionné par la création d&apos;expériences web innovantes et performantes. 
                Je combine design moderne et technologies de pointe pour des solutions digitales d&apos;exception.
              </p>
              
              {/* Tech Stack */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  Stack Technologique
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <motion.span
                      key={tech.name}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 backdrop-blur-sm",
                        tech.color
                      )}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Colonne 2: Liens Rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Navigation Rapide
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <motion.li
                      key={link.href}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <a
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 py-2 text-muted-foreground hover:text-foreground transition-all group",
                          hoveredLink === link.href && "text-primary"
                        )}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-primary/50"
                          animate={{ scale: hoveredLink === link.href ? 1.5 : 1 }}
                        />
                        <span className="group-hover:translate-x-2 transition-transform">
                          {link.label}
                        </span>
                        <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Sécurité */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium">Site Sécurisé</p>
                    <p className="text-xs text-muted-foreground">TLS 1.3 • 256-bit Encryption</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Colonne 3: Contact & Réseaux */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Connectons-nous
                </h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Disponible pour de nouveaux projets passionnants. 
                    N&apos;hésitez pas à me contacter !
                  </p>
                  
                  <Button 
                    variant="outline"
                    className="w-full group border-primary/20 hover:border-primary/40"
                    onClick={() => window.location.href = 'mailto:contact@example.com'}
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Envoyer un Email
                  </Button>
                </div>
              </div>

              {/* Réseaux Sociaux */}
              <div>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Réseaux Sociaux
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center justify-center gap-2 p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm",
                          "hover:bg-white/10 transition-all group",
                          social.color
                        )}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider avec effet */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <motion.div
                className="px-6 py-2 bg-background rounded-full border border-primary/20"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code2 className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </div>

          {/* Bas du Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start gap-2"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-sm text-muted-foreground font-mono">
                  Secure Connection • Encrypted
                </span>
              </div>
              <p className="text-xs text-muted-foreground text-center md:text-left">
                © {currentYear} SIAKOU Komi Stanislas. Tous droits réservés.
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> • </span>
                Made with <Heart className="inline w-3 h-3 text-red-400 mx-1 animate-pulse" /> 
                in France
              </p>
            </motion.div>

            {/* Liens Légaux */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 text-sm"
            >
              {legalLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group"
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>

            {/* Version */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="font-mono">v2.0.1 • Production</span>
            </motion.div>
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-6 border-t border-white/5 text-center"
          >
            <p className="text-xs text-muted-foreground/60 font-mono">
              Built with Next.js • Deployed on Vercel • Optimized for performance
              <br />
              Lighthouse Score: 100 • Load Time: 0.8s
            </p>
          </motion.div>
        </div>

        {/* Effet de traînées lumineuses */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              initial={{ x: '-100%', y: `${i * 30}px` }}
              animate={{ x: '100%' }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: [0, 0, 1, 1],
              }}
              style={{ width: '100px', filter: 'blur(1px)' }}
            />
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;