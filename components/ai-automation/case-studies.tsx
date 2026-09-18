import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";

export function AiCaseStudies() {
  const { caseStudies } = aiAuto;
  return (
    <section className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text">{caseStudies.label}</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-navy md:text-4xl">{caseStudies.heading}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{caseStudies.note}</p>
        </Reveal>

        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {caseStudies.cards.map((c) => (
            <div key={c.tag} className="rounded-lg border border-border bg-surface p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.tag}</span>
              <p className="mt-3 text-4xl font-black text-brand">{c.metric}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy">{c.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
