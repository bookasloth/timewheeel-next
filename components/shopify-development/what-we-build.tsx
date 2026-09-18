import { Store, Building2, RefreshCw, Layers3, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

const icons: LucideIcon[] = [Store, Building2, RefreshCw, Layers3, Sparkles];

export function SdWhatWeBuild() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SdSectionHeading
        label={sd.build.label}
        heading={sd.build.heading}
        accent={sd.build.headingAccent}
        body={sd.build.body}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sd.build.cards.map((c, i) => {
          const Icon = icons[i] ?? Store;
          return (
            <Reveal key={c.title} delay={(i % 3) * 0.05} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40">
                <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-brand/10 blur-2xl transition-transform duration-300 group-hover:scale-125" />
                <span className="relative grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="size-5" />
                </span>
                <h3 className="relative mt-4 text-base font-bold">{c.title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
