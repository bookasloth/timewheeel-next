import { CalendarX, Copy, TriangleAlert, Users } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { Reveal } from "@/components/reveal";
import { TdHead } from "./head";

const icons = [Copy, Users, CalendarX, TriangleAlert];

export function TdProblem() {
  const s = td.problem;
  return (
    <section className="td-sec">
      <div className="td-container">
        <TdHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <Reveal className="td-log" stagger>
          {s.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={item.name} className="td-log-row">
                <span className="td-log-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="td-log-body">
                  <h3 className="td-log-name">{item.name}</h3>
                  <p className="td-log-desc">{item.desc}</p>
                </div>
                <span className="td-log-ic" aria-hidden="true">
                  <Icon size={24} strokeWidth={2} />
                </span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
