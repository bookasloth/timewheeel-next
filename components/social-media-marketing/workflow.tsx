import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { cn } from "@/lib/utils";
import { RevealHeading } from "@/components/anim/reveal-heading";

// The operating rhythm behind every engagement: a connected vertical flow,
// alternating left/right on desktop, single column with a spine on mobile.
export function SmmWorkflow() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
            <span className="size-1.5 rounded-full bg-brand" />
            {smm.workflow.label}
          </p>
          <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            {smm.workflow.heading}
          </RevealHeading>
          <p className="mt-4 text-muted-foreground md:text-lg">{smm.workflow.body}</p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <span
            aria-hidden
            className="smm-spine absolute bottom-6 left-5 top-2 w-1 rounded-full opacity-60 lg:left-1/2 lg:-translate-x-1/2"
          />
          {smm.workflow.steps.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={s.title} delay={(i % 2) * 0.06}>
                <div className="relative grid pb-6 last:pb-0 lg:grid-cols-2 lg:gap-0">
                  <span
                    className="absolute left-5 top-1 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full text-xs font-black tracking-tight text-white shadow-sm lg:left-1/2"
                    style={{ background: s.tone }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={cn(
                      "pl-14 lg:pl-0",
                      left ? "lg:pr-20 lg:text-right" : "lg:col-start-2 lg:pl-20",
                    )}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 lg:inline-block lg:w-full lg:text-left">
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[3px]"
                        style={{ background: s.tone }}
                      />
                      <p className="text-base font-bold">{s.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}