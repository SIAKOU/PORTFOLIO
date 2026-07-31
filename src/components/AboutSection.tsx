import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ProfileImage from "@/assets/Profile.png";
import {
  Shield,
  Code2,
  Server,
  Target,
  Award,
  BookOpen,
  Users,
  Lightbulb,
  MapPin,
  Calendar,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "3+", label: t("about.stats_exp"), icon: Calendar },
    { value: "15+", label: t("about.stats_projects"), icon: Target },
    { value: "2", label: t("about.stats_certs"), icon: Award },
    { value: "10+", label: t("about.stats_techs"), icon: Code2 },
  ];

  const values = [
    { icon: Shield, label: t("about.value_security"), desc: t("about.value_security_desc") },
    { icon: Lightbulb, label: t("about.value_innovation"), desc: t("about.value_innovation_desc") },
    { icon: Users, label: t("about.value_collab"), desc: t("about.value_collab_desc") },
    { icon: BookOpen, label: t("about.value_learning"), desc: t("about.value_learning_desc") },
  ];


  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="apropos" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
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
              <Shield className="w-4 h-4" />
              {t("about.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("about.title")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 mb-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl" />
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
                  <img
                    src={ProfileImage}
                    alt="SIAKOU Komi Stanislas"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
                  <MapPin className="w-3 h-3" />
                  {t("about.location")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs text-secondary">
                  <Calendar className="w-3 h-3" />
                  {t("about.available")}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold">
                SIAKOU Komi Stanislas
              </h3>

              <div className="space-y-4">
                <p className="text-muted-foreground/80 leading-relaxed">
                  {t("about.p1")}
                </p>
                <p className="text-muted-foreground/70 leading-relaxed">
                  {t("about.p2")}
                </p>
                <p className="text-muted-foreground/70 leading-relaxed">
                  {t("about.p3")}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass-card p-6 rounded-xl text-center group hover:border-primary/30 transition-all"
                  >
                    <Icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-xl font-bold">{t("about.values_title")}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.label}
                    className="glass-card p-6 rounded-xl text-center group hover:border-primary/30 transition-all"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">{value.label}</h4>
                    <p className="text-xs text-muted-foreground">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
