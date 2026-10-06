import { Play, Eye, BarChart3, PlayCircle, Download, Infinity } from "lucide-react";
import type { ReactNode } from "react";

type Color = "blue" | "emerald" | "violet" | "indigo" | "amber" | "pink";

interface Feature {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  extra?: string;
  color: Color;
  large: boolean;
}

const COLOR: Record<Color, { orb: string; icon: string; iconBg: string; ring: string }> = {
  blue:    { orb: "bg-blue-500",    icon: "text-blue-400",    iconBg: "bg-blue-400/10",    ring: "hover:border-blue-500/25" },
  emerald: { orb: "bg-emerald-500", icon: "text-emerald-400", iconBg: "bg-emerald-400/10", ring: "hover:border-emerald-500/25" },
  violet:  { orb: "bg-violet-500",  icon: "text-violet-400",  iconBg: "bg-violet-400/10",  ring: "hover:border-violet-500/25" },
  indigo:  { orb: "bg-indigo-500",  icon: "text-indigo-400",  iconBg: "bg-indigo-400/10",  ring: "hover:border-indigo-500/25" },
  amber:   { orb: "bg-amber-500",   icon: "text-amber-400",   iconBg: "bg-amber-400/10",   ring: "hover:border-amber-500/25" },
  pink:    { orb: "bg-pink-500",    icon: "text-pink-400",    iconBg: "bg-pink-400/10",    ring: "hover:border-pink-500/25" },
};

const FEATURES: Feature[] = [
  {
    id: "video",
    icon: <Play className="h-5 w-5" />,
    title: "High-quality video lessons",
    description:
      "Pre-recorded lessons filmed and edited to the point — no padding, no filler. Watch at any speed, any time.",
    extra: "Average lesson is 8 minutes. Finish a section on your lunch break.",
    color: "blue",
    large: true,
  },
  {
    id: "preview",
    icon: <Eye className="h-5 w-5" />,
    title: "Free lesson previews",
    description:
      "Every course has preview lessons. Watch before you sign up — no account needed.",
    color: "emerald",
    large: false,
  },
  {
    id: "progress",
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Progress tracking",
    description:
      "Your dashboard tracks completions, progress bars, and exactly where you left off.",
    color: "violet",
    large: false,
  },
  {
    id: "resume",
    icon: <PlayCircle className="h-5 w-5" />,
    title: "Resume anywhere",
    description:
      "Playback position is saved automatically across all your devices — always pick up mid-lesson.",
    color: "indigo",
    large: false,
  },
  {
    id: "downloads",
    icon: <Download className="h-5 w-5" />,
    title: "Downloadable resources",
    description:
      "Code files, slides, and reference material included with every lesson. Keep them forever.",
    color: "amber",
    large: false,
  },
  {
    id: "lifetime",
    icon: <Infinity className="h-5 w-5" />,
    title: "Lifetime access on purchase",
    description:
      "Buy a course once and it's yours forever — including every update. Or subscribe monthly and cancel any time.",
    extra: "No expiry. No surprises. Course updates are included at no extra cost.",
    color: "pink",
    large: true,
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden border-t border-white/5 bg-bg-primary py-24">
      {/* Dot grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dots" />
      {/* Radial fade so dots don't hit the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#050c1a_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
            What you get
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-tight text-white">
            Everything you need to learn —{" "}
            <span className="font-light italic text-text-secondary">
              nothing you don&apos;t
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            A focused, distraction-free learning experience built around video
            lessons, clear structure, and lifetime ownership.
          </p>
        </div>

        {/* Bento grid — 4 cols lg, 2 cols sm, 1 col mobile */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.id} className={f.large ? "sm:col-span-2" : ""}>
              <FeatureCard feature={f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const c = COLOR[feature.color];
  return (
    <div
      className={[
        "group relative h-full overflow-hidden rounded-2xl border border-white/8 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
        c.ring,
        feature.large ? "bg-bg-surface/60 p-7" : "bg-bg-card/80 p-6",
      ].join(" ")}
    >
      {/* Colored glow orb — appears on hover */}
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full ${c.orb} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
      />

      {/* Icon */}
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${c.iconBg} ${c.icon} transition-transform duration-300 group-hover:scale-110`}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3 className={`mb-2 font-semibold tracking-tight text-white ${feature.large ? "text-base" : "text-sm"}`}>
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-text-secondary">
        {feature.description}
      </p>

      {/* Extra note — large cards only */}
      {feature.extra && (
        <p className="mt-4 text-xs leading-relaxed text-text-muted">
          {feature.extra}
        </p>
      )}

      {/* Colored bottom accent line — large cards only */}
      {feature.large && (
        <div
          className={`absolute bottom-0 left-0 h-0.5 w-full ${c.orb} opacity-15 transition-opacity duration-300 group-hover:opacity-40`}
        />
      )}
    </div>
  );
}
