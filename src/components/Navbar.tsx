import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Shield,
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const navItems = [
  { labelKey: "nav.accueil", href: "#accueil" },
  { labelKey: "nav.apropos", href: "#apropos" },
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.competences", href: "#competences" },
  { labelKey: "nav.experience", href: "#experience" },
  { labelKey: "nav.projets", href: "#projets" },
  { labelKey: "nav.certifications", href: "#certifications" },
  { labelKey: "nav.contact", href: "#contact" },
];

const themes = [
  { value: "dark", icon: Moon, labelKey: "theme.dark" },
  { value: "light", icon: Sun, labelKey: "theme.light" },
  { value: "system", icon: Monitor, labelKey: "theme.system" },
] as const;

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => handleClick("#accueil")}
            className="flex items-center gap-2 group"
          >
            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-sm tracking-tight">
              SIAKOU<span className="text-primary">.</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <button
                onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground"
              >
                {theme === "light" ? <Sun className="w-4 h-4" /> : theme === "dark" ? <Moon className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
              </button>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 p-1.5 rounded-xl bg-background border border-white/10 shadow-xl min-w-[140px]"
                >
                    {themes.map((tOption) => {
                      const Icon = tOption.icon;
                      return (
                        <button
                          key={tOption.value}
                          onClick={() => { setTheme(tOption.value); setThemeOpen(false); }}
                          className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                            theme === tOption.value
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-white/5"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {t(tOption.labelKey)}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
            </div>

            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden lg:inline">{i18n.language?.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 hidden lg:block" />
              </button>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 p-1.5 rounded-xl bg-background border border-white/10 shadow-xl min-w-[140px]"
                >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                          i18n.language?.startsWith(lang.code)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-white/5"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl overflow-hidden"
        >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                >
                  {t(item.labelKey)}
                </button>
              ))}
              <hr className="my-2 border-white/10" />
              <div className="flex items-center gap-2 px-4 py-2">
                {themes.map((tOption) => {
                  const Icon = tOption.icon;
                  return (
                    <button
                      key={tOption.value}
                      onClick={() => setTheme(tOption.value)}
                      className={`p-2 rounded-lg text-xs transition-all ${
                        theme === tOption.value
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
                <span className="mx-2 text-muted-foreground/30">|</span>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                      i18n.language?.startsWith(lang.code)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-white/5"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
