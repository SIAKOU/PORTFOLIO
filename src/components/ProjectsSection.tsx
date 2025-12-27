import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  ExternalLink,
  Code2,
  Cpu,
  Server,
  Shield,
  Network,
  Search,
  TrendingUp,
  Users,
  Brain,
  Layers,
  BarChart3,
  Star,
  GitFork,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { Project } from "@/types/Project";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/contexts/ProjectContext";

// Missing icons components
const AlertCircle = ({ className }: { className?: string }) => (
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
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const INITIAL_VISIBLE_PROJECTS = 6;

const ProjectsSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const { projects, isLoading, error } = useProjects();

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(INITIAL_VISIBLE_PROJECTS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "stars" | "updated" | "created" | "forks"
  >("stars");
  const [showArchived, setShowArchived] = useState(false);

  // Categories avec icônes
  const categories = [
    {
      id: "all",
      label: "Tous",
      icon: Layers,
      color: "from-primary to-secondary",
    },
    {
      id: "security",
      label: "Sécurité",
      icon: Shield,
      color: "from-red-500 to-orange-500",
    },
    {
      id: "network",
      label: "Réseau",
      icon: Network,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "web",
      label: "Web",
      icon: Code2,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "devops",
      label: "DevOps",
      icon: Server,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "ai",
      label: "IA/ML",
      icon: Brain,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: "other",
      label: "Autres",
      icon: Code2,
      color: "from-gray-500 to-gray-400",
    },
  ];

  const stats = useMemo(() => {
    return projects.reduce(
      (acc, p) => {
        acc.total++;
        if (p.isPublic) acc.public++;
        acc.stars += p.stars || 0;
        acc.forks += p.forks || 0;
        if (p.language) {
          acc.languages[p.language] = (acc.languages[p.language] || 0) + 1;
        }
        if (p.category) {
          acc.categories[p.category] = (acc.categories[p.category] || 0) + 1;
        }
        return acc;
      },
      {
        total: 0,
        public: 0,
        stars: 0,
        forks: 0,
        languages: {} as Record<string, number>,
        categories: {} as Record<string, number>,
      }
    );
  }, [projects]);

  // Filter and sort projects
  useEffect(() => {
    let result = projects;

    // Filter by archived status
    if (!showArchived) {
      result = result.filter((p) => !p.archived);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.techStack.some((tech) => tech.toLowerCase().includes(term))
      );
    }

    // Sort projects
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return (b.stars || 0) - (a.stars || 0);
        case "forks":
          return (b.forks || 0) - (a.forks || 0);
        case "updated":
          return (
            new Date(b.lastUpdate || 0).getTime() -
            new Date(a.lastUpdate || 0).getTime()
          );
        case "created":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredProjects(result);
  }, [projects, selectedCategory, searchTerm, sortBy, showArchived]);

  const handleViewProject = (project: Project) => {
    navigate(`/project/${project.title}`);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
    });
  };

  const projectsToShow = useMemo(() => {
    return filteredProjects.slice(0, visibleProjectsCount);
  }, [filteredProjects, visibleProjectsCount]);

  return (
    <section
      id="projets"
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%2300C6FF' stroke-opacity='0.1' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i * 12.5 + 6.25}%`,
              top: "20%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Code2 className="w-8 h-8 text-primary/20" />
          </motion.div>
        ))}
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
              <Code2 className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                portfolio_projects
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-accent">
                Projets & Réalisations
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explorez mon portfolio de projets open-source, d'outils
              pratiques et d'applications innovantes développées avec passion
              et expertise.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                icon: Star,
                label: "Stars Total",
                value: stats.stars,
                color: "from-yellow-500 to-amber-500",
                description: "Popularité GitHub",
              },
              {
                icon: GitFork,
                label: "Forks",
                value: stats.forks,
                color: "from-green-500 to-emerald-500",
                description: "Contributions communautaires",
              },
              {
                icon: Code2,
                label: "Projets",
                value: stats.public,
                color: "from-blue-500 to-cyan-500",
                description: "Repos publics",
              },
              {
                icon: Users,
                label: "Languages",
                value: Object.keys(stats.languages).length,
                color: "from-purple-500 to-pink-500",
                description: "Diversité technique",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl text-center cursor-pointer"
                  onClick={triggerConfetti}
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6 rounded-2xl mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un projet, une technologie..."
                  className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full border transition-all",
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white border-transparent`
                          : "glass-card border-white/10 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{category.label}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/10">
                        {stats.categories[category.id] || 0}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Trier par:
                  </span>
                  <select
                    className="bg-transparent border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "stars" | "updated" | "forks" | "created"
                      )
                    }
                  >
                    <option value="stars">Popularité</option>
                    <option value="updated">Dernière mise à jour</option>
                    <option value="forks">Forks</option>
                    <option value="created">Date de création</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Layers className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid/List */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-12 h-12 text-primary/50" />
              </motion.div>
              <p className="mt-4 text-muted-foreground">
                Chargement des projets depuis GitHub...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 mb-4">{error}</p>
              <p className="text-muted-foreground mb-6">
                Affichage des projets de démonstration
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Réessayer
              </Button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">
                Aucun projet trouvé
              </p>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : (
            <>
              <div
                className={cn(
                  "transition-all duration-300",
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                )}
              >
                {projectsToShow.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isInView={isInView}
                    viewMode={viewMode}
                    onViewClick={handleViewProject}
                  />
                ))}
              </div>

              {filteredProjects.length > visibleProjectsCount && (
                <div className="text-center mt-12">
                  <Button
                    onClick={() =>
                      setVisibleProjectsCount((prev) => prev + INITIAL_VISIBLE_PROJECTS)
                    }
                    variant="outline"
                    size="lg"
                  >
                    Voir plus
                  </Button>
                </div>
              )}
               {visibleProjectsCount > INITIAL_VISIBLE_PROJECTS && (
                <div className="text-center mt-4">
                  <Button
                    onClick={() => setVisibleProjectsCount(INITIAL_VISIBLE_PROJECTS)}
                    variant="ghost"
                    size="lg"
                  >
                    Afficher moins
                  </Button>
                </div>
              )}
            </>
          )}

          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.8 }}
            className="mt-20"
          >
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    Activité GitHub
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Contribue activement à l'écosystème open-source avec{" "}
                    <span className="text-primary font-bold">
                      {stats.public} projets publics
                    </span>
                    , recevant un total de{" "}
                    <span className="text-secondary font-bold">
                      {stats.stars} stars
                    </span>{" "}
                    et{" "}
                    <span className="text-accent font-bold">
                      {stats.forks} forks
                    </span>{" "}
                    de la communauté.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(stats.languages)
                      .slice(0, 4)
                      .map(([lang, count]) => (
                        <div key={lang} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-sm">{lang}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="https://github.com/SIAKOU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button variant="hero" size="lg" className="group">
                      <Github className="w-5 h-5 mr-2" />
                      Voir le profil GitHub
                      <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default ProjectsSection;
