import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  Lock, 
  Unlock,
  Star,
  GitFork,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface Project {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  techStack: string[];
  isPublic: boolean;
  githubUrl?: string;
  demoUrl?: string;
  stars?: number;
  forks?: number;
  lastUpdate?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 'network-monitor',
    title: 'NetSentinel Pro',
    description: 'Plateforme de monitoring réseau en temps réel avec détection d\'anomalies par IA et alertes intelligentes.',
    objectives: [
      'Surveillance 24/7 de l\'infrastructure réseau',
      'Détection proactive des menaces',
      'Tableaux de bord personnalisables',
    ],
    techStack: ['Python', 'InfluxDB', 'Grafana', 'TensorFlow', 'Docker'],
    isPublic: true,
    githubUrl: 'https://github.com/example/netsentinel',
    stars: 245,
    forks: 42,
    lastUpdate: '2024-01',
  },
  {
    id: 'security-scanner',
    title: 'VulnHunter Framework',
    description: 'Framework de scan de vulnérabilités automatisé pour infrastructures cloud et on-premise.',
    objectives: [
      'Scan automatisé des vulnérabilités CVE',
      'Rapports de conformité détaillés',
      'Intégration CI/CD native',
    ],
    techStack: ['Go', 'Rust', 'PostgreSQL', 'Kubernetes', 'gRPC'],
    isPublic: true,
    githubUrl: 'https://github.com/example/vulnhunter',
    demoUrl: 'https://demo.vulnhunter.dev',
    stars: 1247,
    forks: 189,
    lastUpdate: '2024-02',
  },
  {
    id: 'soc-platform',
    title: 'SOC Command Center',
    description: 'Centre de commandement SOC intégré avec corrélation d\'événements et playbooks de réponse automatisés.',
    objectives: [
      'Corrélation d\'événements multi-sources',
      'Automatisation des réponses aux incidents',
      'Tableau de bord threat intelligence',
    ],
    techStack: ['Python', 'Elasticsearch', 'React', 'Redis', 'Kafka'],
    isPublic: false,
  },
  {
    id: 'crypto-vault',
    title: 'CryptoVault Enterprise',
    description: 'Solution de gestion des secrets et clés cryptographiques pour environnements haute sécurité.',
    objectives: [
      'Gestion centralisée des secrets',
      'Rotation automatique des clés',
      'Audit trail complet',
    ],
    techStack: ['Rust', 'HSM Integration', 'Vault', 'Terraform', 'AWS KMS'],
    isPublic: false,
  },
  {
    id: 'zero-trust',
    title: 'ZeroTrust Gateway',
    description: 'Passerelle Zero Trust avec authentification continue et micro-segmentation dynamique.',
    objectives: [
      'Architecture Zero Trust complète',
      'Authentification multi-facteurs',
      'Micro-segmentation réseau',
    ],
    techStack: ['Go', 'WireGuard', 'mTLS', 'OIDC', 'Kubernetes'],
    isPublic: true,
    githubUrl: 'https://github.com/example/zerotrust-gateway',
    stars: 532,
    forks: 78,
    lastUpdate: '2024-01',
  },
  {
    id: 'threat-intel',
    title: 'ThreatIntel Aggregator',
    description: 'Agrégateur de threat intelligence avec enrichissement automatique et scoring de menaces.',
    objectives: [
      'Agrégation multi-sources OSINT',
      'Enrichissement contextuel automatique',
      'API de requêtes temps réel',
    ],
    techStack: ['Python', 'MISP', 'Neo4j', 'FastAPI', 'Machine Learning'],
    isPublic: false,
  },
];

