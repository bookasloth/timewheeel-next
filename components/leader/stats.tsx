import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";
import { LfHead } from "./head";

export function LfStats() {
  const s = leader.stats;
  return (
    <section className="lf-sec lf-dark">
      <div className="lf-container">
        <LfHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <div className="lf-ledger">
          {s.items.map((item, i) => (
            <Reveal key={item.label} className="lf-ledger-row">
              <span className="lf-ledger-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="lf-ledger-value">{item.value}</span>
              <span className="lf-ledger-label">{item.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
