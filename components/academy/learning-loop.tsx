import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { LEARNING_LOOP } from "@/lib/academy";

/** Learn, Execute, Measure, Prove: the four-step method, on an ink band. */
export function LearningLoop({
  id = "how-it-works",
  title = "How learning works",
  intro = "Every topic runs through the same four steps. The loop is the point: the work gets better each time round, and you can show how.",
}: {
  id?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id={id} className="scroll-mt-32 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">The method</p>
          <RevealHeading as="h2" className="mt-5 font-black tracking-tight">
            {title}
          </RevealHeading>
          <p className="mt-4 leading-relaxed text-background/70">{intro}</p>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-px overflow-hidden rounded-lg border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
          {LEARNING_LOOP.map((s, i) => (
            <div key={s.step} className="flex flex-col bg-foreground p-6 md:p-7">
              <p className="font-heading text-sm font-bold tabular-nums text-background/50">0{i + 1}</p>
              <h3 className="mt-6 font-heading text-2xl font-black tracking-tight">
                {s.step}
                <span aria-hidden className="text-brand">.</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-background/75">{s.text}</p>
              <p className="mt-auto pt-6 text-xs leading-relaxed text-background/55">
                <span className="font-semibold text-background/80">For example: </span>
                {s.example}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
