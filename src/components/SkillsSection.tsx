import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Server,
  Code2,
  Shield,
  Monitor,
  Container,
  Database,
  ChevronRight 
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'network',
    title: 'Administration Réseau',
    icon: Server,
    color: 'primary',
    skills: [
      { name: 'Cisco IOS / Juniper OS', level: 80 },
      { name: 'BGP / OSPF / EIGRP', level: 75 },
      { name: 'VPN / IPSec / SSL', level: 78 },
      { name: 'Firewalls (Palo Alto, Fortinet)', level: 70 },
      { name: 'SDN / SD-WAN', level: 60 },
    ],
  },
  {
    id: 'development',
    title: 'Développement',
    icon: Code2,
    color: 'secondary',
    skills: [
      { name: 'Python / Go / Rust', level: 70 },
      { name: 'JavaScript / TypeScript', level: 70 },
      { name: 'Node.js / React', level: 68 },
      { name: 'API REST / GraphQL', level: 72 },
      { name: 'Ansible / Terraform', level: 70 },
      { name: 'Java', level: 65 },
      { name: 'HTML / CSS / JS (Frontend)', level: 70 },
      { name: 'FastAPI', level: 70 },
      { name: 'Laravel', level: 68 },
      { name: 'Django', level: 68 },
    ],
  },
  {
    id: 'security',
    title: 'Cybersécurité',
    icon: Shield,
    color: 'accent',
    skills: [
      { name: 'Tests d\'Intrusion (Pentest)', level: 70 },
      { name: 'SIEM / SOC Operations', level: 72 },
      { name: 'Réponse aux Incidents', level: 74 },
      { name: 'Cryptographie / PKI', level: 65 },
      { name: 'Conformité (RGPD, ISO 27001)', level: 66 },
    ],
  },
  {
    id: 'os',
    title: 'Systèmes d\'Exploitation',
    icon: Monitor,
    color: 'secondary',
    skills: [
      { name: 'Linux (RHEL, Ubuntu, Debian)', level: 85 },
      { name: 'Windows Server', level: 70 },
      { name: 'Shell Scripting (Bash, PowerShell)', level: 82 },
      { name: 'Programmation Système (C/C++)', level: 70 },
      { name: 'Systèmes d\'exploitation avancés', level: 80 },
    ],
  },
  {
    id: 'container',
    title: 'Conteneurisation',
    icon: Container,
    color: 'accent',
    skills: [
      { name: 'Docker', level: 75 },
      { name: 'Kubernetes', level: 65 },
      { name: 'Helm / ArgoCD', level: 60 },
    ],
  },
];

const SkillBar = ({ skill, index, isInView, categoryColor }: { 
  skill: Skill; 
  index: number; 
  isInView: boolean;
  categoryColor: string;
}) => {
  const colorClasses = {
    primary: 'from-primary to-primary/70',
    secondary: 'from-secondary to-secondary/70',
    accent: 'from-accent to-accent/70',
  };

  const glowClasses = {
    primary: 'shadow-[0_0_10px_hsl(195_100%_50%/0.5)]',
    secondary: 'shadow-[0_0_10px_hsl(270_50%_55%/0.5)]',
    accent: 'shadow-[0_0_10px_hsl(120_100%_60%/0.5)]',
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{skill.name}</span>
        <span className="font-mono text-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[categoryColor as keyof typeof colorClasses]} ${glowClasses[categoryColor as keyof typeof glowClasses]}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: [0.22, 0.98, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="competences" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-50" />

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
              &lt;matrice_compétences/&gt;
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Compétences & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto italic">
              Étudiant en administration réseaux, je développe des compétences pratiques
              en administration système, sécurité réseau et automatisation. Ci‑dessous
              mes domaines de prédilection et les outils que j'utilise régulièrement.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;

              const borderColors = {
                primary: 'hover:border-primary/50',
                secondary: 'hover:border-secondary/50',
                accent: 'hover:border-accent/50',
              };

              const iconBgColors = {
                primary: 'bg-primary/10 text-primary',
                secondary: 'bg-secondary/10 text-secondary',
                accent: 'bg-accent/10 text-accent',
              };

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
                    borderColors[category.color as keyof typeof borderColors]
                  } ${isActive ? 'ring-1 ring-primary/50' : ''}`}
                  onClick={() => setActiveCategory(isActive ? null : category.id)}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${iconBgColors[category.color as keyof typeof iconBgColors]}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-xl">{category.title}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </div>

                  {/* Skills List */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isActive ? 'auto' : '0',
                      opacity: isActive ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4">
                      {category.skills.map((skill, index) => (
                        <SkillBar 
                          key={skill.name} 
                          skill={skill} 
                          index={index} 
                          isInView={isActive}
                          categoryColor={category.color}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Preview Skills (when collapsed) */}
                    {!isActive && (
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill.name}
                          className="text-sm font-mono px-3 py-1 rounded-md bg-muted text-muted-foreground"
                        >
                          {skill.name.split('/')[0].trim()}
                        </span>
                      ))}
                      {category.skills.length > 3 && (
                        <span className="text-sm font-mono px-3 py-1 rounded-md bg-muted text-muted-foreground">
                          +{category.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Database Skills - Separate Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">Bases de Données</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'InfluxDB'].map((db) => (
                <span
                  key={db}
                  className="px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 text-sm font-mono text-foreground hover:border-primary/40 hover:bg-primary/10 transition-all cursor-default"
                >
                  {db}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
