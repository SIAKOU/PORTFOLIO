import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Send,
  Mail,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
  Shield,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

    try {
      if (FORMSPREE_ENDPOINT) {
        // Send to Formspree (or any compatible POST endpoint)
        const resp = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!resp.ok) throw new Error('Failed to send');

        toast({
          title: 'Message envoyé !',
          description: 'Votre message a été transmis avec succès. Réponse sous 24-48h.',
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: open mail client with prefilled content
        const mailto = `mailto:SIAKOU2006@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailto;
        toast({ title: 'Redirection vers votre client mail', description: 'Si votre navigateur ne louvre pas le client mail, copiez-collez l\'email indiqué.' });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message. Essayez via email: SIAKOU2006@gmail.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'Email (principal)',
      icon: Mail,
      href: 'mailto:SIAKOU2006@gmail.com',
      label: 'SIAKOU2006@gmail.com',
      color: 'hover:text-primary',
    },
    {
      name: 'Email (secondaire)',
      icon: Mail,
      href: 'mailto:SIAKOU8435@gmail.com',
      label: 'SIAKOU8435@gmail.com',
      color: 'hover:text-primary',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/siakou-stanislas-672828297/',
      label: 'siakou-stanislas',
      color: 'hover:text-blue-500',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/SIAKOU/',
      label: 'github.com/SIAKOU',
      color: 'hover:text-foreground',
    },
    {
      name: 'Téléphone',
      icon: Phone as unknown,
      href: 'tel:+22892104781',
      label: '+228 92 10 47 81',
      color: 'hover:text-green-500',
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-mono text-sm text-primary mb-4">
              &lt;canal_sécurisé/&gt;
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Entrons en <span className="gradient-text">Contact</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une question, un projet, une opportunité de collaboration ? 
              N'hésitez pas à me contacter via ce formulaire sécurisé.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="glass-card p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-mono text-muted-foreground">
                        Nom complet *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        required
                        className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-mono text-muted-foreground">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean@example.com"
                        required
                        className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-mono text-muted-foreground">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Audit de sécurité, Conseil, Collaboration..."
                      required
                      className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-mono text-muted-foreground">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet ou votre demande..."
                      required
                      rows={5}
                      className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Shield className="w-5 h-5" />
                        </motion.div>
                        Chiffrement en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        Envoyer le Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3 text-accent" />
                    Communication chiffrée de bout en bout
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Links */}
              <div className="glass-card p-6">
                <h3 className="font-mono text-sm text-primary mb-4">&gt; liens_directs</h3>
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-muted-foreground ${link.color} transition-colors group`}
                    >
                      <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{link.name}</div>
                        <div className="text-xs">{link.label}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="glass-card p-6 border-l-2 border-l-accent">
                <h3 className="font-mono text-sm text-accent mb-2">&gt; temps_réponse</h3>
                <p className="text-sm text-muted-foreground">
                  Réponse garantie sous <span className="text-foreground font-semibold">24-48h</span> 
                  {' '}pour toute demande professionnelle.
                </p>
              </div>

              {/* Security Notice */}
              <div className="glass-card p-6 border-l-2 border-l-secondary">
                <h3 className="font-mono text-sm text-secondary mb-2">&gt; confidentialité</h3>
                <p className="text-sm text-muted-foreground">
                  Vos données sont traitées avec la plus grande confidentialité. 
                  Aucune information n'est partagée avec des tiers.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
