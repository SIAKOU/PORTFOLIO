import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

const contactInfo = [
  { icon: Mail, label: "contact.email", value: "SIAKOU2006@gmail.com", href: "mailto:SIAKOU2006@gmail.com" },
  { icon: MapPin, label: "contact.location", value: "Lomé, Togo", href: null },
  { icon: Phone, label: "contact.phone", value: "+228 92 21 38 77", href: "tel:+22892213877" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/SIAKOU" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/siakou-stanislas-672828297/" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

const ContactSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch("https://formspree.io/f/movqnebj", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) setSent(true);
      })
      .catch(() => {
        setSent(true);
      });
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              <MessageSquare className="w-4 h-4" />
              {t("contact.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("contact.title")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-400">
                  {t("contact.available")}
                </span>
                <Clock className="w-4 h-4 text-green-400/70" />
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-primary/20 transition-all">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t(info.label)}</p>
                        <p className="text-sm font-medium">{info.value}</p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.label} href={info.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={info.label}>{content}</div>
                  );
                })}
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-3 tracking-wider uppercase">
                  {t("contact.social")}
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
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 transition-all text-muted-foreground"
                        aria-label={s.label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {sent ? (
                <div className="glass-card p-12 rounded-2xl text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t("contact.sent_title")}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t("contact.sent_text")}
                  </p>
                  <Button onClick={() => setSent(false)} variant="outline">
                    {t("contact.send_another")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("contact.name")}</label>
                      <Input
                        name="name"
                        required
                        placeholder={t("contact.name_placeholder")}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("contact.email_label")}</label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder={t("contact.email_placeholder")}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("contact.subject")}</label>
                    <Input
                      name="subject"
                      required
                      placeholder={t("contact.subject_placeholder")}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("contact.message")}</label>
                    <Textarea
                      name="message"
                      required
                      placeholder={t("contact.message_placeholder")}
                      className="bg-white/5 border-white/10 min-h-[140px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full shadow-lg shadow-primary/25"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t("contact.send")}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
