import { Shirt, Sparkles, Cpu, UtensilsCrossed, HeartPulse, Building2, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

const icons: LucideIcon[] = [Shirt, Sparkles, Cpu, UtensilsCrossed, HeartPulse, Building2];

export function SdIndustries() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SdSectionHeading
        label={sd.industries.label}
        heading={sd.industries.heading}
        accent={sd.industries.headingAccent}
        body={sd.industries.body}
      />
      <Reveal stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {sd.industries.items.map((name, i) => {
          const Icon = icons[i] ?? Building2;
          return (
            <div
              key={name}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-brand/40"
            >
              <span className="grid size-12 place-items-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-semibold">{name}</span>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
