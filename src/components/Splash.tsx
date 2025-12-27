import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation, type Variants } from "framer-motion";
import {
  X,
  Sparkles,
  Zap,
  Rocket,
  Shield,
  Cpu,
  Loader2,
  SkipForward,
  ArrowRight,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import logo from "@/assets/logo.png";

type Props = {
  onFinish?: () => void;
  duration?: number;
  showSkip?: boolean;
  showProgress?: boolean;
  logoSize?: "sm" | "md" | "lg" | "xl";
  theme?: "dark" | "light" | "gradient" | "cyber" | "neon";
  title?: string;
  subtitle?: string;
  enableSounds?: boolean;
  enableConfetti?: boolean;
  skipAnimation?: boolean;
  showStats?: boolean;
  customLogo?: string;
  loadingPhrases?: string[];
};

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const Splash = ({
  onFinish,
  duration = 2500,
  showSkip = true,
  showProgress = true,
  logoSize = "lg",
  theme = "cyber",
  title = "SIAKOU PORTFOLIO",
  subtitle = "Initialisation du système en cours...",
  enableSounds = true,
  enableConfetti = true,
  skipAnimation = false,
  showStats = true,
  customLogo,
  loadingPhrases = [
    "Chargement des composants...",
    "Optimisation des performances...",
    "Initialisation de la sécurité...",
    "Configuration du réseau...",
    "Préparation de l'interface...",
  ],
}: Props) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [stats, setStats] = useState({
    loadTime: 0,
    memoryUsage: 0,
    componentsLoaded: 0,
    cacheStatus: "warming",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const controls = useAnimation();
  const logoControls = useAnimation();
  const particleCount = 50;

  // Tailles du logo améliorées
  const logoSizeClasses = {
    sm: "h-20 w-20 md:h-24 md:w-24",
    md: "h-28 w-28 md:h-32 md:w-32",
    lg: "h-36 w-36 md:h-40 md:w-40",
    xl: "h-44 w-44 md:h-48 md:w-48",
  }[logoSize];

  // Thèmes premium
  const themeConfigs = {
    dark: {
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      text: "text-white",
      accent: "from-blue-500 to-cyan-500",
      glow: "shadow-[0_0_60px_rgba(59,130,246,0.3)]",
    },
    light: {
      bg: "bg-gradient-to-br from-white via-blue-50 to-gray-100",
      text: "text-gray-900",
      accent: "from-blue-600 to-indigo-600",
      glow: "shadow-[0_0_60px_rgba(59,130,246,0.2)]",
    },
    gradient: {
      bg: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
      text: "text-white",
      accent: "from-white to-gray-100",
      glow: "shadow-[0_0_80px_rgba(139,92,246,0.4)]",
    },
    cyber: {
      bg: "bg-gradient-to-br from-gray-900 via-cyan-900/30 to-gray-900",
      text: "text-cyan-100",
      accent: "from-cyan-400 to-blue-500",
      glow: "shadow-[0_0_100px_rgba(6,182,212,0.4)]",
    },
    neon: {
      bg: "bg-gradient-to-br from-purple-900 via-pink-900/30 to-purple-900",
      text: "text-pink-100",
      accent: "from-pink-400 to-purple-500",
      glow: "shadow-[0_0_100px_rgba(236,72,153,0.4)]",
    },
  }[theme];

  // Simulation de statistiques système
  useEffect(() => {
    if (!showStats) return;

    const interval = setInterval(() => {
      setStats((prev) => ({
        loadTime: Date.now() - startTimeRef.current,
        memoryUsage: Math.min(100, prev.memoryUsage + Math.random() * 5),
        componentsLoaded: Math.min(
          100,
          prev.componentsLoaded + Math.random() * 10
        ),
        cacheStatus: prev.componentsLoaded > 50 ? "active" : "warming",
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [showStats]);

  // Rotation des phrases de chargement
  useEffect(() => {
    if (!showProgress) return;

    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % loadingPhrases.length);
    }, 800);

    return () => clearInterval(interval);
  }, [showProgress, loadingPhrases.length]);

  // Animation de progression améliorée
  useEffect(() => {
    if (!showProgress || isExiting) return;

    const startTime = Date.now();
    const targetTime = skipAnimation ? 500 : duration;
    const frameRate = 60;
    const interval = 1000 / frameRate;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / targetTime) * 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [duration, showProgress, isExiting, skipAnimation]);

  // Effets audio (optionnel)
  const playSound = useCallback(
    (frequency: number, duration: number) => {
      if (!enableSounds || isMuted || !(window.AudioContext || window.webkitAudioContext)) return;

      try {
        if (!audioContextRef.current) {
          const AC = (window.AudioContext ?? window.webkitAudioContext) as
            | typeof AudioContext
            | undefined;
          if (!AC) return;
          audioContextRef.current = new AC();
        }

        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContextRef.current.currentTime + duration
        );

        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + duration);
      } catch (error) {
        console.warn("Audio context not supported:", error);
      }
    },
    [enableSounds, isMuted]
  );

  // Animation de confetti
  const triggerConfetti = useCallback(() => {
    if (!enableConfetti) return;

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
      disableForReducedMotion: true,
    });

    // Confetti secondaire
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ["#06b6d4", "#3b82f6"],
      });

      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ["#8b5cf6", "#ec4899"],
      });
    }, 250);
  }, [enableConfetti]);

  // Effets de particules premium
  useEffect(() => {
    if (!containerRef.current || !visible) return;

    const particles: HTMLDivElement[] = [];
    const colors = ["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.className = "absolute rounded-full pointer-events-none";
      particle.style.background = `radial-gradient(circle at center, ${color}, transparent 70%)`;
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      particle.style.filter = "blur(1px)";

      containerRef.current.appendChild(particle);
      particles.push(particle);

      // Animation personnalisée pour chaque particule
      const animation = particle.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: particle.style.opacity,
          },
          {
            transform: `translate(${Math.random() * 100 - 50}px, ${
              Math.random() * -100 - 50
            }px) scale(0)`,
            opacity: "0",
          },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "cubic-bezier(0.2, 0, 0.8, 1)",
          delay: Math.random() * 1000,
        }
      );

      animation.onfinish = () => {
        particle.remove();
        const index = particles.indexOf(particle);
        if (index > -1) particles.splice(index, 1);
      };
    }

    return () => {
      particles.forEach((particle) => {
        particle.getAnimations().forEach((anim) => anim.cancel());
        particle.remove();
      });
    };
  }, [visible]);

  // Animation de logo
  useEffect(() => {
    if (!visible) return;

    logoControls.start({
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      },
    });
  }, [visible, logoControls]);

  // Animation d'entrée
  useEffect(() => {
    if (visible) {
      controls.start("visible");
      playSound(440, 0.1);
    }
  }, [visible, controls, playSound]);

  const handleExit = useCallback(async () => {
    setIsExiting(true);

    // Animation de sortie
    await controls.start("exit");

    // Effets de fin
    if (enableConfetti) triggerConfetti();
    playSound(523.25, 0.2);

    // Fermeture avec délai
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => onFinish?.(), 300);
    }, 500);
  }, [controls, enableConfetti, triggerConfetti, playSound, onFinish]);

  // Timer principal amélioré
  useEffect(() => {
    if (isExiting || skipAnimation) return;

    const timer = setTimeout(() => {
      handleExit();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isExiting, skipAnimation, handleExit]);

  const handleSkip = useCallback(async () => {
    setProgress(100);
    playSound(659.25, 0.15);
    await handleExit();
  }, [handleExit, playSound]);

  const handleAdvancedClick = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
    playSound(392, 0.1);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    playSound(349.23, 0.1);
  };

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        // leave easing unspecified to satisfy TypeScript transition typing
      },
    },
  } as Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // custom eased curve removed to satisfy typing; default easing will apply
      },
    },
  } as Variants;

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        // use default spring settings implicitly to avoid strict typing on 'type'
        stiffness: 200,
        damping: 15,
      },
    },
  } as Variants;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Arrière-plan premium */}
          <div className={`absolute inset-0 ${themeConfigs.bg}`}>
            {/* Effets de lumière dynamiques */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(circle at 20% 30%, rgba(6,182,212,0.15) 0%, transparent 50%)`,
                  `radial-gradient(circle at 80% 70%, rgba(139,92,246,0.15) 0%, transparent 50%)`,
                  `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)`,
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Grille animée */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(90deg, #888 1px, transparent 1px),
                                linear-gradient(180deg, #888 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                animation: "gridMove 20s linear infinite",
              }}
            />

            {/* Lignes de connexion */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                style={{ top: `${20 + i * 15}%` }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Contenu principal */}
          <div className="relative flex h-full items-center justify-center p-4 md:p-8">
            <motion.div
              variants={containerVariants}
              className="relative z-20 flex max-w-2xl flex-col items-center gap-8 md:gap-12 text-center"
            >
              {/* Contrôles avancés */}
              <motion.div
                className="absolute top-4 right-4 flex flex-col gap-2"
                variants={itemVariants}
              >
                <motion.button
                  onClick={handleAdvancedClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                >
                  <Terminal className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {showAdvancedOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-2 p-3 rounded-lg bg-black/50 backdrop-blur-xl border border-white/10"
                    >
                      <button
                        onClick={handleMuteToggle}
                        className="p-2 rounded-lg hover:bg-white/5 flex items-center gap-2"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                        <span className="text-xs">
                          {isMuted ? "Son activé" : "Son désactivé"}
                        </span>
                      </button>
                      <button
                        onClick={() => setIsMuted(false)}
                        className="p-2 rounded-lg hover:bg-white/5 flex items-center gap-2"
                      >
                        {theme === "dark" ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Moon className="w-4 h-4" />
                        )}
                        <span className="text-xs">Thème</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Logo avec effets premium */}
              <motion.div
                variants={logoVariants}
                animate={logoControls}
                className="relative"
              >
                {/* Halo animé */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 0 0 rgba(6,182,212,0.3)`,
                      `0 0 0 40px rgba(6,182,212,0)`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Anneaux concentriques */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border border-cyan-500/20"
                    style={{
                      inset: `-${ring * 10}px`,
                      borderWidth: "1px",
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20 + ring * 5,
                        repeat: Infinity,
                      },
                      scale: {
                        duration: 3 + ring,
                        repeat: Infinity,
                      },
                    }}
                  />
                ))}

                {/* Logo principal */}
                <div
                  className={`relative ${logoSizeClasses} rounded-2xl overflow-hidden ${themeConfigs.glow}`}
                >
                  <img
                    src={customLogo || logo}
                    alt="Logo"
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                </div>

                {/* Particules autour du logo */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      x: -20,
                      y: -20,
                    }}
                    animate={{
                      x: [0, Math.cos((i * 45 * Math.PI) / 180) * 60],
                      y: [0, Math.sin((i * 45 * Math.PI) / 180) * 60],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Titre et sous-titre */}
              <motion.div variants={itemVariants} className="space-y-6">
                <motion.h1
                  variants={itemVariants}
                  className={cn(
                    "text-4xl md:text-6xl font-bold tracking-tight",
                    themeConfigs.text
                  )}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                    {title}
                  </span>
                </motion.h1>

                <motion.div variants={itemVariants} className="space-y-2">
                  <motion.p
                    className={cn(
                      "text-lg md:text-xl font-medium",
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    )}
                  >
                    {loadingPhrases[currentPhrase]}
                  </motion.p>
                  <motion.p
                    className="text-sm text-cyan-400/80 font-mono flex items-center justify-center gap-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Cpu className="w-4 h-4" />
                    Système d'initialisation
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Barre de progression avancée */}
              {showProgress && (
                <motion.div
                  variants={itemVariants}
                  className="w-full max-w-md space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Chargement</span>
                      <span className="font-mono text-cyan-300">
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div className="h-2.5 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
                      <motion.div
                        className={cn(
                          "h-full rounded-full relative",
                          `bg-gradient-to-r ${themeConfigs.accent}`
                        )}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Effet de brillance */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Indicateurs de progression */}
                    <div className="flex justify-between text-xs text-gray-500">
                      {[0, 25, 50, 75, 100].map((point) => (
                        <motion.div
                          key={point}
                          className={cn(
                            "flex flex-col items-center",
                            progress >= point ? "text-cyan-400" : ""
                          )}
                          animate={{
                            scale: progress >= point ? [1, 1.2, 1] : 1,
                          }}
                        >
                          <div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full mb-1",
                              progress >= point
                                ? "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                                : "bg-gray-600"
                            )}
                          />
                          <span>{point}%</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Statistiques système */}
                  {showStats && (
                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs"
                    >
                      <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                        <div className="text-gray-400">Temps</div>
                        <div className="font-mono text-cyan-300">
                          {(stats.loadTime / 1000).toFixed(2)}s
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                        <div className="text-gray-400">Mémoire</div>
                        <div className="font-mono text-green-300">
                          {Math.round(stats.memoryUsage)}%
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                        <div className="text-gray-400">Composants</div>
                        <div className="font-mono text-purple-300">
                          {Math.round(stats.componentsLoaded)}%
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                        <div className="text-gray-400">Cache</div>
                        <div className="font-mono text-yellow-300">
                          {stats.cacheStatus}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Boutons d'action */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(6,182,212,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExit}
                  disabled={isExiting}
                  className={cn(
                    "group relative flex-1 py-4 px-8 rounded-xl font-semibold",
                    "text-white overflow-hidden transition-all duration-300",
                    `bg-gradient-to-r ${themeConfigs.accent}`,
                    themeConfigs.glow,
                    isExiting && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Effet de brillance */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isExiting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Entrée en cours...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        Entrer dans le Portfolio
                        <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </span>
                </motion.button>

                {showSkip && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSkip}
                    disabled={isExiting}
                    className={cn(
                      "group relative flex items-center justify-center gap-3",
                      "py-4 px-6 rounded-xl font-medium transition-all duration-300",
                      "border-2 border-white/20 hover:border-cyan-400/50",
                      "text-white hover:text-cyan-300",
                      "hover:bg-white/5 backdrop-blur-sm",
                      isExiting && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <SkipForward className="w-5 h-5" />
                    Passer l'introduction
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-cyan-400/30"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                )}
              </motion.div>

              {/* Informations supplémentaires */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Sécurisé • HTTPS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Performance optimisée</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-purple-500" />
                  <span>Chargement rapide</span>
                </div>
              </motion.div>

              {/* Signature */}
              <motion.p
                variants={itemVariants}
                className="text-sm text-gray-500 font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                — Conçu avec passion par SIAKOU Komi Stanislas —
              </motion.p>
            </motion.div>
          </div>

          {/* Effets de bordure */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 border-[1px] border-white/5 rounded-none" />
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-500/20"
                style={{
                  top: i % 2 === 0 ? "0" : "auto",
                  bottom: i % 2 === 1 ? "0" : "auto",
                  left: i < 2 ? "0" : "auto",
                  right: i >= 2 ? "0" : "auto",
                  width: i % 2 === 0 ? "100%" : "1px",
                  height: i % 2 === 1 ? "100%" : "1px",
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: i % 2 === 0 ? [1, 1.02, 1] : [1, 1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Ajoutez ces styles CSS pour les animations
const styles = `
@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}
`;

// Injection des styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Splash;
