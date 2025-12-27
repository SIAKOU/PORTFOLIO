import fs from 'fs';
import 'dotenv/config';

const SITEMAP_URL = 'https://siakou.dev'; // Remplacez par votre nom de domaine

async function fetchGitHubRepos() {
  const username = "SIAKOU";
  const token = process.env.VITE_GITHUB_TOKEN;

  const headers = {
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
    console.error(`GitHub API error: ${reposResponse.status}`);
    return [];
  }

  return reposResponse.json();
}

async function generateSitemap() {
  const repos = await fetchGitHubRepos();

  const projectUrls = repos
    .filter(repo => !repo.archived)
    .map(repo => {
      return `
        <url>
            <loc>${SITEMAP_URL}/project/${repo.name}</loc>
            <lastmod>${new Date(repo.updated_at).toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
      `;
    })
    .join('');

  const staticPages = `
    <url>
        <loc>${SITEMAP_URL}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${SITEMAP_URL}/cv</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
  `;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages}
      ${projectUrls}
    </urlset>
  `;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
