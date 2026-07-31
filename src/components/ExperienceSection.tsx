import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ChevronRight,
  Lightbulb,
  Award,
} from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "formation",
    title: "Licence en Administration Réseau et Sécurité",
    company: "IAI-TOGO",
    location: "Lomé, Togo",
    period: "2024 - Présent",
    description:
      "Formation approfondie en sécurité des systèmes d'information et administration réseau.",
    missions: [
      "Configuration et administration de réseaux d'entreprise",
      "Mise en place de politiques de sécurité",
      "Analyse de vulnérabilités et tests d'intrusion",
      "Déploiement de solutions de sécurisation",
    ],
    achievements: [
      "Projet de sécurisation d'infrastructure réseau noté 18/20",
      "Mise en place d'un SOC pour laboratoire d'entreprise",
    ],
  },
  {
    id: 2,
    type: "formation",
    title: "Certification CCNA 2",
    company: "Cisco Networking Academy",
    location: "À distance",
    period: "2024 - 2025",
    description:
      "Certification avancée en routing, switching et sécurité réseau.",
    missions: [
      "Routage avancé et protocoles dynamiques",
      "Configuration VLAN avancée et spanning-tree",
      "Sécurisation des équipements réseau",
      "Dépannage réseau avancé",
    ],
    achievements: [
      "Certification obtenue avec mention",
      "Configuration complète d'un réseau multi-VLAN sécurisé",
    ],
  },
  {
    id: 3,
    type: "projet",
    title: "Développeur Full-Stack Freelance",
    company: "Projets personnels & missions",
    location: "Lomé, Togo",
    period: "2023 - Présent",
    description:
      "Réalisation de projets web complets en freelance, de la conception au déploiement.",
    missions: [
      "Création de sites vitrine et applications métier",
      "Développement d'APIs RESTful sécurisées",
      "Intégration de solutions de sécurité",
      "Déploiement et maintenance d'applications",
    ],
    achievements: [
      "15+ projets livrés avec satisfaction client",
      "Stack technique : React, Node.js, TypeScript, PostgreSQL",
    ],
  },
  {
    id: 4,
    type: "formation",
    title: "Formation en Développement Web",
    company: "Auto-formation & OpenClassrooms",
    location: "À distance",
    period: "2023 - 2024",
    description:
      "Acquisition des fondamentaux du développement web moderne et des meilleures pratiques.",
    missions: [
      "Maîtrise de HTML/CSS/JavaScript et TypeScript",
      "Frameworks modernes : React, Next.js, Tailwind CSS",
      "Backend : Node.js, Express, bases de données SQL/NoSQL",
      "Versioning avec Git et workflows de collaboration",
    ],
    achievements: [
      "Plusieurs projets validés sur OpenClassrooms",
      "Portfolio technique complet avec applications déployées",
    ],
  },
];

const ExperienceSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [selectedId, setSelectedId] = useState(experiences[0].id);

  const selected = experiences.find((e) => e.id === selectedId) || experiences[0];

  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
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
              <Briefcase className="w-4 h-4" />
              {t("experience.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("experience.title")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("experience.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-3"
            >
              {experiences.map((exp, index) => (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.08 }}
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedId === exp.id
                      ? "glass-card border-primary/40 bg-primary/5"
                      : "hover:bg-white/5 border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-lg ${
                        exp.type === "formation"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {exp.type === "formation" ? (
                        <GraduationCap className="w-4 h-4" />
                      ) : (
                        <Briefcase className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{exp.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{exp.company}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-1">{exp.period}</p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 mt-1.5 transition-transform ${
                        selectedId === exp.id ? "rotate-90 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-start gap-4 mb-8">
                  <div
                    className={`p-3 rounded-xl ${
                      selected.type === "formation"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {selected.type === "formation" ? (
                      <GraduationCap className="w-6 h-6" />
                    ) : (
                      <Briefcase className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selected.title}</h3>
                    <p className="text-muted-foreground">{selected.company}</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {selected.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {selected.period}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground/80 mb-8 leading-relaxed">
                  {selected.description}
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      {t("experience.missions")}
                    </h4>
                    <ul className="space-y-2.5">
                      {selected.missions.map((mission) => (
                        <li
                          key={mission}
                          className="flex items-start gap-3 text-sm text-muted-foreground/80"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-secondary" />
                      {t("experience.achievements")}
                    </h4>
                    <ul className="space-y-2.5">
                      {selected.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-3 text-sm text-muted-foreground/80"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
