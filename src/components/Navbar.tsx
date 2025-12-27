import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  Menu, X, Shield, Terminal, 
  Home, User, Brain, Briefcase, 
  Award, Mail, Sparkles,
  Sun,
  Moon,
  ChevronDown,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#accueil', label: 'Accueil', icon: Home },
  { href: '#apropos', label: 'À Propos', icon: User },
  { href: '#competences', label: 'Compétences', icon: Brain },
  { href: '#projets', label: 'Projets', icon: Briefcase },
  { href: '#certifications', label: 'Certifications', icon: Award },
  { href: '#contact', label: 'Contact', icon: Mail },
];

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effet de suivi de souris pour les effets lumineux
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Gestion du scroll et de la section active
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const offset = 80; // Compensation pour la navbar fixe
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Effet de lumière qui suit la souris */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`,
        }}
      />

      {/* Navbar principale */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2 
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled 
            ? "glass-card border-b border-white/10 backdrop-blur-xl bg-background/90 shadow-2xl shadow-primary/5"
            : "bg-transparent"
        )}
      >
        {/* Effet de bordure animée */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 0.98, 0.3, 1] }}
        />

        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo avec effet premium */}
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => handleNavClick('#accueil')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000" />
                <motion.div
                  className="relative p-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: [0, 0, 1, 1] }}
                >
                  <Shield className="w-7 h-7 text-primary" />
                </motion.div>
                
                {/* Particules autour du logo */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.cos(i * 120) * 20,
                      y: Math.sin(i * 120) * 20
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.3 
                    }}
                  />
                ))}
              </div>
              
              <div className="flex flex-col">
                <motion.span 
                  className="font-bold text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  SIAKOU
                </motion.span>
                <span className="text-xs text-muted-foreground font-mono">
                  Ingenieur informatique
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation - Enhanced */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace('#', '');
                
                return (
                  <motion.div
                    key={item.href}
                    className="relative"
                    whileHover={{ y: -2 }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2.5 font-medium rounded-lg transition-all duration-300",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                      
                      {isActive && (
                        <>
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                          <motion.div
                            className="absolute -bottom-1 left-1/2 w-1/3 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                            layoutId="activeNavLine"
                          />
                        </>
                      )}
                    </motion.a>
                    
                    {/* Effet de halo au hover */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg blur-md opacity-0 group-hover:opacity-100"
                        initial={false}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Actions droite - Enhanced */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Sélecteur de langue */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>{selectedLanguage.flag}</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    isLanguageOpen && "rotate-180"
                  )} />
                </button>
                
                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full mt-2 right-0 bg-background/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl shadow-black/50 overflow-hidden min-w-[140px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLanguageOpen(false);
                          }}
                          className={cn(
                            "flex items-center gap-3 w-full px-4 py-3 text-sm transition-all hover:bg-white/5",
                            selectedLanguage.code === lang.code && "bg-primary/10 text-primary"
                          )}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Bouton thème */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-400" />
                )}
              </motion.button>

              {/* Bouton Contact Premium */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => handleNavClick('#contact')}
                  className="group relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
                >
                  {/* Effet de brillance */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                  <span className="font-semibold">Contactez-moi</span>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
              
              {/* Indicateur de menu ouvert */}
              {!isOpen && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation - Enhanced */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-6 space-y-2 mt-2 border-t border-white/10 bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.replace('#', '');
                    
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "relative flex items-center gap-3 px-4 py-4 font-medium rounded-xl transition-all",
                          isActive
                            ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                        
                        {isActive && (
                          <motion.div
                            className="absolute right-4"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: [0, 0, 1, 1] }}
                          >
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          </motion.div>
                        )}
                      </motion.a>
                    );
                  })}
                  
                  {/* Actions mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.05 + 0.1 }}
                    className="pt-4 border-t border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {/* Thème mobile */}
                      <button
                        onClick={toggleTheme}
                        className="flex-1 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                      >
                        {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
                      </button>
                      
                      {/* Contact mobile */}
                      <Button
                        onClick={() => handleNavClick('#contact')}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Indicateur de progression de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-primary via-secondary to-accent origin-left"
        style={{ scaleX: scrolled ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0 }}
      />
    </>
  );
};

export default Navbar;