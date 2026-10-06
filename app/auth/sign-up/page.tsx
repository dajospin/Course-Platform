"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth/client";
import { COURSES } from "@/app/lib/courses";
import { signUpWithEmail } from "./actions";

const SHOWCASE = COURSES.slice(0, 4);

const FEATURES = [
  { icon: "▶", title: "Project-based learning", desc: "Build real apps from day one — no fluff." },
  { icon: "⚡", title: "Self-paced", desc: "Learn at your speed, revisit anytime." },
  { icon: "♾", title: "Lifetime access", desc: "Buy once, own it forever." },
  { icon: "✓", title: "Certificate included", desc: "Shareable proof of completion." },
];

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % SHOWCASE.length), 2800);
    return () => clearInterval(id);
  }, []);

  async function handleGoogle() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/courses" });
  }

  const active = SHOWCASE[activeIdx];

  return (
    <div className="flex min-h-screen bg-bg-primary text-white">
      {/* ── Left panel ──────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] flex-col overflow-hidden bg-[#040a18] border-r border-white/5 px-12 py-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <SparkleIcon className="h-5 w-5 text-accent" />
          <span className="text-base font-bold text-white">LearnFlow</span>
        </Link>

        <div className="mt-12 flex-1 flex flex-col">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Everything you need to level up
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Join thousands of developers learning by building real projects.
          </p>

          {/* Features list */}
          <div className="mt-8 space-y-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-xs text-accent">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rotating course card */}
          <div className="mt-10">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Featured course
            </p>
            <div
              key={active.slug}
              className="relative overflow-hidden rounded-xl border p-4 transition-all duration-700"
              style={{
                background: `linear-gradient(135deg, ${active.gradient[0]}18 0%, ${active.gradient[1]}10 100%)`,
                borderColor: `${active.gradient[0]}25`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-sm font-black"
                  style={{
                    background: `linear-gradient(135deg, ${active.gradient[0]}30, ${active.gradient[1]}20)`,
                    borderColor: `${active.gradient[0]}35`,
                    color: active.gradient[0],
                  }}
                >
                  {active.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{active.title}</p>
                  <p className="text-[11px] text-text-muted">{active.totalLessons} lessons · ${active.price}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-3 flex gap-1.5">
              {SHOWCASE.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIdx ? "w-8 bg-accent" : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-auto pt-10">
            <div className="flex items-center gap-2">
              {["JK", "SA", "MB", "TL"].map((init) => (
                <div
                  key={init}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-primary bg-accent/20 text-[9px] font-bold text-accent -ml-1 first:ml-0"
                >
                  {init}
                </div>
              ))}
              <p className="ml-1 text-xs text-text-secondary">
                <strong className="text-white">2,500+</strong> developers already enrolled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: form ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <SparkleIcon className="h-5 w-5 text-accent" />
          <span className="text-base font-bold text-white">LearnFlow</span>
        </Link>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-black tracking-tight text-white">Create your account</h1>
          <p className="mt-1 text-sm text-text-secondary">Start learning for free today</p>

          <div className="mt-8 space-y-4">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/12 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/8 active:scale-[0.98]"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-white/6" />
              <span className="text-[11px] text-text-muted">or continue with email</span>
              <div className="flex-1 border-t border-white/6" />
            </div>

            {/* Form */}
            <form action={formAction} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-text-secondary">
                    Full name
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-accent/50 focus:bg-white/6"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-secondary">
                    Email
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-accent/50 focus:bg-white/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Password
                </label>
                <input
                  id="password" name="password" type="password" required
                  placeholder="Min. 8 characters"
                  minLength={8}
                  className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-accent/50 focus:bg-white/6"
                />
              </div>

              {state?.error && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  {state.error}
                </p>
              )}

              <button
                type="submit" disabled={isPending}
                className="mt-1 w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
              >
                {isPending ? "Creating account…" : "Create account"}
              </button>

              <p className="text-center text-[11px] text-text-muted">
                By signing up you agree to our{" "}
                <Link href="#" className="text-accent hover:underline">Terms</Link>
                {" & "}
                <Link href="#" className="text-accent hover:underline">Privacy</Link>.
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
    </svg>
  );
}
