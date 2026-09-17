import { Quote } from "lucide-react";
import { creatorUi } from "@/lib/creator";

export function CtQuotes() {
  const q = creatorUi.quotes;
  return (
    <section className="ct-section ct-section--tint">
      <div className="ct-wrap">
        <header className="ct-head">
          <p className="ct-eyebrow">
            <span className="ct-eyebrow-dot" aria-hidden="true" /> {q.eyebrow}
          </p>
          <h2 className="ct-h2">{q.title}</h2>
          <p className="ct-lede">{q.body}</p>
        </header>

        <div className="ct-quotes">
          {q.items.map((t) => (
            <figure key={t.name} className="ct-quote">
              <Quote className="ct-quote-mark" size={20} strokeWidth={1.6} aria-hidden="true" />
              <blockquote>“{t.quote}”</blockquote>
              <figcaption className="ct-quote-person">
                <span className="ct-quote-av">{t.initials}</span>
                <span>
                  <strong>{t.name}</strong>
                  <em>{t.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}