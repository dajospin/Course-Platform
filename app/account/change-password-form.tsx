"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth/client";

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setError("New passwords don't match.");
      return;
    }

    setSaving(true);
    const { error: err } = await authClient.changePassword({
      currentPassword: current,
      newPassword: next,
      revokeOtherSessions: true,
    });
    setSaving(false);

    if (err) {
      setError(err.message || "Failed to change password. Check your current password.");
    } else {
      setSuccess(true);
      setCurrent("");
      setNext("");
      setConfirm("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="pw-current" className="mb-1.5 block text-xs font-medium text-text-secondary">
          Current password
        </label>
        <input
          id="pw-current"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-accent/50 focus:bg-white/6"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pw-new" className="mb-1.5 block text-xs font-medium text-text-secondary">
            New password
          </label>
          <input
            id="pw-new"
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            placeholder="Min. 8 characters"
            minLength={8}
            className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-accent/50 focus:bg-white/6"
          />
        </div>
        <div>
          <label htmlFor="pw-confirm" className="mb-1.5 block text-xs font-medium text-text-secondary">
            Confirm new password
          </label>
          <input
            id="pw-confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="Repeat new password"
            className={[
              "w-full rounded-xl border bg-white/4 px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:bg-white/6",
              confirm && next !== confirm
                ? "border-red-500/40 focus:border-red-500/60"
                : "border-white/8 focus:border-accent/50",
            ].join(" ")}
          />
          {confirm && next !== confirm && (
            <p className="mt-1 text-[10px] text-red-400">Passwords don't match</p>
          )}
        </div>
      </div>

      {/* Strength indicator */}
      {next.length > 0 && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                  i < getStrength(next) ? strengthColor(getStrength(next)) : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] text-text-muted">{strengthLabel(getStrength(next))}</p>
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
          Password changed successfully. Other sessions have been signed out.
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving || !current || !next || next !== confirm}
          className="rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
        >
          {saving ? "Updating…" : "Update password"}
        </button>
      </div>
    </form>
  );
}

function getStrength(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9!@#$%^&*]/.test(pw)) score++;
  return score;
}

function strengthColor(s: number) {
  if (s <= 1) return "bg-red-500";
  if (s === 2) return "bg-yellow-500";
  if (s === 3) return "bg-blue-400";
  return "bg-emerald-400";
}

function strengthLabel(s: number) {
  if (s <= 1) return "Weak password";
  if (s === 2) return "Fair password";
  if (s === 3) return "Good password";
  return "Strong password";
}
