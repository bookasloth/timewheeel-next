import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";

export function TpCompare() {
  const s = tp.compare;
  return (
    <section className="tp-sec">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} body={s.body} />
        <Reveal className="tp-table-wrap">
          <table className="tp-table">
            <caption className="sr-only">{s.title}</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col">{s.columns[1]}</th>
                <th scope="col" className="tp-col-us">
                  {s.columns[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map(([name, wa, us]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{wa}</td>
                  <td className="tp-col-us">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="tp-verdict">{s.verdict}</p>
      </div>
    </section>
  );
}
