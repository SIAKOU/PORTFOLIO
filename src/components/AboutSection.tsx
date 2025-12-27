import ProfileImage from '@/assets/Profile.png';
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Download,
  MapPin,
  Mail,
  Briefcase,
  Target,
  Heart,
  Award,
  Code,
  Shield,
  Cpu,
  Globe,
  Rocket,
  Sparkles,
  Zap,
  Brain,
  Lock,
  Terminal,
  ExternalLink,
  ChevronRight,
  Star,
  Calendar,
  User,
  GraduationCap,
  Building,
  BookOpen,
  Coffee,
  Wifi,
  Server,
  Network,
  Database,
  Cloud,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Typing effect
  useEffect(() => {
    const text = "SIAKOU Komi Stanislas";
    let i = 0;
    const typing = setInterval(() => {
      if (i <= text.length) {
        setTypingText(text.substring(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);

    return () => clearInterval(typing);
  }, []);

  // Particules
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  // Animation de base
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "Recherche constante de la perfection dans chaque ligne de code et configuration.",
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-500",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Veille technologique permanente et curiosité insatiable pour les nouvelles menaces.",
      color: "from-red-500 to-pink-500",
      iconColor: "text-red-500",
    },
    {
      icon: Shield,
      title: "Sécurité",
      description:
        "Protection des systèmes et données avec les meilleures pratiques de cybersécurité.",
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-500",
    },
    {
      icon: Brain,
      title: "Innovation",
      description:
        "Recherche de solutions créatives et adoption des technologies émergentes.",
      color: "from-purple-500 to-violet-500",
      iconColor: "text-purple-500",
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Administration Réseaux & Cybersécurité",
      institution: "IAI-TOGO",
      icon: GraduationCap,
      color: "bg-gradient-to-r from-primary to-secondary",
    },
    {
      year: "2025",
      title: "Certification CCNA 2",
      institution: "Cisco Networking Academy",
      icon: Award,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      year: "2022",
      title: "Développement Full-Stack",
      institution: "Auto-formation intensive",
      icon: Code,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      year: "2021",
      title: "Début en Programmation",
      institution: "Premiers projets personnels",
      icon: Rocket,
      color: "bg-gradient-to-r from-orange-500 to-red-500",
    },
  ];

  const technologies = [
    { name: "Cisco Networking", icon: Network, level: 90 },
    { name: "Linux Administration", icon: Server, level: 85 },
    { name: "Cybersecurity", icon: Lock, level: 80 },
    { name: "Cloud Infrastructure", icon: Cloud, level: 75 },
    { name: "Database Management", icon: Database, level: 70 },
    { name: "Network Security", icon: Shield, level: 95 },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 0.98, 0.3, 1] },
    },
  };

  return (
    <section
      id="apropos"
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Particules */}
        {particles.map((particle: { id: number; x: number; y: number }) => (
          <motion.div
            key={particle.id}
            className="absolute w-[1px] h-[1px] bg-primary/30 rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: particle.id * 0.2,
            }}
          />
        ))}

        {/* Grid Animated */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                            linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Light Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                profile_execution
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-accent">
                {typingText}
              </span>
              <span className="animate-pulse">_</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert en{" "}
              <span className="text-primary font-semibold">
                Sécurité des Réseaux
              </span>{" "}
              &{" "}
              <span className="text-secondary font-semibold">
                Développement Full-Stack
              </span>
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-7 gap-8 lg:gap-12">
            {/* Left Column - Bio & Stats */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <motion.div
                className="relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* 3D Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-20" />

                <div className="relative glass-card p-8 lg:p-10 rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30">
                  {/* Profile Header */}
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
                    {/* Avatar with Effects */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000" />
                      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-900">
                        <img
                          src={ProfileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Status Badge */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-gray-900"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Wifi className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    {/* Quick Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="mb-4">
                        <h2 className="text-3xl font-bold mb-2">
                          SIAKOU Komi Stanislas
                        </h2>
                        <p className="text-primary font-mono text-lg">
                          Expert Cybersécurité & DevOps
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-bold gradient-text">
                            3+
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Mois d'expérience
                          </div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-bold gradient-text">
                            15+
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Projets réalisés
                          </div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-bold gradient-text">
                            100%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Satisfaction client
                          </div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-bold gradient-text">
                            24/7
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Disponibilité
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <a
                          href="mailto:SIAKOU2006@gmail.com"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 group-hover:from-red-500/20 group-hover:to-orange-500/20">
                            <Mail className="w-4 h-4 text-red-500" />
                          </div>
                          <span>SIAKOU2006@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                            <MapPin className="w-4 h-4 text-blue-500" />
                          </div>
                          <span>Lomé, Togo</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold">Biographie</h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        <span className="text-primary font-semibold">
                          Expert en sécurité des réseaux
                        </span>{" "}
                        avec une passion pour la protection des infrastructures
                        numériques. Actuellement en fin de parcours en
                        Administration Réseaux & Cybersécurité à l'IAI-TOGO, je
                        combine expertise technique et vision stratégique.
                      </p>

                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Titulaire de la certification{" "}
                        <span className="text-secondary font-semibold">
                          CCNA 2
                        </span>
                        , je maîtrise les architectures réseau complexes, les
                        protocoles de sécurité avancés et l'administration
                        système sur Linux/Windows. Mes compétences s'étendent du
                        développement full-stack à l'automatisation DevOps.
                      </p>

                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Passionné par les technologies{" "}
                        <span className="text-accent font-semibold">
                          Huawei
                        </span>{" "}
                        et les architectures résilientes, je m'engage à
                        transformer des bases théoriques solides en solutions
                        opérationnelles robustes.
                      </p>
                    </div>
                  </div>

                  {/* Technologies Stack */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                        <Cpu className="w-6 h-6 text-primary" />
                        Stack Technologique
                      </h3>
                      <span className="text-sm text-muted-foreground font-mono">
                        Expertise Niveau
                      </span>
                    </div>

                    <div className="space-y-4">
                      {technologies.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20">
                                <tech.icon className="w-5 h-5 text-primary" />
                              </div>
                              <span className="font-medium">{tech.name}</span>
                            </div>
                            <span className="text-sm font-bold gradient-text">
                              {tech.level}%
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${tech.level}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.7 + index * 0.1,
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/cv" className="flex-1">
                      <Button variant="hero" size="lg" className="w-full group">
                        <ExternalLink className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                        Voir le CV Complet
                        <ChevronRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </Link>

                    <a href="/CV-de-graphiste.pdf" download className="flex-1">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full group border-primary/30 hover:border-primary/50"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Télécharger PDF
                        <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Values & Timeline */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 space-y-8"
            >
              {/* Values */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <Star className="w-6 h-6 text-primary" />
                    Valeurs Fondamentales
                  </h3>
                  <span className="text-sm text-muted-foreground font-mono">
                    {values.length} principes
                  </span>
                </div>

                <div className="grid gap-4">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                      }
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onMouseEnter={() => setHoveredValue(index)}
                      onMouseLeave={() => setHoveredValue(null)}
                      className={cn(
                        "relative p-5 rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/30 to-gray-900/10",
                        "transition-all duration-300 group cursor-pointer",
                        hoveredValue === index &&
                          "scale-[1.02] border-primary/50 shadow-xl shadow-primary/10"
                      )}
                    >
                      {/* Hover Effect */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300",
                          value.color,
                          hoveredValue === index && "opacity-10"
                        )}
                      />

                      <div className="relative flex items-start gap-4">
                        <motion.div
                          animate={{
                            rotate: hoveredValue === index ? 360 : 0,
                            scale: hoveredValue === index ? 1.2 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "p-3 rounded-lg transition-all duration-300",
                            value.iconColor,
                            hoveredValue === index
                              ? "bg-gradient-to-r from-white/20 to-white/10"
                              : "bg-white/5"
                          )}
                        >
                          <value.icon className="w-6 h-6" />
                        </motion.div>

                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {value.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {value.description}
                          </p>
                        </div>

                        <motion.div
                          animate={{ opacity: hoveredValue === index ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-5 h-5 text-primary" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    Parcours Professionnel
                  </h3>
                  <span className="text-sm text-muted-foreground font-mono">
                    Évolution
                  </span>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

                  <div className="space-y-8">
                    {timeline.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.year}
                          initial={{ opacity: 0, x: 20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: 20 }
                          }
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="relative pl-16 group cursor-pointer"
                          onClick={() => setActiveTimeline(index)}
                        >
                          {/* Timeline Dot */}
                          <div
                            className={cn(
                              "absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-gray-900 transition-all duration-300",
                              item.color,
                              activeTimeline === index && "scale-150"
                            )}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>

                          {/* Content */}
                          <div
                            className={cn(
                              "p-5 rounded-xl border transition-all duration-300",
                              "border-white/10 bg-gradient-to-br from-gray-900/30 to-gray-900/10",
                              activeTimeline === index &&
                                "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5"
                            )}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm text-primary">
                                {item.year}
                              </span>
                              <span
                                className={cn(
                                  "text-xs px-2 py-1 rounded-full transition-all",
                                  activeTimeline === index
                                    ? "bg-primary/20 text-primary"
                                    : "bg-white/5 text-muted-foreground"
                                )}
                              >
                                {item.institution}
                              </span>
                            </div>
                            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Acquisition de compétences clés en infrastructure
                              et sécurité
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Philosophy Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 text-center"
              >
                <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-xl mb-3">Vision & Mission</h4>
                <p className="text-muted-foreground italic mb-4">
                  "Transformer la complexité technologique en solutions
                  élégantes, sécuriser le monde numérique et inspirer
                  l'innovation."
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Key className="w-4 h-4" />
                  <span className="font-mono">
                    Always Learning, Always Securing
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-20 pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "CCNA 2", label: "Certification", icon: Award },
                { value: "IAI-TOGO", label: "Formation", icon: Building },
                { value: "Full-Stack", label: "Expertise", icon: Code },
                { value: "24/7", label: "Support", icon: Shield },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
