import { Project } from "@/types/Project";

export const getSampleProjects = (): Project[] => [
  {
    id: "1",
    title: "NetSentinel Pro",
    description:
      "Plateforme de monitoring réseau en temps réel avec détection d'anomalies par IA",
    objectives: [
      "Surveillance 24/7",
      "Détection proactive des menaces",
      "Tableaux de bord personnalisables",
    ],
    techStack: ["Python", "InfluxDB", "Grafana", "TensorFlow", "Docker"],
    isPublic: true,
    githubUrl: "https://github.com/SIAKOU/NetSentinel",
    stars: 245,
    forks: 42,
    lastUpdate: "2024-01-15",
    category: "network",
    difficulty: "advanced",
  },
  {
    id: "2",
    title: "VulnHunter Framework",
    description:
      "Framework de scan de vulnérabilités automatisé pour infrastructures cloud",
    objectives: [
      "Scan automatisé CVE",
      "Rapports de conformité",
      "Intégration CI/CD",
    ],
    techStack: ["Go", "Rust", "PostgreSQL", "Kubernetes"],
    isPublic: true,
    githubUrl: "https://github.com/SIAKOU/VulnHunter",
    stars: 1247,
    forks: 189,
    lastUpdate: "2024-02-20",
    category: "security",
    difficulty: "expert",
  },
  {
    id: "3",
    title: "ZeroTrust Gateway",
    description:
      "Passerelle Zero Trust avec authentification continue et micro-segmentation",
    objectives: [
      "Architecture Zero Trust",
      "Authentification MFA",
      "Micro-segmentation",
    ],
    techStack: ["Go", "WireGuard", "mTLS", "OIDC"],
    isPublic: true,
    githubUrl: "https://github.com/SIAKOU/ZeroTrust-Gateway",
    stars: 532,
    forks: 78,
    lastUpdate: "2024-01-10",
    category: "security",
    difficulty: "advanced",
  },
];
