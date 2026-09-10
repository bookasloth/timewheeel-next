import { EyeOff, Gauge, MousePointerClick } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { dmChallenges } from "@/lib/digital-marketing";

const icons = [EyeOff, MousePointerClick, Gauge];

export function DmChallenges() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Challenges
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            We Design Campaigns That Solve Problems, Not Create Them
          </h2>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {dmChallenges.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={c.question}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
<span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
              />
                <div className="relative inline-flex">
                  <svg
                    aria-hidden
                    viewBox="0 0 80 80"
                    className="dm-orbit pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] text-foreground/15"
                    fill="none"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="38"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="grid size-11 place-items-center rounded-xl border border-border bg-secondary/60 text-foreground transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/10 group-hover:text-brand">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug">{c.question}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.answer}
                </p>
                <span className="mt-6 text-xs font-bold uppercase tracking-widest text-muted-foreground/60 transition-colors duration-300 group-hover:text-brand">
                  Solved — {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}