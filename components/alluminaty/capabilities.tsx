import {
  Code2,
  Compass,
  Database,
  LayoutGrid,
  MessagesSquare,
  PenTool,
  Server,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const iconMap = {
  compass: Compass,
  pen: PenTool,
  layout: LayoutGrid,
  code: Code2,
  server: Server,
  database: Database,
  shield: ShieldCheck,
  wallet: Wallet,
  message: MessagesSquare,
} as const;

export function AzCapabilities() {
  return (
    <section className="az-sec az-caps">
      <div className="az-container">
        <Reveal className="az-head" data-ghost={az.capabilities.number}>
          <p className="az-kicker">
            <span className="az-kicker-num">{az.capabilities.number}</span>
            {az.capabilities.label}
          </p>
          <h2 className="az-h">{az.capabilities.title}</h2>
          <p className="az-lede">{az.capabilities.body}</p>
        </Reveal>

        <div className="az-caps-grid">
          {az.capabilities.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.label} className="az-cap">
                <span className="az-cap-ic">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="az-cap-label">{item.label}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}