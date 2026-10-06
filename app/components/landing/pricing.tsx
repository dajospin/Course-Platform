"use client";

import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@/app/hooks/use-media-query";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Per Course",
    price: "~$25",
    period: "one-time",
    features: [
      "HD video lessons",
      "Free lesson previews (no sign-up)",
      "Downloadable resources & code",
      "Progress tracking & resume",
      "Lifetime access to that course",
    ],
    description: "Buy exactly the course you need. Yours forever.",
    buttonText: "Browse courses",
    href: "/courses",
    isPopular: false,
  },
  {
    name: "Monthly",
    price: "$50",
    period: "per month",
    features: [
      "Access to every course in the library",
      "All future courses included",
      "Downloadable resources & code",
      "Progress tracking & resume",
      "Cancel or upgrade to Lifetime any time",
    ],
    description: "Unlimited access while you're subscribed.",
    buttonText: "Get all-access",
    href: "/sign-in",
    isPopular: true,
  },
  {
    name: "Lifetime",
    price: "$250",
    period: "one-time",
    features: [
      "Permanent access to all courses",
      "All future courses included",
      "Downloadable resources & code",
      "Progress tracking & resume",
      "No subscription — pay once, own forever",
    ],
    description: "Pay once. Own everything forever.",
    buttonText: "Get lifetime access",
    href: "/sign-in",
    isPopular: false,
  },
];

export function Pricing() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section id="pricing" className="border-t border-white/5 bg-bg-primary py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
            Pricing
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black tracking-tight text-white">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            Buy a single course, go all-access monthly, or pay once for
            everything. No hidden fees, no drip-content, no upsells.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 1 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale: index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={[
                "relative flex flex-col rounded-2xl border p-6 text-center",
                plan.isPopular
                  ? "z-10 border-accent/40 bg-bg-elevated glow-blue-sm origin-bottom"
                  : "border-white/8 bg-bg-surface",
                !plan.isPopular && "md:mt-5",
                index === 0 && "origin-right",
                index === 2 && "origin-left",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl rounded-tr-2xl bg-accent px-3 py-1.5">
                  <Star className="h-3 w-3 fill-current text-white" />
                  <span className="text-[11px] font-semibold text-white">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col">
                {/* Plan name */}
                <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline justify-center gap-1.5">
                  <span className="text-5xl font-black tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-text-muted">
                    / {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-8 space-y-3 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.isPopular ? "text-accent" : "text-emerald-400"
                        }`}
                      />
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <hr className="my-6 border-white/6" />

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={[
                    "block w-full rounded-full py-2.5 text-sm font-semibold transition-all duration-200",
                    "ring-offset-bg-primary hover:ring-2 hover:ring-offset-2",
                    plan.isPopular
                      ? "bg-accent text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-accent/90 hover:ring-accent/60"
                      : "border border-white/15 text-white/70 hover:border-white/30 hover:text-white hover:ring-white/20",
                  ].join(" ")}
                >
                  {plan.buttonText}
                </Link>

                {/* Description */}
                <p className="mt-5 text-xs leading-relaxed text-text-muted">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer notes */}
        <div className="mx-auto mt-14 max-w-2xl space-y-2 text-center">
          <p className="text-xs leading-relaxed text-text-muted">
            <span className="font-medium text-text-secondary">
              Access rules:{" "}
            </span>
            Monthly access stays active while the subscription is active
            (including retry periods). Canceling keeps access until the period
            ends. Per-course and Lifetime access is permanent.
          </p>
          <p className="text-xs text-text-muted">
            Billing handled by{" "}
            <span className="text-text-secondary">Polar</span> — they manage
            taxes, receipts, and refunds.
          </p>
        </div>
      </div>
    </section>
  );
}
