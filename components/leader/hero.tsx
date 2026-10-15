import { ArrowRight } from "lucide-react";
import { leader } from "@/lib/leader";
import { LfButton } from "./button";

const CELLS = Array.from({ length: 32 }, (_, i) => i);

const LEADS = [
  { grade: "A", name: "Nova Dental", meta: "score 86 · no website", pos: "lf-lead--a" },
  { grade: "B", name: "Smile Studio", meta: "no email · 4.7 rating", pos: "lf-lead--b" },
  { grade: "A", name: "CarePoint Clinic", meta: "booking · WhatsApp", pos: "lf-lead--c" },
] as const;

function SweepPanel() {
  return (
    <div className="lf-job">
      <div className="lf-job-bar">
        <span className="lf-job-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="lf-job-title">Nagpur · dental clinics</span>
        <span className="lf-job-live">sweeping</span>
      </div>
      <div className="lf-matrix" aria-hidden="true">
        {CELLS.map((i) => (
          <i key={i} style={{ animationDelay: `${(i % 8) * 0.12 + Math.floor(i / 8) * 0.28}s` }} />
        ))}
      </div>
      <div className="lf-job-foot">
        <span>
          <b>480</b> cells
        </span>
        <span>
          <b>312</b> unique
        </span>
        <span>
          <b>41</b> duplicates
        </span>
      </div>
    </div>
  );
}

export function LfHero() {
  const h = leader.hero;
  return (
    <section className="lf-hero">
      <div className="lf-hero-deco" aria-hidden="true">
        <span className="lf-hero-dots" />
        <span className="lf-hero-veil" />
      </div>
      <div className="lf-container lf-hero-inner">
        <div className="lf-hero-copy">
          <p className="lf-eyebrow">
            <span className="lf-hero-tick" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1 className="lf-hero-title">
            {h.title} <span className="lf-accent">{h.titleAccent}</span>
          </h1>
          <p className="lf-hero-answer">{h.answer}</p>
          <div className="lf-actions">
            <LfButton href={h.primaryHref}>
              {h.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </LfButton>
            <LfButton href={h.secondaryHref} variant="line">
              {h.secondaryLabel}
            </LfButton>
          </div>
        </div>
        <div className="lf-hero-figure" aria-hidden="true">
          <SweepPanel />
          {LEADS.map((l) => (
            <span key={l.name} className={`lf-lead ${l.pos}`}>
              <span className={`lf-lead-grade${l.grade === "B" ? " lf-lead-grade--b" : ""}`}>{l.grade}</span>
              <span className="lf-lead-info">
                <span className="lf-lead-name">{l.name}</span>
                <span className="lf-lead-meta">{l.meta}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
