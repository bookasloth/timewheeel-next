import {
  Bell,
  Download,
  EyeOff,
  Mail,
  Percent,
  Repeat,
  ShoppingBag,
  Wallet,
  Zap,
} from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

const iconMap = {
  wallet: Wallet,
  repeat: Repeat,
  bag: ShoppingBag,
  mail: Mail,
  download: Download,
  zap: Zap,
  percent: Percent,
  eye: EyeOff,
  bell: Bell,
} as const;

export function CfCapabilities({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-caps">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={data.capabilities.number}>
          <h2 className="cf-h">{data.capabilities.title}</h2>
          <p className="cf-lede">{data.capabilities.body}</p>
        </Reveal>

        <div className="cf-caps-grid">
          {data.capabilities.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.label} className="cf-cap" delay={i * 0.04}>
                <span className="cf-cap-ic">
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="cf-cap-label">{item.label}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
