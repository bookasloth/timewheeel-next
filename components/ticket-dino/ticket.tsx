import { td } from "@/lib/ticket-dino";

// Ticket-shaped hero visual with a perforated stub and QR. Decorative only:
// reads the sample e-ticket from `td.hero.mock`.
export function TdTicket() {
  const t = td.hero.mock;

  return (
    <div className="td-ticket">
      <div className="td-ticket-main">
        <span className="td-ticket-tag">{t.tag}</span>
        <p className="td-ticket-event">{t.event}</p>
        <dl className="td-ticket-rows">
          {t.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="td-ticket-stub">
        <span className="td-ticket-qr" aria-hidden="true">
          <svg viewBox="0 0 100 100" role="presentation">
            <g fill="var(--td-ink)">
              <rect x="4" y="4" width="28" height="28" />
              <rect x="68" y="4" width="28" height="28" />
              <rect x="4" y="68" width="28" height="28" />
              <rect x="42" y="8" width="7" height="7" />
              <rect x="54" y="8" width="7" height="7" />
              <rect x="42" y="22" width="7" height="7" />
              <rect x="56" y="20" width="6" height="6" />
              <rect x="8" y="42" width="7" height="7" />
              <rect x="22" y="42" width="7" height="7" />
              <rect x="38" y="42" width="7" height="7" />
              <rect x="52" y="40" width="7" height="7" />
              <rect x="66" y="42" width="7" height="7" />
              <rect x="80" y="42" width="7" height="7" />
              <rect x="44" y="54" width="7" height="7" />
              <rect x="60" y="56" width="7" height="7" />
              <rect x="76" y="54" width="7" height="7" />
              <rect x="42" y="68" width="7" height="7" />
              <rect x="58" y="70" width="7" height="7" />
              <rect x="72" y="68" width="7" height="7" />
              <rect x="86" y="68" width="7" height="7" />
              <rect x="44" y="82" width="7" height="7" />
              <rect x="62" y="84" width="7" height="7" />
              <rect x="78" y="82" width="7" height="7" />
            </g>
            <g fill="var(--td-surface)">
              <rect x="10" y="10" width="16" height="16" />
              <rect x="74" y="10" width="16" height="16" />
              <rect x="10" y="74" width="16" height="16" />
            </g>
            <g fill="var(--td-ink)">
              <rect x="15" y="15" width="6" height="6" />
              <rect x="79" y="15" width="6" height="6" />
              <rect x="15" y="79" width="6" height="6" />
            </g>
          </svg>
        </span>
        <span className="td-ticket-code">{t.code}</span>
      </div>
    </div>
  );
}
