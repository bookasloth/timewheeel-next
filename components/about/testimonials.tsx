import { wd } from "@/lib/website-design";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join("");
}

export function AboutTestimonials() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              {wd.testimonials.label}
            </p>
            <span className="h-px w-12 bg-brand/40" />
          </div>
          <RevealHeading as="h2" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.4rem]">
            {wd.testimonials.title}
          </RevealHeading>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {wd.testimonials.quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <span
                  className="grid size-9 place-items-center rounded-full text-sm font-black text-white"
                  style={{ backgroundColor: q.accent }}
                  aria-hidden="true"
                >
                  {initials(q.name)}
                </span>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
                  <div>
                    <p className="text-sm font-bold">{q.name}</p>
                    <p className="text-xs text-muted-foreground">{q.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}