import { BadgeCheck, Lightbulb, Scroll } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

const pmWhy = [
  {
    number: "01",
    title: "Strategy First, Not Guesswork",
    body: "We start with your goals and market, then build a plan across SEO, ads, and content, so every rupee of budget works toward real business growth.",
    accent: "#ffcc1c",
  },
  {
    number: "02",
    title: "Built Around Your Business",
    body: "Every business is different. We tailor the channel mix to your audience, budget, and goals in Nagpur, not a one-size-fits-all package.",
    accent: "#f59e0b",
  },
  {
    number: "03",
    title: "Transparent & Measurable",
    body: "You see exactly what we do and what it delivers, with clear monthly reporting on rankings, leads, and conversions, no black box.",
    accent: "#eab308",
  },
];

const icons = [BadgeCheck, Lightbulb, Scroll];

export function PmWhy() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <RevealHeading as="h2" className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            Why Our Digital Marketing Services in Nagpur
          </RevealHeading>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pmWhy.map((w, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={w.number} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand/40">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid place-items-center rounded-xl p-4"
                      style={{ backgroundColor: `${w.accent}1f`, color: w.accent }}
                    >
                      <Icon className="size-9" />
                    </span>
                    <span
                      aria-hidden
                      className="text-4xl font-black leading-none tracking-tight opacity-20 transition-opacity group-hover:opacity-30"
                    >
                      {w.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-snug">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {w.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
