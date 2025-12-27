export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  objectives: string[];
  techStack: string[];
  isPublic: boolean;
  githubUrl?: string;
  demoUrl?: string;
  stars?: number;
  forks?: number;
  watchers?: number;
  lastUpdate?: string;
  createdAt?: string;
  language?: string;
  topics?: string[];
  homepage?: string;
  license?: string;
  size?: number;
  hasIssues?: boolean;
  hasProjects?: boolean;
  hasWiki?: boolean;
  archived?: boolean;
  image?: string;
  category?:
    | "security"
    | "network"
    | "web"
    | "mobile"
    | "devops"
    | "ai"
    | "iot"
    | "blockchain"
    | "other";
  difficulty?: "beginner" | "intermediate" | "advanced" | "expert";
  status?: "active" | "completed" | "archived" | "in-progress";
  screenshots?: string[];
  features?: string[];
  contributions?: string[];
  documentation?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description?: string | null;
  topics?: string[];
  language?: string | null;
  private?: boolean;
  html_url?: string;
  homepage?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  watchers_count?: number;
  updated_at?: string;
  created_at?: string;
  license?: { name?: string } | null;
  size?: number;
  has_issues?: boolean;
  has_projects?: boolean;
  has_wiki?: boolean;
  archived?: boolean;
}
