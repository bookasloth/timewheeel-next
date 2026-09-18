import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

export function SdTech() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SdSectionHeading
          label={sd.tech.label}
          heading={sd.tech.heading}
          accent={sd.tech.headingAccent}
          body={sd.tech.body}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sd.tech.groups.map((g, i) => (
            <Reveal key={g.name} delay={(i % 3) * 0.05} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text">{g.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
