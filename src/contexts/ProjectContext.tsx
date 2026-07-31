import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Project } from '@/types/Project';
import { getSampleProjects } from '@/data/sampleProjects';
import { useGithub } from '@/contexts/GithubContext';

interface ProjectContextType {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { repos, isLoading: githubLoading, error: githubError } = useGithub();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (githubLoading) return;

    if (repos.length === 0) {
      setError('Impossible de charger les projets GitHub. Affichage des projets de démonstration.');
      setProjects(getSampleProjects());
      return;
    }

    const transformed: Project[] = repos.map((repo) => {
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
        id: repo.name,
        title: repo.name,
        description: repo.description || 'Aucune description disponible',
        longDescription: repo.description || '',
        objectives: ['Développement de fonctionnalités', 'Maintenance et améliorations', 'Documentation technique'],
        techStack: repo.language ? [repo.language, ...(repo.topics || [])] : repo.topics || [],
        isPublic: true,
        githubUrl: repo.html_url,
        demoUrl: undefined,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: 0,
        lastUpdate: repo.updated_at,
        createdAt: repo.updated_at,
        language: repo.language,
        topics: repo.topics,
        homepage: undefined,
        license: undefined,
        size: 0,
        hasIssues: false,
        hasProjects: false,
        hasWiki: false,
        archived: false,
        category,
        difficulty,
        status: 'active',
        features: ['Open Source', 'Documentation'],
        contributions: ['Développement principal', 'Maintenance'],
      };
    });

    setProjects(transformed);
    if (githubError) setError(githubError);
  }, [repos, githubLoading, githubError]);

  const getProjectById = (id: string) => projects.find(p => p.id === id);

  return (
    <ProjectContext.Provider value={{ projects, isLoading: githubLoading, error, getProjectById }}>
      {children}
    </ProjectContext.Provider>
  );
};
