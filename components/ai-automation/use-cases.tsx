import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";
import { icons } from "./icons";
import { RevealHeading } from "@/components/anim/reveal-heading";

export function AiUseCases() {
  const { useCases } = aiAuto;
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text">{useCases.label}</span>
          <RevealHeading as="h2" className="mt-3 text-3xl font-black tracking-tight text-navy md:text-4xl">
            {useCases.heading} <span className="text-brand">{useCases.headingAccent}</span>
          </RevealHeading>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {useCases.cards.map((c) => {
            const Icon = icons[c.icon];
            return (
              <div
                key={c.title}
                className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-brand/40"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-blue/10 text-accent-blue">
                  {Icon ? <Icon weight="duotone" className="size-6" /> : null}
                </span>
                <h3 className="mt-3 text-sm font-bold text-navy">{c.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
