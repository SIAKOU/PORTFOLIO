import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  topics: string[];
  updated_at: string;
}

interface TopLanguage {
  name: string;
  count: number;
  percentage: number;
}

interface GithubContextType {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  topLanguages: TopLanguage[];
  isLoading: boolean;
  error: string | null;
}

const GithubContext = createContext<GithubContextType | undefined>(undefined);

export const useGithub = () => {
  const ctx = useContext(GithubContext);
  if (!ctx) throw new Error('useGithub must be used within GithubProvider');
  return ctx;
};

const USERNAME = 'SIAKOU';

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
        if (token) headers['Authorization'] = `token ${token}`;

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&direction=desc`, { headers }),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        if (!cancelled) {
          setUser(userData);
          setRepos(reposData);
        }
      } catch {
        if (!cancelled) setError('Impossible de charger les données GitHub');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  const langMap = new Map<string, number>();
  repos.forEach((r) => {
    if (r.language) langMap.set(r.language, (langMap.get(r.language) || 0) + 1);
  });
  const totalWithLang = [...langMap.values()].reduce((a, b) => a + b, 0);
  const topLanguages = [...langMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name, count,
      percentage: totalWithLang > 0 ? Math.round((count / totalWithLang) * 100) : 0,
    }));

  return (
    <GithubContext.Provider value={{ user, repos, totalStars, totalForks, topLanguages, isLoading, error }}>
      {children}
    </GithubContext.Provider>
  );
};
