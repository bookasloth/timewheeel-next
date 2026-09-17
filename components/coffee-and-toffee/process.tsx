import { type CfData } from "@/lib/coffee-and-toffee";
import { Reveal } from "@/components/reveal";

export function CfProcess({ data }: { data: CfData }) {
  return (
    <section className="cf-sec cf-process">
      <div className="cf-container">
        <Reveal className="cf-head" data-ghost={data.process.number}>
          <h2 className="cf-h">{data.process.title}</h2>
          <p className="cf-lede">{data.process.body}</p>
        </Reveal>

        <div className="cf-process-track" aria-hidden="true">
          <span className="cf-process-line" />
        </div>

        <div className="cf-process-grid">
          {data.process.steps.map((step, i) => (
            <Reveal key={step.name} className="cf-process-step">
              <span className="cf-process-node">{step.stop}</span>
              <h3 className="cf-process-title">{step.name}</h3>
              <p className="cf-card-desc">{step.desc}</p>
              {i < data.process.steps.length - 1 ? (
                <span className="cf-process-arrow" aria-hidden="true" />
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
