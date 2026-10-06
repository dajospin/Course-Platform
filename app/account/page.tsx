import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth/server";
import { COURSES } from "@/app/lib/courses";
import { Navbar } from "@/app/components/landing/navbar";
import { AccountForm } from "./account-form";
import { ChangePasswordForm } from "./change-password-form";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");

  const user = session.user;
  const enrolledCourses = COURSES.filter((c) => c.purchased);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-16">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-2xl font-black tracking-tight text-white">My account</h1>
            <p className="mt-1 text-sm text-text-secondary">Manage your profile and enrolled courses</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

            {/* ── Left column ─────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Profile card */}
              <section className="overflow-hidden rounded-2xl border border-white/8 bg-bg-card">
                <div className="border-b border-white/6 px-6 py-4">
                  <h2 className="text-sm font-bold text-white">Profile information</h2>
                </div>
                <div className="p-6">
                  {/* Avatar row */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/20 bg-accent/15 text-xl font-black text-accent">
                      {getInitials(user.name ?? user.email ?? "?")}
                    </div>
                    <div>
                      <p className="font-bold text-white">{user.name}</p>
                      <p className="text-sm text-text-muted">{user.email}</p>
                      <span className="mt-1 inline-block rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Edit form — client component */}
                  <AccountForm user={{ name: user.name ?? "", email: user.email ?? "" }} />
                </div>
              </section>

              {/* Change password */}
              <section className="overflow-hidden rounded-2xl border border-white/8 bg-bg-card">
                <div className="border-b border-white/6 px-6 py-4">
                  <h2 className="text-sm font-bold text-white">Change password</h2>
                  <p className="mt-0.5 text-xs text-text-muted">
                    After updating, all other active sessions will be signed out.
                  </p>
                </div>
                <div className="p-6">
                  <ChangePasswordForm />
                </div>
              </section>

              {/* Enrolled courses */}
              <section className="overflow-hidden rounded-2xl border border-white/8 bg-bg-card">
                <div className="border-b border-white/6 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white">Enrolled courses</h2>
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold text-accent">
                    {enrolledCourses.length}
                  </span>
                </div>
                <div className="divide-y divide-white/5">
                  {enrolledCourses.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                      <p className="text-sm text-text-muted">You haven't enrolled in any courses yet.</p>
                      <a
                        href="/courses"
                        className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
                      >
                        Browse courses →
                      </a>
                    </div>
                  ) : (
                    enrolledCourses.map((course) => {
                      const total = course.chapters.flatMap((c) => c.lessons).length;
                      const done = course.completedLessonIds.length;
                      const pct = Math.round((done / total) * 100);
                      return (
                        <a
                          key={course.slug}
                          href={`/courses/${course.slug}`}
                          className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/3"
                        >
                          {/* Thumbnail */}
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-sm font-black"
                            style={{
                              background: `linear-gradient(135deg, ${course.gradient[0]}25, ${course.gradient[1]}15)`,
                              borderColor: `${course.gradient[0]}30`,
                              color: course.gradient[0],
                            }}
                          >
                            {course.icon}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-white">{course.title}</p>
                            <p className="text-[11px] text-text-muted">{done}/{total} lessons completed</p>
                            {/* Progress bar */}
                            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/8">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${pct}%`,
                                  background: `linear-gradient(90deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <span className="text-xs font-bold tabular-nums text-white">{pct}%</span>
                            <p className="mt-0.5 text-[10px] text-text-muted">
                              {pct === 100 ? "Completed ✓" : "In progress"}
                            </p>
                          </div>
                        </a>
                      );
                    })
                  )}
                </div>
              </section>
            </div>

            {/* ── Right column: sidebar cards ─────────────────────────── */}
            <div className="space-y-5">
              {/* Account summary */}
              <div className="rounded-2xl border border-white/8 bg-bg-card p-5">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-muted">
                  Account summary
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Courses enrolled", value: String(enrolledCourses.length) },
                    { label: "Lessons completed", value: String(COURSES.reduce((acc, c) => acc + c.completedLessonIds.length, 0)) },
                    { label: "Member since", value: "Oct 2026" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{row.label}</span>
                      <span className="font-semibold text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div className="rounded-2xl border border-red-500/15 bg-red-500/5 p-5">
                <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-red-400/70">
                  Danger zone
                </h3>
                <p className="mb-4 text-xs text-text-muted">This action is permanent and cannot be undone.</p>
                <button
                  disabled
                  className="w-full rounded-xl border border-red-500/25 py-2 text-xs font-semibold text-red-400/60 cursor-not-allowed"
                >
                  Delete account
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

function getInitials(nameOrEmail: string) {
  if (nameOrEmail.includes("@")) return nameOrEmail[0].toUpperCase();
  return nameOrEmail
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
