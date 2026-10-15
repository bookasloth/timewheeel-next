import { Check, FileArchive, FileText, Mail, MessageSquare, Table2 } from "lucide-react";
import { arch } from "@/lib/archflow";
import { Reveal } from "@/components/reveal";
import { AfHead } from "./head";

const MESS = [
  { name: "Plan_REV_v7_FINAL.dwg", icon: FileText, top: "1%", left: "0%", rot: -6, delay: 0 },
  { name: "site-snag.mp4", icon: MessageSquare, top: "22%", left: "32%", rot: 5, delay: 0 },
  { name: "Materials.xlsx", icon: Table2, top: "44%", left: "2%", rot: -3, delay: 0 },
  { name: "approval.eml", icon: Mail, top: "64%", left: "28%", rot: 6, delay: 0 },
  { name: "site_photos.zip", icon: FileArchive, top: "85%", left: "6%", rot: -4, delay: 0 },
] as const;

export function AfSolution() {
  const s = arch.solution;
  return (
    <section className="af-sec af-dark af-transform">
      <span className="af-glow" aria-hidden="true" />
      <div className="af-container af-pos">
        <AfHead number={s.number} label={s.label} title={s.title} body={s.body} light center />
        <div className="af-converge">
          <div className="af-converge-side af-converge-side--mess">
            <p className="af-converge-label">
              <span className="af-mess-tag">Before</span>Scattered across
            </p>
            <div className="af-mess" aria-hidden="true">
              {MESS.map((m) => {
                const Icon = m.icon;
                return (
                  <span
                    className="af-mess-file"
                    key={m.name}
                    style={{ top: m.top, left: m.left, transform: `rotate(${m.rot}deg)` }}
                  >
                    <span className="af-mess-inner">
                      <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                      {m.name}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="af-converge-arrow" aria-hidden="true">
            <svg viewBox="0 0 60 24" fill="none">
              <line className="af-draw" pathLength={1} x1="2" y1="12" x2="42" y2="12" />
              <path d="M42 5 L54 12 L42 19" />
            </svg>
          </div>

          <Reveal className="af-converge-side af-converge-side--work">
            <p className="af-converge-label">
              <span className="af-mess-tag af-mess-tag--live">After</span>One workspace
            </p>
            <div className="af-workspace">
              <div className="af-workspace-bar">
                <span className="af-workspace-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="af-workspace-title">Archflow project workspace</span>
                <span className="af-workspace-badge">Live</span>
              </div>
              <ul className="af-workspace-list">
                {s.items.map((item) => (
                  <li key={item}>
                    <span className="af-workspace-check" aria-hidden="true">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
