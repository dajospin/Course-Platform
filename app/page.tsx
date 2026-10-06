import { Navbar } from "@/app/components/landing/navbar";
import { Hero } from "@/app/components/landing/hero";
import { Features } from "@/app/components/landing/features";
import { CoursesPreview } from "@/app/components/landing/courses-preview";
import { Pricing } from "@/app/components/landing/pricing";
import { Testimonials } from "@/app/components/landing/testimonials";
import { CtaBanner } from "@/app/components/landing/cta-banner";
import { Footer } from "@/app/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CoursesPreview />
        <Pricing />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
