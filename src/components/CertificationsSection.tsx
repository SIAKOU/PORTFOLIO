import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  credentialUrl?: string;
  badgeColor: string;
}

const certifications: Certification[] = [
  {
    id: 'ccna2',
    name: 'CCNA 2',
    issuer: 'Cisco',
    date: '2024',
    badgeColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'inprogress',
    name: 'Autres certifications (en cours)',
    issuer: 'En cours',
    date: '-',
    badgeColor: 'from-gray-400 to-gray-500',
  },
];

const CertificationCard = ({ cert, index, isInView }: {
  cert: Certification;
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="glass-card p-5 h-full flex flex-col items-center text-center hover:border-primary/30 transition-all duration-300">
        {/* Badge */}
        <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center mb-4 shadow-lg`}>
          <Award className="w-8 h-8 text-white" />
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Name */}
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {cert.name}
        </h3>

        {/* Issuer */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <Building2 className="w-3.5 h-3.5" />
          {cert.issuer}
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Calendar className="w-3 h-3" />
          {cert.date}
          {cert.expirationDate && ` → ${cert.expirationDate}`}
        </div>

        {/* Credential Link */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Vérifier <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 circuit-pattern opacity-30" />
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
              &lt;protocoles_validés/&gt;
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Certifications <span className="gradient-text">Professionnelles</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des accréditations reconnues mondialement, attestant d'une expertise 
              technique approfondie et constamment mise à jour.
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground font-mono">
              <span className="text-primary">&gt;</span> Formation continue : 
              <span className="text-foreground ml-2">+200 heures/an de veille et perfectionnement</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
