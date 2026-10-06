export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
}

export interface Chapter {
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  initials: string;
  role: string;
  bio: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  about: string;
  whatYoullLearn: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  instructor: Instructor;
  totalLessons: number;
  totalDuration: string;
  rating: number;
  students: number;
  price: number;
  updatedAt: string;
  gradient: [string, string];
  accentColor: string;
  icon: string;
  chapters: Chapter[];
  /** progress state — for the demo these are pre-seeded */
  completedLessonIds: string[];
  /** fake "purchased" flag — swap with real auth check later */
  purchased: boolean;
  /** first lesson of each chapter is free preview */
  freePreviewLessonIds: string[];
}

/* ─── Helper ──────────────────────────────────────────────────────────────── */
function lesson(
  id: string,
  title: string,
  duration: string,
  description: string,
  topics: string[]
): Lesson {
  return { id, title, duration, description, topics };
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Course data                                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */

export const COURSES: Course[] = [
  /* ── 1 ── Full-Stack Next.js 16 ─────────────────────────────────────────── */
  {
    slug: "fullstack-nextjs",
    title: "Full-Stack Next.js 16",
    subtitle: "Build a production SaaS app from scratch",
    description:
      "Learn to build a complete full-stack SaaS application using Next.js 16, Prisma, PostgreSQL, and Stripe. Covers server components, auth, payments, and zero-downtime deployment.",
    about:
      "Modern web apps need more than a pretty UI. In this course you'll build a complete SaaS product end-to-end — database schema, authentication, billing, and deployment. Every line is written live, every decision is explained, and the full source code ships with each lesson.",
    whatYoullLearn: [
      "Build full-stack apps with Next.js 16 App Router",
      "Set up authentication with NextAuth.js",
      "Design and migrate a PostgreSQL schema with Prisma",
      "Integrate Stripe for one-time and subscription billing",
      "Deploy to Vercel with zero-downtime releases",
      "Handle webhooks and background jobs safely",
    ],
    level: "Intermediate",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    instructor: {
      name: "Alex Chen",
      initials: "AC",
      role: "Senior Full-Stack Engineer",
      bio: "8 years building web apps at scale. Previously at Vercel and Shopify.",
    },
    totalLessons: 42,
    totalDuration: "18h 30m",
    rating: 4.9,
    students: 1243,
    price: 49,
    updatedAt: "Oct 2026",
    gradient: ["#3b82f6", "#6366f1"],
    accentColor: "#3b82f6",
    icon: "⬡",
    purchased: true,
    freePreviewLessonIds: ["njs-1-1", "njs-2-1", "njs-3-1"],
    completedLessonIds: ["njs-1-1", "njs-1-2", "njs-1-3", "njs-1-4", "njs-2-1", "njs-2-2"],
    chapters: [
      {
        title: "Getting Started",
        lessons: [
          lesson("njs-1-1", "Course introduction", "2:45", "Overview of what we'll build and the tools we'll use throughout this course.", ["Course overview", "Project demo", "Required tools"]),
          lesson("njs-1-2", "Setting up your environment", "11:20", "Install and configure Node.js, VS Code, and all necessary extensions.", ["Node.js install", "VS Code setup", "Extensions"]),
          lesson("njs-1-3", "Next.js 16 fundamentals", "12:40", "Understand the App Router, server components, and the new routing model.", ["App Router", "Server components", "File conventions"]),
          lesson("njs-1-4", "Project structure", "8:15", "Scaffold the SaaS starter and walk through every folder and file.", ["Folder layout", "Config files", "Conventions"]),
        ],
      },
      {
        title: "Building the App",
        lessons: [
          lesson("njs-2-1", "File routing system", "9:30", "Master dynamic routes, route groups, and parallel routes.", ["Dynamic routes", "Route groups", "Parallel routes"]),
          lesson("njs-2-2", "Server components deep dive", "14:20", "Understand when and why to use React Server Components.", ["RSC lifecycle", "Data fetching", "Streaming"]),
          lesson("njs-2-3", "Setting up authentication", "18:42", "Implement sign-in with NextAuth.js, GitHub and Google providers.", ["NextAuth.js", "OAuth providers", "Session management"]),
          lesson("njs-2-4", "API routes", "11:15", "Build type-safe Route Handlers for your REST endpoints.", ["Route Handlers", "Request validation", "Error handling"]),
          lesson("njs-2-5", "Database setup with Prisma", "13:40", "Connect PostgreSQL, define your schema, and run migrations.", ["Prisma schema", "Migrations", "Seeding"]),
          lesson("njs-2-6", "Building the dashboard", "16:00", "Render live data in a protected dashboard page.", ["Protected routes", "Data fetching", "Loading states"]),
        ],
      },
      {
        title: "Payments & Billing",
        lessons: [
          lesson("njs-3-1", "Stripe setup", "10:30", "Create Stripe products, prices, and configure the SDK.", ["Stripe products", "Price objects", "SDK setup"]),
          lesson("njs-3-2", "Checkout flows", "15:45", "Build one-time and subscription checkout sessions.", ["Checkout session", "Subscription", "Free trial"]),
          lesson("njs-3-3", "Webhooks", "12:20", "Handle Stripe webhook events to update subscription status.", ["Webhook handler", "Event verification", "DB updates"]),
          lesson("njs-3-4", "Customer portal", "8:50", "Integrate the Stripe Customer Portal for self-serve billing.", ["Portal link", "Plan changes", "Cancellation"]),
        ],
      },
      {
        title: "Deployment",
        lessons: [
          lesson("njs-4-1", "Environment variables", "6:30", "Manage secrets safely across dev, preview, and production.", ["env files", "Vercel secrets", "Runtime access"]),
          lesson("njs-4-2", "Deploying to Vercel", "14:10", "Push to Vercel, configure custom domains, and monitor with Sentry.", ["Vercel CLI", "Custom domain", "Sentry integration"]),
          lesson("njs-4-3", "Performance & caching", "11:40", "Tune your app with PPR, CDN caching, and Core Web Vitals.", ["PPR", "Cache headers", "Lighthouse"]),
        ],
      },
    ],
  },

  /* ── 2 ── React Mastery ──────────────────────────────────────────────────── */
  {
    slug: "react-mastery",
    title: "React Mastery",
    subtitle: "Advanced patterns for senior engineers",
    description:
      "Go beyond the basics. Master compound components, custom hooks, performance optimization, concurrent features, and state management patterns used in large-scale React applications.",
    about:
      "This course is for developers who already know React but want to write code like the engineers at Meta, Vercel, and Linear. You'll study real patterns from popular open-source libraries, understand the React compiler, and learn to build APIs that are a joy to use.",
    whatYoullLearn: [
      "Build compound component APIs used by Radix UI",
      "Write custom hooks for data fetching and forms",
      "Profile and eliminate unnecessary re-renders",
      "Use React 19.2 View Transitions and useEffectEvent",
      "Implement virtual list rendering for 100k+ rows",
      "Manage complex state with useReducer and Immer",
    ],
    level: "Advanced",
    tags: ["React", "TypeScript", "Performance", "Patterns"],
    instructor: {
      name: "Sara Müller",
      initials: "SM",
      role: "React Core Contributor",
      bio: "Former Meta engineer and React community contributor. Speaker at React Europe.",
    },
    totalLessons: 35,
    totalDuration: "14h 15m",
    rating: 4.8,
    students: 876,
    price: 39,
    updatedAt: "Sep 2026",
    gradient: ["#8b5cf6", "#ec4899"],
    accentColor: "#8b5cf6",
    icon: "◈",
    purchased: false,
    freePreviewLessonIds: ["rm-1-1", "rm-2-1", "rm-3-1"],
    completedLessonIds: ["rm-1-1", "rm-1-2"],
    chapters: [
      {
        title: "Component Architecture",
        lessons: [
          lesson("rm-1-1", "Component design principles", "10:20", "SOLID principles applied to React components.", ["Single responsibility", "Open/closed", "Composition"]),
          lesson("rm-1-2", "Compound components", "16:45", "Build flexible, composable component APIs like Radix UI.", ["Implicit state", "Context pattern", "Slot components"]),
          lesson("rm-1-3", "Render props & HOCs", "12:30", "When and how to use render props and higher-order components.", ["Render props", "HOC pattern", "Hooks vs HOC"]),
          lesson("rm-1-4", "Controlled vs uncontrolled", "9:15", "Choose the right pattern for form and input components.", ["Controlled inputs", "Uncontrolled refs", "Hybrid pattern"]),
        ],
      },
      {
        title: "Advanced Hooks",
        lessons: [
          lesson("rm-2-1", "useReducer in depth", "14:00", "Replace complex useState logic with a clean reducer pattern.", ["useReducer", "Action creators", "Immer"]),
          lesson("rm-2-2", "Custom hook patterns", "18:30", "Extract reusable logic: data fetching, forms, animations.", ["useFetch", "useForm", "useAnimation"]),
          lesson("rm-2-3", "useEffectEvent", "11:20", "New in React 19.2 — non-reactive callbacks inside effects.", ["useEffectEvent", "Reactive deps", "Stale closures"]),
          lesson("rm-2-4", "Concurrent features", "16:15", "useTransition, useDeferredValue, and React 19 View Transitions.", ["useTransition", "Deferred value", "View Transitions"]),
        ],
      },
      {
        title: "Performance",
        lessons: [
          lesson("rm-3-1", "Profiling with DevTools", "13:40", "Find and fix re-render issues with the React Profiler.", ["Profiler", "Flame chart", "Commit phases"]),
          lesson("rm-3-2", "Memoization strategies", "15:20", "memo, useMemo, useCallback — when each actually helps.", ["React.memo", "useMemo", "useCallback"]),
          lesson("rm-3-3", "Virtual list rendering", "12:10", "Render thousands of items without layout thrashing.", ["Windowing", "TanStack Virtual", "Dynamic heights"]),
          lesson("rm-3-4", "Code splitting", "10:30", "lazy, Suspense, and route-level chunking for faster loads.", ["React.lazy", "Suspense", "Bundle analysis"]),
        ],
      },
    ],
  },

  /* ── 3 ── TypeScript Essentials ─────────────────────────────────────────── */
  {
    slug: "typescript-essentials",
    title: "TypeScript Essentials",
    subtitle: "From JavaScript to type-safe development",
    description:
      "Learn TypeScript from first principles. Master the type system, generics, advanced utility types, and how to type complex real-world patterns including APIs, state, and React components.",
    about:
      "TypeScript has become the default language for serious web development, yet many developers use it without understanding why it works. This course builds your mental model from the ground up — primitives, unions, generics, and the advanced patterns that make large codebases maintainable.",
    whatYoullLearn: [
      "Understand the TypeScript type system from first principles",
      "Write generic functions and utility types",
      "Type React components, hooks, and event handlers",
      "Validate API responses with Zod at runtime",
      "Use advanced types: conditional, template literal, infer",
      "Write declaration files for untyped JS libraries",
    ],
    level: "Beginner",
    tags: ["TypeScript", "JavaScript", "Types"],
    instructor: {
      name: "Kai Tanaka",
      initials: "KT",
      role: "TypeScript Educator",
      bio: "Author of two TypeScript books. 7 years teaching web development.",
    },
    totalLessons: 28,
    totalDuration: "11h 45m",
    rating: 4.9,
    students: 2108,
    price: 29,
    updatedAt: "Aug 2026",
    gradient: ["#06b6d4", "#3b82f6"],
    accentColor: "#06b6d4",
    icon: "TS",
    purchased: false,
    freePreviewLessonIds: ["ts-1-1", "ts-2-1", "ts-3-1"],
    completedLessonIds: ["ts-1-1", "ts-1-2", "ts-1-3", "ts-1-4", "ts-1-5"],
    chapters: [
      {
        title: "TypeScript Basics",
        lessons: [
          lesson("ts-1-1", "Why TypeScript?", "5:40", "The problems TypeScript solves and how it improves DX.", ["Type errors", "Refactoring", "IDE support"]),
          lesson("ts-1-2", "Primitive types", "9:20", "string, number, boolean, and their literal types.", ["Primitives", "Literal types", "Type aliases"]),
          lesson("ts-1-3", "Objects and interfaces", "12:30", "Define shapes for objects, arrays, and function signatures.", ["Interfaces", "Optional fields", "Readonly"]),
          lesson("ts-1-4", "Union and intersection types", "14:00", "Combine types with | and & operators.", ["Union types", "Discriminated unions", "Intersections"]),
          lesson("ts-1-5", "Type narrowing", "11:15", "typeof, instanceof, and custom type guards.", ["typeof guard", "instanceof", "is operator"]),
        ],
      },
      {
        title: "Generics",
        lessons: [
          lesson("ts-2-1", "Introduction to generics", "13:30", "Write flexible, reusable typed functions and components.", ["Generic functions", "Type parameters", "Constraints"]),
          lesson("ts-2-2", "Generic constraints", "10:45", "Constrain type parameters with extends and keyof.", ["extends keyword", "keyof", "typeof"]),
          lesson("ts-2-3", "Utility types", "16:20", "Partial, Required, Pick, Omit, Record — the full toolkit.", ["Partial", "Pick/Omit", "Record"]),
          lesson("ts-2-4", "Conditional types", "14:50", "infer keyword and template literal types.", ["Conditional types", "infer", "Template literals"]),
        ],
      },
      {
        title: "Real-World Patterns",
        lessons: [
          lesson("ts-3-1", "Typing React components", "12:40", "Props, state, events, and refs with full type safety.", ["ComponentProps", "ReactNode", "Event handlers"]),
          lesson("ts-3-2", "Typing API responses", "11:20", "Validate and type JSON from REST and GraphQL APIs.", ["Zod validation", "API types", "Error types"]),
          lesson("ts-3-3", "Declaration files", "8:30", "Write .d.ts files for untyped JS libraries.", [".d.ts files", "declare module", "ambient types"]),
        ],
      },
    ],
  },

  /* ── 4 ── Node.js & APIs ────────────────────────────────────────────────── */
  {
    slug: "nodejs-api-development",
    title: "Node.js & API Development",
    subtitle: "Build production-grade REST and GraphQL APIs",
    description:
      "Master Node.js for server-side development. Build secure, performant REST APIs with Express, add GraphQL with Apollo Server, connect to databases, and deploy with Docker.",
    about:
      "Backend development is a superpower for any web developer. This course walks you through Node.js from its internals — event loop, streams, worker threads — all the way to production-grade REST and GraphQL APIs with authentication, rate limiting, and Docker deployments.",
    whatYoullLearn: [
      "Understand the Node.js event loop and V8 engine",
      "Build REST APIs with Express 5 and TypeScript",
      "Implement stateless auth with JWTs and refresh tokens",
      "Design GraphQL schemas and resolvers with Apollo",
      "Solve N+1 query problems with DataLoader",
      "Containerize APIs with Docker and deploy to the cloud",
    ],
    level: "Intermediate",
    tags: ["Node.js", "Express", "GraphQL", "Docker"],
    instructor: {
      name: "Mia Fontaine",
      initials: "MF",
      role: "Backend Engineer",
      bio: "Built APIs serving 10M+ users at PayPal. Open-source contributor.",
    },
    totalLessons: 32,
    totalDuration: "13h 20m",
    rating: 4.7,
    students: 654,
    price: 39,
    updatedAt: "Oct 2026",
    gradient: ["#10b981", "#06b6d4"],
    accentColor: "#10b981",
    icon: "{}",
    purchased: false,
    freePreviewLessonIds: ["node-1-1", "node-2-1", "node-3-1"],
    completedLessonIds: ["node-1-1"],
    chapters: [
      {
        title: "Node.js Fundamentals",
        lessons: [
          lesson("node-1-1", "Node.js under the hood", "11:30", "Event loop, libuv, and the V8 engine explained.", ["Event loop", "libuv", "V8 engine"]),
          lesson("node-1-2", "Modules and CommonJS", "9:40", "require, module.exports, and ESM in Node.js.", ["CommonJS", "ESM", "package.json exports"]),
          lesson("node-1-3", "Streams and buffers", "14:20", "Process large data efficiently with Node.js streams.", ["Readable streams", "Writable streams", "Pipe"]),
          lesson("node-1-4", "File system and crypto", "10:15", "fs, path, and crypto modules for real apps.", ["fs module", "path utilities", "crypto hashing"]),
        ],
      },
      {
        title: "Building REST APIs",
        lessons: [
          lesson("node-2-1", "Express 5 setup", "8:30", "Bootstrap an Express app with TypeScript and Zod.", ["Express setup", "TypeScript", "Zod validation"]),
          lesson("node-2-2", "Routing and middleware", "12:20", "Organize routes and write reusable middleware.", ["Router", "Middleware", "Error handler"]),
          lesson("node-2-3", "Authentication with JWT", "16:40", "Stateless auth using JWTs and refresh tokens.", ["JWT", "Refresh tokens", "Cookie strategy"]),
          lesson("node-2-4", "Rate limiting and security", "11:10", "Helmet, CORS, and express-rate-limit for secure APIs.", ["Helmet", "CORS", "Rate limiting"]),
          lesson("node-2-5", "File uploads", "9:50", "Handle multipart form data with Multer and S3.", ["Multer", "S3 upload", "Image resizing"]),
        ],
      },
      {
        title: "GraphQL with Apollo",
        lessons: [
          lesson("node-3-1", "GraphQL schema design", "14:30", "Type-first schema design with SDL and resolvers.", ["SDL", "Types", "Resolvers"]),
          lesson("node-3-2", "Apollo Server 4", "13:20", "Set up Apollo Server with Express and subscriptions.", ["Apollo Server", "Context", "Subscriptions"]),
          lesson("node-3-3", "DataLoader for batching", "10:45", "Solve N+1 query problems with DataLoader.", ["DataLoader", "Batching", "Caching"]),
        ],
      },
    ],
  },

  /* ── 5 ── Tailwind CSS Mastery ──────────────────────────────────────────── */
  {
    slug: "tailwind-css-mastery",
    title: "Tailwind CSS Mastery",
    subtitle: "Modern styling from zero to production",
    description:
      "Learn Tailwind CSS v4 from scratch. Build stunning UIs with utility classes, master the design system tokens, create animations, and build reusable component libraries.",
    about:
      "Stop fighting CSS. Tailwind's utility-first approach makes styling fast, consistent, and fun. In this course you'll go from zero to building a complete design system — custom tokens, dark mode, animations, responsive layouts, and a component library you can use in any project.",
    whatYoullLearn: [
      "Style any layout with Tailwind utility classes",
      "Build a custom design system with @theme tokens",
      "Implement dark mode and prefers-color-scheme",
      "Create smooth animations and keyframe sequences",
      "Build reusable components with CVA and variants",
      "Apply glass morphism and gradient border effects",
    ],
    level: "Beginner",
    tags: ["Tailwind CSS", "CSS", "Design", "UI"],
    instructor: {
      name: "Leah Kim",
      initials: "LK",
      role: "UI Engineer & Designer",
      bio: "Designed component libraries used by 50,000+ developers. Tailwind CSS community lead.",
    },
    totalLessons: 24,
    totalDuration: "9h 50m",
    rating: 4.8,
    students: 1891,
    price: 25,
    updatedAt: "Oct 2026",
    gradient: ["#f59e0b", "#ef4444"],
    accentColor: "#f59e0b",
    icon: "✦",
    purchased: false,
    freePreviewLessonIds: ["tw-1-1", "tw-2-1", "tw-3-1"],
    completedLessonIds: ["tw-1-1", "tw-1-2", "tw-1-3"],
    chapters: [
      {
        title: "Getting Started",
        lessons: [
          lesson("tw-1-1", "What is Tailwind CSS?", "6:15", "The utility-first philosophy and why it works.", ["Utility-first", "Design constraints", "Developer experience"]),
          lesson("tw-1-2", "Installation and setup", "8:40", "Install Tailwind v4 in a Next.js project.", ["v4 install", "Config file", "IntelliSense"]),
          lesson("tw-1-3", "Core concepts", "11:30", "Spacing, sizing, colors, and the default scale.", ["Spacing scale", "Color palette", "Responsive"]),
          lesson("tw-1-4", "Flexbox and Grid layouts", "14:20", "Build any layout with flex and grid utilities.", ["Flexbox", "CSS Grid", "Gap utilities"]),
          lesson("tw-1-5", "Typography utilities", "10:10", "Font sizes, weights, line heights, and letter spacing.", ["Font scale", "Text utilities", "Prose plugin"]),
        ],
      },
      {
        title: "Design System",
        lessons: [
          lesson("tw-2-1", "Custom design tokens", "12:45", "Define your brand colors, fonts, and spacing in @theme.", ["@theme directive", "Custom tokens", "CSS variables"]),
          lesson("tw-2-2", "Dark mode", "11:20", "Implement dark mode with class strategy and prefers-color-scheme.", ["dark: prefix", "prefers-color-scheme", "System/manual toggle"]),
          lesson("tw-2-3", "Animations and transitions", "13:50", "Smooth transitions, keyframe animations, and motion.", ["transition", "animate", "Custom keyframes"]),
          lesson("tw-2-4", "Responsive design", "10:40", "Mobile-first breakpoints and container queries.", ["Breakpoints", "Container queries", "Mobile-first"]),
        ],
      },
      {
        title: "Components & Patterns",
        lessons: [
          lesson("tw-3-1", "Button component system", "14:10", "Build a flexible button with variants and sizes.", ["CVA", "Variants", "Compound variants"]),
          lesson("tw-3-2", "Card and surface patterns", "12:30", "Glass morphism, gradient borders, and depth effects.", ["Glass morphism", "Gradient borders", "Box shadow"]),
          lesson("tw-3-3", "Form styling", "11:15", "Style inputs, selects, checkboxes, and error states.", ["Input styling", "Focus rings", "Validation states"]),
        ],
      },
    ],
  },

  /* ── 6 ── Docker & DevOps ───────────────────────────────────────────────── */
  {
    slug: "docker-devops",
    title: "Docker & DevOps Fundamentals",
    subtitle: "Containerize, deploy, and scale your apps",
    description:
      "Master Docker and modern DevOps practices. Containerize applications, orchestrate with Docker Compose, set up CI/CD with GitHub Actions, and deploy to cloud providers.",
    about:
      "Shipping software reliably is a skill most developers never learn properly. This course covers everything from writing your first Dockerfile to running zero-downtime deployments on a VPS. You'll build a complete CI/CD pipeline that tests, builds, and deploys on every push.",
    whatYoullLearn: [
      "Write optimized Dockerfiles with multi-stage builds",
      "Orchestrate services with Docker Compose",
      "Build and test in CI with GitHub Actions",
      "Deploy containers to a VPS with zero downtime",
      "Manage secrets and environment variables safely",
      "Set up monitoring and log aggregation",
    ],
    level: "Intermediate",
    tags: ["Docker", "DevOps", "CI/CD", "GitHub Actions"],
    instructor: {
      name: "Omar Hassan",
      initials: "OH",
      role: "DevOps Architect",
      bio: "15 years in infrastructure. Architected CI/CD for 200+ engineering teams.",
    },
    totalLessons: 36,
    totalDuration: "15h 40m",
    rating: 4.7,
    students: 732,
    price: 39,
    updatedAt: "Sep 2026",
    gradient: ["#6366f1", "#3b82f6"],
    accentColor: "#6366f1",
    icon: "▣",
    purchased: false,
    freePreviewLessonIds: ["dk-1-1", "dk-2-1", "dk-3-1"],
    completedLessonIds: ["dk-1-1", "dk-1-2"],
    chapters: [
      {
        title: "Docker Basics",
        lessons: [
          lesson("dk-1-1", "What is Docker?", "8:20", "Containers vs VMs and why Docker changed deployment.", ["Containers", "Images", "Docker daemon"]),
          lesson("dk-1-2", "Your first Dockerfile", "13:40", "Write a Dockerfile for a Node.js app from scratch.", ["Dockerfile", "Layers", "Base images"]),
          lesson("dk-1-3", "Docker images", "11:10", "Build, tag, push, and pull images from Docker Hub.", ["docker build", "docker push", "Docker Hub"]),
          lesson("dk-1-4", "Running containers", "10:30", "Run, stop, inspect, and manage containers.", ["docker run", "Ports", "Volumes", "Networks"]),
          lesson("dk-1-5", "Multi-stage builds", "12:45", "Optimize production images with multi-stage Dockerfiles.", ["Multi-stage", "Minimal images", "BuildKit"]),
        ],
      },
      {
        title: "Docker Compose",
        lessons: [
          lesson("dk-2-1", "Compose fundamentals", "11:20", "Define multi-container apps with docker-compose.yml.", ["Services", "Networks", "Volumes"]),
          lesson("dk-2-2", "Compose for development", "14:10", "Hot reload, debugging, and local dev environments.", ["Bind mounts", "Hot reload", "Dev overrides"]),
          lesson("dk-2-3", "Compose for production", "12:30", "Production-ready compose with secrets and health checks.", ["Secrets", "Health checks", "Restart policies"]),
        ],
      },
      {
        title: "CI/CD Pipelines",
        lessons: [
          lesson("dk-3-1", "GitHub Actions intro", "10:40", "Workflows, jobs, steps, and runners explained.", ["Workflows", "Jobs", "Runners"]),
          lesson("dk-3-2", "Building and testing in CI", "14:50", "Run tests, lint, and build Docker images in CI.", ["Test job", "Build job", "Caching"]),
          lesson("dk-3-3", "Deploying to a VPS", "16:20", "Deploy containers to a cloud server with zero downtime.", ["SSH deploy", "Zero-downtime", "Rollback"]),
          lesson("dk-3-4", "Deploying to Fly.io", "11:30", "Use Fly.io for simple, affordable Docker deployments.", ["Fly CLI", "fly.toml", "Secrets"]),
        ],
      },
    ],
  },
];

/* ─── Lookup helpers ──────────────────────────────────────────────────────── */
export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}
