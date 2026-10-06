import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-primary py-28">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-60" />
      {/* Large radial glow from centre */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-125 w-full max-w-2xl -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-bg-primary to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Label pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
          <SparkleIcon className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-semibold text-accent">
            Free previews — no sign-up needed
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.05] tracking-tight text-white">
          Start watching for free.
          <br />
          <span className="text-text-secondary font-light italic">
            Pay only when you&apos;re ready.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary">
          Every course has free preview lessons you can watch without an account.
          Decide it&apos;s worth it, then buy the course or go all-access.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white shadow-[0_0_32px_rgba(59,130,246,0.4)] transition-all hover:bg-accent/90 hover:shadow-[0_0_48px_rgba(59,130,246,0.5)] active:scale-95"
          >
            Browse all courses
          </Link>
          <Link
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/8 active:scale-95"
          >
            See pricing
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            "No account needed for previews",
            "Lifetime access on purchase",
            "Cancel monthly any time",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 text-xs text-text-muted">
              <CheckIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
