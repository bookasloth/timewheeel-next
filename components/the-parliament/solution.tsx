import { CalendarDays, Crown, Newspaper, ShieldCheck, Users, Video } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";

const icons = [Newspaper, Users, CalendarDays, Crown, Video, ShieldCheck];

export function TpSolution() {
  const s = tp.solution;
  return (
    <section className="tp-sec tp-dark">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} body={s.body} light />
        <Reveal className="tp-strips" stagger>
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div className="tp-strip" key={item}>
                <span className="tp-ic tp-ic--dark">
                  <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                </span>
                {item}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
