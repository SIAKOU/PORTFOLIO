import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Award,
  ExternalLink,
  Calendar,
  Building2,
  Download,
  Eye,
  X,
  ChevronRight,
  ChevronLeft,
  Shield,
  CheckCircle,
  Clock,
  FileText,
  Star,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Printer,
  Share2,
  BookOpen,
  Target,
  Trophy,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Importer les PDFs de certifications (ajustez les chemins selon votre structure)
import ccna2Pdf from "@/assets/certifications/CCNA2-Certificate.pdf";
// Ajoutez d'autres PDFs ici

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  credentialUrl?: string;
  badgeColor: string;
  description: string;
  skills: string[];
  pdfUrl: string;
  verificationId?: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "networking" | "security" | "development" | "cloud" | "other";
}

const certifications: Certification[] = [
  {
    id: "ccna2",
    name: "CCNA 2: Routing & Switching Essentials",
    issuer: "Cisco Networking Academy",
    date: "Octobre 2023",
    expirationDate: "Octobre 2026",
    badgeColor: "from-blue-600 to-cyan-500",
    description:
      "Certification avancée en routage et commutation Cisco, couvrant les protocoles OSPF, EIGRP, ACLs et les concepts de réseau avancés.",
    skills: ["OSPF", "EIGRP", "VLANs", "ACLs", "NAT", "DHCP"],
    pdfUrl: ccna2Pdf,
    verificationId: "CSCO13841542",
    level: "intermediate",
    category: "networking",
  },
  {
    id: "security-fundamentals",
    name: "Fondamentaux de la Sécurité Informatique",
    issuer: "Google Cybersecurity Certificate",
    date: "Décembre 2023",
    badgeColor: "from-green-500 to-emerald-500",
    description:
      "Certification couvrant les bases de la cybersécurité, analyse de risques, cryptographie et bonnes pratiques de sécurité.",
    skills: [
      "Analyse de Risques",
      "Cryptographie",
      "Sécurité Réseau",
      "Politiques de Sécurité",
    ],
    pdfUrl: "#",
    level: "beginner",
    category: "security",
  },
  {
    id: "linux-essentials",
    name: "Linux Essentials",
    issuer: "Linux Professional Institute",
    date: "Novembre 2023",
    badgeColor: "from-orange-500 to-yellow-500",
    description:
      "Maîtrise des commandes Linux essentielles, gestion des systèmes de fichiers et scripts shell de base.",
    skills: [
      "Command Line",
      "Bash Scripting",
      "System Administration",
      "File Management",
    ],
    pdfUrl: "#",
    level: "intermediate",
    category: "development",
  },
  {
    id: "web-development",
    name: "Full-Stack Web Development",
    issuer: "FreeCodeCamp",
    date: "Septembre 2023",
    badgeColor: "from-purple-500 to-pink-500",
    description:
      "Certification complète en développement web full-stack avec React, Node.js et bases de données.",
    skills: ["React", "Node.js", "MongoDB", "REST API", "Git"],
    pdfUrl: "#",
    level: "intermediate",
    category: "development",
  },
  {
    id: "network-security",
    name: "Network Security Fundamentals",
    issuer: "CompTIA",
    date: "En cours",
    badgeColor: "from-red-500 to-orange-500",
    description:
      "Formation avancée en sécurité réseau, protection contre les menaces et mise en œuvre de solutions de sécurité.",
    skills: ["Firewalls", "VPNs", "IDS/IPS", "Threat Analysis"],
    pdfUrl: "#",
    level: "advanced",
    category: "security",
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing Basics",
    issuer: "AWS Academy",
    date: "Janvier 2024",
    badgeColor: "from-amber-500 to-yellow-400",
    description:
      "Introduction aux services cloud AWS et aux concepts fondamentaux du cloud computing.",
    skills: ["AWS EC2", "S3", "Cloud Security", "Auto Scaling"],
    pdfUrl: "#",
    level: "beginner",
    category: "cloud",
  },
  {
    id: "python-programming",
    name: "Python for Cybersecurity",
    issuer: "Cisco",
    date: "Février 2024",
    badgeColor: "from-teal-500 to-cyan-400",
    description:
      "Utilisation de Python pour l'automatisation des tâches de sécurité et l'analyse de données.",
    skills: ["Python", "Automation", "Data Analysis", "Security Scripts"],
    pdfUrl: "#",
    level: "intermediate",
    category: "development",
  },
  {
    id: "ethical-hacking",
    name: "Ethical Hacking Fundamentals",
    issuer: "EC-Council",
    date: "En cours",
    badgeColor: "from-gray-700 to-gray-500",
    description:
      "Formation aux techniques de test d'intrusion et aux méthodologies de hacking éthique.",
    skills: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Kali Linux",
      "Metasploit",
    ],
    pdfUrl: "#",
    level: "advanced",
    category: "security",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredCerts, setFilteredCerts] = useState(certifications);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    byCategory: {} as Record<string, number>,
  });

  // Initialiser les statistiques
  useEffect(() => {
    const completed = certifications.filter(
      (c) => !c.date.includes("En cours")
    ).length;
    const inProgress = certifications.filter((c) =>
      c.date.includes("En cours")
    ).length;

    const byCategory = certifications.reduce((acc, cert) => {
      acc[cert.category] = (acc[cert.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setStats({
      total: certifications.length,
      completed,
      inProgress,
      byCategory,
    });
  }, []);

  // Filtrer les certifications
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredCerts(certifications);
    } else {
      setFilteredCerts(
        certifications.filter((cert) => cert.category === activeCategory)
      );
    }
  }, [activeCategory]);

  const openCertViewer = (cert: Certification) => {
    setSelectedCert(cert);
    setIsViewerOpen(true);
    setZoomLevel(1);
    setRotation(0);
  };

  const closeCertViewer = () => {
    setIsViewerOpen(false);
    setSelectedCert(null);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handlePrint = () => {
    if (selectedCert?.pdfUrl) {
      window.open(selectedCert.pdfUrl, "_blank");
    }
  };

  const handleDownload = () => {
    if (selectedCert?.pdfUrl) {
      const link = document.createElement("a");
      link.href = selectedCert.pdfUrl;
      link.download = `${selectedCert.name.replace(
        /\s+/g,
        "_"
      )}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const categories = [
    { id: "all", label: "Toutes", icon: Trophy, count: stats.total },
    {
      id: "networking",
      label: "Réseau",
      icon: Award,
      count: stats.byCategory.networking || 0,
    },
    {
      id: "security",
      label: "Sécurité",
      icon: Shield,
      count: stats.byCategory.security || 0,
    },
    {
      id: "development",
      label: "Développement",
      icon: CodeIcon,
      count: stats.byCategory.development || 0,
    },
    {
      id: "cloud",
      label: "Cloud",
      icon: CloudIcon,
      count: stats.byCategory.cloud || 0,
    },
    {
      id: "other",
      label: "Autres",
      icon: Star,
      count: stats.byCategory.other || 0,
    },
  ];

  const levels = {
    beginner: { label: "Débutant", color: "bg-green-500/20 text-green-500" },
    intermediate: {
      label: "Intermédiaire",
      color: "bg-blue-500/20 text-blue-500",
    },
    advanced: { label: "Avancé", color: "bg-purple-500/20 text-purple-500" },
    expert: { label: "Expert", color: "bg-red-500/20 text-red-500" },
  };

  return (
    <>
      <section
        id="certifications"
        className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-darker to-cyber-dark" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 circuit-pattern opacity-10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div ref={ref}>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-primary">
                  verified_certifications
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-accent">
                  Certifications
                </span>
                <br />
                <span className="text-2xl sm:text-3xl text-muted-foreground">
                  Accréditations Professionnelles
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Une collection de certifications reconnues mondialement,
                attestant d'une expertise technique approfondie et constamment
                mise à jour.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {[
                {
                  icon: Trophy,
                  label: "Total",
                  value: stats.total,
                  color: "from-primary to-secondary",
                },
                {
                  icon: CheckCircle,
                  label: "Obtenues",
                  value: stats.completed,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Clock,
                  label: "En cours",
                  value: stats.inProgress,
                  color: "from-amber-500 to-orange-500",
                },
                {
                  icon: Target,
                  label: "Objectif",
                  value: "12+",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all",
                        activeCategory === category.id
                          ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/50 text-primary"
                          : "glass-card border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          activeCategory === category.id
                            ? "bg-primary/20 text-primary"
                            : "bg-white/5 text-muted-foreground"
                        )}
                      >
                        {category.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCerts.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  isInView={isInView}
                  levels={levels}
                  onViewClick={openCertViewer}
                />
              ))}
            </div>

            {/* Learning Journey */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.8 }}
              className="mt-20"
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-primary" />
                      Parcours d'Apprentissage Continu
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Je consacre plus de{" "}
                      <span className="text-primary font-bold">
                        200 heures par an
                      </span>{" "}
                      à la veille technologique, aux formations en ligne et au
                      perfectionnement de mes compétences. Mon objectif est
                      d'acquérir au moins{" "}
                      <span className="text-secondary font-bold">
                        3 nouvelles certifications
                      </span>{" "}
                      chaque année.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm">Formations en ligne</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm">Projets pratiques</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-sm">Veille technologique</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Target className="w-16 h-16 text-primary" />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={(e) => e.target === e.currentTarget && closeCertViewer()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-gray-900/90 backdrop-blur-xl">
                <div>
                  <h3 className="text-lg font-bold">{selectedCert.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Viewer Controls */}
                  <div className="flex items-center gap-2 mr-4 p-2 rounded-lg bg-white/5">
                    <button
                      onClick={handleZoomOut}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Zoom out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-mono px-2">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Zoom in"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleRotate}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Rotate"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleResetView}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Reset view"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors"
                    title="Télécharger"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-2 bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg transition-colors"
                    title="Imprimer"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeCertViewer}
                    className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-lg transition-colors"
                    title="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="absolute inset-0 top-16 bottom-0 flex items-center justify-center overflow-auto p-8">
                {selectedCert.pdfUrl && selectedCert.pdfUrl !== "#" ? (
                  <motion.div
                    style={{
                      transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <iframe
                      src={selectedCert.pdfUrl}
                      className="w-full h-full min-h-[500px] rounded-lg shadow-2xl"
                      title={`${selectedCert.name} Certificate`}
                    />
                  </motion.div>
                ) : (
                  <div className="text-center p-12">
                    <FileText className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                    <h4 className="text-xl font-bold mb-2">
                      Certification en cours d'acquisition
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      Cette certification est actuellement en cours de
                      préparation.
                      <br />
                      Le certificat sera disponible une fois obtenu.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <Clock className="w-5 h-5 text-amber-500" />
                      <span className="text-amber-500 font-medium">
                        En progression
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Certificate Info Panel */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Compétences validées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Détails
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Niveau:</span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-xs font-medium",
                            levels[selectedCert.level].color
                          )}
                        >
                          {levels[selectedCert.level].label}
                        </span>
                      </div>
                      {selectedCert.verificationId && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">ID de vérification:</span>
                          <span className="text-xs font-mono text-primary">
                            {selectedCert.verificationId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      Description
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCert.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Types pour CertificationCard
type LevelsMap = {
  [K in Certification['level']]: { label: string; color: string };
};

// Composant Certification Card amélioré
const CertificationCard = ({
  cert,
  index,
  isInView,
  levels,
  onViewClick,
}: {
  cert: Certification;
  index: number;
  isInView: boolean;
  levels: LevelsMap;
  onViewClick: (cert: Certification) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.9, y: 20 }
      }
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Hover Glow Effect */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          `bg-gradient-to-r ${cert.badgeColor}`
        )}
      />

      <div className="relative glass-card p-6 h-full flex flex-col hover:border-primary/40 transition-all duration-300">
        {/* Badge with Animation */}
        <div className="relative flex items-center justify-between mb-6">
          <div
            className={`relative w-20 h-20 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center shadow-lg`}
          >
            <Award className="w-10 h-10 text-white" />
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Level Badge */}
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              levels[cert.level].color
            )}
          >
            {levels[cert.level].label}
          </span>
        </div>

        {/* Name with Truncation */}
        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {cert.name}
        </h3>

        {/* Issuer */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Building2 className="w-4 h-4" />
          <span className="truncate">{cert.issuer}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
          {cert.description}
        </p>

        {/* Date & Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span
              className={cn(
                "font-medium",
                cert.date.includes("En cours")
                  ? "text-amber-500"
                  : "text-muted-foreground"
              )}
            >
              {cert.date}
            </span>
          </div>
          {cert.expirationDate && (
            <span className="text-xs text-muted-foreground">
              Valide jusqu'à {cert.expirationDate}
            </span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {cert.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs rounded-lg bg-white/5 border border-white/10"
            >
              {skill}
            </span>
          ))}
          {cert.skills.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-lg bg-white/5 border border-white/10">
              +{cert.skills.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <Button
            onClick={() => onViewClick(cert)}
            variant="outline"
            size="sm"
            className="flex-1 group/btn"
            disabled={cert.pdfUrl === "#"}
          >
            <Eye className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
            {cert.pdfUrl === "#" ? "En cours" : "Voir le certificat"}
          </Button>

          {cert.credentialUrl && (
            <Button asChild variant="ghost" size="sm" className="px-3">
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Icons manquants
const CodeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const CloudIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
    />
  </svg>
);

export default CertificationsSection;
