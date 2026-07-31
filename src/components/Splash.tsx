import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  Users,
  Code2,
  ExternalLink,
  Shield,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { useGithubData } from "@/hooks/useGithubData";
import { useTranslation } from "react-i18next";

type Props = {
  onFinish?: () => void;
};

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Python: "bg-green-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
  Rust: "bg-amber-500",
  Shell: "bg-gray-500",
  Dockerfile: "bg-sky-500",
};

const Splash = ({ onFinish }: Props) => {
  const { t } = useTranslation();
  const { user, topLanguages, totalStars, totalForks, isLoading } = useGithubData();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const startTime = useRef(Date.now());
  const MIN_DURATION = 2800;

  useEffect(() => {
    const elapsed = Date.now() - startTime.current;
    const delay = Math.max(0, MIN_DURATION - elapsed);
    const timer = setTimeout(() => setShowContent(true), delay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExiting || showContent) return;

    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min(100, (elapsed / MIN_DURATION) * 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(animate);
      }
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isExiting, showContent]);

  const handleEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setProgress(100);
    setTimeout(() => onFinish?.(), 250);
  }, [isExiting, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background"
    >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #888 1px, transparent 0)`,
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          {!showContent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="w-16 h-16 text-primary mx-auto" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-sm mt-4"
              >
                {t("splash.loading")}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full max-w-lg mx-auto px-6"
            >
              <div className="glass-card rounded-2xl p-8 border-primary/20">
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-60" />
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="relative w-16 h-16 rounded-full border-2 border-white/10"
                      />
                    ) : (
                      <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Github className="w-8 h-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h1 className="font-bold text-lg truncate">
                      {isLoading ? "SIAKOU" : user?.name || user?.login || "SIAKOU"}
                    </h1>
                    <p className="text-xs text-muted-foreground truncate">
                      @{user?.login || "SIAKOU"}
                    </p>
                    <a
                      href={user?.html_url || "https://github.com/SIAKOU"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-0.5"
                    >
                      {t("splash.view_profile")} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {!isLoading && user && (
                  <div className="grid grid-cols-4 gap-3 mb-8">
                    {[
                      { icon: Users, label: t("splash.followers"), value: user.followers },
                      { icon: Code2, label: t("splash.repos"), value: user.public_repos },
                      { icon: Star, label: t("splash.stars"), value: totalStars },
                      { icon: GitBranch, label: t("splash.forks"), value: totalForks },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="text-center p-2 rounded-lg bg-white/5"
                        >
                          <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                          <p className="text-sm font-bold">{stat.value}</p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {stat.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!isLoading && topLanguages.length > 0 && (
                  <div className="mb-8">
                    <p className="text-xs text-muted-foreground mb-3">{t("splash.languages")}</p>
                    <div className="flex h-2.5 rounded-full overflow-hidden bg-white/5">
                      {topLanguages.map((lang) => (
                        <div
                          key={lang.name}
                          style={{ width: `${lang.percentage}%` }}
                          className={`h-full first:rounded-l-full last:rounded-r-full ${
                            langColors[lang.name] || "bg-gray-500"
                          }`}
                          title={`${lang.name}: ${lang.percentage}%`}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      {topLanguages.map((lang) => (
                        <span key={lang.name} className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              langColors[lang.name] || "bg-gray-500"
                            }`}
                          />
                          <span className="text-[11px] text-muted-foreground">
                            {lang.name}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{t("splash.initializing")}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnter}
                  disabled={isExiting}
                  className="relative w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25 overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {isExiting ? t("splash.entering") : (
                      <>
                        {t("splash.enter")}
                        <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>

              <p className="text-center text-xs text-muted-foreground/50 mt-6">
                SIAKOU Komi Stanislas — Portfolio
              </p>
          </motion.div>
        )}
    </motion.div>
  );
};

export default Splash;
