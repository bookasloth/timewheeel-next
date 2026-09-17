import { creatorUi } from "@/lib/creator";

export function CtProcess() {
  const p = creatorUi.process;
  return (
    <section className="ct-section">
      <div className="ct-wrap">
        <header className="ct-head">
          <p className="ct-eyebrow">
            <span className="ct-eyebrow-dot" aria-hidden="true" /> {p.eyebrow}
          </p>
          <h2 className="ct-h2">{p.title}</h2>
          <p className="ct-lede">{p.body}</p>
        </header>

        <div className="ct-track" aria-hidden="true">
          <span className="ct-track-line" />
        </div>

        <div className="ct-steps">
          {p.steps.map((step) => (
            <div key={step.name} className="ct-step">
              <span className="ct-step-node">{step.stop}</span>
              <h3 className="ct-step-title">{step.name}</h3>
              <p className="ct-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}