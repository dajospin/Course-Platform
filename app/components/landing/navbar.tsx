import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { NavUserButton } from "@/app/components/nav-user-button";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-backdrop">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <SparkleIcon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
          <span className="text-base font-bold tracking-tight text-white">
            LearnFlow
          </span>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <NavUserButton />
          <Button variant="primary" size="sm" asChild>
            <Link href="/courses">Browse courses</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
      <path d="M19 16L19.75 19L22 19.75L19.75 20.5L19 23L18.25 20.5L16 19.75L18.25 19L19 16Z" opacity="0.6" />
      <path d="M5 2L5.5 4L7 4.5L5.5 5L5 7L4.5 5L3 4.5L4.5 4L5 2Z" opacity="0.5" />
    </svg>
  );
}
