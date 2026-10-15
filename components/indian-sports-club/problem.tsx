import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";

export function IscProblem() {
  const s = isc.problem;
  return (
    <section className="isc-sec isc-problem">
      <div className="isc-container isc-problem-grid">
        <aside className="isc-problem-aside">
          <Reveal>
            <h2 className="isc-h">{s.title}</h2>
            <p className="isc-lede">{s.body}</p>
          </Reveal>
        </aside>

        <div className="isc-problem-list">
          {s.items.map((item, i) => (
            <Reveal key={item.name} className="isc-problem-row" delay={i * 0.04}>
              <span className="isc-problem-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="isc-problem-body">
                <span className="isc-problem-title">{item.name}</span>
                <span className="isc-problem-desc">{item.desc}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
