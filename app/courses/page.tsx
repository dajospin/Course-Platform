import Link from "next/link";
import { Navbar } from "@/app/components/landing/navbar";
import { Footer } from "@/app/components/landing/footer";
import { COURSES, type Course } from "@/app/lib/courses";

/* ─── Derive the "in progress" and "recommended" courses from data ────────── */
function getHeroCourse() {
  /* Course with most absolute completed lessons → "continue learning" */
  const started = COURSES.filter((c) => c.completedLessonIds.length > 0).sort(
    (a, b) => b.completedLessonIds.length - a.completedLessonIds.length
  );
  if (started.length === 0) return null;
  return started[0];
}

function getNextLesson(course: Course) {
  for (const ch of course.chapters) {
    for (const l of ch.lessons) {
      if (!course.completedLessonIds.includes(l.id)) return l;
    }
  }
  return null;
}

export default function CoursesPage() {
  const heroCourse = getHeroCourse();
  const heroNext = heroCourse ? getNextLesson(heroCourse) : null;
  const heroProgress = heroCourse
    ? Math.round((heroCourse.completedLessonIds.length / heroCourse.totalLessons) * 100)
    : 0;

  const beginners = COURSES.filter((c) => c.level === "Beginner");
  const intermediates = COURSES.filter((c) => c.level === "Intermediate");
  const advanced = COURSES.filter((c) => c.level === "Advanced");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-16">

        {/* ── Page header ────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden border-b border-white/6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(59,130,246,0.10),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <p className="mb-2 text-xs font-medium text-text-muted">Courses</p>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Learn by building real apps
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
              Every course is one complete project, recorded start to finish, with the
              source code for each lesson.
            </p>

            {/* ── Continue / recommended card ─────────────────────────────── */}
            {heroCourse && heroNext && (
              <Link
                href={`/courses/${heroCourse.slug}`}
                className="group relative mt-8 flex overflow-hidden rounded-2xl border border-white/8 bg-bg-surface transition-all duration-300 hover:border-white/16 hover:shadow-[0_8px_48px_rgba(0,0,0,0.5)] sm:flex-row"
              >
                {/* ── Thumbnail ─────────────────────────────────────── */}
                <div
                  className="relative flex w-full shrink-0 items-center justify-center sm:w-56 md:w-72"
                  style={{
                    background: `linear-gradient(135deg, ${heroCourse.gradient[0]}28 0%, ${heroCourse.gradient[1]}18 100%)`,
                    minHeight: "160px",
                  }}
                >
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(${heroCourse.gradient[0]}18 1px, transparent 1px), linear-gradient(90deg, ${heroCourse.gradient[0]}18 1px, transparent 1px)`,
                      backgroundSize: "28px 28px",
                    }}
                  />
                  {/* Glow */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${heroCourse.gradient[0]}28, transparent 70%)`,
                    }}
                  />
                  {/* Course icon */}
                  <div
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${heroCourse.gradient[0]}30, ${heroCourse.gradient[1]}20)`,
                      borderColor: `${heroCourse.gradient[0]}45`,
                      boxShadow: `0 0 40px ${heroCourse.gradient[0]}30`,
                    }}
                  >
                    <span
                      className="font-mono text-2xl font-black"
                      style={{ color: heroCourse.gradient[0] }}
                    >
                      {heroCourse.icon}
                    </span>
                  </div>
                  {/* Level chip */}
                  <span
                    className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      background: `${heroCourse.gradient[0]}20`,
                      color: heroCourse.gradient[0],
                      border: `1px solid ${heroCourse.gradient[0]}30`,
                    }}
                  >
                    {heroCourse.level}
                  </span>
                </div>

                {/* ── Info ──────────────────────────────────────────── */}
                <div className="flex flex-1 flex-col justify-center gap-3 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-semibold text-accent">Continue learning</p>
                    <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
                      {heroCourse.title}
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">
                      Up next:{" "}
                      <span className="text-white/70">{heroNext.title}</span>
                      {" · "}
                      <span className="text-text-muted">{heroNext.duration}</span>
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 overflow-hidden rounded-full bg-white/8 h-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${heroProgress}%`,
                          background: `linear-gradient(90deg, ${heroCourse.gradient[0]}, ${heroCourse.gradient[1]})`,
                        }}
                      />
                    </div>
                    <span className="shrink-0 text-xs font-medium tabular-nums text-text-secondary">
                      {heroProgress}%
                    </span>
                  </div>

                  {/* Resume button */}
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 group-hover:gap-2.5 group-hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${heroCourse.gradient[0]}, ${heroCourse.gradient[1]})`,
                      }}
                    >
                      Resume lesson
                      <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Hover shimmer */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(105deg, transparent 40%, ${heroCourse.gradient[0]}06 60%, transparent 70%)`,
                  }}
                />
              </Link>
            )}

            {/* Recommended banner — only if no course started */}
            {!heroCourse && (
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Recommended for you</p>
                  <p className="text-xs text-text-secondary">
                    Start with{" "}
                    <Link href="/courses/fullstack-nextjs" className="text-accent hover:underline">
                      Full-Stack Next.js 16
                    </Link>{" "}
                    — the most popular course on the platform.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Filter bar ────────────────────────────────────────────────── */}
        <div className="sticky top-16 z-30 border-b border-white/6 bg-bg-primary/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {["All", "Beginner", "Intermediate", "Advanced"].map((f) => (
              <button
                key={f}
                className={[
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                  f === "All"
                    ? "bg-accent text-white"
                    : "border border-white/10 bg-white/4 text-text-secondary hover:text-white",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
            <div className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5 sm:flex">
              <svg className="h-3.5 w-3.5 text-white/30" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                placeholder="Search courses…"
                className="w-40 bg-transparent text-xs text-white placeholder-white/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ── Course grid ───────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Section label="Beginner" courses={beginners} />
          <Section label="Intermediate" courses={intermediates} />
          <Section label="Advanced" courses={advanced} />
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
function Section({ label, courses }: { label: string; courses: Course[] }) {
  if (!courses.length) return null;
  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">{label}</h2>
        <div className="flex-1 border-t border-white/6" />
        <span className="text-xs text-text-muted">{courses.length} course{courses.length > 1 ? "s" : ""}</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}

/* ─── CourseCard ──────────────────────────────────────────────────────────── */
function CourseCard({ course }: { course: Course }) {
  const completedCount = course.completedLessonIds.length;
  const progress = Math.round((completedCount / course.totalLessons) * 100);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Thumbnail */}
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${course.gradient[0]}22 0%, ${course.gradient[1]}22 100%)`,
          borderBottom: `1px solid ${course.gradient[0]}20`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(${course.gradient[0]}18 1px, transparent 1px), linear-gradient(90deg, ${course.gradient[0]}18 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${course.gradient[0]}30, transparent 70%)`,
          }}
        />
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${course.gradient[0]}30, ${course.gradient[1]}20)`,
            borderColor: `${course.gradient[0]}40`,
            boxShadow: `0 0 32px ${course.gradient[0]}30`,
          }}
        >
          <span className="font-mono text-xl font-black" style={{ color: course.gradient[0] }}>
            {course.icon}
          </span>
        </div>
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
          style={{
            background: `${course.gradient[0]}25`,
            color: course.gradient[0],
            border: `1px solid ${course.gradient[0]}30`,
          }}
        >
          {course.level}
        </span>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
          <div className="flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100">
            <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {course.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md border border-white/8 bg-white/4 px-2 py-0.5 text-[10px] font-medium text-text-muted">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-bold leading-snug text-white">{course.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-secondary">{course.subtitle}</p>

        <div className="mt-4 flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
          >
            {course.instructor.initials}
          </div>
          <div>
            <p className="text-xs font-medium text-white">{course.instructor.name}</p>
            <p className="text-[10px] text-text-muted">{course.instructor.role}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 text-[11px] text-text-muted">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" />
              </svg>
              {course.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
              </svg>
              {course.totalDuration}
            </span>
          </div>
          {progress > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                  }}
                />
              </div>
              <span className="text-[10px] text-text-muted">{progress}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
