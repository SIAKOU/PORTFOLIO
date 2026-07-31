import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium font-mono transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(195_100%_50%/0.4)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_0_20px_hsl(270_50%_55%/0.4)]",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        cyber:
          "relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground before:absolute before:inset-0 before:bg-gradient-to-r before:from-secondary before:to-primary before:opacity-0 before:transition-opacity hover:before:opacity-100 [&>*]:relative",
        hero:
          "relative overflow-hidden border border-primary/30 bg-primary/10 text-primary backdrop-blur-sm hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(195_100%_50%/0.3)] transition-all duration-300",
        heroSecondary:
          "relative overflow-hidden border border-secondary/30 bg-secondary/10 text-secondary backdrop-blur-sm hover:bg-secondary/20 hover:border-secondary/50 hover:shadow-[0_0_30px_hsl(270_50%_55%/0.3)] transition-all duration-300",
        glass:
          "backdrop-blur-xl bg-card/60 border border-primary/20 text-foreground hover:border-primary/40 hover:bg-muted/50",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_hsl(120_100%_60%/0.4)]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
