import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tp } from "@/lib/the-parliament";
import { Reveal } from "@/components/reveal";
import { TpHead } from "./head";

export function TpAudiences() {
  const s = tp.audiences;
  return (
    <section className="tp-sec tp-tint">
      <div className="tp-container">
        <TpHead number={s.number} label={s.label} title={s.title} />
        <div className="tp-grid tp-grid--4">
          {s.items.map((item) => (
            <Reveal key={item.name} className="tp-card">
              <h3 className="tp-card-name">{item.name}</h3>
              <p className="tp-card-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
        <p className="tp-crosslink">
          {s.crossLink.text}{" "}
          <Link href={s.crossLink.href}>
            {s.crossLink.label}
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
