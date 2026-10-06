/**
 * Design System Tokens
 * Single source of truth for the course platform's visual language.
 * These map to the CSS custom properties defined in globals.css.
 * Import this file in components that need token values in JS/TS.
 */

export const colors = {
  // Backgrounds
  bgPrimary: "#050c1a",
  bgSurface: "#0a1628",
  bgElevated: "#0f1f3d",
  bgCard: "#0d1a30",

  // Accent
  accentBlue: "#3b82f6",
  accentBlueDark: "#1d4ed8",
  accentIndigo: "#6366f1",
  accentGlow: "rgba(59,130,246,0.15)",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#475569",

  // Borders
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.16)",
  borderAccent: "rgba(59,130,246,0.3)",
} as const;

export const typography = {
  // Font families (reference CSS variables set in layout.tsx)
  fontSans: "var(--font-geist-sans)",
  fontMono: "var(--font-geist-mono)",

  // Scale
  sizeDisplay: "clamp(2.5rem, 6vw, 5rem)",  // hero headline
  sizeH1: "clamp(2rem, 4vw, 3.5rem)",
  sizeH2: "clamp(1.5rem, 3vw, 2.25rem)",
  sizeH3: "1.25rem",
  sizeBody: "1rem",
  sizeSmall: "0.875rem",
  sizeXs: "0.75rem",

  // Weights
  weightNormal: 400,
  weightMedium: 500,
  weightSemibold: 600,
  weightBold: 700,
  weightBlack: 900,

  // Line heights
  leadingTight: 1.1,
  leadingSnug: 1.3,
  leadingNormal: 1.5,
  leadingRelaxed: 1.7,

  // Letter spacing
  trackingTight: "-0.03em",
  trackingNormal: "0em",
  trackingWide: "0.05em",
  trackingWidest: "0.1em",
} as const;

export const spacing = {
  sectionY: "80px",
  containerMaxW: "1280px",
  containerPx: "clamp(1rem, 4vw, 2rem)",
} as const;

export const radii = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  pill: "9999px",
} as const;

export const shadows = {
  glowBlue: "0 0 40px rgba(59,130,246,0.25), 0 0 80px rgba(59,130,246,0.1)",
  glowSm: "0 0 20px rgba(59,130,246,0.15)",
  card: "0 4px 24px rgba(0,0,0,0.4)",
  cardHover: "0 8px 40px rgba(0,0,0,0.6)",
} as const;

export const transitions = {
  fast: "150ms ease",
  base: "200ms ease",
  slow: "300ms ease",
} as const;

// Component variant helpers
export const buttonVariants = {
  primary: {
    background: colors.textPrimary,
    color: colors.bgPrimary,
    border: "none",
  },
  secondary: {
    background: "transparent",
    color: colors.textPrimary,
    border: `1px solid ${colors.borderStrong}`,
  },
  accent: {
    background: colors.accentBlue,
    color: colors.textPrimary,
    border: "none",
  },
  ghost: {
    background: "transparent",
    color: colors.textSecondary,
    border: "none",
  },
} as const;
