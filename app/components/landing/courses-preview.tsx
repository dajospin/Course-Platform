import Link from "next/link";
import { COURSES, type Course } from "@/app/lib/courses";

const LEVEL_DOT: Record<Course["level"], string> = {
  Beginner:     "bg-emerald-400",
  Intermediate: "bg-yellow-400",
  Advanced:     "bg-red-400",
};

export function CoursesPreview() {
  return (
    <section className="border-t border-white/5 bg-bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
              Course library
            </span>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-tight text-white">
              Start with a top-rated course
            </h2>
            <p className="mt-2 max-w-lg text-base text-text-secondary">
              Practical, project-focused courses you can buy individually or get
              all of them with a subscription.
            </p>
          </div>
          <Link
            href="/courses"
            className="self-start shrink-0 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/30 hover:text-white sm:self-auto"
          >
            Browse all courses →
          </Link>
        </div>

        {/* Grid — show all 6 real courses */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course }: { course: Course }) {
  const completedCount = course.completedLessonIds.length;
  const progress = Math.round((completedCount / course.totalLessons) * 100);
  /* First tag shown as category chip */
  const category = course.tags[0];

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-white/18 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Gradient thumbnail */}
      <div
        className="relative h-40 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${course.gradient[0]} 0%, ${course.gradient[1]} 100%)`,
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-linear-to-t from-bg-card/70 via-transparent to-transparent" />
        {/* Noise blobs */}
        <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/8 blur-2xl" />
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/8 blur-xl" />

        {/* Course icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-xl bg-black/25 backdrop-blur-sm border border-white/15">
          <span className="font-mono text-lg font-black text-white">{course.icon}</span>
        </div>

        {/* Level badge — top right */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
          <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_DOT[course.level]}`} />
          <span className="text-[10px] font-medium text-white/80">{course.level}</span>
        </div>

        {/* Free preview badge — bottom left */}
        {course.freePreviewLessonIds.length > 0 && !course.purchased && (
          <div className="absolute bottom-3 left-3 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-0.5 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-emerald-300">Free preview</span>
          </div>
        )}

        {/* "Purchased" badge */}
        {course.purchased && (
          <div className="absolute bottom-3 left-3 rounded-full border border-accent/30 bg-accent/20 px-2.5 py-0.5 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-accent">Enrolled</span>
          </div>
        )}

        {/* Play overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25">
            <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category chip */}
        <span
          className="mb-3 self-start rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
          style={{
            color: course.gradient[0],
            background: `${course.gradient[0]}18`,
            borderColor: `${course.gradient[0]}30`,
          }}
        >
          {category}
        </span>

        {/* Title */}
        <h3 className="mb-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-white">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-xs leading-relaxed text-text-secondary line-clamp-2">
          {course.subtitle}
        </p>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-2 text-[11px] text-text-muted">
          <span>{course.totalLessons} lessons</span>
          <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
          <span>{course.totalDuration} total</span>
        </div>

        {/* Progress bar (only for started courses) */}
        {progress > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <div className="flex-1 overflow-hidden rounded-full bg-white/8 h-1">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                }}
              />
            </div>
            <span className="text-[10px] tabular-nums text-text-muted">{progress}%</span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between border-t border-white/6 pt-4">
          {course.purchased ? (
            <span className="text-sm font-bold text-emerald-400">Enrolled</span>
          ) : (
            <span className="text-lg font-black text-white">${course.price}</span>
          )}
          <span
            className="rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-white/60 transition-all group-hover:border-white/20 group-hover:bg-white/8 group-hover:text-white"
          >
            {course.purchased ? "Continue →" : "View course →"}
          </span>
        </div>
      </div>
    </Link>
  );
}
