import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";
import { RevealHeading } from "@/components/anim/reveal-heading";

const stepColors = [
  { bg: "bg-brand", fg: "text-white" },
  { bg: "bg-accent-blue", fg: "text-white" },
  { bg: "bg-accent-pink", fg: "text-white" },
  { bg: "bg-rating", fg: "text-white" },
  { bg: "bg-accent-yellow", fg: "text-navy" },
] as const;

export function WaProcess() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">{wa.process.label}</p>
          <RevealHeading as="h2" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            {wa.process.heading} <span className="text-brand">{wa.process.headingAccent}</span>
          </RevealHeading>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{wa.process.body}</p>
        </Reveal>

        <Reveal className="relative mt-14">
          {/* desktop connector */}
          <div aria-hidden className="absolute left-0 right-0 top-4 hidden h-px bg-border md:block" />
          {/* mobile connector */}
          <div aria-hidden className="absolute bottom-2 left-4 top-2 w-px bg-border md:hidden" />

          <ol className="relative space-y-8 md:grid md:grid-cols-5 md:gap-6 md:space-y-0">
            {wa.process.steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 md:flex-col md:items-center md:gap-4 md:text-center">
                <span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${stepColors[i].bg} ${stepColors[i].fg}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-navy">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}