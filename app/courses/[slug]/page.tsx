import { notFound } from "next/navigation";
import { getCourse, generateStaticParams as _generateStaticParams } from "@/app/lib/courses";
import { CoursePlayerClient } from "./course-player-client";
import { CoursePreview } from "./course-preview";

export { _generateStaticParams as generateStaticParams };

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const course = getCourse(slug);
  if (!course) notFound();

  /* Purchased → full player */
  if (course.purchased) return <CoursePlayerClient course={course} />;
  /* Free preview mode → player locked to free lessons */
  if (preview === "true") return <CoursePlayerClient course={course} previewMode />;
  /* Default → sales / preview page */
  return <CoursePreview course={course} />;
}
