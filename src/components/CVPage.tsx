import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin,
  Calendar,
  Award,
  Briefcase,
  BookOpen,
  Code,
  Server,
  Shield,
  Database,
  Cloud,
  Network,
  Terminal,
  Cpu,
  Wifi,
  Lock,
  Zap,
  Star,
  ChevronLeft,
  ExternalLink,
  FileText,
  GraduationCap,
  Building,
  Languages,
  Wrench,
  Users,
  Target,
  Heart,
  Coffee,
  Moon,
  Sun,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const CVPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  // Transformations pour les effets de parallaxe
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      // Update active section
      const sections = ['profile', 'experience', 'education', 'skills', 'projects', 'certifications'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
    });
  };

  const personalInfo = {
    name: "SIAKOU Komi Stanislas",
    title: "Expert Cybersécurité & DevOps",
    email: "SIAKOU2006@gmail.com",
    phone: "+228 92 10 47 81",
    location: "Lomé, Togo",
    website: "https://siakou.portfolio.com",
    github: "github.com/SIAKOU",
    linkedin: "linkedin.com/in/siakou-stanislas",
  };

  const experiences = [
    {
      year: "2023 - Présent",
      title: "Consultant Cybersécurité",
      company: "TechSecure Togo",
      description: "Audits de sécurité, configuration de pare-feux, implémentation de politiques de sécurité",
      technologies: ["Cisco ASA", "Wireshark", "Metasploit", "SIEM"],
      icon: Shield,
    },
    {
      year: "2022 - 2023",
      title: "Administrateur Réseaux",
      company: "Digital Solutions Africa",
      description: "Gestion d'infrastructure réseau, maintenance serveurs, support technique niveau 3",
      technologies: ["Cisco IOS", "Ubuntu Server", "VMware", "Docker"],
      icon: Server,
    },
    {
      year: "2021 - 2022",
      title: "Développeur Full-Stack",
      company: "WebInnov SARL",
      description: "Développement d'applications web sécurisées, API REST, bases de données",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      icon: Code,
    },
  ];

  const education = [
    {
      year: "2022 - 2024",
      degree: "Licence en Administration Réseaux & Cybersécurité",
      institution: "Institut Africain d'Informatique (IAI-TOGO)",
      grade: "En cours",
      icon: GraduationCap,
    },
    {
      year: "2021 - 2022",
      degree: "Certification CCNA 1 & 2",
      institution: "Cisco Networking Academy",
      grade: "Certifié",
      icon: Award,
    },
    {
      year: "2020",
      degree: "Baccalauréat Scientifique",
      institution: "Lycée Scientifique de Lomé",
      grade: "Mention Bien",
      icon: BookOpen,
    },
  ];

  const skills = [
    {
      category: "Cybersécurité",
      items: [
        { name: "Analyse de vulnérabilités", level: 90 },
        { name: "Pare-feux & VPN", level: 85 },
        { name: "Forensic numérique", level: 80 },
        { name: "Pentesting", level: 75 },
      ],
      icon: Shield,
      color: "from-red-500 to-orange-500",
    },
    {
      category: "Réseaux",
      items: [
        { name: "Cisco IOS/NX-OS", level: 95 },
        { name: "Routage & Commutation", level: 90 },
        { name: "Protocoles TCP/IP", level: 88 },
        { name: "WiFi Sécurisé", level: 85 },
      ],
      icon: Network,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Développement",
      items: [
        { name: "React/TypeScript", level: 85 },
        { name: "Node.js/Python", level: 80 },
        { name: "Bases de données", level: 75 },
        { name: "DevOps CI/CD", level: 70 },
      ],
      icon: Code,
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "Cloud & DevOps",
      items: [
        { name: "AWS/Azure", level: 75 },
        { name: "Docker/Kubernetes", level: 70 },
        { name: "Terraform", level: 65 },
        { name: "Monitoring", level: 70 },
      ],
      icon: Cloud,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const certifications = [
    { name: "CCNA 2: Routing & Switching", issuer: "Cisco", year: "2023", icon: Award },
    { name: "Security+", issuer: "CompTIA", year: "2023", icon: Shield },
    { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2024", icon: Cloud },
    { name: "Linux Professional Institute", issuer: "LPI", year: "2023", icon: Terminal },
  ];

  const languages = [
    { name: "Français", level: "Langue maternelle", proficiency: 100 },
    { name: "Anglais", level: "Courant professionnel", proficiency: 85 },
    { name: "Espagnol", level: "Intermédiaire", proficiency: 60 },
  ];

  const projects = [
    {
      title: "Système de Détection d'Intrusion",
      description: "Développement d'un IDS basé sur l'IA pour la détection d'anomalies réseau",
      technologies: ["Python", "TensorFlow", "Elasticsearch", "Kibana"],
      status: "Terminé",
    },
    {
      title: "Plateforme de Formation Cybersécurité",
      description: "Application web interactive pour la formation en sécurité informatique",
      technologies: ["React", "Node.js", "MongoDB", "Docker"],
      status: "En développement",
    },
    {
      title: "Automation d'Infrastructure",
      description: "Scripts d'automatisation pour le déploiement et la configuration réseau",
      technologies: ["Ansible", "Python", "Terraform", "GitLab CI"],
      status: "Terminé",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          style={{ y: y2 }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                            linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-white/10"
        style={{ opacity }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <ChevronLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm">Retour au Portfolio</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <a href="/CV-de-graphiste.pdf" download>
                <Button variant="hero" size="sm" onClick={triggerConfetti}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </Button>
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div ref={containerRef} className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-12"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-secondary" />
            
            <div className="text-center py-12">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 gradient-text bg-gradient-to-r from-primary via-secondary to-accent">
                Curriculum Vitae
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Expert en Cybersécurité & Développement Full-Stack • Spécialiste Infrastructure & Cloud
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-2xl"
                id="profile"
              >
                <div className="text-center mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 mx-auto mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Users className="w-16 h-16 text-primary/50" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{personalInfo.name}</h2>
                  <p className="text-primary font-mono">{personalInfo.title}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-primary" />
                    <span>{personalInfo.website}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Réseaux Sociaux
                  </h3>
                  <div className="flex gap-3">
                    <a href={`https://${personalInfo.github}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={`https://${personalInfo.linkedin}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-primary" />
                  Langues
                </h3>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{lang.name}</span>
                        <span className="text-xs text-muted-foreground">{lang.level}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          style={{ width: `${lang.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Interests */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Centres d'intérêt
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Veille technologique', 'Cybersécurité', 'IA & Machine Learning', 'Blockchain', 'Photographie', 'Voyage'].map((interest) => (
                    <span key={interest} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Profil Professionnel
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Expert en cybersécurité et développement full-stack avec plus de 2 ans d'expérience 
                  dans la conception, l'implémentation et la sécurisation d'infrastructures IT. 
                  Passionné par les nouvelles technologies, je combine expertise technique et vision 
                  stratégique pour développer des solutions robustes et sécurisées.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Spécialisé en réseaux Cisco, administration Linux/Windows, et développement 
                  d'applications web modernes. Toujours à la recherche de nouveaux défis techniques 
                  et opportunités d'apprentissage.
                </p>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 rounded-2xl"
                id="experience"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Expérience Professionnelle
                </h2>
                <div className="space-y-8">
                  {experiences.map((exp, index) => {
                    const Icon = exp.icon;
                    return (
                      <motion.div
                        key={exp.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="relative pl-10"
                      >
                        <div className="absolute left-0 top-0 p-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                          <span className="font-mono text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {exp.year}
                          </span>
                        </div>
                        <p className="text-secondary font-medium mb-3">{exp.company}</p>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-2xl"
                id="skills"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Wrench className="w-6 h-6 text-primary" />
                  Compétences Techniques
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.category} className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-20`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-lg">{skill.category}</h3>
                        </div>
                        <div className="space-y-3">
                          {skill.items.map((item) => (
                            <div key={item.name} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm">{item.name}</span>
                                <span className="text-xs text-muted-foreground">{item.level}%</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.level}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Education & Certifications */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-6 rounded-2xl"
                  id="education"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    Formation
                  </h2>
                  <div className="space-y-6">
                    {education.map((edu, index) => {
                      const Icon = edu.icon;
                      return (
                        <div key={edu.degree} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold">{edu.degree}</h3>
                            <span className="text-sm text-primary">{edu.year}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="w-4 h-4" />
                            {edu.institution}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {edu.grade}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card p-6 rounded-2xl"
                  id="certifications"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    Certifications
                  </h2>
                  <div className="space-y-4">
                    {certifications.map((cert) => {
                      const Icon = cert.icon;
                      return (
                        <div key={cert.name} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                          <Icon className="w-8 h-8 text-primary" />
                          <div>
                            <h3 className="font-bold">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-8 rounded-2xl"
                id="projects"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Code className="w-6 h-6 text-primary" />
                  Projets Significatifs
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <div key={project.title} className="p-4 rounded-xl border border-white/10 bg-white/5">
                      <h3 className="font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'Terminé' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {project.status}
                        </span>
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-2xl shadow-primary/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SIAKOU Komi Stanislas • CV mis à jour le {new Date().toLocaleDateString('fr-FR')}
          <span className="mx-2">•</span>
          <Coffee className="inline w-4 h-4 mx-1" />
          Fait avec passion
        </p>
      </footer>
    </div>
  );
};

export default CVPage;