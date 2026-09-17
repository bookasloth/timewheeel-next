import {
  Server,
  Feather,
  HandHeart,
  Users,
  KeyRound,
} from "lucide-react";
import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";

const icons = [Server, Feather, HandHeart, Users, KeyRound];

export function CfIndependence({ data }: { data: CoffeeData }) {
  const { independence } = data;

  return (
    <section className="cf-independence">
      <div className="cf-container">
        <div className="cf-sec-head cf-sec-head--center">
          <Reveal>
            <span className="cf-kicker">{independence.kicker}</span>
            <h2 className="cf-h">{independence.title}</h2>
          </Reveal>
        </div>

        <div className="cf-ind-grid">
          {independence.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.label} className="cf-ind-item" stagger>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    color: "var(--cf-caramel)",
                    background: "rgba(212, 149, 42, 0.1)",
                  }}
                >
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div className="cf-ind-label">{item.label}</div>
                <div className="cf-ind-desc">{item.desc}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}