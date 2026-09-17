import { Layers, PenTool, ShieldCheck, Smartphone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { wa } from "@/lib/web-app-development";

const icons = [PenTool, Layers, ShieldCheck, Smartphone] as const;

// One accent per card, from the site's existing palette.
const accents = [
  { chip: "bg-brand text-white", ring: "group-hover:border-brand/40", glow: "rgba(254,81,0,0.22)" },
  { chip: "bg-accent-blue text-white", ring: "group-hover:border-accent-blue/40", glow: "rgba(38,156,239,0.22)" },
  { chip: "bg-accent-pink text-white", ring: "group-hover:border-accent-pink/40", glow: "rgba(255,77,147,0.22)" },
  { chip: "bg-rating text-white", ring: "group-hover:border-rating/40", glow: "rgba(74,183,101,0.22)" },
] as const;

export function WaFeatureStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-14">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {wa.features.map((f, i) => {
          const Icon = icons[i];
          const a = accents[i];
          return (
            <Reveal key={f.title} className="h-full">
              <div
                className={`group relative flex h-full gap-3.5 overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors duration-300 md:p-6 ${a.ring}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full opacity-80 blur-2xl transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: a.glow }}
                />
                <span className={`relative grid size-10 shrink-0 place-items-center rounded-xl ${a.chip}`}>
                  <Icon className="size-5" />
                </span>
                <div className="relative">
                  <h3 className="text-sm font-bold">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}