const ProjectCard = ({ project, index, isInView }: {
  project: Project;
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const shortSummary = (project.description || '').length > 120
    ? (project.description || '').slice(0, 117) + '...'
    : project.description || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card h-full overflow-hidden transition-all duration-500 ${
        isHovered ? 'border-primary/40 shadow-[0_0_30px_hsl(195_100%_50%/0.15)]' : ''
      }`}>
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono ${
            project.isPublic 
              ? 'bg-accent/20 text-accent border border-accent/30' 
              : 'bg-secondary/20 text-secondary border border-secondary/30'
          }`}>
            {project.isPublic ? (
              <>
                <Unlock className="w-3 h-3" />
                Public
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                Privé
              </>
            )}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 pr-20">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {shortSummary}
          </p>

          {/* Tech Stack (up to 3 tags) */}
          <div className="mb-4">
            <h4 className="text-xs font-mono text-primary mb-2">&gt; stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0,3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Stats are available inside 'Afficher plus' modal */}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {project.isPublic ? (
              <>
                {project.githubUrl && (
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                )}

                {/* Afficher plus: open modal with full info */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <ArrowRight className="w-4 h-4" />
                      Afficher plus
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>{project.description}</DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-3">
                      {project.objectives.length > 0 && (
                        <div>
                          <h4 className="text-sm font-mono text-primary mb-2">&gt; Objectifs</h4>
                          <ul className="list-disc ml-5 text-sm text-muted-foreground">
                            {project.objectives.map((o, i) => (
                              <li key={i}>{o}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.techStack.length > 0 && (
                        <div>
                          <h4 className="text-sm font-mono text-primary mb-2">&gt; Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map(t => (
                              <span key={t} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground font-mono">{t}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {project.stars !== undefined && (
                          <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{project.stars}</div>
                        )}
                        {project.forks !== undefined && (
                          <div className="flex items-center gap-1"><GitFork className="w-4 h-4" />{project.forks}</div>
                        )}
                        {project.lastUpdate && (
                          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{project.lastUpdate}</div>
                        )}
                      </div>
                    </div>

                    <DialogFooter>
                      {project.githubUrl && (
                        <Button asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Voir le dépôt</a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button variant="outline" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Voir la démo</a>
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Button variant="heroSecondary" size="sm" className="w-full">
                <Lock className="w-4 h-4" />
                Demander l'Accès
              </Button>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const publicProjects = projects.filter(p => p.isPublic);

  const [fetchedProjects, setFetchedProjects] = useState<Project[] | null>(null);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchRepos = async () => {
      setIsLoadingRepos(true);
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
        const headers: Record<string, string> = { 'Accept': 'application/vnd.github+json' };
        if (token) headers['Authorization'] = `token ${token}`;

        const resp = await fetch('https://api.github.com/users/SIAKOU/repos?per_page=100&sort=updated', { headers });
        if (!resp.ok) throw new Error('GitHub API error');
        const data = await resp.json();

        const mapped: Project[] = data.map((r: any) => ({
          id: String(r.id),
          title: r.name,
          description: r.description || '',
          objectives: [],
          techStack: r.language ? [r.language] : [],
          isPublic: !r.private,
          githubUrl: r.html_url,
          demoUrl: r.homepage || undefined,
          stars: r.stargazers_count,
          forks: r.forks_count,
          lastUpdate: r.updated_at ? r.updated_at.slice(0, 7) : undefined,
        }));

        if (!cancelled) setFetchedProjects(mapped.filter(p => p.isPublic));
      } catch (err) {
        console.error('Failed to fetch GitHub repos', err);
        if (!cancelled) setFetchedProjects([]);
      } finally {
        if (!cancelled) setIsLoadingRepos(false);
      }
    };

    fetchRepos();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="projets" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-3xl" />
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
              &lt;portfolio_flux_données/&gt;
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Projets & <span className="gradient-text">Réalisations</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une sélection de projets démontrant mon expertise en sécurité, 
              infrastructure et développement d'outils critiques.
            </p>
          </motion.div>

            {/* Public Projects */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-lg font-mono text-accent mb-6"
            >
              <Unlock className="w-5 h-5" />
              Projets Open Source
            </motion.h3>
            <div className="flex justify-end mb-4">
              <a href="https://github.com/SIAKOU" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost">Voir tous les dépôts</Button>
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingRepos && (
                <div className="col-span-3 text-center text-muted-foreground">Chargement des dépôts GitHub...</div>
              )}
              {(fetchedProjects && fetchedProjects.length > 0 ? fetchedProjects : publicProjects).map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  isInView={isInView} 
                />
              ))}
              {fetchedProjects && fetchedProjects.length === 0 && (
                <div className="col-span-3 text-center text-muted-foreground">Aucun dépôt public trouvé — vérifiez votre compte GitHub ou votre token.</div>
              )}
            </div>
          </div>
          {/* Private projects are intentionally not shown */}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
