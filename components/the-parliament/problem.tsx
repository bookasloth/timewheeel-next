import { CalendarOff, MessageSquareOff, ShieldCheck, Split, Users } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";

const icons = [MessageSquareOff, Users, CalendarOff, ShieldCheck, Split];

export function TpProblem() {
  const s = tp.problem;
  return (
    <section className="tp-sec">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="tp-grid tp-grid--5">
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} className="tp-card">
                <span className="tp-ic">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="tp-card-name">{item.name}</h3>
                <p className="tp-card-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
