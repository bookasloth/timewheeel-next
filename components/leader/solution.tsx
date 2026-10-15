import { Check, FileSpreadsheet, FileText, Table2 } from "lucide-react";
import { leader } from "@/lib/leader";
import { Reveal } from "@/components/reveal";

const RAW = [
  { name: "dentist_nagpur.csv", icon: FileText },
  { name: "results (copy).csv", icon: Table2 },
  { name: "Dentist in Sadar.csv", icon: FileSpreadsheet },
  { name: "contacts_maybe.xlsx", icon: Table2 },
  { name: "duplicates_again.csv", icon: FileText },
] as const;

const PIPE = [
  { name: "Sweep", desc: "every Area × Query cell" },
  { name: "Dedup", desc: "6-stage, one row each" },
  { name: "Enrich", desc: "email, site, WhatsApp" },
  { name: "Score", desc: "weighted grade + reasons" },
] as const;

const OUT = [
  { name: "Nova Dental", flag: "no website", grade: "A", b: false },
  { name: "Smile Studio", flag: "no email", grade: "B", b: true },
  { name: "CarePoint Clinic", flag: "booking · WhatsApp", grade: "A", b: false },
  { name: "Bright Ortho", flag: "complete", grade: "B", b: true },
] as const;

function Connector() {
  return (
    <div className="lf-flow" aria-hidden="true">
      <span className="lf-flow-line" />
      <span className="lf-flow-node" />
      <span className="lf-flow-node lf-flow-node--2" />
    </div>
  );
}

export function LfSolution() {
  const s = leader.solution;
  return (
    <section className="lf-sol">
      <div className="lf-container">
        <Reveal className="lf-sol-head">
          <div>
            <h2 className="lf-sol-title">{s.title}</h2>
          </div>
          <p className="lf-sol-body">{s.body}</p>
        </Reveal>

        <div className="lf-machine">
          <div className="lf-stage">
            <p className="lf-stage-label">
              <span className="lf-stage-dot" aria-hidden="true" />
              Raw Maps dump
              <b>5 files</b>
            </p>
            <div className="lf-raw" aria-hidden="true">
              {RAW.map((r) => {
                const Icon = r.icon;
                return (
                  <span className="lf-raw-chip" key={r.name}>
                    <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                    {r.name}
                  </span>
                );
              })}
            </div>
          </div>

          <Connector />

          <div className="lf-stage">
            <p className="lf-stage-label">
              <span className="lf-stage-dot lf-stage-dot--accent" aria-hidden="true" />
              The pipeline
              <b>4 stages</b>
            </p>
            <ol className="lf-pipe">
              {PIPE.map((p, i) => (
                <li className="lf-pipe-step" key={p.name}>
                  <span className="lf-pipe-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lf-pipe-info">
                    <b>{p.name}</b>
                    <span>{p.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <Connector />

          <div className="lf-stage">
            <p className="lf-stage-label">
              <span className="lf-stage-dot lf-stage-dot--accent" aria-hidden="true" />
              Scored, export-ready
              <b>1 row each</b>
            </p>
            <div className="lf-out">
              <div className="lf-out-head">
                <span>Business</span>
                <span>Flags</span>
                <span>Grade</span>
              </div>
              {OUT.map((o) => (
                <div className="lf-out-row" key={o.name}>
                  <span className="lf-out-name">{o.name}</span>
                  <span className="lf-out-flag">{o.flag}</span>
                  <span className={`lf-out-grade${o.b ? " lf-out-grade--b" : ""}`}>{o.grade}</span>
                </div>
              ))}
              <div className="lf-out-foot">
                <span>EXPORT · CSV / JSON / XLSX</span>
                <b>600+ rows</b>
              </div>
            </div>
          </div>
        </div>

        <ul className="lf-sol-tags">
          {s.items.map((item) => (
            <li key={item}>
              <Check size={14} strokeWidth={2.6} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
