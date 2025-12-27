import { motion } from "framer-motion";
import { useState } from "react";
import {
  Github,
  ExternalLink,
  Lock,
  Unlock,
  Star,
  GitFork,
  Eye,
  Shield,
  Network,
  Globe,
  Server,
  Brain,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "@/types/Project";

export const ProjectCard = ({
  project,
  index,
  isInView,
  viewMode,
  onViewClick,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  viewMode: "grid" | "list";
  onViewClick: (project: Project) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-500",
    intermediate: "bg-blue-500/20 text-blue-500",
    advanced: "bg-purple-500/20 text-purple-500",
    expert: "bg-red-500/20 text-red-500",
  };

  const categoryIcons = {
    security: Shield,
    network: Network,
    web: Globe,
    devops: Server,
    ai: Brain,
    other: Code2,
    mobile: Code2,
    iot: Code2,
    blockchain: Code2,
  };

  const CategoryIcon = categoryIcons[project.category || "other"] || Code2;

  return viewMode === "grid" ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.9, y: 20 }
      }
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Hover Glow Effect */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          project.category === "security"
            ? "bg-gradient-to-r from-red-500/20 to-orange-500/20"
            : project.category === "network"
            ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
            : project.category === "web"
            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            : project.category === "devops"
            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
            : "bg-gradient-to-r from-primary/20 to-secondary/20"
        )}
      />

      <div className="relative glass-card p-6 h-full overflow-hidden hover:border-primary/40 transition-all duration-300">
        {/* Category & Status Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
              project.isPublic
                ? "bg-green-500/20 text-green-500 border border-green-500/30"
                : "bg-amber-500/20 text-amber-500 border border-amber-500/30"
            )}
          >
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
          {project.difficulty && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                difficultyColors[project.difficulty]
              )}
            >
              {project.difficulty.charAt(0).toUpperCase() +
                project.difficulty.slice(1)}
            </span>
          )}
        </div>

        {/* Category Icon */}
        <div className="mb-6">
          <div
            className={cn(
              "inline-flex p-3 rounded-xl",
              project.category === "security"
                ? "bg-red-500/10 text-red-500"
                : project.category === "network"
                ? "bg-blue-500/10 text-blue-500"
                : project.category === "web"
                ? "bg-purple-500/10 text-purple-500"
                : project.category === "devops"
                ? "bg-green-500/10 text-green-500"
                : "bg-primary/10 text-primary"
            )}
          >
            <CategoryIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold mb-3 pr-20 line-clamp-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {project.stars !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{project.stars}</span>
              </div>
            )}
            {project.forks !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                <GitFork className="w-4 h-4 text-green-500" />
                <span className="font-medium">{project.forks}</span>
              </div>
            )}
          </div>
          {project.language && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-mono">{project.language}</span>
            </div>
          )}
        </div>

        {/* Tech Stack Preview */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-muted-foreground font-mono"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-muted-foreground">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => onViewClick(project)}
            variant="outline"
            size="sm"
            className="flex-1 group/btn"
          >
            <Eye className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
            Détails
          </Button>

          {project.githubUrl && project.isPublic && (
            <Button asChild variant="ghost" size="sm" className="px-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  ) : (
    // List View
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div
            className={cn(
              "p-3 rounded-xl",
              project.category === "security"
                ? "bg-red-500/10 text-red-500"
                : project.category === "network"
                ? "bg-blue-500/10 text-blue-500"
                : project.category === "web"
                ? "bg-purple-500/10 text-purple-500"
                : project.category === "devops"
                ? "bg-green-500/10 text-green-500"
                : "bg-primary/10 text-primary"
            )}
          >
            <CategoryIcon className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold truncate">{project.title}</h3>
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  project.isPublic
                    ? "bg-green-500/20 text-green-500"
                    : "bg-amber-500/20 text-amber-500"
                )}
              >
                {project.isPublic ? "Public" : "Privé"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Stats */}
          <div className="flex items-center gap-4">
            {project.stars !== undefined && (
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold">{project.stars}</span>
                </div>
                <span className="text-xs text-muted-foreground">Stars</span>
              </div>
            )}
            {project.forks !== undefined && (
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4 text-green-500" />
                  <span className="font-bold">{project.forks}</span>
                </div>
                <span className="text-xs text-muted-foreground">Forks</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onViewClick(project)}
              variant="ghost"
              size="sm"
            >
              <Eye className="w-4 h-4" />
            </Button>
            {project.githubUrl && project.isPublic && (
              <Button asChild variant="ghost" size="sm">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
