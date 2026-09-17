import { creatorUi } from "@/lib/creator";

export function CtTicker() {
  const items = [...creatorUi.ticker, ...creatorUi.ticker];
  return (
    <div className="ct-ticker" aria-hidden="true">
      <div className="ct-ticker-track">
        {items.map((t, i) => (
          <span key={`${i}-${t}`} className="ct-ticker-item">
            <em className="ct-ticker-star">✦</em> {t}
          </span>
        ))}
      </div>
    </div>
  );
}