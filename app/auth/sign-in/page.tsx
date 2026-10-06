"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth/client";
import { COURSES } from "@/app/lib/courses";
import { signInWithEmail } from "./actions";

/* Rotate through courses every 2.8 s */
const SHOWCASE = COURSES.slice(0, 4);

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);
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
        <Link href="/" className="flex items-center gap-2 group">
          <SparkleIcon className="h-5 w-5 text-accent" />
          <span className="text-base font-bold text-white">LearnFlow</span>
        </Link>

        {/* Course showcase */}
        <div className="mt-12 flex-1 flex flex-col">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-muted">
            What you'll build
          </p>

          {/* Active course card */}
          <div
            key={active.slug}
            className="relative overflow-hidden rounded-2xl border border-white/8 transition-all duration-700"
            style={{
              background: `linear-gradient(135deg, ${active.gradient[0]}22 0%, ${active.gradient[1]}12 100%)`,
              borderColor: `${active.gradient[0]}25`,
            }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative p-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-base font-black"
                  style={{
                    background: `linear-gradient(135deg, ${active.gradient[0]}30, ${active.gradient[1]}20)`,
                    borderColor: `${active.gradient[0]}35`,
                    color: active.gradient[0],
                  }}
                >
                  {active.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white">{active.title}</h3>
                  <p className="mt-0.5 text-xs text-text-muted">{active.level} · {active.totalLessons} lessons</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-text-secondary line-clamp-2">
                {active.subtitle}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xl font-black text-white">${active.price}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: `${active.gradient[0]}20`, color: active.gradient[0] }}
                >
                  {active.tags[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex gap-1.5">
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

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "2,500+", label: "Students" },
              { value: "6", label: "Courses" },
              { value: "4.9★", label: "Avg rating" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/6 bg-white/3 p-4 text-center">
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-10 rounded-xl border border-white/6 bg-white/3 p-5">
            <p className="text-sm leading-relaxed text-text-secondary">
              "LearnFlow completely changed how I approach learning. The projects are real and the quality is unmatched."
            </p>
            <footer className="mt-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/25 text-[10px] font-bold text-accent">
                MK
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Mathieu Kouassi</p>
                <p className="text-[10px] text-text-muted">Full-stack Developer</p>
              </div>
            </footer>
          </blockquote>
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
          <h1 className="text-2xl font-black tracking-tight text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-text-secondary">Sign in to continue learning</p>

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

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-medium text-text-secondary">Password</label>
                  <Link href="#" className="text-[11px] text-accent hover:underline">Forgot?</Link>
                </div>
                <input
                  id="password" name="password" type="password" required
                  placeholder="••••••••"
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
                {isPending ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            No account yet?{" "}
            <Link href="/auth/sign-up" className="font-semibold text-accent hover:underline">
              Create one free
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
