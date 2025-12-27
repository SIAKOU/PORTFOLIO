import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Project } from "@/types/Project";
import { Helmet } from "react-helmet-async";
import {
  Star,
  GitFork,
  Eye,
  Calendar,
  Layers,
  BookOpen,
  Github,
  ExternalLink,
  Coffee,
  Shield,
  Network,
  Globe,
  Server,
  Code2,
  Cpu,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById, isLoading } = useProjects();
  const [project, setProject] = useState<Project | undefined>();

  useEffect(() => {
    if (id) {
      const foundProject = getProjectById(id);
      setProject(foundProject);
    }
  }, [id, getProjectById]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-24 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Cpu className="w-16 h-16 text-primary" />
        </motion.div>
        <p className="mt-4 text-lg text-muted-foreground">
          Chargement du projet...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-24 text-center">
        <Helmet>
          <title>Projet non trouvé</title>
          <meta name="description" content="Le projet demandé n'a pas pu être trouvé." />
        </Helmet>
        <h1 className="text-4xl font-bold text-red-500">Projet non trouvé</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Le projet que vous cherchez n'existe pas ou n'a pas pu être chargé.
        </p>
      </div>
    );
  }

  const categoryIcons = {
    security: Shield,
    network: Network,
    web: Globe,
    devops: Server,
    ai: Code2,
    other: Code2,
    mobile: Code2,
    iot: Code2,
    blockchain: Code2,
  };

  const CategoryIcon = categoryIcons[project.category || "other"] || Code2;

  return (
    <>
      <Helmet>
        <title>{`${project.title} - Projet de SIAKOU K. Stanislas`}</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <div className="container mx-auto py-24 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${
              project.category === "security"
                ? "from-red-500 to-orange-500"
                : project.category === "network"
                ? "from-blue-500 to-cyan-500"
                : project.category === "web"
                ? "from-purple-500 to-pink-500"
                : project.category === "devops"
                ? "from-green-500 to-emerald-500"
                : "from-gray-500 to-gray-400"
            }`}
          >
            <CategoryIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-lg text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Star,
                label: "Stars",
                value: project.stars || 0,
                color: "text-yellow-500",
              },
              {
                icon: GitFork,
                label: "Forks",
                value: project.forks || 0,
                color: "text-green-500",
              },
              {
                icon: Eye,
                label: "Watchers",
                value: project.watchers || 0,
                color: "text-blue-500",
              },
              {
                icon: Calendar,
                label: "Mis à jour",
                value: project.lastUpdate
                  ? new Date(project.lastUpdate).toLocaleDateString("fr-FR")
                  : "N/A",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-4 rounded-xl text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              Technologies Utilisées
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-md px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Description Détaillée
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-8 z-20 flex items-center justify-end p-6 bg-background/80 backdrop-blur-lg rounded-xl border border-white/10">
            <div className="flex gap-4">
              {project.githubUrl && (
                <Button asChild size="lg">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Voir sur GitHub
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild variant="outline" size="lg">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Voir la démo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
