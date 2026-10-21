import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";

export function IscFeatures() {
  const s = isc.sports;
  return (
    <section className="isc-sec isc-tint isc-sports">
      <div className="isc-container">
        <Reveal className="isc-sports-head">
          <p className="isc-eyebrow isc-sports-eyebrow">
            <span className="isc-eyebrow-dot" aria-hidden="true" />
            {s.label}
          </p>
          <h2 className="isc-h isc-sports-title">
            {s.titleLead} <span>{s.titleAccent}</span>
          </h2>
          <p className="isc-lede isc-sports-lede">{s.body}</p>
        </Reveal>

        <Reveal stagger className="isc-sports-grid" y={14}>
          {s.items.map((sport, i) => (
            <div
              className={`isc-sports-item${sport === "And Many More" ? " isc-sports-item--more" : ""}`}
              key={sport}
            >
              <span className="isc-sports-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="isc-sports-name">{sport}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
