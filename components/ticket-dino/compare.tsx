import { Check, X } from "lucide-react";
import { td } from "@/lib/ticket-dino";
import { Reveal } from "@/components/reveal";
import { TdHead } from "./head";

export function TdCompare() {
  const s = td.compare;
  return (
    <section className="td-sec">
      <div className="td-container">
        <TdHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <Reveal className="td-tape">
          <div className="td-tape-head">
            <span className="td-tape-name is-them">{s.columns[1]}</span>
            <span className="td-tape-vs" aria-hidden="true">
              vs
            </span>
            <span className="td-tape-name is-us">{s.columns[2]}</span>
          </div>
          <div className="td-tape-rows">
            {s.rows.map(([feature, them, us]) => (
              <div className="td-tape-row" key={feature}>
                <p className="td-tape-side is-them">
                  {them}
                  <span className="td-tape-mark is-them" aria-hidden="true">
                    <X size={13} strokeWidth={2.8} />
                  </span>
                </p>
                <span className="td-tape-tag">{feature}</span>
                <p className="td-tape-side is-us">
                  <span className="td-tape-mark is-us" aria-hidden="true">
                    <Check size={13} strokeWidth={2.8} />
                  </span>
                  {us}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="td-verdict">{s.verdict}</p>
      </div>
    </section>
  );
}
