import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    id: 'etudiant-iai',
    role: "Étudiant — Administration Réseaux",
    org: 'IAI-TOGO',
    period: '2023 - Présent',
    location: 'Lomé, Togo',
    description:
      "Étudiant en fin de parcours en administration réseaux : cours et projets pratiques couvrant l\'administration système, la sécurité des réseaux, routage, commutation et technologies Huawei.",
  },
  {
    id: 'stage-reseau',
    role: 'Stage — Administration & Sécurité Réseaux',
    org: 'Stage (entreprise)',
    period: '2024 (3 mois)',
    location: 'Lomé, Togo',
    description:
      'Mise en place d\'infrastructures réseau, configuration de sécurité, monitoring et backups. Participation à audits de sécurité et hardening de serveurs.',
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-mono text-sm text-primary mb-4">&lt;parcours_pro/&gt;</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Expériences & <span className="gradient-text">Parcours</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expériences professionnelles, stages et formation — résumé de mon parcours et compétences clés.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      {exp.org} • {exp.location}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{exp.period}</div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
