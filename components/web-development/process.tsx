import { Reveal } from "@/components/reveal";
import { wd } from "@/lib/web-development";

export function WdProcess() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">How we work</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            {wd.process.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{wd.process.body}</p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wd.process.steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-black tracking-tight text-muted-foreground/35">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
