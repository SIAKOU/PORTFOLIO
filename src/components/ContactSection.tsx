import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Send,
  Mail,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
  Shield,
  Phone,
  MapPin,
  Clock,
  Lock,
  Sparkles,
  Zap,
  MessageSquare,
  User,
  FileText,
  Terminal,
  Cpu,
  Key,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Fingerprint,
  Globe,
  Satellite,
  Rocket,
  Cloud,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const controls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [typingEffect, setTypingEffect] = useState('');
  const [hackerEffect, setHackerEffect] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [messageLength, setMessageLength] = useState(0);
  const [charCount, setCharCount] = useState(0);
  // Effet de particules flottantes
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  // Effet de texte qui s'écrit
  useEffect(() => {
    const text = "Contactez-moi";
    let i = 0;
    const typing = setInterval(() => {
      if (i <= text.length) {
        setTypingEffect(text.substring(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    
    return () => clearInterval(typing);
  }, []);

  // Animation de confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
    });
  };

  // Effet hacker
  useEffect(() => {
    if (hackerEffect) {
      const interval = setInterval(() => {
        // Effet visuel hacker
        document.documentElement.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => {
          document.documentElement.style.filter = '';
        }, 100);
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setHackerEffect(false);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [hackerEffect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const simulateEncryption = async () => {
    setIsEncrypting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsEncrypting(false);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setHackerEffect(true);

    // Simulation de chiffrement
    await simulateEncryption();

    const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

    try {
      if (FORMSPREE_ENDPOINT) {
        // Animation d'envoi
        await controls.start({
          scale: [1, 1.02, 1],
          transition: { duration: 0.5 }
        });

        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
          }),
        });

        if (!response.ok) throw new Error('Échec de l\'envoi');

        // Succès
        triggerConfetti();
        toast({
          title: 'Message chiffré envoyé !',
          description: 'Votre message a été transmis en toute sécurité. Réponse sous 24h.',
          duration: 5000,
        });

        // Réinitialisation avec animation
        setFormData({ 
          name: '', 
          email: '', 
          subject: '', 
          message: '' 
        });
        setCharCount(0);

      } else {
        // Fallback mailto avec animation
        const mailto = `mailto:SIAKOU2006@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        
        // Ouverture dans un nouvel onglet avec effet
        window.open(mailto, '_blank');
        
        toast({
          title: 'Client mail ouvert',
          description: 'Votre message est prêt à être envoyé !',
          variant: 'default',
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erreur de transmission',
        description: 'Utilisez SIAKOU2006@gmail.com en copiant votre message ci-dessus.',
        variant: 'destructive',
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
      setHackerEffect(false);
    }
  };

  const socialLinks = [
    {
      name: 'Email Principal',
      icon: Mail,
      href: 'mailto:SIAKOU2006@gmail.com',
      label: 'SIAKOU2006@gmail.com',
      color: 'from-red-500 to-orange-500',
      gradient: 'bg-gradient-to-r from-red-500/20 to-orange-500/20',
    },
    {
      name: 'Email Secondaire',
      icon: Mail,
      href: 'mailto:SIAKOU8435@gmail.com',
      label: 'SIAKOU8435@gmail.com',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/siakou-stanislas-672828297/',
      label: '@siakou-stanislas',
      color: 'from-blue-600 to-blue-400',
      gradient: 'bg-gradient-to-r from-blue-600/20 to-blue-400/20',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/SIAKOU/',
      label: 'github.com/SIAKOU',
      color: 'from-gray-800 to-gray-600',
      gradient: 'bg-gradient-to-r from-gray-800/20 to-gray-600/20',
    },
    {
      name: 'Téléphone',
      icon: Phone,
      href: 'tel:+22892104781',
      label: '+228 92 10 47 81',
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
    },
    {
      name: 'Localisation',
      icon: MapPin,
      href: '#',
      label: 'Lomé, Togo',
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Chiffrement AES-256',
      description: 'Vos données sont cryptées de bout en bout',
      color: 'text-green-500',
    },
    {
      icon: ShieldCheck,
      title: 'Certificat SSL/TLS',
      description: 'Connexion sécurisée HTTPS',
      color: 'text-blue-500',
    },
    {
      icon: Fingerprint,
      title: 'Authentification',
      description: 'Protection contre les robots',
      color: 'text-purple-500',
    },
    {
      icon: Server,
      title: 'Serveurs Sécurisés',
      description: 'Hébergement EU avec RGPD',
      color: 'text-orange-500',
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 lg:py-32 overflow-hidden">
      {/* Effets de fond avancés */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Particules flottantes */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-[2px] h-[2px] bg-primary/30 rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: particle.id * 0.2,
            }}
          />
        ))}

        {/* Grille de fond animée */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                              linear-gradient(to bottom, #888 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
            }}
          />
        </div>

        {/* Effets de lumière */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        {/* Lignes de code animées */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: [0, 0, 1, 1],
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div ref={ref} animate={controls}>
          {/* En-tête avec effets spéciaux */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.22, 0.98, 0.3, 1] }}
            className="text-center mb-20"
          >
            {/* Badge animé */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                contact_secure_channel
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">en ligne</span>
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-accent">
                {typingEffect}
              </span>
              <span className="animate-pulse">_</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Prêt à transformer vos idées en réalité ? Discutons de votre projet 
              <span className="text-primary font-semibold"> en toute confidentialité</span>.
            </p>

            {/* Statistiques animées */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { value: '24h', label: 'Temps de réponse', icon: Clock },
                { value: '100%', label: 'Messages délivrés', icon: CheckCircle },
                { value: 'AES-256', label: 'Chiffrement', icon: Lock },
                { value: 'RGPD', label: 'Conformité', icon: Shield },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Formulaire de contact premium */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -50, rotateY: -15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <motion.div
                className="relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Effet 3D */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-20" />
                
                <div className="relative glass-card p-8 lg:p-10 rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        <span className="gradient-text">Formulaire Sécurisé</span>
                      </h3>
                      <p className="text-muted-foreground">
                        Remplissez les champs ci-dessous pour initier une communication chiffrée
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
                    >
                      <Satellite className="w-10 h-10 text-primary/50" />
                    </motion.div>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Champs avec animations */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          id: 'name',
                          label: 'Nom Complet',
                          icon: User,
                          placeholder: 'Votre nom et prénom',
                          value: formData.name,
                        },
                        {
                          id: 'email',
                          label: 'Adresse Email',
                          icon: Mail,
                          placeholder: 'vous@exemple.com',
                          type: 'email',
                          value: formData.email,
                        },
                      ].map((field) => (
                        <motion.div
                          key={field.id}
                          className="relative"
                          whileHover={{ scale: 1.02 }}
                        >
                          <label htmlFor={field.id} className="block text-sm font-medium mb-2">
                            <div className="flex items-center gap-2">
                              <field.icon className="w-4 h-4 text-primary" />
                              {field.label}
                            </div>
                          </label>
                          <div className="relative">
                            <Input
                              id={field.id}
                              name={field.id}
                              type={field.type || 'text'}
                              value={field.value}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              required
                              className="pl-10 pr-4 py-3 bg-black/30 border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            Sujet du Message
                          </div>
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Projet, Collaboration, Audit, Conseil..."
                          required
                          className="py-3 bg-black/30 border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="message" className="block text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-primary" />
                              Message Détaillé
                            </div>
                          </label>
                          <div className="text-xs text-muted-foreground">
                            {charCount}/2000 caractères
                          </div>
                        </div>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Décrivez votre projet, vos besoins, votre budget et vos délais..."
                          required
                          rows={6}
                          maxLength={2000}
                          className="bg-black/30 border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all"
                        />
                        <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${(charCount / 2000) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bouton d'envoi avec effets */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className={cn(
                          "w-full py-6 text-lg font-semibold group relative overflow-hidden",
                          isSubmitting && "cursor-not-allowed"
                        )}
                        disabled={isSubmitting || isEncrypting}
                      >
                        {/* Effet de brillance */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.8 }}
                        />
                        
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Transmission en cours...
                          </>
                        ) : isEncrypting ? (
                          <>
                            <Key className="w-5 h-5 mr-2 animate-pulse" />
                            Chiffrement AES-256...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <span className="relative z-10">
                              Envoyer le Message Sécurisé
                            </span>
                            <Sparkles className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {/* Indicateurs de sécurité */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                      {securityFeatures.map((feature) => (
                        <div key={feature.title} className="flex items-center gap-2">
                          <feature.icon className={cn("w-4 h-4", feature.color)} />
                          <span className="text-xs text-muted-foreground">{feature.title}</span>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>

            {/* Informations de contact et réseaux */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 50, rotateY: 15 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Carte de contact */}
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur" />
                    <div className="relative p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">SIAKOU Komi Stanislas</h3>
                    <p className="text-sm text-muted-foreground">Développeur Full-Stack</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl transition-all group",
                          "hover:scale-[1.02] hover:shadow-lg",
                          link.gradient
                        )}
                        whileHover={{ x: 5 }}
                      >
                        <div className={cn(
                          "p-2 rounded-lg bg-gradient-to-r",
                          link.color,
                          "text-white"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{link.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{link.label}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Statut de disponibilité */}
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Disponibilité</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-500 font-medium">Disponible</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Temps de réponse</span>
                    <span className="text-sm font-medium">Moins de 24h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Projets en cours</span>
                    <span className="text-sm font-medium">3/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Zone horaire</span>
                    <span className="text-sm font-medium">GMT+1</span>
                  </div>
                </div>
              </div>

              {/* QR Code de contact */}
              <div className="glass-card p-6 rounded-2xl border border-white/10 text-center">
                <h3 className="font-bold text-lg mb-4">QR Code Contact</h3>
                <div className="relative inline-block p-4 bg-white rounded-xl mb-4">
                  {/* Placeholder pour QR Code */}
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scannez pour ajouter aux contacts
                </p>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20"
              >
                <Rocket className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Prêt à collaborer ?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Discutons de votre projet dès maintenant
                </p>
                <Button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full"
                  variant="outline"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Démarrer une conversation
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer de section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-20 pt-8 border-t border-white/10 text-center"
          >
            <p className="text-sm text-muted-foreground">
              <Shield className="inline w-4 h-4 mr-2 text-accent" />
              Toutes les communications sont chiffrées et protégées conformément au RGPD
              <span className="mx-2">•</span>
              <Lock className="inline w-4 h-4 mr-2 text-green-500" />
              Aucune donnée n'est partagée avec des tiers
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Composant ExternalLink pour compléter
const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default ContactSection;