import { Boxes, Check, CreditCard, MessageCircle, Receipt, Store, Truck } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

const iconMap = {
  store: Store,
  box: Boxes,
  card: CreditCard,
  receipt: Receipt,
  truck: Truck,
  message: MessageCircle,
} as const;

export function EzFeatures() {
  const f = ez.features;
  return (
    <section className="ez-sec ez-sec--tint">
      <div className="ez-container">
        <Reveal>
          <EzHead number={f.number} label={f.label} title={f.title} body={f.body} />
        </Reveal>
        <Reveal stagger className="ez-grid ez-grid--3">
          {f.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div key={item.name} className="ez-card">
                <span className="ez-ic">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="ez-card-title">{item.name}</h3>
                <p className="ez-card-desc">{item.desc}</p>
                <ul className="ez-ticks">
                  {item.bullets.map((b) => (
                    <li key={b}>
                      <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
