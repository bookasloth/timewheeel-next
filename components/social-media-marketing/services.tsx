import { Reveal } from "@/components/reveal";

import { smm } from "@/lib/social-media-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function SmmServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
          <span className="size-1.5 rounded-full bg-brand" />
          {smm.services.label}
        </p>
        <RevealHeading as="h2" className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          {smm.services.heading}
        </RevealHeading>
        <p className="mt-4 text-muted-foreground md:text-lg">{smm.services.body}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {smm.services.items.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <div
              className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ ["--c" as string]: s.tone }}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--c)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" style={{ backgroundColor: `${s.tone}1a`, color: s.tone }}>
                  <s.icon className="size-6" weight="regular" />
                </span>
                <span
                  aria-hidden
                  className="text-sm font-black tracking-tight text-muted-foreground/25 transition-colors duration-300 group-hover:text-[var(--c)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}