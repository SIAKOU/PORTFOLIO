import ProfileImage from '@/assets/Profile.png';
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  Download,
  Eye,
  Shield,
  Code,
  Lock,
  Server,
  Terminal,
  Cpu,
  Globe,
  Zap,
  Sparkles,
  Rocket,
  Brain,
  Network,
  Cloud,
  Database,
  Key,
  Fingerprint,
  Satellite,
  Wifi,
  Cctv,
  Target,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Coffee,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const HeroSection = () => {
  const { theme, setTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [activeParticles, setActiveParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);
  const [time, setTime] = useState("");
  const controls = useAnimation();
  const textControls = useAnimation();

  // Typing effect
  useEffect(() => {
    const texts = [
      "SIAKOU Komi Stanislas",
      "Cybersecurity Expert",
      "Full-Stack Developer",
      "Network Administrator",
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[textIndex];

      if (!isDeleting && charIndex <= currentText.length) {
        setTypingText(currentText.substring(0, charIndex));
        charIndex++;
      } else if (isDeleting && charIndex >= 0) {
        setTypingText(currentText.substring(0, charIndex));
        charIndex--;
      }

      if (!isDeleting && charIndex === currentText.length + 1) {
        isDeleting = true;
        setTimeout(type, 2000);
      } else if (isDeleting && charIndex === -1) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    };

    type();
  }, []);

  // Animated particles
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
    }));
    setActiveParticles(particles);
  }, []);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Floating icons with more variety
  const floatingIcons = [
    { Icon: Shield, delay: 0, x: "5%", y: "15%", color: "text-blue-500" },
    { Icon: Code, delay: 0.3, x: "90%", y: "25%", color: "text-purple-500" },
    { Icon: Lock, delay: 0.6, x: "10%", y: "75%", color: "text-green-500" },
    { Icon: Server, delay: 0.9, x: "85%", y: "65%", color: "text-orange-500" },
    { Icon: Terminal, delay: 1.2, x: "50%", y: "10%", color: "text-cyan-500" },
    { Icon: Cpu, delay: 1.5, x: "45%", y: "85%", color: "text-pink-500" },
    { Icon: Globe, delay: 1.8, x: "20%", y: "45%", color: "text-teal-500" },
    { Icon: Network, delay: 2.1, x: "75%", y: "50%", color: "text-yellow-500" },
  ];

  // Stats with more details
  const stats = [
    {
      value: "2+",
      label: "Années d'Expérience",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "15+",
      label: "Projets Réalisés",
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "CCNA 2",
      label: "Certification",
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "IAI-TOGO",
      label: "Formation",
      icon: BookOpen,
      color: "from-orange-500 to-red-500",
    },
  ];

  const handleScroll = (href: string) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"],
    });
  };

  const playSound = () => {
    // Implement sound effect if desired
  };

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                            linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Dynamic Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ y }}
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />

        {/* Particle System */}
        {activeParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: particle.id * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Binary Rain Effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-primary/30"
            style={{ left: `${i * 5}%`, top: "-20px" }}
            animate={{
              y: ["-20px", "120vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}

        {/* Connection Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              left: `${i * 12.5}%`,
              top: "50%",
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Floating Icons with Enhanced Effects */}
      {floatingIcons.map(({ Icon, delay, x, y, color }, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
          transition={{ delay: delay + 1, duration: 0.8, type: "spring" }}
        >
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
            className="relative group cursor-pointer"
            onClick={() => triggerConfetti()}
          >
            <div
              className={cn(
                "absolute -inset-4 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                color.replace("text-", "bg-") + "/20"
              )}
            />
            <Icon className={cn("w-16 h-16", color)} />

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: color.replace("text-", "") }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Terminal Status */}
      <div className="absolute top-8 left-8 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-3 px-4 py-2 rounded-2xl glass-card border border-primary/20"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-sm text-green-500">online</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="font-mono text-sm text-muted-foreground">
            <Satellite className="inline w-3 h-3 mr-1" />
            {time}
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="font-mono text-sm text-blue-500">
            <Wifi className="inline w-3 h-3 mr-1" />
            1.2 Gbps
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity: opacity as unknown as number }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Terminal Tag with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card border border-primary/30 mb-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-5 h-5 text-primary" />
            </motion.div>
            <div className="font-mono text-sm">
              <span className="text-primary">$ </span>
              <span className="text-muted-foreground">system_status </span>
              <span className="text-green-500">--active</span>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Animated Name & Title */}
          <div className="relative mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-0 right-0 mx-auto top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight"
            >
              <span className="block text-foreground mb-2 relative">
                {typingText}
                <motion.span
                  className="inline-block w-[3px] h-16 bg-primary ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="block text-3xl sm:text-4xl md:text-5xl gradient-text bg-gradient-to-r from-primary via-secondary to-accent"
              >
                Expert Cybersécurité & Full-Stack
              </motion.span>
            </motion.h1>

            {/* Subtitle with Enhanced Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mb-8"
            >
              <p className="text-xl sm:text-2xl text-muted-foreground font-mono">
                <span className="text-primary animate-pulse">&gt;</span>
                <motion.span
                  className="ml-2"
                  animate={{
                    textShadow: [
                      "0 0 0px #3b82f6",
                      "0 0 10px #3b82f6",
                      "0 0 0px #3b82f6",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Cybersécurité • Réseaux • Développement • Cloud • DevOps
                </motion.span>
              </p>
            </motion.div>
          </div>

          {/* Description with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-3xl mx-auto mb-12 relative"
          >
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed pl-8">
              <span className="text-primary font-semibold">
                Expert en sécurité des réseaux
              </span>{" "}
              avec une passion pour la protection des infrastructures
              numériques. Actuellement en fin de parcours en Administration
              Réseaux & Cybersécurité à l'IAI-TOGO, je combine expertise
              technique et vision stratégique pour développer des solutions
              robustes et sécurisées.
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed pl-8 mt-4"
            >
              Titulaire de la certification{" "}
              <span className="text-secondary font-semibold">CCNA 2</span>, je
              maîtrise les architectures réseau complexes et le développement
              full-stack moderne.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Button
              onClick={() => {
                handleScroll("#projets");
                triggerConfetti();
                playSound();
              }}
              variant="hero"
              size="xl"
              className="group relative overflow-hidden min-w-[200px]"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              <Eye className="w-6 h-6 mr-3 transition-transform group-hover:scale-125" />
              <span className="relative z-10 font-bold">
                Explorer les Projets
              </span>
              <ArrowRight className="w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
            </Button>

            <Button
              onClick={() => {
                handleScroll("#apropos");
                triggerConfetti();
                playSound();
              }}
              variant="heroSecondary"
              size="xl"
              className="group relative overflow-hidden min-w-[200px] border-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <Download className="w-6 h-6 mr-3 transition-transform group-hover:translate-y-1" />
              <span className="relative z-10 font-bold">
                Voir le CV Complet
              </span>
              <Sparkles className="w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 animate-spin-slow" />
            </Button>

            <Button
              onClick={() => {
                handleScroll("#contact");
                playSound();
              }}
              variant="outline"
              size="xl"
              className="group min-w-[200px] border-primary/30 hover:border-primary/50"
            >
              <Mail className="w-6 h-6 mr-3" />
              <span className="font-bold">Contact Rapide</span>
            </Button>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + index * 0.1, type: "spring" }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative group"
                >
                  {/* Background Glow */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  />

                  <div className="relative glass-card p-6 rounded-2xl border border-white/10 text-center">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20 mb-4`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <motion.div
                      className="text-4xl font-bold gradient-text mb-2"
                      animate={{
                        scale: [1, 1.1, 1],
                        textShadow: [
                          "0 0 0px currentColor",
                          "0 0 20px currentColor",
                          "0 0 0px currentColor",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {stat.value}
                    </motion.div>

                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>

                    {/* Animated underline */}
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-transparent via-current to-transparent mt-4"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 2.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tech Stack Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="mt-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Cisco",
                "React",
                "TypeScript",
                "Node.js",
                "Python",
                "Linux",
                "AWS",
                "Docker",
                "Kubernetes",
                "Terraform",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.7 + index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="px-4 py-2 rounded-full glass-card border border-white/10 text-sm font-medium hover:border-primary/50 transition-all cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => handleScroll("#apropos")}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="group p-4 rounded-2xl glass-card border border-white/10 hover:border-primary/50 transition-colors"
          aria-label="Scroll to next section"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <ChevronDown className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.span
            className="block text-xs mt-2 text-muted-foreground group-hover:text-primary transition-colors"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-3">
        <motion.button
          onClick={() => window.open("mailto:SIAKOU2006@gmail.com", "_blank")}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-2xl"
        >
          <Mail className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={triggerConfetti}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-2xl"
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Watermark Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-[20vw] font-bold tracking-widest opacity-20 select-none">
          SIAKOU
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
