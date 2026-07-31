import { cn } from "@/lib/utils";

// Composant de groupe pour les liens de navigation
interface NavLinkGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
  spacing?: "sm" | "md" | "lg";
}

const NavLinkGroup = ({
  children,
  className,
  orientation = "horizontal",
  spacing = "md",
}: NavLinkGroupProps) => {
  const spacingClasses = {
    sm: orientation === "horizontal" ? "space-x-2" : "space-y-2",
    md: orientation === "horizontal" ? "space-x-4" : "space-y-4",
    lg: orientation === "horizontal" ? "space-x-6" : "space-y-6",
  };

  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </div>
  );
};

export { NavLinkGroup };
