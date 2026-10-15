import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isc } from "@/lib/indian-sports-club";
import { Reveal } from "@/components/reveal";
import { IscHead } from "./head";

export function IscAudiences() {
  const s = isc.audiences;
  return (
    <section className="isc-sec isc-audiences">
      <div className="isc-container">
        <IscHead title={s.title} center />
        <div className="isc-aud-grid">
          {s.items.map((item, i) => (
            <Reveal key={item.name} className="isc-aud-card" delay={i * 0.05}>
              <span className="isc-aud-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="isc-aud-tag">{item.tag}</span>
              <h3 className="isc-aud-name">{item.name}</h3>
              <p className="isc-aud-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
