import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function AiTestimonials() {
  const { testimonials } = aiAuto;
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text">{testimonials.label}</span>
          <RevealHeading as="h2" className="mt-3 text-3xl font-black tracking-tight text-navy md:text-4xl">{testimonials.heading}</RevealHeading>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonials.quotes.map((q) => (
            <figure key={q.name} className="flex flex-col rounded-lg border border-border bg-surface p-6">
              <Quotes weight="fill" className="size-7 text-brand/30" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy">{q.quote}</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-bold text-navy">{q.name}</p>
                <p className="text-xs text-muted-foreground">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
