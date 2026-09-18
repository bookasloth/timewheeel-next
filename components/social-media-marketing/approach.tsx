import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

export function SmmApproach() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
          <span className="size-1.5 rounded-full bg-brand" />
          {smm.approach.label}
        </p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          {smm.approach.heading}
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">{smm.approach.body}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {smm.approach.steps.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <div
              className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ ["--c" as string]: s.tone }}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--c)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-8 place-items-center rounded-lg font-black tracking-tight transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${s.tone}1a`, color: s.tone }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-border/70 to-border/0" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}