import { Reveal } from "@/components/reveal";
import { Compass, Target, Wrench, Rocket } from "lucide-react";
import { RevealHeading } from "@/components/anim/reveal-heading";

const steps = [
  {
    n: "01",
    title: "Discover",
    desc: "Understand your business, audience, goals and opportunities.",
    icon: Compass,
  },
  {
    n: "02",
    title: "Strategize",
    desc: "Define the direction, structure and experience before we design.",
    icon: Target,
  },
  {
    n: "03",
    title: "Design & Build",
    desc: "Turn the strategy into a polished, responsive digital experience.",
    icon: Wrench,
  },
  {
    n: "04",
    title: "Launch & Grow",
    desc: "Launch with confidence and continue improving as your business evolves.",
    icon: Rocket,
  },
];

export function AboutProcess() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Our process
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <RevealHeading as="h2" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.6rem]">
            From first idea to launch day.
          </RevealHeading>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {steps.map((s, i) => (
            <div key={s.n}>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black tracking-tight text-brand md:text-[2.6rem]">
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-border lg:block" />
                )}
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-bold tracking-tight">
                <s.icon className="size-5 text-brand" strokeWidth={2} />
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
