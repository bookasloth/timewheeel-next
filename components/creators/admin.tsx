import { Download, Globe, Percent, Wallet, Zap } from "lucide-react";
import { creatorUi } from "@/lib/creator";

const bulletsIcons = [Download, Zap, Percent, Globe];

function AdminMock() {
  const a = creatorUi.admin;
  return (
    <div className="ct-admin-card">
      <div className="ct-admin-card-head">
        <span className="ct-admin-avatar">A</span>
        <span>
          <strong>aarohi.toffee.dev</strong>
          <em>creator admin</em>
        </span>
        <span className="ct-admin-live">
          <i aria-hidden="true" /> live
        </span>
      </div>

      <div className="ct-admin-metrics">
        {a.metrics.map((m) => (
          <div key={m.label} className="ct-admin-metric">
            <span className="ct-admin-metric-label">{m.label}</span>
            <span className="ct-admin-metric-value">{m.value}</span>
            {"delta" in m ? <em>{m.delta}</em> : null}
          </div>
        ))}
      </div>

      <div className="ct-admin-chart">
        <svg viewBox="0 0 320 90" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="ctChartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0572e" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#e0572e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="0,74 40,66 80,70 120,48 160,56 200,34 240,42 280,20 320,28 320,90 0,90" fill="url(#ctChartFill)" />
          <polyline
            points="0,74 40,66 80,70 120,48 160,56 200,34 240,42 280,20 320,28"
            fill="none"
            stroke="#e0572e"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <ul className="ct-admin-recent">
        {a.recent.map((r) => (
          <li key={r.text}>
            <span aria-hidden="true">{r.mark}</span> {r.text}
          </li>
        ))}
      </ul>

      <div className="ct-admin-payout">
        <Wallet size={15} strokeWidth={2} aria-hidden="true" />
        <span>Ready to withdraw: <strong>₹12,480</strong></span>
        <button type="button" className="ct-admin-withdraw">
          Withdraw
        </button>
      </div>
    </div>
  );
}

export function CtAdmin() {
  const a = creatorUi.admin;
  return (
    <section className="ct-admin">
      <div className="ct-admin-glow" aria-hidden="true" />
      <div className="ct-wrap ct-split ct-split--admin">
        <div className="ct-split-copy">
          <header className="ct-head ct-head--dark">
            <p className="ct-eyebrow">
              <span className="ct-eyebrow-dot" aria-hidden="true" /> {a.eyebrow}
            </p>
            <h2 className="ct-h2">{a.title}</h2>
            <p className="ct-lede">{a.body}</p>
          </header>
          <ul className="ct-bullets">
            {a.bullets.map((b, i) => {
              const Icon = bulletsIcons[i % bulletsIcons.length];
              return (
                <li key={b}>
                  <span className="ct-bullet-ic">
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              );
            })}
          </ul>
        </div>
        <AdminMock />
      </div>

      <div className="ct-wrap">
        <div className="ct-values">
          <span className="ct-values-mark" aria-hidden="true">✦</span>
          <p className="ct-values-quote">“{creatorUi.values.quote}”</p>
          <p className="ct-values-byline">{creatorUi.values.byline}</p>
        </div>
      </div>
    </section>
  );
}