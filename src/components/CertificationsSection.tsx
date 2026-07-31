import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Award,
  FileText,
  Shield,
  Code2,
  Network,
  ExternalLink,
  X,
  Download,
  Calendar,
  Building2,
} from "lucide-react";
import CCNA2Certificate from "@/assets/certifications/CCNA2-Certificate.pdf";

type CertifType = "toutes" | "securite" | "dev" | "reseau";

const filterValues: { value: CertifType; key: string }[] = [
  { value: "toutes", key: "certifications.all" },
  { value: "securite", key: "certifications.security" },
  { value: "dev", key: "certifications.dev" },
  { value: "reseau", key: "certifications.network" },
];

const certifications = [
  {
    title: "CCNA 2: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "2025",
    type: "reseau" as CertifType,
    description:
      "Certification avancée couvrant les concepts de routage, switching, VLANs, spanning-tree et sécurité réseau.",
    skills: ["Routing avancé", "VLANs", "Spanning-Tree", "Sécurité réseau", "Dépannage"],
    color: "from-blue-500 to-cyan-600",
    icon: Network,
    pdf: CCNA2Certificate,
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024",
    type: "securite" as CertifType,
    description:
      "Fondamentaux de la cybersécurité : menaces, vulnérabilités, cryptographie et bonnes pratiques.",
    skills: ["Cybersécurité", "Cryptographie", "Analyse de risques", "Sécurisation"],
    color: "from-green-500 to-emerald-600",
    icon: Shield,
    pdf: null,
  },
  {
    title: "Endpoint Security",
    issuer: "Cisco Networking Academy",
    date: "2024",
    type: "securite" as CertifType,
    description:
      "Sécurisation des endpoints : antivirus, pare-feu, détection d'intrusions et durcissement système.",
    skills: ["Endpoint security", "Antivirus", "IDS/IPS", "Hardening"],
    color: "from-red-500 to-rose-600",
    icon: Shield,
    pdf: null,
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    type: "securite" as CertifType,
    description:
      "Connaissances essentielles en sécurité : politiques de sécurité, gestion des identités et continuité d'activité.",
    skills: ["Politiques sécurité", "Gestion identités", "PCA", "Conformité"],
    color: "from-purple-500 to-pink-600",
    icon: Shield,
    pdf: null,
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2024",
    type: "dev" as CertifType,
    description:
      "Maîtrise des algorithmes fondamentaux, structures de données et résolution de problèmes en JavaScript.",
    skills: ["Algorithmes", "Structures données", "JavaScript", "Résolution problèmes"],
    color: "from-yellow-500 to-orange-600",
    icon: Code2,
    pdf: null,
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    type: "dev" as CertifType,
    description:
      "Conception de sites web responsives avec HTML5, CSS3 et Flexbox/Grid.",
    skills: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive"],
    color: "from-cyan-500 to-blue-600",
    icon: Code2,
    pdf: null,
  },
];

const CertificationsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<CertifType>("toutes");
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter === "toutes"
        ? certifications
        : certifications.filter((c) => c.type === activeFilter),
    [activeFilter]
  );

  return (
    <section id="certifications" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              <Award className="w-4 h-4" />
              {t("certifications.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("certifications.title")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("certifications.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {filterValues.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all border ${
                  activeFilter === f.value
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/30"
                }`}
              >
                {t(f.key)}
              </button>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative glass-card p-6 rounded-2xl h-full hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${cert.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {cert.pdf && (
                        <button
                          onClick={() => setViewingPdf(cert.pdf)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <h3 className="font-bold mb-2 text-sm leading-snug">
                      {cert.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {cert.issuer}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {viewingPdf && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setViewingPdf(null)}
        >
          <div
            className="relative w-full max-w-4xl h-[80vh] bg-background rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-medium">{t("certifications.view_cert")}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={viewingPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t("certifications.open")}
                </a>
                <a
                  href={viewingPdf}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-muted-foreground text-sm hover:bg-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t("certifications.download")}
                </a>
                <button
                  onClick={() => setViewingPdf(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <iframe
              src={viewingPdf}
              className="w-full h-[calc(80vh-60px)]"
              title="PDF Viewer"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default CertificationsSection;
