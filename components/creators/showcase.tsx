import { ArrowUpRight, Check } from "lucide-react";
import { creatorUi } from "@/lib/creator";

function ScreenMock({ label }: { label: string }) {
  if (label === "Creator profile") {
    return (
      <div className="ct-screen-body ct-screen-pop">
        <div className="ct-pop-row">
          <span className="ct-pop-av">Å</span>
          <span className="ct-pop-lines">
            <span className="ct-pop-line ct-pop-line--name" />
            <span className="ct-pop-line" />
          </span>
        </div>
        <div className="ct-pop-chips">
          <span className="ct-pop-chip">☕ Coffee</span>
          <span className="ct-pop-chip">🍬 Toffee</span>
          <span className="ct-pop-chip">✦ Patron</span>
        </div>
        <div className="ct-pop-note">
          <span className="ct-pop-note-dot" />
          <span className="ct-pop-note-line">a note for Aarohi…</span>
        </div>
        <span className="ct-pop-cta">Send with love</span>
      </div>
    );
  }
  if (label === "Updates feed") {
    return (
      <div className="ct-screen-body ct-screen-feed">
        {["New painting, evening chai", "What should the next print be?", "214 coffees this month"].map(
          (t, i) => (
            <div key={t} className="ct-feed-row">
              <span className="ct-feed-dot" />
              <span className="ct-feed-lines">
                <span className="ct-feed-line" style={{ width: `${100 - i * 18}%` }} />
              </span>
            </div>
          ),
        )}
        <div className="ct-feed-bars">
          <span style={{ height: "42%" }} />
          <span style={{ height: "68%" }} />
          <span style={{ height: "52%" }} />
          <span style={{ height: "84%" }} />
          <span style={{ height: "60%" }} />
        </div>
      </div>
    );
  }
  return (
    <div className="ct-screen-body ct-screen-wall">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="ct-wall-tile" style={{ height: `${34 + ((i * 23) % 40)}px` }} />
      ))}
    </div>
  );
}

export function CtShowcase() {
  const s = creatorUi.screens;
  return (
    <section className="ct-section" id="showcase">
      <div className="ct-wrap">
        <header className="ct-head">
          <p className="ct-eyebrow">
            <span className="ct-eyebrow-dot" aria-hidden="true" /> {s.eyebrow}
          </p>
          <h2 className="ct-h2">{s.title}</h2>
          <p className="ct-lede">{s.body}</p>
        </header>

        <div className="ct-screens">
          {s.items.map((item) => (
            <article key={item.label} className="ct-screen-card">
              <span className="ct-screen-mark" aria-hidden="true">
                {item.mark}
              </span>
              <div className="ct-screen-frame">
                <div className="ct-screen-bar">
                  <span className="ct-screen-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="ct-screen-url">aarohi.toffee.dev</span>
                  <ArrowUpRight className="ct-screen-arrow" size={15} strokeWidth={2.2} aria-hidden="true" />
                </div>
                <ScreenMock label={item.label} />
              </div>
              <p className="ct-screen-kicker">{item.label}</p>
              <h3 className="ct-screen-title">{item.title}</h3>
              <ul className="ct-screen-points">
                {item.points.map((p) => (
                  <li key={p}>
                    <Check size={13} strokeWidth={2.6} aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}