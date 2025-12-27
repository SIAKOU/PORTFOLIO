import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Building,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Server,
  Shield,
  Network,
  Cpu,
  Database,
  Wrench,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Clock,
  Users,
  BookOpen,
  Rocket,
  Zap,
  Star,
  Target,
  CheckCircle,
  Layers,
  Brain,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import facamLogo from "@/assets/facam logo.png";

const experiences = [
  {
    id: "etudiant-iai",
    role: "Étudiant — Administration Réseaux & Cybersécurité",
    org: "Institut Africain d'Informatique (IAI-TOGO)",
    period: "2023 - Présent",
    duration: "2+ années",
    location: "Lomé, Togo",
    type: "formation",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    description:
      "Formation approfondie en administration réseau, cybersécurité et systèmes d'information.",
    details: [
      "Administration avancée des réseaux Cisco",
      "Sécurité des systèmes d'information (SI)",
      "Architectures réseau complexes",
      "Virtualisation et cloud computing",
      "Gestion des incidents de sécurité",
      "Audit et conformité",
    ],
    technologies: [
      "Cisco IOS",
      "Linux",
      "Windows Server",
      "Wireshark",
      "VMware",
      "Huawei",
    ],
    achievements: [
      "Certification CCNA 1 & 2 obtenue",
      "Projets pratiques en sécurité réseau",
      "Participation aux compétitions cybersécurité",
    ],
  },
  {
    id: "stage-facam",
    role: "Stagiaire — Développement & Administration Réseaux",
    org: "FACAM Stairway",
    period: "Juillet 2025 — Octobre 2025",
    duration: "3 mois",
    location: "Lomé, Togo",
    type: "stage",
    logo: facamLogo,
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
    description:
      "Stage intensif en développement full-stack et administration infrastructure.",
    details: [
      "Développement d'une plateforme de gestion de maintenance",
      "Programmation et intégration d'automates",
      "Accès et configuration salle serveur",
      "Maintenance équipements Fortinet",
      "Support infrastructure réseau",
    ],
    technologies: [
      "React",
      "Node.js",
      "Fortinet",
      "Python",
      "Docker",
      "PostgreSQL",
    ],
    achievements: [
      "Plateforme de gestion déployée en production",
      "Configuration sécurisée du réseau d'entreprise",
      "Optimisation des performances serveur",
    ],
  },
  {
    id: "freelance-projects",
    role: "Développeur Full-Stack Freelance",
    org: "Projets Personnels & Collaborations",
    period: "2022 - Présent",
    duration: "3+ années",
    location: "Remote & Lomé",
    type: "freelance",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    description:
      "Réalisation de projets web complets pour divers clients et initiatives personnelles.",
    details: [
      "Conception d'applications web modernes",
      "Développement d'API REST sécurisées",
      "Intégration de systèmes de paiement",
      "Optimisation des performances",
      "Déploiement et maintenance",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Express.js",
      "MongoDB",
      "AWS",
      "Git",
    ],
    achievements: [
      "Plus de 15 projets réalisés",
      "100% de satisfaction client",
      "Applications scalables et sécurisées",
    ],
  },
  {
    id: "lab-research",
    role: "Chercheur en Sécurité Réseau",
    org: "Laboratoire de Recherche IAI",
    period: "2024",
    duration: "6 mois",
    location: "IAI-TOGO, Lomé",
    type: "recherche",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    description:
      "Recherche appliquée sur les techniques de détection d'intrusions réseau.",
    details: [
      "Analyse de trafic réseau en temps réel",
      "Développement d'algorithmes de détection",
      "Tests de pénétration contrôlés",
      "Rédaction de documentation technique",
      "Présentation des résultats",
    ],
    technologies: [
      "Python",
      "Scapy",
      "Elastic Stack",
      "Machine Learning",
      "Kali Linux",
    ],
    achievements: [
      "Prototype de système de détection",
      "Publication d'article de recherche",
      "Amélioration des protocoles de sécurité",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [activeExp, setActiveExp] = useState<string | null>(experiences[0].id);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  // Particules animées
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  // Animation de la timeline
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setTimelineProgress(100);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const activeExperience =
    experiences.find((exp) => exp.id === activeExp) || experiences[0];

  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                            linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Light Orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        {/* Particles */}
        {particles.map((particle) => (
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
              delay: particle.id * 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                timeline_execution
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-accent">
                Parcours Professionnel
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez mon évolution à travers des expériences formatrices, des
              défis techniques et des réussites significatives
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Timeline Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-4">
                <div className="glass-card p-6 rounded-2xl mb-8">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Timeline
                  </h3>

                  {/* Timeline Line */}
                  <div className="relative h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${timelineProgress}%` }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>

                  {/* Experience Cards Navigation */}
                  <div className="space-y-3">
                    {experiences.map((exp, index) => {
                      const Icon = exp.icon;
                      const isActive = activeExp === exp.id;

                      return (
                        <motion.button
                          key={exp.id}
                          onClick={() => setActiveExp(exp.id)}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "relative w-full text-left p-4 rounded-xl transition-all duration-300",
                            "border border-white/10 bg-gradient-to-br from-gray-900/30 to-gray-900/10",
                            isActive
                              ? "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl shadow-primary/10"
                              : "hover:border-primary/30 hover:bg-white/5"
                          )}
                        >
                          {/* Active Indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="activeExperience"
                              className="absolute inset-0 rounded-xl border-2 border-primary/50"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}

                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "p-2 rounded-lg transition-all",
                                isActive
                                  ? "bg-gradient-to-r from-white/20 to-white/10"
                                  : "bg-white/5",
                                exp.color.replace("from-", "bg-gradient-to-r ")
                              )}
                            >
                              <Icon
                                className={cn(
                                  "w-5 h-5",
                                  isActive
                                    ? "text-white"
                                    : "text-muted-foreground"
                                )}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span
                                  className={cn(
                                    "text-sm font-semibold truncate",
                                    isActive
                                      ? "text-primary"
                                      : "text-foreground"
                                  )}
                                >
                                  {exp.role}
                                </span>
                                <ChevronRight
                                  className={cn(
                                    "w-4 h-4 transition-transform",
                                    isActive && "rotate-90"
                                  )}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {exp.org}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {exp.period}
                              </div>
                            </div>
                          </div>

                          {/* Dot Indicator */}
                          <motion.div
                            className={cn(
                              "absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-gray-900",
                              exp.color.replace("from-", "bg-gradient-to-r ")
                            )}
                            animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    En Résumé
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Calendar,
                        label: "Expérience Totale",
                        value: "3+ années",
                      },
                      {
                        icon: Briefcase,
                        label: "Expériences",
                        value: experiences.length,
                      },
                      { icon: Award, label: "Projets Majeurs", value: "15+" },
                      {
                        icon: Users,
                        label: "Clients Satisfaits",
                        value: "100%",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-white/5">
                            <stat.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stat.label}
                          </span>
                        </div>
                        <span className="font-bold gradient-text">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Active Experience Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Experience Header */}
                  <div className="glass-card p-8 rounded-2xl mb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${activeExperience.color}`}
                          >
                            <activeExperience.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                {activeExperience.type.toUpperCase()}
                              </span>
                              <span className="text-sm text-muted-foreground font-mono">
                                {activeExperience.duration}
                              </span>
                            </div>
                            <h2 className="text-2xl font-bold">
                              {activeExperience.role}
                            </h2>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            {activeExperience.org}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {activeExperience.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {activeExperience.period}
                          </div>
                        </div>
                      </div>

                      {activeExperience.logo && (
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 p-3 bg-white/5">
                            <img
                              src={activeExperience.logo}
                              alt={`${activeExperience.org} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {activeExperience.description}
                    </p>

                    {/* Technologies Stack */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        Technologies Maîtrisées
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {activeExperience.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            onMouseEnter={() => setHoveredTech(tech)}
                            onMouseLeave={() => setHoveredTech(null)}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className={cn(
                              "px-3 py-1.5 text-sm rounded-lg border transition-all cursor-pointer",
                              "bg-white/5 border-white/10 hover:border-primary/50",
                              hoveredTech === tech &&
                                "bg-primary/10 border-primary/50"
                            )}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Responsibilities */}
                      <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Responsabilités & Missions
                        </h3>
                        <ul className="space-y-3">
                          {activeExperience.details.map((detail, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary mt-1.5 flex-shrink-0" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          Réalisations & Résultats
                        </h3>
                        <ul className="space-y-3">
                          {activeExperience.achievements.map(
                            (achievement, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mt-1.5 flex-shrink-0" />
                                {achievement}
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Skills Gained */}
                  <div className="glass-card p-8 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Compétences Développées
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          skill: "Architecture Réseau",
                          level: 95,
                          icon: Network,
                        },
                        { skill: "Sécurité Systèmes", level: 90, icon: Shield },
                        {
                          skill: "Développement Full-Stack",
                          level: 85,
                          icon: Code,
                        },
                        {
                          skill: "Administration Serveur",
                          level: 88,
                          icon: Server,
                        },
                        { skill: "Base de Données", level: 80, icon: Database },
                        { skill: "Automatisation", level: 75, icon: Terminal },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-primary/10">
                                  <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">
                                  {item.skill}
                                </span>
                              </div>
                              <span className="text-xs font-bold gradient-text">
                                {item.level}%
                              </span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${item.level}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.8 + index * 0.1,
                                }}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute -top-6 -left-6">
                  <QuoteIcon className="w-12 h-12 text-primary/20" />
                </div>
                <p className="text-xl italic text-muted-foreground mb-6">
                  "Chaque expérience est une pierre angulaire dans la
                  construction d'une expertise solide. La passion pour la
                  technologie et l'apprentissage continu sont les moteurs de
                  l'excellence."
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground font-mono">
                    — Toujours en apprentissage
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Composant Quote Icon
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export default ExperienceSection;
