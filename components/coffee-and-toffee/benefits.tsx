import { HeartHandshake, Users, Headset, Banknote } from "lucide-react";
import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

const icons = [HeartHandshake, Users, Headset, Banknote];

export function CfBenefits({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-benefits">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={data.benefits.number}>
          <h2 className="cf-h">{data.benefits.title}</h2>
          <p className="cf-lede">{data.benefits.body}</p>
        </Reveal>

        <div className="cf-benefits-grid">
          {data.benefits.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.name} className="cf-benefit" stagger>
                <span className="cf-benefit-ic">
                  <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
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
