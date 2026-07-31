import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Code2,
  Server,
  Globe,
  Database,
  Wrench,
  Terminal,
  Cloud,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const skillCategories = [
  {
    title: "Cybersécurité",
    icon: Shield,
    color: "from-cyan-500 to-blue-600",
    skills: [
      { name: "Sécurité Réseau", level: 90 },
      { name: "Firewalls & IDS/IPS", level: 85 },
      { name: "Analyse de vulnérabilités", level: 80 },
      { name: "Cryptographie", level: 75 },
    ],
  },
  {
    title: "Développement Web",
    icon: Code2,
    color: "from-purple-500 to-pink-600",
    skills: [
      { name: "React & TypeScript", level: 90 },
      { name: "Node.js / Express", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Next.js", level: 78 },
    ],
  },
  {
    title: "Réseau",
    icon: Server,
    color: "from-blue-500 to-indigo-600",
    skills: [
      { name: "CCNA (Routing & Switching)", level: 88 },
      { name: "TCP/IP & Protocoles", level: 90 },
      { name: "VLAN & Routage", level: 85 },
      { name: "Wireshark & Analyse", level: 80 },
    ],
  },
  {
    title: "Backend & API",
    icon: Database,
    color: "from-green-500 to-emerald-600",
    skills: [
      { name: "RESTful APIs", level: 88 },
      { name: "PostgreSQL / MySQL", level: 82 },
      { name: "MongoDB", level: 78 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    color: "from-orange-500 to-red-600",
    skills: [
      { name: "Docker", level: 82 },
      { name: "CI/CD", level: 78 },
      { name: "Azure / AWS", level: 75 },
      { name: "Linux Administration", level: 85 },
    ],
  },
  {
    title: "Outils & Pratiques",
    icon: Wrench,
    color: "from-amber-500 to-yellow-600",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code / Vim", level: 85 },
      { name: "Agile / Scrum", level: 78 },
      { name: "Testing", level: 75 },
    ],
  },
];

const SkillsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="competences" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
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
              <Terminal className="w-4 h-4" />
              {t("skills.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("skills.title")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("skills.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative glass-card p-6 rounded-2xl h-full hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold">{category.title}</h3>
                    </div>

                    <div className="space-y-5">
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm text-muted-foreground">{skill.name}</span>
                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                              className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
