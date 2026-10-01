import {
  Building2,
  Cpu,
  HeartPulse,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import { SdSectionHeading } from "@/components/shopify-development/section-heading";
import { sd } from "@/lib/shopify-development";

const ICONS: Record<string, LucideIcon> = {
  shirt: Shirt,
  sparkles: Sparkles,
  cpu: Cpu,
  "utensils-crossed": UtensilsCrossed,
  "heart-pulse": HeartPulse,
  "building-2": Building2,
};

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
        {sd.industries.items.map((item) => {
          const Icon = ICONS[item.icon] ?? Building2;
          return (
            <div
              key={item.name}
              style={{ "--sd-accent": item.accent } as CSSProperties}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-colors duration-300 hover:border-[color:var(--sd-accent)]"
            >
              <span
                className="grid size-12 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${item.accent}1f`, color: item.accent }}
              >
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-semibold" style={{ color: item.accent }}>
                {item.name}
              </span>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
