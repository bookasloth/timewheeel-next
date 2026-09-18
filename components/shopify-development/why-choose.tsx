import { Target, Search, Smartphone, ShieldCheck, Headset, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

const icons: LucideIcon[] = [Target, Search, Smartphone, ShieldCheck, Headset];

const accents = [
  "bg-brand text-white",
  "bg-accent-blue text-white",
  "bg-accent-pink text-white",
  "bg-rating text-white",
  "bg-accent-yellow text-navy",
] as const;

export function SdWhyChoose() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SdSectionHeading
          label={sd.why.label}
          heading={sd.why.heading}
          accent={sd.why.headingAccent}
          body={sd.why.body}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sd.why.cards.map((c, i) => {
            const Icon = icons[i] ?? Target;
            return (
              <Reveal key={c.title} delay={(i % 3) * 0.05} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${accents[i]}`}>
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
