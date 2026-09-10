import {
  CalendarSync,
  CreditCard,
  KeyRound,
  MessageCircle,
  Smartphone,
  Video,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";
import "./integrations.css";

const iconMap = {
  wa: MessageCircle,
  gcal: CalendarSync,
  meet: Video,
  razorpay: CreditCard,
  upi: Smartphone,
  sso: KeyRound,
} as const;

export function BasIntegrations() {
  return (
    <section className="it">
      <div className="it__container">
        <Reveal className="it__header">
          <h2 className="it__title">{bas.integrations.title}</h2>
          <p className="it__desc">{bas.integrations.body}</p>
        </Reveal>

        <Reveal className="it__grid">
          {bas.integrations.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div key={item.name} className="it__chip">
                <span className="it__chip-ic" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className="it__chip-name">{item.name}</span>
              </div>
            );
          })}
        </Reveal>

        <p className="it__note">{bas.integrations.note}</p>
      </div>
    </section>
  );
}