import { type ReactNode } from "react";

type Variant = "outline" | "accent" | "surface";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  outline:
    "border border-white/20 bg-white/5 text-text-secondary backdrop-blur-sm",
  accent:
    "border border-accent/30 bg-accent/10 text-accent backdrop-blur-sm",
  surface:
    "border border-white/10 bg-bg-elevated text-text-secondary backdrop-blur-sm",
};

export function Badge({ children, variant = "outline", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
