import type { LucideIcon } from "lucide-react";
import { Compass, Cpu, PanelsTopLeft, Sprout } from "lucide-react";
import { Reveal } from "@/components/reveal";

// Proof/value band, horizontal, navy, qualitative. No invented numbers:
// four numbered approach items instead of fake statistics.

const values: { n: string; icon: LucideIcon; label: string }[] = [
  { n: "01", icon: Compass, label: "Strategy First" },
  { n: "02", icon: PanelsTopLeft, label: "Design That Connects" },
  { n: "03", icon: Cpu, label: "Modern Development" },
  { n: "04", icon: Sprout, label: "Built to Grow" },
];

export function AboutValues() {
  return (
    <section className="border-y border-white/10 bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            How we think
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            A focused way of building digital.
          </h2>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-0 md:divide-x md:divide-white/10"
        >
          {values.map((v) => (
            <div key={v.n} className="flex flex-col items-center px-4 text-center md:px-8">
              <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand">
                <v.icon className="size-5" strokeWidth={2} />
              </span>
              <p className="mt-5 text-4xl font-black tracking-tight text-brand md:text-5xl">
                {v.n}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
                {v.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}