import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from "react-router-dom";
import { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LucideIcon, 
  ChevronRight, 
  Sparkles, 
  Dot,
  Circle,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<RouterNavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  hoverClassName?: string;
  icon?: LucideIcon;
  showActiveIndicator?: boolean;
  showHoverEffect?: boolean;
  glowEffect?: boolean;
  pulseOnActive?: boolean;
  badge?: string | number;
  badgeColor?: string;
  transitionDelay?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline" | "gradient";
  fullWidth?: boolean;
  withArrow?: boolean;
  soundEffect?: boolean;
  rippleEffect?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      className,
      activeClassName,
      pendingClassName,
      hoverClassName,
      icon: Icon,
      showActiveIndicator = true,
      showHoverEffect = true,
      glowEffect = true,
      pulseOnActive = true,
      badge,
      badgeColor = "bg-primary",
      transitionDelay = 0,
      size = "md",
      variant = "default",
      fullWidth = false,
      withArrow = false,
      soundEffect = false,
      rippleEffect = true,
      children,
      to,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRippling, setIsRippling] = useState(false);
    const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
    const linkRef = useRef<HTMLAnchorElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Taille des boutons
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    // Variants
    const variantClasses = {
      default: "text-foreground hover:text-primary",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      gradient: "bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20",
    };

    // Initialiser l'audio pour les effets sonores
    useEffect(() => {
      if (soundEffect && typeof window !== 'undefined') {
        audioRef.current = new Audio('/sounds/hover.mp3');
        audioRef.current.volume = 0.2;
      }
    }, [soundEffect]);

    const handleMouseEnter = (e: React.MouseEvent) => {
      setIsHovered(true);
      
      if (soundEffect && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      if (rippleEffect && linkRef.current) {
        const rect = linkRef.current.getBoundingClientRect();
        setRipplePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsRippling(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleRippleEnd = () => {
      setIsRippling(false);
    };

    const playClickSound = () => {
      if (soundEffect && audioRef.current) {
        audioRef.current.src = '/sounds/click.mp3';
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    return (
      <RouterNavLink
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          linkRef.current = node;
        }}
        to={to}
        className={({ isActive, isPending }) => {
          const baseClasses = cn(
            "relative inline-flex items-center justify-center gap-2",
            "font-medium transition-all duration-300",
            "rounded-lg overflow-hidden",
            sizeClasses[size],
            variantClasses[variant],
            fullWidth && "w-full",
            isActive && [
              "text-primary font-semibold",
              activeClassName,
              pulseOnActive && "animate-pulse-subtle",
            ],
            isPending && ["opacity-50 cursor-wait", pendingClassName],
            isHovered && hoverClassName,
            className
          );

          return baseClasses;
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={playClickSound}
        {...props}
      >
        {({ isActive, isPending }) => (
          <>
            {/* Ripple Effect */}
            {rippleEffect && isRippling && (
              <motion.span
                className="absolute inset-0 rounded-full bg-primary/20"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={handleRippleEnd}
                style={{
                  left: `${ripplePosition.x}px`,
                  top: `${ripplePosition.y}px`,
                  transform: "translate(-50%, -50%)",
                } as React.CSSProperties}
              />
            )}

            {/* Background Hover Effect */}
            {showHoverEffect && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-0"
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* Glow Effect */}
            {glowEffect && isActive && (
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-md"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: [0.42, 0, 0.58, 1],
                }}
              />
            )}

            {/* Active Indicator Line */}
            {showActiveIndicator && isActive && (
              <motion.div
                layoutId="navLinkIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: transitionDelay,
                }}
              />
            )}

            {/* Left Border Indicator */}
            {isActive && (
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}

            {/* Pending State Indicator */}
            {isPending && (
              <motion.div
                className="absolute right-2 top-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: [0, 0, 1, 1] }}
              >
                <Circle className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            )}

            {/* Icon with Animation */}
            {Icon && (
              <motion.div
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon className={cn(
                  "w-4 h-4",
                  size === "lg" && "w-5 h-5",
                  size === "sm" && "w-3.5 h-3.5"
                )} />
              </motion.div>
            )}

            {/* Content */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: transitionDelay + 0.1 }}
              className="relative z-10 whitespace-nowrap"
            >
              {typeof children === "function" ? children({ isActive, isPending, isTransitioning: false }) : children}
            </motion.span>

            {/* Active Checkmark */}
            {isActive && !isPending && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </motion.div>
            )}

            {/* Badge */}
            {badge && (
              <motion.span
                className={cn(
                  "absolute -top-2 -right-2 min-w-5 h-5 px-1.5",
                  "flex items-center justify-center",
                  "text-xs font-bold text-white rounded-full",
                  badgeColor,
                  "ring-2 ring-background"
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
              >
                {badge}
              </motion.span>
            )}

            {/* Hover Arrow */}
            {withArrow && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
                className="ml-1"
              >
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            )}

            {/* Sparkle Effect on Hover */}
            {isHovered && (
              <AnimatePresence>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute pointer-events-none"
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: "50%",
                      y: "50%",
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: `${Math.random() * 100 - 50}%`,
                      y: `${Math.random() * 100 - 50}%`,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                    }}
                  >
                    <Sparkles className="w-2 h-2 text-primary" />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Dot Indicator for Active State */}
            {isActive && showActiveIndicator && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Dot className="w-3 h-3 text-primary fill-primary" />
              </motion.div>
            )}
          </>
        )}
      </RouterNavLink>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
export type { NavLinkProps };