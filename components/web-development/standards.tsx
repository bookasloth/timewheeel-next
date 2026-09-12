import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

export function WdStandards() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Quality standard
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            {wd.standards.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{wd.standards.body}</p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wd.standards.cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-4xl font-black tracking-tight text-brand">{c.score}</p>
              <p className="mt-3 font-bold">{c.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
