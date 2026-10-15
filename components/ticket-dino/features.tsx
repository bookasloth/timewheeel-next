import { BarChart3, CreditCard, Percent, QrCode, ScanLine, Ticket } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { Reveal } from "@/components/reveal";
import { TdHead } from "./head";
import { TdFlipCard } from "./flip-card";

const iconMap = {
  ticket: Ticket,
  coupon: Percent,
  payments: CreditCard,
  qr: QrCode,
  scan: ScanLine,
  admin: BarChart3,
} as const;

export function TdFeatures() {
  const s = td.features;
  return (
    <section className="td-sec td-features">
      <div className="td-container">
        <TdHead number={s.number} label={s.label} title={s.title} body={s.body} center />
        <div className="td-grid td-grid--3">
          {s.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.name} className="td-flip-cell">
                <TdFlipCard
                  icon={<Icon size={20} strokeWidth={1.8} aria-hidden="true" />}
                  name={item.name}
                  desc={item.desc}
                  bullets={item.bullets}
                />
              </Reveal>
            );
          })}
        </div>
        <div className="td-also">
          <h3>{s.alsoLabel}</h3>
          <ul>
            {s.also.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
