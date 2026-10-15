import { Search, TrendingUp, Wrench } from "lucide-react";
import { mb } from "@/lib/marketing-bug";
import { Reveal } from "@/components/reveal";
import { MbHead } from "./head";

const iconMap = {
  audit: Search,
  fix: Wrench,
  track: TrendingUp,
} as const;

export function MbProcess() {
  const s = mb.process;
  return (
    <section className="mb-sec mb-tint mb-process">
      <div className="mb-container">
        <MbHead label={s.label} title={s.title} center />
        <Reveal className="mb-timeline" stagger>
          {s.steps.map((step, i) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            const index = String(i + 1).padStart(2, "0");
            return (
              <div key={step.name} className="mb-tl-item">
                <span className="mb-tl-node">
                  <Icon size={22} strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="mb-tl-card">
                  <span className="mb-tl-ghost" aria-hidden="true">
                    {index}
                  </span>
                  <p className="mb-tl-tag">{step.tag}</p>
                  <h3 className="mb-card-name">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.name}
                  </h3>
                  <p className="mb-card-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
