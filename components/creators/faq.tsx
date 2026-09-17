import { creatorUi } from "@/lib/creator";

export function CtFaq() {
  const f = creatorUi.faq;
  return (
    <section className="ct-section">
      <div className="ct-wrap ct-wrap--narrow">
        <header className="ct-head">
          <p className="ct-eyebrow">
            <span className="ct-eyebrow-dot" aria-hidden="true" /> {f.eyebrow}
          </p>
          <h2 className="ct-h2 ct-h2--center">{f.title}</h2>
        </header>

        <div className="ct-faq">
          {f.items.map((item) => (
            <details key={item.q} className="ct-faq-item">
              <summary className="ct-faq-q">
                <span>{item.q}</span>
                <span className="ct-faq-plus" aria-hidden="true" />
              </summary>
              <p className="ct-faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}