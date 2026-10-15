// Cute T-Rex mascot for the Ticket Dino hero, in the spirit of the Chrome
// offline dino but rounded and friendly. Flat, brand-green, self-contained SVG
// so it scales crisply and inherits the `.td` palette via CSS variables.
export function TdDino() {
  return (
    <svg viewBox="0 0 250 205" className="td-dino-svg" role="img" aria-label="A cute dinosaur mascot">
      <ellipse cx="140" cy="198" rx="88" ry="9" fill="var(--td-green-ink)" opacity="0.12" />

      <path
        d="M194 100 C 222 86 230 102 242 90 C 238 120 210 134 184 126 Z"
        fill="var(--td-green)"
      />

      <rect x="128" y="146" width="34" height="48" rx="17" fill="var(--td-green)" />
      <rect x="86" y="148" width="32" height="46" rx="16" fill="var(--td-green)" />
      <ellipse cx="145" cy="194" rx="22" ry="9" fill="var(--td-green)" />
      <ellipse cx="102" cy="194" rx="20" ry="9" fill="var(--td-green)" />

      <ellipse cx="142" cy="112" rx="58" ry="48" fill="var(--td-green)" />
      <ellipse cx="122" cy="128" rx="32" ry="24" fill="#d9f7ea" opacity="0.85" />

      <path
        d="M122 116 q -18 2 -17 19"
        fill="none"
        stroke="var(--td-green)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M138 121 q -15 4 -13 18"
        fill="none"
        stroke="var(--td-green)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      <ellipse cx="70" cy="62" rx="48" ry="40" fill="var(--td-green)" />
      <ellipse cx="40" cy="72" rx="20" ry="16" fill="var(--td-green)" />

      <path d="M58 26 l10 -18 l10 18 z" fill="#00a06b" />
      <path d="M114 68 l10 -20 l10 20 z" fill="#00a06b" />
      <path d="M144 64 l10 -20 l10 20 z" fill="#00a06b" />
      <path d="M172 70 l10 -18 l10 18 z" fill="#00a06b" />

      <circle cx="74" cy="52" r="13" fill="#ffffff" />
      <g className="td-dino-pupil">
        <circle cx="72" cy="52" r="6.8" fill="#0b1f16" />
        <circle cx="68.5" cy="47" r="2.6" fill="#ffffff" />
      </g>

      <ellipse cx="34" cy="66" rx="3" ry="2.4" fill="var(--td-green-ink)" />
      <ellipse cx="96" cy="78" rx="9" ry="6" fill="#ff9fbb" opacity="0.75" />

      <path
        d="M34 80 Q 60 96 88 82"
        fill="none"
        stroke="var(--td-green-ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M54 84 l7 0 l-3.5 8 z" fill="#ffffff" />
    </svg>
  );
}
