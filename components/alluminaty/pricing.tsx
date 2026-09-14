import { Check, ShieldCheck } from "lucide-react";
import { az } from "@/lib/alluminaty";
import { Reveal } from "@/components/reveal";

export function AzPricing() {
  return (
    <section className="az-sec az-pricing">
      <div className="az-container">
        <Reveal className="az-head" data-ghost={az.pricing.number}>
          <p className="az-kicker">
            <span className="az-kicker-num">{az.pricing.number}</span>
            {az.pricing.label}
          </p>
          <h2 className="az-h">{az.pricing.title}</h2>
          <p className="az-lede">{az.pricing.body}</p>
        </Reveal>

        <div className="az-price-grid">
          {az.pricing.plans.map((plan) => (
            <Reveal
              key={plan.name}
              className={`az-price${plan.highlight ? " az-price--hl" : ""}`}
            >
              {plan.highlight && <span className="az-price-flag">Recommended</span>}
              <h3 className="az-price-name">{plan.name}</h3>
              <p className="az-price-tag">{plan.tagline}</p>
              <p className="az-price-locked">
                <strong>{plan.price}</strong>
                <span>{plan.unit}</span>
              </p>
              <ul className="az-price-feats">
                {plan.features.map((f) => (
                  <li key={f}>
                    <span className="az-price-check" aria-hidden="true">
                      <Check size={12} strokeWidth={2.4} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="az-matrix">
          <div className="az-matrix-head">
            <h3>{az.matrix.heading}</h3>
            <p>{az.matrix.note}</p>
          </div>
          <div className="az-table-wrap">
            <table className="az-table">
              <thead>
                <tr>
                  {az.matrix.columns.map((col) => (
                    <th key={col} scope="col" className={col === "Benefit" ? "az-cell-lead" : ""}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {az.matrix.rows.map((row) => (
                  <tr key={row.name}>
                    <th scope="row" className="az-cell-lead">
                      {row.name}
                    </th>
                    {row.values.map((val, i) => (
                      <td key={`${row.name}-${i}`}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="az-matrix-foot">
            <ShieldCheck size={14} strokeWidth={2} aria-hidden="true" />
            {az.pricing.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}