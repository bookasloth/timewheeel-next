import { Layers, MapPin, Rocket, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";

const facts: { icon: LucideIcon; label: string; value: string; accent: string }[] = [
  {
    icon: Rocket,
    label: "Product-led",
    value: "We design, build and run our own SaaS products.",
    accent: "#fe5100",
  },
  {
    icon: MapPin,
    label: "Nagpur, India",
    value: "Remote-first, working with clients across India and worldwide.",
    accent: "#2563eb",
  },
  {
    icon: Layers,
    label: "One team",
    value: "Strategy, design and development under one roof.",
    accent: "#8b5cf6",
  },
  {
    icon: TrendingUp,
    label: "Built to grow",
    value: "Websites, apps and marketing that scale with your business.",
    accent: "#10b981",
  },
];

export function AboutCompany() {
  return (
    <section id="company" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              About the company
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.6rem]">
            A product studio and
            <br className="hidden sm:block" /> growth team in one.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            TIMEWHEEL is a digital design and development studio based in
            Nagpur. We build websites, web apps and marketing systems for
            businesses across India and worldwide.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We also design, build and run our own software products, booking
            platforms, community apps and creator tools. It means every client
            project is shaped by the same team that ships and runs live
            products every day.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <div className="grid gap-4 sm:grid-cols-2">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <span
                  className="grid size-10 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: f.accent }}
                >
                  <f.icon className="size-5" strokeWidth={2} />
                </span>
                <p className="mt-4 text-sm font-bold" style={{ color: f.accent }}>
                  {f.label}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}