import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  TrendingUp,
  Cloud,
  Building2,
  ShoppingBag,
  BadgeCheck,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

const categories: { icon: LucideIcon; label: string; a: string }[] = [
  { icon: Rocket, label: "Startups", a: "#fe5100" },
  { icon: TrendingUp, label: "Growing Businesses", a: "#269cef" },
  { icon: Cloud, label: "SaaS & Technology", a: "#ff4d93" },
  { icon: Building2, label: "Professional Services", a: "#ffcc1c" },
  { icon: ShoppingBag, label: "E-commerce", a: "#4ab765" },
  { icon: BadgeCheck, label: "Established Brands", a: "#fe5100" },
];

export function AboutClients() {
  return (
    <section className="border-y border-border/60 bg-secondary/25 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-brand/40" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Who we work with
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <RevealHeading as="h2" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-4xl">
            Built for ambitious businesses.
          </RevealHeading>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-background/80 p-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((c) => (
            <div
              key={c.label}
              className="group relative flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-8 text-center transition-colors duration-300"
              style={{ "--a": c.a } as React.CSSProperties}
            >
              <span className="grid size-11 place-items-center rounded-full bg-[var(--a)]/10 text-[var(--a)] transition-colors duration-300">
                <c.icon className="size-5" strokeWidth={2} />
              </span>
              <span className="text-sm font-semibold transition-colors duration-300 text-[var(--a)]">
                {c.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
