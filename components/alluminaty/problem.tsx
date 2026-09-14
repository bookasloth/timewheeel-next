import { MessageSquareOff, Search, Users, CalendarOff, Gift } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const icons = [Users, Search, MessageSquareOff, CalendarOff, Gift];

export function AzProblem() {
  return (
    <section className="az-sec az-problem">
      <div className="az-container">
        <Reveal className="az-head" data-ghost={az.problem.number}>
          <p className="az-kicker">
            <span className="az-kicker-num">{az.problem.number}</span>
            {az.problem.label}
          </p>
          <h2 className="az-h">{az.problem.title}</h2>
          <p className="az-lede">{az.problem.body}</p>
        </Reveal>

        <div className="az-grid">
          {az.problem.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} className="az-card">
                <span className="az-card-ic az-card-ic--muted">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="az-card-title">{item.name}</h3>
                <p className="az-card-body">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}