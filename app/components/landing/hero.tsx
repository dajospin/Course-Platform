import Link from "next/link";
import { GlobeHeroBackground } from "./globe-background";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-28 pb-0">
      <GlobeHeroBackground />

      {/* Star dots */}
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="white" opacity={d.o} />
        ))}
      </svg>

      {/* ── Hero content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center sm:px-6">
        {/* Text-readability radial backdrop */}
        <div className="pointer-events-none absolute inset-x-0 -top-32 bottom-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_46%,rgba(5,12,26,0.52)_0%,transparent_75%)]" />

        {/* Badge */}
        <div className="badge-shimmer relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
          <span className="pulse-glow flex h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-xs font-medium tracking-wide text-white/80">
            New courses every month
          </span>
        </div>

        {/* ── Headline — plain bold white, two lines ────────────────────── */}
        <h1
          className="relative font-black leading-[1.04] tracking-tight text-white hero-headline"
          style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
        >
          <span className="block">Learn By Building</span>
          <span className="block gradient-text-accent">Real Projects</span>
        </h1>

        {/* Subtitle */}
        <p className="relative max-w-[44ch] text-[0.975rem] leading-[1.75] text-white/65 sm:text-base hero-subtitle">
          Project-based video courses that turn complex topics into clear,
          step-by-step lessons, so you can ship real apps faster.
        </p>

        {/* CTA row */}
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-bg-primary transition-all hover:bg-white/90 hover:shadow-[0_0_32px_rgba(255,255,255,0.2)] active:scale-95"
          >
            Browse Courses →
          </Link>
          <Link
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/8 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/12 active:scale-95"
          >
            View Pricing
          </Link>
        </div>

        {/* Social proof */}
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          <div className="flex -space-x-2.5">
            {AVATARS.map((a, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg-primary text-[10px] font-bold text-white"
                style={{ background: a.bg }}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-white/55">Loved by developers who ship</span>
          </div>
        </div>
      </div>

      {/* ── Course-player mockup ─────────────────────────────────────────── */}
      <div className="relative z-10 mt-14 w-full max-w-6xl px-4 sm:px-6">
        <CoursePlayerMockup />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Course Player Mockup                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
function CoursePlayerMockup() {
  return (
    <div className="overflow-hidden rounded-t-2xl border border-white/10 bg-[#060d1f]/95 shadow-[0_-8px_80px_rgba(59,130,246,0.18),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md">

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-white/6 bg-[#040a18] px-4 py-2.5">
        {/* Window dots */}
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </span>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-white/30">
          <span>Courses</span>
          <span className="text-white/15">/</span>
          <span>Full-Stack Next.js</span>
          <span className="text-white/15">/</span>
          <span className="text-white/60">Lesson 7</span>
        </div>
        {/* Search */}
        <div className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-2.5 py-1">
          <svg className="h-3 w-3 text-white/25" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-[10px] text-white/25">Search topics, topics or keywords…</span>
        </div>
        {/* Avatar */}
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/30 text-[9px] font-bold text-accent">A</div>
      </div>

      {/* ── Body: 3 columns ────────────────────────────────────────── */}
      <div className="flex h-105 sm:h-115">

        {/* ── Column 1: Chapter sidebar ──────────────────────────── */}
        <aside className="hidden w-52 shrink-0 overflow-y-auto border-r border-white/5 bg-[#040a18] lg:block">
          {/* Course header */}
          <div className="border-b border-white/5 p-3.5">
            <p className="text-[12px] font-bold leading-snug text-white">Full-Stack Next.js</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-white/35">
              Build a modern web app with Next.js, Prisma and PostgreSQL
            </p>
          </div>

          {/* Section 1 */}
          <div className="px-2 pt-3">
            <div className="mb-1.5 flex items-center justify-between px-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Getting Started</span>
              <span className="text-[9px] text-white/20">4 – 19</span>
            </div>
            {LESSONS_1.map((l) => (
              <div key={l.n} className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[10px] text-white/40">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[8px]">✓</span>
                <span className="flex-1 truncate">{l.title}</span>
                <span className="shrink-0 text-white/20">{l.dur}</span>
              </div>
            ))}
          </div>

          {/* Section 2 */}
          <div className="px-2 pt-2">
            <div className="mb-1.5 flex items-center justify-between px-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Building the App</span>
              <span className="text-[9px] text-white/20">6 – 19</span>
            </div>
            {LESSONS_2.map((l) => (
              <div
                key={l.n}
                className={[
                  "flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-[10px]",
                  l.active
                    ? "bg-accent/12 font-semibold text-accent"
                    : l.done
                    ? "text-white/40"
                    : "text-white/30",
                ].join(" ")}
              >
                <span className={[
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px]",
                  l.active ? "bg-accent/25 text-accent" : l.done ? "bg-emerald-500/20 text-emerald-400" : "bg-white/8 text-white/30",
                ].join(" ")}>
                  {l.done ? "✓" : l.n}
                </span>
                <span className="flex-1 truncate">{l.title}</span>
                <span className={`shrink-0 ${l.active ? "text-accent/60" : "text-white/20"}`}>{l.dur}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Column 2: Editor + video ────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Editor area */}
          <div className="flex flex-1 overflow-hidden">
            {/* File tree */}
            <div className="hidden w-36 shrink-0 border-r border-white/5 bg-bg-primary p-2 sm:block">
              {FILE_TREE.map((item) => (
                <div
                  key={item.name}
                  className={[
                    "flex items-center gap-1.5 rounded px-1.5 py-1 text-[10px]",
                    item.active ? "bg-white/8 text-white/80" : "text-white/30",
                    item.indent ? "pl-4" : "",
                  ].join(" ")}
                >
                  <span style={{ color: item.color }} className="text-[9px]">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>

            {/* Code editor + video overlay */}
            <div className="relative flex-1 overflow-hidden bg-bg-primary font-mono">
              {/* Code */}
              <div className="absolute inset-0 overflow-hidden p-3 text-[10px] leading-[1.65] select-none">
                {CODE_LINES.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-4 shrink-0 text-right text-white/15">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                  </div>
                ))}
              </div>

              {/* Video player overlay — centered */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#060d1f]/70 backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-3">
                  {/* Play button */}
                  <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105">
                    <svg className="h-6 w-6 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Playback bar at the bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#040a18] to-transparent px-4 pb-3 pt-8">
                  <div className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                    <div className="flex-1 rounded-full bg-white/12 h-1">
                      <div className="h-full w-[38%] rounded-full bg-accent" />
                    </div>
                    <span className="text-[10px] text-white/40">7:14 / 18:42</span>
                    <svg className="h-3 w-3 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson description strip */}
          <div className="border-t border-white/5 bg-[#040a18] px-4 py-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-[12px] font-bold text-white">Setting up authentication</h3>
                <p className="mt-0.5 line-clamp-1 text-[10px] text-white/40">
                  In this lesson, we'll set up NextAuth.js to handle user authentication in your application.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button className="rounded-lg border border-white/10 px-3 py-1 text-[10px] font-medium text-white/50 transition-colors hover:text-white">
                  Show slides
                </button>
                <button className="rounded-lg bg-accent px-3 py-1 text-[10px] font-semibold text-white transition-opacity hover:opacity-90">
                  Next lesson →
                </button>
              </div>
            </div>
            {/* What you'll learn */}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {["Configure NextAuth.js providers", "Protect routes with middleware", "Handle session data"].map((item) => (
                <span key={item} className="flex items-center gap-1 text-[10px] text-white/35">
                  <svg className="h-2.5 w-2.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Column 3: Progress panel ─────────────────────────────── */}
        <aside className="hidden w-48 shrink-0 border-l border-white/5 bg-[#040a18] p-4 xl:block">
          <p className="mb-4 text-[11px] font-bold text-white">Your progress</p>

          {/* Circular progress */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="48" cy="48" r="40" fill="none"
                  stroke="url(#prog-grad)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.3"
                  strokeDashoffset="146"
                />
                <defs>
                  <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <p className="text-xl font-black text-white">42%</p>
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] leading-snug text-white/40">
              4 of 10 lessons<br />Completed
            </p>
          </div>

          {/* Up next */}
          <div className="mt-5">
            <p className="mb-2.5 text-[11px] font-bold text-white">Up next</p>
            <div className="rounded-xl border border-white/6 bg-white/3 p-3">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                <svg className="h-3.5 w-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
              <p className="text-[11px] font-semibold leading-snug text-white/85">8. Building the API routes</p>
              <p className="mt-1 text-[10px] text-white/35">Full-Stack Next.js and TypeScript</p>
              <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/8">
                <div className="h-full w-0 rounded-full bg-accent/60" />
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const LESSONS_1 = [
  { n: 1, title: "Course introduction",      dur: "2:45",  done: true,  active: false },
  { n: 2, title: "Setting up your environment", dur: "11:20", done: true,  active: false },
  { n: 3, title: "Next.js fundamentals",     dur: "12:40", done: true,  active: false },
  { n: 4, title: "Project structure",        dur: "8:15",  done: true,  active: false },
];

const LESSONS_2 = [
  { n: 5, title: "File routing system",      dur: "9:30",  done: false, active: false },
  { n: 6, title: "Server components",        dur: "14:20", done: false, active: false },
  { n: 7, title: "Setting up authentication",dur: "18:42", done: false, active: true  },
  { n: 8, title: "API routes",               dur: "11:15", done: false, active: false },
  { n: 9, title: "Database setup",           dur: "13:40", done: false, active: false },
  { n: 10,title: "Deployment",               dur: "16:00", done: false, active: false },
];

const FILE_TREE = [
  { name: "app/",           icon: "▾", color: "#60a5fa", active: false, indent: false },
  { name: "api/",           icon: "▾", color: "#94a3b8", active: false, indent: true  },
  { name: "auth/",          icon: "▾", color: "#94a3b8", active: false, indent: true  },
  { name: "components/",    icon: "▾", color: "#60a5fa", active: false, indent: false },
  { name: "lib/",           icon: "▾", color: "#60a5fa", active: false, indent: false },
  { name: "auth.ts",        icon: "◆", color: "#818cf8", active: true,  indent: false },
  { name: "middleware.ts",  icon: "◆", color: "#34d399", active: false, indent: false },
  { name: ".env.local",     icon: "◆", color: "#f59e0b", active: false, indent: false },
  { name: "next.config.js", icon: "◆", color: "#94a3b8", active: false, indent: false },
];

const CODE_LINES = [
  `<span style="color:#6366f1">import</span> <span style="color:#e2e8f0">NextAuth</span> <span style="color:#6366f1">from</span> <span style="color:#34d399">'next-auth'</span>`,
  `<span style="color:#6366f1">import</span> <span style="color:#e2e8f0">GithubProvider</span> <span style="color:#6366f1">from</span> <span style="color:#34d399">'next-auth/providers/github'</span>`,
  `<span style="color:#6366f1">import</span> <span style="color:#e2e8f0">GoogleProvider</span> <span style="color:#6366f1">from</span> <span style="color:#34d399">'next-auth/providers/google'</span>`,
  `<span style="color:#6366f1">import</span> <span style="color:#e2e8f0">{ PrismaAdapter }</span> <span style="color:#6366f1">from</span> <span style="color:#34d399">'@auth/prisma-adapter'</span>`,
  `<span style="color:#6366f1">import</span> <span style="color:#e2e8f0">{ db }</span> <span style="color:#6366f1">from</span> <span style="color:#34d399">'@/lib/db'</span>`,
  ``,
  `<span style="color:#6366f1">export const</span> <span style="color:#60a5fa">authOptions</span> <span style="color:#94a3b8">= {</span>`,
  `  <span style="color:#e2e8f0">adapter</span><span style="color:#94a3b8">:</span> <span style="color:#60a5fa">PrismaAdapter</span><span style="color:#94a3b8">(</span><span style="color:#e2e8f0">db</span><span style="color:#94a3b8">),</span>`,
  `  <span style="color:#e2e8f0">providers</span><span style="color:#94a3b8">: [</span>`,
  `    <span style="color:#60a5fa">GithubProvider</span><span style="color:#94a3b8">({</span>`,
  `      <span style="color:#e2e8f0">clientId</span><span style="color:#94a3b8">:</span> <span style="color:#e2e8f0">process</span><span style="color:#94a3b8">.</span><span style="color:#e2e8f0">env</span><span style="color:#94a3b8">.</span><span style="color:#f59e0b">GITHUB_ID</span><span style="color:#94a3b8">!,</span>`,
  `      <span style="color:#e2e8f0">clientSecret</span><span style="color:#94a3b8">:</span> <span style="color:#e2e8f0">process</span><span style="color:#94a3b8">.</span><span style="color:#e2e8f0">env</span><span style="color:#94a3b8">.</span><span style="color:#f59e0b">GITHUB_SECRET</span><span style="color:#94a3b8">!,</span>`,
  `    <span style="color:#94a3b8">}),</span>`,
  `    <span style="color:#60a5fa">GoogleProvider</span><span style="color:#94a3b8">({</span>`,
  `      <span style="color:#e2e8f0">clientId</span><span style="color:#94a3b8">:</span> <span style="color:#e2e8f0">process</span><span style="color:#94a3b8">.</span><span style="color:#e2e8f0">env</span><span style="color:#94a3b8">.</span><span style="color:#f59e0b">GOOGLE_ID</span><span style="color:#94a3b8">!,</span>`,
  `      <span style="color:#e2e8f0">clientSecret</span><span style="color:#94a3b8">:</span> <span style="color:#e2e8f0">process</span><span style="color:#94a3b8">.</span><span style="color:#e2e8f0">env</span><span style="color:#94a3b8">.</span><span style="color:#f59e0b">GOOGLE_SECRET</span><span style="color:#94a3b8">!,</span>`,
  `    <span style="color:#94a3b8">}),</span>`,
  `  <span style="color:#94a3b8">],</span>`,
];

const AVATARS = [
  { initials: "AK", bg: "linear-gradient(135deg,#3b82f6,#6366f1)" },
  { initials: "MJ", bg: "linear-gradient(135deg,#8b5cf6,#ec4899)" },
  { initials: "SR", bg: "linear-gradient(135deg,#10b981,#3b82f6)" },
  { initials: "TW", bg: "linear-gradient(135deg,#f59e0b,#ef4444)" },
];

const DOTS = [
  { x: "8%",  y: "18%", r: 1.2, o: 0.4  },
  { x: "15%", y: "42%", r: 0.8, o: 0.25 },
  { x: "22%", y: "28%", r: 1.5, o: 0.3  },
  { x: "6%",  y: "65%", r: 1,   o: 0.2  },
  { x: "34%", y: "15%", r: 1,   o: 0.35 },
  { x: "44%", y: "8%",  r: 0.8, o: 0.2  },
  { x: "56%", y: "12%", r: 1.2, o: 0.3  },
  { x: "68%", y: "20%", r: 0.8, o: 0.25 },
  { x: "78%", y: "38%", r: 1.5, o: 0.35 },
  { x: "88%", y: "25%", r: 1,   o: 0.3  },
  { x: "93%", y: "55%", r: 0.8, o: 0.2  },
  { x: "82%", y: "68%", r: 1.2, o: 0.25 },
  { x: "72%", y: "10%", r: 1,   o: 0.3  },
  { x: "52%", y: "72%", r: 0.8, o: 0.2  },
  { x: "28%", y: "78%", r: 1,   o: 0.25 },
  { x: "12%", y: "80%", r: 1.5, o: 0.2  },
  { x: "96%", y: "15%", r: 1,   o: 0.35 },
  { x: "3%",  y: "35%", r: 0.8, o: 0.2  },
];
