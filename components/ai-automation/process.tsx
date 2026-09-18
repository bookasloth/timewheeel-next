import { Reveal } from "@/components/reveal";
import { aiAuto } from "@/lib/ai-automation-nagpur";

export function AiProcess() {
  const { process } = aiAuto;
  return (
    <section id="process" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-text">{process.label}</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-navy md:text-4xl">{process.heading}</h2>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {process.steps.map((s, i) => (
            <div key={s.title} className="relative">
              <span className="inline-flex size-10 items-center justify-center rounded-full border border-brand bg-surface text-sm font-black text-brand">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
