import { X } from "lucide-react";
import { ez } from "@/lib/ezshop";
import { Reveal } from "@/components/reveal";
import { EzHead } from "./button";

export function EzCompare() {
  const c = ez.compare;
  return (
    <section className="ez-sec">
      <div className="ez-container">
        <Reveal>
          <EzHead number={c.number} label={c.label} title={c.title} body={c.body} />
        </Reveal>
        <Reveal className="ez-table-wrap">
          <table className="ez-table">
            <thead>
              <tr>
                {c.columns.map((col, i) => (
                  <th key={i} scope="col" className={i === 1 ? "is-us" : undefined}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{row.name}</th>
                  {row.values.map((v, i) => (
                    <td key={i} className={i === 0 ? "is-us" : undefined}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="ez-note">{c.note}</p>

        <Reveal className="ez-fit">
          <h3 className="ez-card-title">{ez.fit.title}</h3>
          <ul>
            {ez.fit.items.map((item) => (
              <li key={item}>
                <X size={14} strokeWidth={2.4} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
