import { BarChart3, FileText, Gauge, Layers, Search, ShoppingBag, Table2, Zap } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbHead } from "./head";

const iconMap = {
  search: Search,
  analytics: BarChart3,
  cms: FileText,
  shop: ShoppingBag,
  sheet: Table2,
  headless: Layers,
  speed: Gauge,
  api: Zap,
} as const;

export function MbIntegrations() {
  const s = mb.integrations;
  return (
    <section className="mb-sec">
      <div className="mb-container">
        <MbHead label={s.label} title={s.title} body={s.body} center />
        <Reveal className="mb-integrations" stagger>
          {s.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div key={item.name} className="mb-int">
                <span className="mb-ic" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.9} />
                </span>
                <div>
                  <p className="mb-int-name">{item.name}</p>
                  <p className="mb-int-hint">{item.hint}</p>
                </div>
                <span className="mb-int-plus" aria-hidden="true">
                  +
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
