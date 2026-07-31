import ProfileImage from '@/assets/Profile.png';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ChevronDown,
  Eye,
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Sparkles,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], ["0%", "25%"]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const socials = [
    { icon: Github, href: "https://github.com/SIAKOU", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/siakou-stanislas-672828297/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:SIAKOU2006@gmail.com", label: "Email" },
  ];

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #888 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div style={{ opacity, y }} className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[calc(100vh-8rem)]">
            <div className="order-2 lg:order-1 pt-20 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  {t("hero.available")}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                  <span className="block text-muted-foreground/60 text-xl sm:text-2xl lg:text-3xl font-normal mb-3">
                    {t("hero.greeting")}
                  </span>
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    SIAKOU Komi Stanislas
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-lg sm:text-xl text-muted-foreground font-medium mb-3">
                  {t("hero.title")}
                </p>
                <p className="text-base text-muted-foreground/70 leading-relaxed max-w-xl mb-10">
                  {t("hero.subtitle")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                <Button
                  onClick={() => handleScroll("projets")}
                  size="lg"
                  className="group relative overflow-hidden shadow-lg shadow-primary/25"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  {t("hero.cta_projects")}
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
                <Button
                  onClick={() => handleScroll("services")}
                  variant="outline"
                  size="lg"
                  className="border-primary/30 hover:border-primary/50"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("hero.cta_services")}
                </Button>
                <Button
                  onClick={() => handleScroll("contact")}
                  variant="ghost"
                  size="lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {t("hero.cta_contact")}
                </Button>
                <a
                  href="/CV.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {t("hero.cv")}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                  {t("hero.network")}
                </span>
                <span className="h-px w-8 bg-white/20" />
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 transition-all text-muted-foreground"
                      aria-label={s.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </motion.div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end pt-20 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
                    <img
                      src={ProfileImage}
                      alt="SIAKOU Komi Stanislas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-xl bg-background border border-white/10 shadow-xl">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{t("hero.available")}</p>
                        <p className="text-[11px] text-muted-foreground">{t("hero.response_time")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => handleScroll("apropos")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">{t("hero.discover")}</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
