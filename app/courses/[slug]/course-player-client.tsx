"use client";

import { useState } from "react";
import Link from "next/link";
import { type Course, type Lesson } from "@/app/lib/courses";

interface ActiveLesson {
  chapterIdx: number;
  lessonIdx: number;
}

interface Props {
  course: Course;
  previewMode?: boolean;
}

export function CoursePlayerClient({ course, previewMode = false }: Props) {
  /* In preview mode, only free-preview lessons are accessible */
  const freeIds = new Set(course.freePreviewLessonIds);

  /* Find the first accessible lesson as default active */
  const defaultActive = (() => {
    for (let ci = 0; ci < course.chapters.length; ci++) {
      const ch = course.chapters[ci];
      for (let li = 0; li < ch.lessons.length; li++) {
        const lesson = ch.lessons[li];
        if (previewMode && !freeIds.has(lesson.id)) continue;
        if (!course.completedLessonIds.includes(lesson.id)) {
          return { chapterIdx: ci, lessonIdx: li };
        }
      }
    }
    return { chapterIdx: 0, lessonIdx: 0 };
  })();

  const [active, setActive] = useState<ActiveLesson>(defaultActive);
  const [completed, setCompleted] = useState<Set<string>>(
    new Set(course.completedLessonIds)
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "notes">("overview");

  const currentChapter = course.chapters[active.chapterIdx];
  const currentLesson = currentChapter?.lessons[active.lessonIdx];

  const allLessons = course.chapters.flatMap((ch) => ch.lessons);
  const totalLessons = allLessons.length;
  const completedCount = completed.size;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  function markComplete(lessonId: string) {
    setCompleted((prev) => new Set([...prev, lessonId]));
  }

  /* Find next lesson */
  const nextLesson = (() => {
    const chapters = course.chapters;
    const { chapterIdx, lessonIdx } = active;
    const ch = chapters[chapterIdx];
    if (lessonIdx + 1 < ch.lessons.length) {
      return { chapterIdx, lessonIdx: lessonIdx + 1, lesson: ch.lessons[lessonIdx + 1] };
    }
    if (chapterIdx + 1 < chapters.length) {
      const nextCh = chapters[chapterIdx + 1];
      return { chapterIdx: chapterIdx + 1, lessonIdx: 0, lesson: nextCh.lessons[0] };
    }
    return null;
  })();

  return (
    <div className="flex h-screen flex-col bg-bg-primary">
      {/* ── Free preview banner ───────────────────────────────────────────── */}
      {previewMode && (
        <div className="flex shrink-0 items-center justify-between gap-3 bg-amber-500/12 border-b border-amber-500/20 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-amber-300">
            <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>You're watching a <strong>free preview</strong> — only unlocked lessons are available.</span>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="shrink-0 rounded-lg px-3 py-1 text-xs font-bold text-amber-900 transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(90deg, #f59e0b, #f97316)` }}
          >
            Buy course →
          </Link>
        </div>
      )}

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/6 bg-bg-primary/95 px-4 backdrop-blur-lg sm:px-6">
        {/* Logo / back */}
        <Link href="/courses" className="flex items-center gap-2 text-text-secondary transition-colors hover:text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden text-sm font-medium sm:block">Courses</span>
        </Link>
        <span className="text-white/15">/</span>
        <span className="hidden truncate text-sm font-semibold text-white sm:block">{course.title}</span>
        <span className="text-white/15 hidden sm:block">/</span>
        <span className="hidden truncate text-sm text-text-secondary sm:block">{currentLesson?.title}</span>

        {/* Toggle sidebar (mobile) */}
        <button
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-text-secondary transition-colors hover:text-white lg:hidden"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
          </svg>
          Lessons
        </button>

        {/* Progress pill */}
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${course.gradient[0]}, ${course.gradient[1]})`,
              }}
            />
          </div>
          <span className="text-xs text-text-secondary">{progressPct}%</span>
        </div>

        {/* User avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
          A
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Column 1: Chapter sidebar ────────────────────────────────── */}
        <aside
          className={[
            "flex w-64 shrink-0 flex-col overflow-hidden border-r border-white/5 bg-[#040a18] transition-all duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "absolute inset-y-14 left-0 z-20 lg:relative lg:inset-y-auto",
          ].join(" ")}
        >
          {/* Course header */}
          <div
            className="flex-shrink-0 p-4"
            style={{ borderBottom: `1px solid ${course.gradient[0]}18` }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-sm font-black"
                style={{
                  background: `linear-gradient(135deg, ${course.gradient[0]}22, ${course.gradient[1]}15)`,
                  borderColor: `${course.gradient[0]}30`,
                  color: course.gradient[0],
                }}
              >
                {course.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{course.title}</p>
                <p className="truncate text-[10px] text-text-muted">{completedCount}/{totalLessons} completed</p>
              </div>
            </div>
            {/* Mini progress bar */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                }}
              />
            </div>
          </div>

          {/* Lessons list */}
          <div className="flex-1 overflow-y-auto">
            {course.chapters.map((chapter, ci) => {
              const chapterDone = chapter.lessons.every((l) => completed.has(l.id));
              const chapterProgress = chapter.lessons.filter((l) => completed.has(l.id)).length;
              return (
                <div key={ci} className="border-b border-white/4">
                  {/* Chapter header */}
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">
                      {chapter.title}
                    </span>
                    <span className={[
                      "text-[9px] font-semibold",
                      chapterDone ? "text-emerald-400" : "text-text-muted",
                    ].join(" ")}>
                      {chapterProgress}/{chapter.lessons.length}
                    </span>
                  </div>

                  {/* Lessons */}
                  {chapter.lessons.map((lesson, li) => {
                    const isActive = active.chapterIdx === ci && active.lessonIdx === li;
                    const isDone = completed.has(lesson.id);
                    const isLocked = previewMode && !freeIds.has(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        disabled={isLocked}
                        onClick={() => {
                          if (isLocked) return;
                          setActive({ chapterIdx: ci, lessonIdx: li });
                          setSidebarOpen(false);
                        }}
                        className={[
                          "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors",
                          isLocked
                            ? "cursor-not-allowed opacity-40"
                            : isActive
                            ? "bg-accent/10 text-white"
                            : isDone
                            ? "text-text-secondary hover:bg-white/3"
                            : "text-text-muted hover:bg-white/3 hover:text-text-secondary",
                        ].join(" ")}
                      >
                        {/* Status icon */}
                        <span className={[
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                          isLocked
                            ? "bg-white/6 text-white/20"
                            : isActive
                            ? "bg-accent/25 text-accent"
                            : isDone
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-white/6 text-white/30",
                        ].join(" ")}>
                          {isLocked ? (
                            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                          ) : isDone && !isActive ? (
                            <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : isActive ? (
                            <svg className="h-2.5 w-2.5 translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5.14v14l11-7-11-7z" />
                            </svg>
                          ) : (
                            <span>{ci * 10 + li + 1}</span>
                          )}
                        </span>
                        <span className="flex-1 truncate text-[11px] leading-snug">{lesson.title}</span>
                        <span className={[
                          "shrink-0 text-[10px]",
                          isActive ? "text-accent/60" : "text-white/20",
                        ].join(" ")}>
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── Column 2: Main content ─────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">

            {/* Video player */}
            <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "55vh" }}>
              {/* Gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${course.gradient[0]}18 0%, ${course.gradient[1]}10 50%, #040a18 100%)`,
                }}
              />
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(${course.gradient[0]}15 1px, transparent 1px), linear-gradient(90deg, ${course.gradient[0]}15 1px, transparent 1px)`,
                  backgroundSize: "48px 48px",
                }}
              />
              {/* Glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 50% 60% at 50% 50%, ${course.gradient[0]}18, transparent 65%)`,
                }}
              />

              {/* Course icon — large, centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-3xl border backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${course.gradient[0]}28, ${course.gradient[1]}18)`,
                    borderColor: `${course.gradient[0]}35`,
                    boxShadow: `0 0 60px ${course.gradient[0]}25`,
                  }}
                >
                  <span
                    className="font-mono text-3xl font-black"
                    style={{ color: course.gradient[0] }}
                  >
                    {course.icon}
                  </span>
                </div>

                {/* Play button */}
                <button
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/12 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
                  onClick={() => currentLesson && markComplete(currentLesson.id)}
                  title="Mark as complete"
                >
                  {currentLesson && completed.has(currentLesson.id) ? (
                    <svg className="h-7 w-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="h-7 w-7 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  )}
                </button>
                <p className="text-xs text-white/40">
                  {currentLesson && completed.has(currentLesson.id) ? "Completed ✓" : "Click to mark complete"}
                </p>
              </div>

              {/* Playback controls bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#040a18] to-transparent px-5 pb-4 pt-8">
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 shrink-0 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                  <div className="flex-1 rounded-full bg-white/12 h-1.5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "38%",
                        background: `linear-gradient(90deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-white/40">7:14 / {currentLesson?.duration}</span>
                  <svg className="h-4 w-4 shrink-0 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                  <svg className="h-4 w-4 shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Lesson info */}
            <div className="p-5 sm:p-6">
              {/* Title + complete button */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-text-muted">{currentChapter?.title}</p>
                  <h2 className="mt-1 text-xl font-bold text-white">{currentLesson?.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  {nextLesson && (
                    <button
                      onClick={() => {
                        if (currentLesson) markComplete(currentLesson.id);
                        setActive({ chapterIdx: nextLesson.chapterIdx, lessonIdx: nextLesson.lessonIdx });
                      }}
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                      }}
                    >
                      Next lesson
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-5 border-b border-white/6">
                <div className="flex gap-0">
                  {(["overview", "resources", "notes"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={[
                        "border-b-2 px-4 py-2.5 text-sm font-medium capitalize transition-colors",
                        activeTab === tab
                          ? "border-accent text-white"
                          : "border-transparent text-text-secondary hover:text-white",
                      ].join(" ")}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab: Overview */}
              {activeTab === "overview" && (
                <div className="mt-5 space-y-5">
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {currentLesson?.description}
                  </p>
                  {currentLesson && currentLesson.topics.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
                        What you&apos;ll learn
                      </p>
                      <ul className="space-y-2">
                        {currentLesson.topics.map((topic) => (
                          <li key={topic} className="flex items-center gap-2.5 text-sm text-text-secondary">
                            <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Resources */}
              {activeTab === "resources" && (
                <div className="mt-5 space-y-3">
                  {FAKE_RESOURCES.map((r) => (
                    <a
                      key={r.label}
                      href="#"
                      className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 p-3.5 transition-colors hover:border-white/12 hover:bg-white/4"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `${course.gradient[0]}18` }}
                      >
                        <span className="text-sm">{r.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{r.label}</p>
                        <p className="text-xs text-text-muted">{r.sub}</p>
                      </div>
                      <svg className="ml-auto h-4 w-4 text-white/25" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}

              {/* Tab: Notes */}
              {activeTab === "notes" && (
                <div className="mt-5">
                  <textarea
                    className="w-full resize-none rounded-xl border border-white/8 bg-white/3 p-4 text-sm text-white/80 placeholder-white/20 outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                    rows={8}
                    placeholder="Write your notes here…"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Column 3: Progress panel ───────────────────────────────────── */}
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-l border-white/5 bg-[#040a18] xl:flex">
          <div className="p-5">
            <p className="mb-5 text-sm font-bold text-white">Your Progress</p>

            {/* Circular gauge */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                  <circle
                    cx="56" cy="56" r="46" fill="none"
                    stroke={`url(#cpg-${course.slug})`}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray="289"
                    strokeDashoffset={`${289 * (1 - progressPct / 100)}`}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                  />
                  <defs>
                    <linearGradient id={`cpg-${course.slug}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={course.gradient[0]} />
                      <stop offset="100%" stopColor={course.gradient[1]} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center">
                  <p className="text-2xl font-black text-white">{progressPct}%</p>
                </div>
              </div>
              <p className="mt-2 text-center text-xs leading-relaxed text-text-muted">
                {completedCount} of {totalLessons} lessons<br />completed
              </p>
            </div>

            {/* Chapter breakdown */}
            <div className="mt-6 space-y-3">
              {course.chapters.map((ch, ci) => {
                const done = ch.lessons.filter((l) => completed.has(l.id)).length;
                const pct = Math.round((done / ch.lessons.length) * 100);
                return (
                  <div key={ci}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="truncate text-[11px] text-text-secondary">{ch.title}</span>
                      <span className="shrink-0 pl-2 text-[10px] text-text-muted">{done}/{ch.lessons.length}</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/6">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Up next */}
            {nextLesson && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-bold text-white">Up next</p>
                <button
                  onClick={() => {
                    if (currentLesson) markComplete(currentLesson.id);
                    setActive({ chapterIdx: nextLesson.chapterIdx, lessonIdx: nextLesson.lessonIdx });
                  }}
                  className="w-full rounded-xl border border-white/6 bg-white/3 p-3.5 text-left transition-all hover:border-white/12 hover:bg-white/6"
                >
                  <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${course.gradient[0]}18` }}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: course.gradient[0] }}>
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold leading-snug text-white">{nextLesson.lesson.title}</p>
                  <p className="mt-1 text-[10px] text-text-muted">{nextLesson.lesson.duration}</p>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/6" />
                </button>
              </div>
            )}

            {/* Certificate */}
            {progressPct >= 80 && (
              <div
                className="mt-6 rounded-xl border p-4 text-center"
                style={{
                  background: `linear-gradient(135deg, ${course.gradient[0]}12, ${course.gradient[1]}08)`,
                  borderColor: `${course.gradient[0]}25`,
                }}
              >
                <div className="mb-2 text-2xl">🏆</div>
                <p className="text-xs font-bold text-white">Almost there!</p>
                <p className="mt-1 text-[10px] text-text-muted">
                  Complete {totalLessons - completedCount} more lesson{totalLessons - completedCount !== 1 ? "s" : ""} to earn your certificate.
                </p>
                <button
                  className="mt-3 w-full rounded-lg py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
                >
                  View certificate
                </button>
              </div>
            )}

            {/* Instructor */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">Instructor</p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${course.gradient[0]}, ${course.gradient[1]})` }}
                >
                  {course.instructor.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{course.instructor.name}</p>
                  <p className="text-[11px] text-text-muted">{course.instructor.role}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-muted">{course.instructor.bio}</p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

/* ─── Static fake resources ───────────────────────────────────────────────── */
const FAKE_RESOURCES = [
  { icon: "📄", label: "Lesson slides", sub: "PDF — 12 pages" },
  { icon: "💻", label: "Starter code", sub: "GitHub — starter branch" },
  { icon: "✅", label: "Completed code", sub: "GitHub — completed branch" },
  { icon: "📚", label: "Further reading", sub: "Official documentation links" },
];
