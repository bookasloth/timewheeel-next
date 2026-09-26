import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";
import { icons } from "./icons";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function AiWhy() {
  const { why } = aiAuto;
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text">{why.label}</span>
          <RevealHeading as="h2" className="mt-3 text-3xl font-black tracking-tight text-navy md:text-4xl">
            {why.heading} <span className="text-brand">{why.headingAccent}</span>
          </RevealHeading>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {why.cards.map((c) => {
            const Icon = icons[c.icon];
            return (
              <div key={c.title}>
                <span className="inline-flex size-10 items-center justify-center text-brand">
                  {Icon ? <Icon weight="regular" className="size-7" /> : null}
                </span>
                <h3 className="mt-3 text-base font-bold text-navy">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
