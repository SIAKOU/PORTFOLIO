import { useState } from "react";

export type NavLinkGroupProps = {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
  spacing?: "sm" | "md" | "lg";
};

export const useNavLink = () => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (to: string) => {
    setActiveLink(to);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("navlink-click", { detail: { to } }));
    }
  };

  return { activeLink, handleLinkClick };
};
