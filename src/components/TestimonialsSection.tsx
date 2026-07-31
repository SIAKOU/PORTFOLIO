import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Koffi A.",
    role: "client_role_1",
    company: "TechPro Solutions",
    text: "testimonial_1",
    rating: 5,
  },
  {
    name: "Ama B.",
    role: "client_role_2",
    company: "Digital Services",
    text: "testimonial_2",
    rating: 5,
  },
  {
    name: "Jean-Pierre C.",
    role: "client_role_3",
    company: "StartupHub",
    text: "testimonial_3",
    rating: 4,
  },
  {
    name: "Marie D.",
    role: "client_role_4",
    company: "EcoDigital",
    text: "testimonial_4",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const tData = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
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
              <Quote className="w-4 h-4" />
              {t("testimonials.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("testimonials.title")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative glass-card p-8 sm:p-12 text-center">
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: tData.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
                "{t(`testimonials.${tData.text}`)}"
              </p>

              <div className="h-px bg-white/10 mb-6" />

              <div>
                <p className="font-semibold text-lg">{tData.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t(`testimonials.${tData.role}`)} — {tData.company}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-2.5 rounded-full bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 transition-all text-muted-foreground"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current
                        ? "bg-primary w-6"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2.5 rounded-full bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/10 transition-all text-muted-foreground"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
