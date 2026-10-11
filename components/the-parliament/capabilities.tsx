import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Code2,
  Compass,
  Database,
  MessagesSquare,
  PenTool,
  ShieldCheck,
  Video,
  Wallet,
} from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";

const iconMap = {
  compass: Compass,
  pen: PenTool,
  code: Code2,
  database: Database,
  shield: ShieldCheck,
  wallet: Wallet,
  video: Video,
  bell: Bell,
  message: MessagesSquare,
} as const;

export function TpCapabilities() {
  const s = tp.capabilities;
  return (
    <section className="tp-sec tp-dark">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} body={s.body} light />
        <div className="tp-caps">
          {s.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.label} className="tp-cap">
                <span className="tp-ic tp-ic--dark">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                {item.label}
              </Reveal>
            );
          })}
        </div>
        <Link href={s.linkHref} className="tp-caps-link">
          {s.linkLabel}
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
