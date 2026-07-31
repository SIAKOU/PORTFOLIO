import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  FolderGit2,
  Globe,
  Github,
  ExternalLink,
  Search,
  Code2,
  Shield,
  Layout,
  Server,
  ArrowUpRight,
  Star,
  GitBranch,
  Loader2,
  AlertCircle,
  X,
  Calendar,
  Eye,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/contexts/ProjectContext";
import { useTranslation } from "react-i18next";

type FilterType = "tous" | "web" | "securite" | "api";

const categoryColors: Record<string, string> = {
  web: "from-blue-500 to-cyan-600",
  security: "from-green-500 to-emerald-600",
  network: "from-purple-500 to-pink-600",
  devops: "from-orange-500 to-red-600",
  ai: "from-cyan-500 to-blue-600",
  other: "from-gray-500 to-gray-600",
};

const INITIAL_COUNT = 6;

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { projects, isLoading, error } = useProjects();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<FilterType>("tous");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(INITIAL_COUNT);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowCount(INITIAL_COUNT);
  }, [activeFilter, search]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  const filters: { label: string; value: FilterType; icon: typeof Code2 }[] = [
    { label: t("projects.all"), value: "tous", icon: FolderGit2 },
    { label: t("projects.web"), value: "web", icon: Layout },
    { label: t("projects.security"), value: "securite", icon: Shield },
    { label: t("projects.api"), value: "api", icon: Server },
  ];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchType = activeFilter === "tous" || p.category === activeFilter;
      if (!search) return matchType;
      const q = search.toLowerCase();
      return (
        matchType &&
        (p.title.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.language && p.language.toLowerCase().includes(q)) ||
          (p.topics && p.topics.some((t: string) => t.toLowerCase().includes(q))))
      );
    });
  }, [activeFilter, search, projects]);

  const visible = useMemo(() => filtered.slice(0, showCount), [filtered, showCount]);
  const hasMore = filtered.length > showCount;

  return (
    <>
      <section id="projets" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
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
                <Code2 className="w-4 h-4" />
                {t("projects.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {t("projects.title")}
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("projects.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap items-center justify-between gap-4 mb-10"
            >
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => {
                  const Icon = f.icon;
                  return (
                    <button
                      key={f.value}
                      onClick={() => setActiveFilter(f.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all border ${
                        activeFilter === f.value
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {f.label}
                    </button>
                  );
                })}
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder={t("projects.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-white/5 border-white/10"
                />
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">{t("projects.loading")}</p>
              </div>
            ) : error && filtered.length === 0 ? (
              <div className="text-center py-16">
                <AlertCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visible.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.05 + (index % INITIAL_COUNT) * 0.05 }}
                      className="group relative cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                        <div
                          className={`h-36 flex items-center justify-center bg-gradient-to-br ${categoryColors[project.category] || "from-gray-500 to-gray-600"} opacity-15`}
                        >
                          <Globe className="w-16 h-16 text-white/30" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold group-hover:text-primary transition-colors truncate">
                              {project.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {(project.techStack as string[]).slice(0, 4).map((tech) => (
                              <span key={tech} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] text-muted-foreground">
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 4 && (
                              <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] text-muted-foreground">
                                +{project.techStack.length - 4}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                {project.stars || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitBranch className="w-3 h-3" />
                                {project.forks || 0}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                              className="flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <Eye className="w-3 h-3" />
                              Détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-10"
                  >
                    <button
                      onClick={() => setShowCount((c) => c + INITIAL_COUNT)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 text-sm font-medium hover:bg-primary/5 transition-all"
                    >
                      <ChevronDown className="w-4 h-4" />
                      Voir plus ({filtered.length - showCount} restants)
                    </button>
                  </motion.div>
                )}
              </>
            )}

            {!isLoading && filtered.length === 0 && !error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">{t("projects.no_results")}</p>
                <Button variant="ghost" onClick={() => { setActiveFilter("tous"); setSearch(""); }} className="mt-4">
                  {t("projects.reset")}
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-center mt-12"
            >
              <a href="https://github.com/SIAKOU" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/50">
                  <Github className="w-5 h-5 mr-2" />
                  {t("projects.view_github")}
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card rounded-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-5 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${categoryColors[selectedProject.category] || "from-gray-500 to-gray-600"}`}>
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold mb-1">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {selectedProject.createdAt ? new Date(selectedProject.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Code2 className="w-3 h-3" />
                      {selectedProject.language || "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {selectedProject.stars || 0} stars
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {selectedProject.forks || 0} forks
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Description
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject.techStack as string[]).map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(selectedProject.topics && selectedProject.topics.length > 0) && (
                  <div>
                    <h4 className="font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedProject.topics as string[]).map((topic) => (
                        <span key={topic} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] text-muted-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2">
                        <Github className="w-4 h-4" />
                        Voir sur GitHub
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  )}
                  {selectedProject.homepage && (
                    <a href={selectedProject.homepage} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2 border-primary/30">
                        <Globe className="w-4 h-4" />
                        Voir la démo
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
