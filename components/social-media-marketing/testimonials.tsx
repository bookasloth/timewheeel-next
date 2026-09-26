import { Reveal } from "@/components/reveal";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { smm } from "@/lib/social-media-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";

// PLACEHOLDER testimonials. Replace smm.testimonials with real, permissioned
// client quotes before publishing — never ship fabricated social proof.
export function SmmTestimonials() {
  return (
    <section className="border-y border-border/60 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-text">
            <span className="size-1.5 rounded-full bg-brand" />
            {smm.testimonials.eyebrow}
          </p>
          <RevealHeading as="h2" className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            {smm.testimonials.heading}
          </RevealHeading>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {smm.testimonials.items.map((t, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_18px_40px_-30px_rgba(26,29,36,0.35)]">
                <Quotes className="size-8" weight="fill" style={{ color: t.tone }} />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className="grid size-10 place-items-center rounded-full font-black"
                    style={{ backgroundColor: `${t.tone}1a`, color: t.tone }}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-tight">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
