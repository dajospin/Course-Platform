import Link from "next/link";
import { type Course } from "@/app/lib/courses";
import { Navbar } from "@/app/components/landing/navbar";
import { Footer } from "@/app/components/landing/footer";

interface Props {
  course: Course;
}

export function CoursePreview({ course }: Props) {
  const totalLessons = course.chapters.flatMap((c) => c.lessons).length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-16">

        {/* ── Page hero band ───────────────────────────────────────────── */}
        <div className="border-b border-white/6 bg-bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-1.5 text-xs text-text-muted">
              <Link href="/courses" className="transition-colors hover:text-white">Courses</Link>
              <span className="text-white/15">›</span>
              <span className="text-text-secondary">{course.title}</span>
            </div>

            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                style={{
                  background: `${course.gradient[0]}20`,
                  color: course.gradient[0],
                  border: `1px solid ${course.gradient[0]}30`,
                }}
              >
                {course.level}
              </span>
              {course.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/8 bg-white/4 px-2.5 py-0.5 text-[11px] text-text-muted">
                  {t}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              {course.title}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-text-secondary">{course.subtitle}</p>

            {/* Stats row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-semibold text-white">{course.rating}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {course.students.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" />
                </svg>
                {totalLessons} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
                </svg>
                {course.totalDuration}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M23 7l-7-5-7 5M12 2v20M5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" />
                </svg>
                Updated {course.updatedAt}
              </span>
            </div>
          </div>
        </div>

        {/* ── Body: 2-column layout ────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">

            {/* ── Left column ─────────────────────────────────────────── */}
            <div className="space-y-10">

              {/* Video / thumbnail */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/8">
                {/* Gradient background */}
                <div
                  className="relative flex aspect-video w-full items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${course.gradient[0]}22 0%, ${course.gradient[1]}14 50%, #040a18 100%)`,
                  }}
                >
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: `linear-gradient(${course.gradient[0]}15 1px, transparent 1px), linear-gradient(90deg, ${course.gradient[0]}15 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${course.gradient[0]}22, transparent 65%)`,
                    }}
                  />
                  {/* Course icon */}
                  <div className="relative flex flex-col items-center gap-5">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-3xl border backdrop-blur-sm"
                      style={{
                        background: `linear-gradient(135deg, ${course.gradient[0]}30, ${course.gradient[1]}18)`,
                        borderColor: `${course.gradient[0]}40`,
                        boxShadow: `0 0 60px ${course.gradient[0]}28`,
                      }}
                    >
                      <span className="font-mono text-3xl font-black" style={{ color: course.gradient[0] }}>
                        {course.icon}
                      </span>
                    </div>
                    {/* Play button */}
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/14 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/22 cursor-pointer"
                    >
                      <svg className="h-6 w-6 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Free preview label bottom-left */}
                  <Link
                    href={`/courses/${course.slug}?preview=true`}
                    className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <svg className="h-3.5 w-3.5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                    <span className="text-xs font-medium text-white/80">Watch a free preview</span>
                  </Link>
                </div>
              </div>

              {/* About */}
              <section>
                <h2 className="mb-3 text-xl font-bold text-white">About this course</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{course.about}</p>
              </section>

              {/* What you'll learn */}
              <section>
                <div className="rounded-2xl border border-white/8 bg-bg-surface p-6">
                  <h2 className="mb-5 text-lg font-bold text-white">What you&apos;ll learn</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {course.whatYoullLearn.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Curriculum */}
              <section>
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-bold text-white">Curriculum</h2>
                  <p className="text-sm text-text-muted">
                    {course.chapters.length} sections · {totalLessons} lessons · {course.totalDuration}
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/8">
                  {course.chapters.map((chapter, ci) => (
                    <div key={ci} className={ci > 0 ? "border-t border-white/6" : ""}>
                      {/* Chapter header */}
                      <div className="flex items-center justify-between bg-bg-surface px-5 py-3.5">
                        <h3 className="text-sm font-bold text-white">{chapter.title}</h3>
                        <span className="text-xs text-text-muted">{chapter.lessons.length} lessons</span>
                      </div>
                      {/* Lessons */}
                      {chapter.lessons.map((lesson, li) => {
                        const isFree = course.freePreviewLessonIds.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            className={[
                              "flex items-center gap-3 border-t border-white/4 px-5 py-3 transition-colors",
                              isFree ? "hover:bg-white/3 cursor-pointer" : "",
                            ].join(" ")}
                          >
                            {/* Icon */}
                            {isFree ? (
                              <svg className="h-4 w-4 shrink-0 text-accent/70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4 shrink-0 text-white/20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                            )}
                            {/* Number + title */}
                            <span className="text-xs text-text-muted shrink-0">{ci * 10 + li + 1}.</span>
                            <span className={[
                              "flex-1 text-sm",
                              isFree ? "text-white" : "text-text-secondary",
                            ].join(" ")}>
                              {lesson.title}
                            </span>
                            {/* Free badge */}
                            {isFree && (
                              <span className="shrink-0 rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                                Free
                              </span>
                            )}
                            {/* Duration */}
                            <span className="shrink-0 text-xs tabular-nums text-text-muted">{lesson.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </section>

              {/* Instructor */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">Your instructor</h2>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
                  >
                    {course.instructor.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white">{course.instructor.name}</p>
                    <p className="text-sm text-text-muted">{course.instructor.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{course.instructor.bio}</p>
                  </div>
                </div>
              </section>

            </div>

            {/* ── Right column: sticky pricing card ──────────────────── */}
            <div className="mt-8 lg:mt-0">
              <div className="sticky top-20">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-bg-surface shadow-[0_8px_48px_rgba(0,0,0,0.5)]">
                  {/* Price */}
                  <div className="border-b border-white/6 p-6 pb-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">${course.price}</span>
                      <span className="text-sm text-text-muted">one-time</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 p-5">
                    <button
                      className="flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold text-bg-primary transition-all hover:opacity-90 active:scale-95"
                      style={{ background: `linear-gradient(135deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
                    >
                      Buy course
                    </button>
                    <Link
                      href={`/courses/${course.slug}?preview=true`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/8 active:scale-95"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10,8 16,12 10,16" fill="white" stroke="none" />
                      </svg>
                      Watch free preview
                    </Link>
                  </div>

                  {/* Feature list */}
                  <div className="border-t border-white/6 px-5 py-4">
                    {[
                      `${totalLessons} lessons (${course.totalDuration})`,
                      "Source code for every lesson",
                      "Lifetime access",
                      "Progress tracking",
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2.5 py-1.5">
                        <svg className="h-3.5 w-3.5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs text-text-secondary">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* All Access upsell */}
                  <div className="border-t border-white/6 px-5 py-4 text-center">
                    <p className="text-xs text-text-muted">
                      Or get every course with{" "}
                      <Link href="/#pricing" className="font-semibold text-accent transition-colors hover:underline">
                        All Access
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-4 flex justify-center gap-6 text-center">
                  {[
                    { icon: "🔒", label: "Secure checkout" },
                    { icon: "♾️", label: "Lifetime access" },
                    { icon: "💳", label: "One-time payment" },
                  ].map((b) => (
                    <div key={b.label}>
                      <div className="text-lg">{b.icon}</div>
                      <p className="mt-0.5 text-[10px] text-text-muted">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
