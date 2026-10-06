"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth/client";

export function NavUserButton() {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (isPending) {
    return <div className="h-8 w-8 rounded-full bg-white/6 animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/auth/sign-in"
        className="hidden sm:block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-white"
      >
        Sign in
      </Link>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : user.email?.[0]?.toUpperCase() ?? "?";

  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-2.5 py-1.5 text-sm transition-colors hover:bg-white/8"
      >
        {/* Avatar */}
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/30 text-[10px] font-bold text-accent">
          {initials}
        </span>
        <span className="hidden max-w-24 truncate text-xs font-medium text-white sm:block">
          {user.name ?? user.email}
        </span>
        <svg
          className={`h-3 w-3 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-bg-card shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {/* User info header */}
          <div className="border-b border-white/6 px-4 py-3">
            <p className="truncate text-xs font-semibold text-white">{user.name}</p>
            <p className="truncate text-[11px] text-text-muted">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-text-secondary transition-colors hover:bg-white/4 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              My courses
            </Link>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-text-secondary transition-colors hover:bg-white/4 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Profile
            </Link>
          </div>

          <div className="border-t border-white/6 py-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs text-red-400/80 transition-colors hover:bg-red-500/8 hover:text-red-400"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
