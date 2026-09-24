import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

// Editorial working-philosophy list: sticky intro on the left, numbered
// principles on the right. Not a card grid, so it reads as point of view.
export function SmmWhy() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
                <span className="size-1.5 rounded-full bg-brand" />
                {smm.why.label}
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                {smm.why.heading}
              </h2>
              <div className="mt-6 flex gap-3">
                <span className="h-1 w-12 rounded-full bg-gradient-to-r from-brand to-accent-pink" />
                <span className="h-1 w-8 rounded-full bg-gradient-to-r from-accent-pink to-accent-yellow" />
                <span className="h-1 w-5 rounded-full bg-gradient-to-r from-accent-yellow to-rating" />
              </div>
              <p className="mt-5 text-muted-foreground md:text-lg">{smm.why.body}</p>
            </Reveal>
          </div>

          <div>
            {smm.why.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="group flex gap-6 border-t border-border/70 py-7 first:border-t-0 lg:py-8">
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 font-black tracking-tight text-brand transition-transform duration-300 group-hover:scale-110"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold leading-snug">{p.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}