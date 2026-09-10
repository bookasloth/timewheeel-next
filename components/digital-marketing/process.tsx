import { Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { dmProcess } from "@/lib/digital-marketing";

export function DmProcess() {
  return (
    <section className="bg-secondary/40 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Inside our process
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              From Strategy to Sustainable Growth
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A structured approach that gets your marketing built right the first
            time.
          </p>
        </Reveal>

        {/* desktop horizontal timeline */}
        <Reveal stagger className="mt-16 hidden md:grid md:grid-cols-5">
          {dmProcess.map((step, i) => (
            <div
              key={step.step}
              className="relative flex flex-col px-4"
            >
              {/* connector between centered step numbers */}
              {i < dmProcess.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-4 h-px w-full bg-border"
                />
              )}
              <span className="relative z-10 font-black leading-none tracking-tight text-brand">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                {step.keys.map((k) => (
                  <li key={k} className="flex items-start gap-1.5">
                    <Check className="mt-0.5 size-3 shrink-0 text-brand" weight="bold" />
                    {k}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex w-fit rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-[11px] font-semibold text-brand">
                {step.deliverables}
              </span>
            </div>
          ))}
        </Reveal>

        {/* mobile vertical timeline */}
        <div className="mt-12 space-y-0 md:hidden">
          {dmProcess.map((step, i) => (
            <div key={step.step} className="relative flex gap-4 pb-8">
              {i < dmProcess.length - 1 && (
                <span aria-hidden className="absolute left-5 top-10 h-full w-px bg-border" />
              )}
              <span className="z-10 grid size-10 shrink-0 place-items-center rounded-full border border-brand/40 bg-background text-sm font-bold text-brand">
                {step.step}
              </span>
              <div className="pt-0.5">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {step.keys.map((k) => (
                    <li key={k} className="flex items-start gap-1.5">
                      <Check className="mt-0.5 size-3 shrink-0 text-brand" weight="bold" />
                      {k}
                    </li>
                  ))}
                </ul>
                <span className="mt-3 inline-flex w-fit rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-[11px] font-semibold text-brand">
                  {step.deliverables}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}