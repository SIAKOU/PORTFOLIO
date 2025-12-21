import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import cv from '@/assets/CV de graphiste.pdf';
import profileImg from '@/assets/Profile.png';
import { Download, MapPin, Mail, Briefcase, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Recherche constante de la perfection dans chaque ligne de code et configuration.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Veille technologique permanente et curiosité insatiable pour les nouvelles menaces.',
    },
    {
      icon: Briefcase,
      title: 'Professionnalisme',
      description: 'Respect des standards industriels et des meilleures pratiques de sécurité.',
    },
  ];

  return (
    <section id="apropos" className="py-24 lg:py-32 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block font-mono text-sm text-primary mb-4">
              &lt;profil_quantique/&gt;
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              À Propos de <span className="gradient-text">Moi</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un parcours dédié à la protection des systèmes d'information et à l'innovation technologique.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Column - Bio Card */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="glass-card p-6 sm:p-8 h-full">
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                  {/* Avatar Placeholder */}
                  <div className="relative mx-auto sm:mx-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto sm:mx-0">
                      <img src={profileImg} alt="Photo de profil" className="w-full h-full object-cover" />
                    </div>
                    <motion.div
                      className="absolute -inset-1 rounded-full border border-primary/30"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Quick Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold mb-2">SIAKOU Komi Stanislas</h3>
                    <p className="text-primary font-mono text-sm mb-4">
                      Étudiant — Administration Réseaux & Cybersécurité (IAI‑TOGO)
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        Lomé, Togo
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4 text-primary" />
                        SIAKOU2006@gmail.com
                      </span>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  <p>
                    Actuellement étudiant en fin de parcours en Administration Réseaux à
                    l'IAI‑TOGO, je me spécialise dans la sécurité des systèmes et des réseaux.
                    Mon parcours mêle projets académiques, travaux pratiques et stages en
                    administration et sécurisation d'infrastructures.
                  </p>
                  <p>
                    Titulaire de la certification CCNA 2, je maîtrise les concepts de routage,
                    commutation, VPN, ainsi que des notions pratiques d'administration système
                    (Linux/Windows) et d'automatisation. Je m'intéresse particulièrement aux
                    technologies Huawei et aux architectures résilientes.
                  </p>
                  <p>
                    Mon objectif : transformer mes solides bases théoriques en solutions
                    opérationnelles, participer à des projets d'infrastructure et continuer
                    à me certifier et me spécialiser en cybersécurité.
                  </p>
                </div>

                <a href={cv} download className="inline-block">
                  <Button variant="hero" className="w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    Télécharger le CV Complet
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right Column - Values */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              <h4 className="font-mono text-sm text-primary mb-4">&gt; core_values</h4>
              
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="glass-card p-5 group hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <value.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">{value.title}</h5>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="glass-card p-5 border-l-2 border-l-secondary mt-6"
              >
                <h4 className="font-mono text-sm text-secondary mb-2">&gt; mission_statement</h4>
                <p className="text-sm text-muted-foreground italic">
                  "Transformer la complexité de la cybersécurité en solutions élégantes 
                  et accessibles, pour un monde numérique plus sûr."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
