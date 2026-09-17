import { Link, Wallet, UsersRound, ReceiptText } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

const icons = [Link, UsersRound, Wallet, ReceiptText];

export function CfProblem({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-problem">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={data.problem.number}>
          <h2 className="cf-h">{data.problem.title}</h2>
          <p className="cf-lede">{data.problem.body}</p>
        </Reveal>

        <div className="cf-problem-grid">
          {data.problem.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} className="cf-card cf-problem-card">
                <span className="cf-card-ic cf-problem-ic">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="cf-card-title">{item.name}</h3>
                <p className="cf-card-desc">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
