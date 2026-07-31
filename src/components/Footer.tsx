import { Shield, Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const socialLinks = [
  { icon: Github, href: "https://github.com/SIAKOU", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/siakou-stanislas-672828297/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:SIAKOU2006@gmail.com", label: "Email" },
];

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: t("footer.nav_title"),
      links: [
        { label: t("nav.accueil"), href: "#accueil" },
        { label: t("nav.apropos"), href: "#apropos" },
        { label: t("nav.services"), href: "#services" },
        { label: t("nav.projets"), href: "#projets" },
        { label: t("nav.contact"), href: "#contact" },
      ],
    },
    {
      title: t("footer.services_title"),
      links: [
        { label: t("services.network_sec"), href: "#services" },
        { label: t("services.fullstack"), href: "#services" },
        { label: t("services.cloud"), href: "#services" },
        { label: t("services.training"), href: "#services" },
      ],
    },
    {
      title: t("footer.resources_title"),
      links: [
        { label: t("certifications.badge"), href: "#certifications" },
        { label: t("skills.badge"), href: "#competences" },
        { label: t("experience.badge"), href: "#experience" },
        { label: "GitHub", href: "https://github.com/SIAKOU" },
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 group mb-5"
            >
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-sm tracking-tight">
                SIAKOU<span className="text-primary">.</span>
              </span>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 transition-all text-muted-foreground"
                    aria-label={s.label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold mb-5">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => handleClick(link.href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SIAKOU Komi Stanislas. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {t("footer.made_with")} <Heart className="w-3 h-3 text-primary" /> {t("footer.by")}
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 transition-all text-muted-foreground"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
