"use client";
import { motion } from "motion/react";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/app/components/ui/testimonials-column";

const testimonials: Testimonial[] = [
  {
    text: "This is the first video course I actually finished. The structure is clear, lessons are short and dense, and the downloadable code means I can follow along without wasting time copy-pasting.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Ayesha Raza",
    role: "Junior Frontend Developer",
  },
  {
    text: "I went from zero to landing a backend engineering role in 6 months. Watching at 2× speed and being able to rewind the tricky parts made all the difference.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Carlos Mendoza",
    role: "Backend Engineer",
  },
  {
    text: "The Lifetime deal was an easy decision. I've already worked through 4 courses and the quality is completely consistent — no filler, no padding, just signal.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Nina Vogt",
    role: "Staff Engineer",
  },
  {
    text: "I've tried a lot of platforms. The free previews here are generous enough that I knew exactly what I was buying before I paid. No surprises at all.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Tariq Hassan",
    role: "Fullstack Developer",
  },
  {
    text: "The TypeScript course saved me weeks of trial-and-error. Practical, opinionated, and current — exactly what I needed before joining a team with a strict TS codebase.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Mia Johansson",
    role: "Frontend Engineer",
  },
  {
    text: "Finished the System Design path in 8 weeks while working full-time. The resume feature across devices made it possible — I study on the commute every morning.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Kofi Agyemang",
    role: "Data Scientist",
  },
  {
    text: "The progress tracking keeps me accountable. Seeing the percentage bar move is more motivating than it has any right to be.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Layla Osei",
    role: "Product Designer",
  },
  {
    text: "Bought the Node.js course on a Friday, finished the first two sections before Sunday. The pace is just right — fast but never rushed.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Daniel Park",
    role: "Backend Developer",
  },
  {
    text: "The UI/UX course gave me the vocabulary and mental models I was missing. I can now talk to designers with confidence and push back on bad decisions with reasoning.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=80&h=80&auto=format&fit=crop",
    name: "Priya Nair",
    role: "Product Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
            From learners
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-tight text-white">
            What students are saying
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Thousands of developers, designers, and engineers have levelled up
            with LearnFlow.
          </p>
        </motion.div>

        {/* Animated columns */}
        <div className="flex justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] max-h-[720px]">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={23}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={20}
          />
        </div>
      </div>
    </section>
  );
}
