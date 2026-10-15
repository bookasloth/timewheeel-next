import { Check, Minus } from "lucide-react";
import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";
import { IscHead } from "./head";

export function IscCompare() {
  const s = isc.compare;
  const [, themHead, usHead] = s.columns;

  return (
    <section className="isc-sec isc-compare">
      <div className="isc-container">
        <IscHead title={s.title} body={s.body} />

        <Reveal className="isc-duel">
          <div className="isc-duel-board">
            <span className="isc-duel-score">
              <b>{s.score.us}</b>
              <i>–</i>
              <b>{s.score.them}</b>
              <em>{s.score.note}</em>
            </span>
            <span className="isc-duel-team isc-duel-team--them">
              <i className="isc-duel-dot" aria-hidden="true" />
              {themHead}
            </span>
            <span className="isc-duel-team isc-duel-team--us">
              <i className="isc-duel-dot" aria-hidden="true" />
              {usHead}
            </span>
          </div>

          <div className="isc-duel-rows">
            {s.rows.map(([name, them, us]) => (
              <div className="isc-duel-row" key={name}>
                <p className="isc-duel-crit">{name}</p>
                <p className="isc-duel-cell isc-duel-cell--them">
                  <Minus size={15} strokeWidth={2.4} aria-hidden="true" />
                  <span>
                    <span className="isc-duel-cell-tag">{themHead}</span>
                    {them}
                  </span>
                </p>
                <p className="isc-duel-cell isc-duel-cell--us">
                  <Check size={15} strokeWidth={2.8} aria-hidden="true" />
                  <span>
                    <span className="isc-duel-cell-tag">{usHead}</span>
                    {us}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
