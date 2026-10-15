import { Check, DraftingCompass, ListChecks, MapPin, Package } from "lucide-react";
import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfHead } from "./head";

const iconMap = {
  drawings: DraftingCompass,
  issues: MapPin,
  materials: Package,
  tasks: ListChecks,
} as const;

export function AfFeatures() {
  const s = arch.features;
  return (
    <section className="af-sec af-tint">
      <div className="af-container">
        <AfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="af-grid af-grid--4">
          {s.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.name} className="af-card">
                <span className="af-ic">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="af-card-name">{item.name}</h3>
                <p className="af-card-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
        <div className="af-also">
          <div className="af-also-head">
            <h3 className="af-also-title">{s.alsoLabel}</h3>
          </div>
          <ul className="af-also-list">
            {s.also.map((a) => (
              <li key={a}>
                <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
