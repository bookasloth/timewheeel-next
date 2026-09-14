import {
  BadgeCheck,
  HeartHandshake,
  MessagesSquare,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

const stopIcons = [UserCheck, Users, MessagesSquare, HeartHandshake, ShieldCheck];

export function AzProcess() {
  const s = az.process;

  return (
    <section className="az-sec az-process">
      <div className="az-container">
        <Reveal className="az-head" data-ghost={s.number}>
          <p className="az-kicker">
            <span className="az-kicker-num">{s.number}</span>
            {s.label}
          </p>
          <h2 className="az-h">{s.title}</h2>
          <p className="az-lede">{s.body}</p>
        </Reveal>

        <Reveal className="az-track" delay={0.05}>
          <div className="az-trackline" aria-hidden="true" />
          {s.steps.map((step, i) => {
            const Icon = stopIcons[i % stopIcons.length];
            const isStart = i === 0;
            const isEnd = i === s.steps.length - 1;
            return (
              <div key={step.name} className="az-stop">
                <span
                  className={`az-node${isStart ? " az-node--go" : ""}${
                    isEnd ? " az-node--done" : ""
                  }`}
                >
                  {isEnd ? (
                    <BadgeCheck size={20} strokeWidth={1.8} aria-hidden="true" />
                  ) : (
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  )}
                  <span className="az-node-num">{i + 1}</span>
                </span>
                <span className="az-stop-label">{step.stop}</span>
              </div>
            );
          })}
        </Reveal>

        <div className="az-pgrid">
          {s.steps.map((step, i) => {
            const Icon = stopIcons[i % stopIcons.length];
            return (
              <Reveal key={step.name} className="az-pcard">
                <span className="az-pcard-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="az-pcard-ic">
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="az-pcard-name">{step.name}</h3>
                <p className="az-pcard-desc">{step.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}