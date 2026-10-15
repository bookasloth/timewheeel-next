import { Check } from "lucide-react";
import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";
import { LfHead } from "./head";

export function LfIntegrations() {
  const s = leader.integrations;

  return (
    <section className="lf-runs">
      <div className="lf-container">
        <LfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <Reveal className="lf-term">
          <div className="lf-term-bar">
            <span className="lf-term-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="lf-term-title">leader · runtime</span>
            <span className="lf-term-tag">local</span>
          </div>
          <ul className="lf-term-body">
            {s.items.map((item) => (
              <li key={item.name} className="lf-term-row">
                <span className="lf-term-check" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="lf-term-name">{item.name}</span>
                <span className="lf-term-lead" aria-hidden="true" />
                <span className="lf-term-hint">{item.hint}</span>
              </li>
            ))}
          </ul>
          <div className="lf-term-foot">
            <span className="lf-term-prompt" aria-hidden="true">
              $
            </span>
            <span>node server.mjs</span>
            <span className="lf-term-url">listening locally</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
