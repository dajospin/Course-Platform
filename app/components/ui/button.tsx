import { type ButtonHTMLAttributes, type ReactNode, isValidElement, cloneElement } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-white text-bg-primary hover:bg-slate-100 border border-transparent",
  secondary:
    "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
  accent:
    "bg-accent text-white hover:bg-accent-dark border border-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  ghost:
    "bg-transparent text-text-secondary hover:text-white border border-transparent hover:bg-white/5",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  asChild = false,
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  /* asChild: merge classes into the child element (e.g. a Next.js Link) */
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: [
        (children as React.ReactElement<{ className?: string }>).props.className ?? "",
        classes,
      ]
        .filter(Boolean)
        .join(" "),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
