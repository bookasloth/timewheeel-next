import {
  Code2,
  Compass,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const iconMap = {
  compass: Compass,
  pen: PenTool,
  code: Code2,
  shield: ShieldCheck,
} as const;

export function AzCapabilities() {
  return (
    <section className="az-sec az-caps">
      <div className="az-container">
        <Reveal className="az-head az-head--light" data-ghost={az.capabilities.number}>
          <p className="az-kicker az-kicker--light">
            <span className="az-kicker-num">{az.capabilities.number}</span>
            {az.capabilities.label}
          </p>
          <h2 className="az-h">{az.capabilities.title}</h2>
          <p className="az-lede">{az.capabilities.body}</p>
        </Reveal>

        <div className="az-caps-grid">
          {az.capabilities.items.map((item) => {
            const Icon =
              iconMap[item.icon as keyof typeof iconMap] ?? Compass;
            return (
              <Reveal key={item.name} className="az-cap">
                <span className="az-cap-ic">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="az-cap-name">{item.name}</h3>
                <p className="az-cap-desc">{item.desc}</p>
                <ul className="az-cap-list">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}