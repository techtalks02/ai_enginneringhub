"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "pill" | "icon" | "dropdown";
}

export function ThemeToggle({ className, variant = "pill" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center p-1.5 rounded-full border border-border/40 bg-card/60 backdrop-blur-md opacity-70",
          className
        )}
        aria-hidden="true"
      >
        <div className="w-5 h-5" />
      </div>
    );
  }

  // Quick cycle between system -> light -> dark -> system
  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getLabel = () => {
    if (theme === "system") return "System Theme";
    if (theme === "dark") return "Dark Theme";
    return "Light Theme";
  };

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-0.5 rounded-full border border-border/40 bg-card/80 backdrop-blur-md shadow-xs",
          className
        )}
        role="group"
        aria-label="Theme selector"
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          title="Light theme"
          aria-label="Light theme"
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer",
            theme === "light"
              ? "bg-primary text-white shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sun className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setTheme("system")}
          title="System theme"
          aria-label="System theme"
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer",
            theme === "system"
              ? "bg-primary text-white shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Laptop className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          title="Dark theme"
          aria-label="Dark theme"
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer",
            theme === "dark"
              ? "bg-primary text-white shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // Single button icon mode (cycles or displays state)
  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Theme: ${getLabel()} (Click to change)`}
      aria-label={`Current theme: ${getLabel()}. Click to cycle.`}
      className={cn(
        "relative flex items-center justify-center w-8 h-8 rounded-full border border-border/40 bg-card/80 backdrop-blur-md text-foreground hover:bg-muted transition-colors cursor-pointer shadow-xs",
        className
      )}
    >
      {theme === "system" ? (
        <Laptop className="w-4 h-4 text-primary transition-transform" />
      ) : resolvedTheme === "dark" ? (
        <Moon className="w-4 h-4 text-amber-400 transition-transform" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 transition-transform" />
      )}
    </button>
  );
}
