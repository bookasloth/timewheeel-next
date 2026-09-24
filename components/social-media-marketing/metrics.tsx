import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";

const pinkShades = ["#be123c", "var(--brand)", "var(--accent-pink)", "#fb7185"];

// Honest reporting strip — categories we report, no invented numbers.
export function SmmMetrics() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
            <span className="size-1.5 rounded-full bg-brand" />
            {smm.metrics.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            {smm.metrics.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{smm.metrics.body}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {smm.metrics.items.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <div
                className="h-full rounded-2xl border border-border bg-card p-6 shadow-[0_18px_40px_-30px_rgba(26,29,36,0.35)]"
                style={{
                  borderTop: `3px solid ${pinkShades[i % pinkShades.length]}`,
                }}
              >
                <span
                  className="grid size-10 place-items-center rounded-xl font-black"
                  style={{ backgroundColor: `${m.tone}1a`, color: m.tone }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{m.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
