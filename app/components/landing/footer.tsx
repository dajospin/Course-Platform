import Link from "next/link";

const COLUMNS = [
  {
    heading: "Learn",
    links: [
      { label: "All courses",    href: "/courses" },
      { label: "Pricing",        href: "#pricing" },
      { label: "Free previews",  href: "/courses" },
      { label: "How it works",   href: "#features" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign in",    href: "/sign-in" },
      { label: "Dashboard",  href: "/dashboard" },
      { label: "Billing",    href: "/account" },
      { label: "Settings",   href: "/account" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",          href: "#" },
      { label: "Blog",           href: "#" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

const STATS = [
  { value: "6+",   label: "Courses" },
  { value: "500+", label: "Students" },
  { value: "∞",    label: "Lifetime access" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-bg-primary">
      {/* Top accent glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-40 w-full max-w-lg rounded-full bg-accent/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ──────────────────────────────────────────── */}
        <div className="grid gap-12 py-16 md:grid-cols-5 lg:gap-16">

          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <SparkleIcon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
              <span className="text-base font-bold tracking-tight text-white">LearnFlow</span>
            </Link>

            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-text-secondary">
              Expert-crafted video courses. Buy once, go all-access monthly,
              or own everything forever.
            </p>

            {/* Stats strip */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/6 bg-white/3 px-3 py-3 text-center">
                  <p className="text-lg font-black tracking-tight text-white">{s.value}</p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-6 flex gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 text-text-muted transition-all hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-accent transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-7 sm:flex-row">
          <div className="flex items-center gap-2">
            <SparkleIcon className="h-3.5 w-3.5 text-accent/60" />
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} LearnFlow. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="text-xs text-text-muted">
              Payments &amp; tax by{" "}
              <span className="font-medium text-text-secondary">Polar</span>
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms",   href: "/terms"   },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs text-text-muted transition-colors hover:text-text-secondary"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ── Icons ─────────────────────────────────────────────────────── */
const SOCIAL = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
      <path d="M19 16L19.75 19L22 19.75L19.75 20.5L19 23L18.25 20.5L16 19.75L18.25 19L19 16Z" opacity="0.6" />
      <path d="M5 2L5.5 4L7 4.5L5.5 5L5 7L4.5 5L3 4.5L4.5 4L5 2Z" opacity="0.5" />
    </svg>
  );
}
