"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth/client";
import { useRouter } from "next/navigation";

interface Props {
  user: { name: string; email: string };
}

export function AccountForm({ user }: Props) {
  const [name, setName] = useState(user.name);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    const { error: err } = await authClient.updateUser({ name });
    setSaving(false);

    if (err) {
      setError(err.message || "Failed to update profile.");
    } else {
      setSuccess(true);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="acc-name" className="mb-1.5 block text-xs font-medium text-text-secondary">
            Full name
          </label>
          <input
            id="acc-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-white/8 bg-white/4 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent/50 focus:bg-white/6"
          />
        </div>
        <div>
          <label htmlFor="acc-email" className="mb-1.5 block text-xs font-medium text-text-secondary">
            Email
          </label>
          <input
            id="acc-email"
            type="email"
            value={user.email}
            disabled
            className="w-full rounded-xl border border-white/6 bg-white/2 px-3.5 py-2.5 text-sm text-text-muted cursor-not-allowed"
          />
          <p className="mt-1 text-[10px] text-text-muted">Email cannot be changed</p>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
          Profile updated successfully.
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving || name === user.name}
          className="rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
