import { isc } from "@/lib/indian-sports-club";
import { IscHead } from "./head";
import { IscFeatureTabs } from "./feature-tabs";

export function IscFeatures() {
  const s = isc.features;
  return (
    <section className="isc-sec isc-features">
      <div className="isc-container">
        <IscHead title={s.title} body={s.body} />
        <IscFeatureTabs items={s.items} />
        <div className="isc-also">
          <h3>{s.alsoLabel}</h3>
          <ul>
            {s.also.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
