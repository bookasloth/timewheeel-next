import { BadgeCheck, Lightbulb, Scroll } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { dmWhy } from "@/lib/digital-marketing";

const icons = [BadgeCheck, Lightbulb, Scroll];

export function DmWhy() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            Why Our Premium Digital Marketing Services in Nagpur
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {dmWhy.map((w, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={w.number} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand/40">
                  <span
                    aria-hidden
                    className="text-6xl font-black leading-none tracking-tight opacity-10 transition-opacity group-hover:opacity-20"
                  >
                    {w.number}
                  </span>
                  <span
                    className="mt-4 grid size-12 place-items-center rounded-xl"
                    style={{ backgroundColor: `${w.accent}1f`, color: w.accent }}
                  >
                    <Icon className="size-6" />
                  </span>
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