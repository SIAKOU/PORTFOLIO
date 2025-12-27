import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, GitHubRepo } from '@/types/Project';
import { getSampleProjects } from '@/data/sampleProjects';

interface ProjectContextType {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setIsLoading(true);
        const username = "SIAKOU";
        const token = import.meta.env.VITE_GITHUB_TOKEN;

        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };

        if (token) {
          headers["Authorization"] = `token ${token}`;
        }

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`,
          { headers }
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();

        const transformedProjects: Project[] = (repos as GitHubRepo[]).map(
          (repo: GitHubRepo) => {
            let category: Project['category'] = 'other';
            if (repo.topics?.includes('security') || repo.name.includes('security')) category = 'security';
            else if (repo.topics?.includes('network') || repo.name.includes('network')) category = 'network';
            else if (repo.topics?.includes('web') || repo.language === 'JavaScript' || repo.language === 'TypeScript') category = 'web';
            else if (repo.topics?.includes('devops') || repo.language === 'Python' || repo.language === 'Go') category = 'devops';
            else if (repo.topics?.includes('ai') || repo.topics?.includes('ml')) category = 'ai';

            let difficulty: Project['difficulty'] = 'intermediate';
            if ((repo.stargazers_count || 0) > 100) difficulty = 'advanced';
            if ((repo.stargazers_count || 0) > 500) difficulty = 'expert';

            return {
              id: repo.id.toString(),
              title: repo.name,
              description: repo.description || 'Aucune description disponible',
              longDescription: repo.description || '',
              objectives: ['Développement de fonctionnalités', 'Maintenance et améliorations', 'Documentation technique'],
              techStack: repo.language ? [repo.language, ...(repo.topics || [])] : repo.topics || [],
              isPublic: !repo.private,
              githubUrl: repo.html_url,
              demoUrl: repo.homepage || undefined,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              watchers: repo.watchers_count,
              lastUpdate: repo.updated_at,
              createdAt: repo.created_at,
              language: repo.language,
              topics: repo.topics,
              homepage: repo.homepage,
              license: repo.license?.name,
              size: repo.size,
              hasIssues: repo.has_issues,
              hasProjects: repo.has_projects,
              hasWiki: repo.has_wiki,
              archived: repo.archived,
              category,
              difficulty,
              status: repo.archived ? 'archived' : 'active',
              features: ['Open Source', 'Documentation', 'Tests automatisés'],
              contributions: ['Développement principal', 'Maintenance', 'Documentation'],
            };
          }
        );

        setProjects(transformedProjects);
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
        setError("Impossible de charger les projets GitHub. Affichage des projets de démonstration.");
        setProjects(getSampleProjects());
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);
  
  const getProjectById = (id: string) => {
    return projects.find(p => p.title === id);
  };

  const value = {
    projects,
    isLoading,
    error,
    getProjectById,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
