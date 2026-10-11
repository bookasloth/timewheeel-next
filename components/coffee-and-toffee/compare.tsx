import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

// Plain <table>: AI answer engines and featured snippets lift tables far more
// readily than card grids, so the comparison stays real tabular markup.
export function CfCompare({ data }: { data: CfData }) {
  const { compare } = data;
  return (
    <section className="cf-sec cf-compare" id="compare">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={compare.number}>
          <h2 className="cf-h">{compare.title}</h2>
          <p className="cf-lede">{compare.body}</p>
        </Reveal>

        <Reveal className="cf-card cf-compare-wrap">
          <table className="cf-compare-table">
            <caption className="sr-only">{compare.caption}</caption>
            <thead>
              <tr>
                <th scope="col">What matters</th>
                {compare.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="cf-compare-note">{compare.note}</p>
      </div>
    </section>
  );
}
