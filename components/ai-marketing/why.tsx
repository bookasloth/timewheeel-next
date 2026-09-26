import { BadgeCheck, Lightbulb, Scroll } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { aimWhy } from "@/lib/ai-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";

const icons = [BadgeCheck, Lightbulb, Scroll];

export function AimWhy() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <RevealHeading as="h2" className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            Why Our AI Marketing Services in Nagpur
          </RevealHeading>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {aimWhy.map((w, i) => {
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
