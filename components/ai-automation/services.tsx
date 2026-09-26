import { siWhatsapp, siMeta, siGoogle, siHubspot, siZoho, siZapier, type SimpleIcon } from "simple-icons";
import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";
import { icons } from "./icons";
import { RevealHeading } from "@/components/anim/reveal-heading";

const brands: Record<string, SimpleIcon> = {
  siWhatsapp,
  siMeta,
  siGoogle,
  siHubspot,
  siZoho,
  siZapier,
};

export function AiServices() {
  const { services, integrations } = aiAuto;
  return (
    <section id="services" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text">{services.label}</span>
          <RevealHeading as="h2" className="mt-3 text-3xl font-black tracking-tight text-navy md:text-4xl">
            {services.heading} <span className="text-brand">{services.headingAccent}</span>
          </RevealHeading>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{services.body}</p>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.cards.map((c) => {
            const Icon = icons[c.icon];
            return (
              <div
                key={c.title}
                className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-brand/40"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-brand/10 text-brand">
                  {Icon ? <Icon weight="duotone" className="size-6" /> : null}
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            );
          })}
        </Reveal>

        {/* Integrations strip */}
        <Reveal className="mt-14 border-t border-border pt-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {integrations.label}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {integrations.icons.map((key) => {
              const b = brands[key];
              if (!b) return null;
              return (
                <span key={key} className="text-navy/70 transition-colors hover:text-navy" title={b.title}>
                  <svg role="img" aria-label={b.title} viewBox="0 0 24 24" className="h-7 w-auto fill-current">
                    <path d={b.path} />
                  </svg>
                </span>
              );
            })}
            <span className="text-sm font-medium text-muted-foreground">{integrations.more}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
