import { Megaphone, MousePointerClick, ShieldCheck } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbHead } from "./head";

const iconMap = {
  awareness: Megaphone,
  ppc: MousePointerClick,
  trust: ShieldCheck,
} as const;

export function MbValueProps() {
  const s = mb.valueProps;
  return (
    <section className="mb-sec">
      <div className="mb-container">
        <MbHead label={s.label} title={s.title} />
        <div className="mb-grid mb-grid--3">
          {s.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.name} className="mb-vp-card">
                <span className="mb-ic">
                  <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="mb-card-name">{item.name}</h3>
                <p className="mb-card-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
