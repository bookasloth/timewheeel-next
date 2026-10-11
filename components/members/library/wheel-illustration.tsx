// Decorative Timewheel illustration for upgrade panels: the wheel emblem on a
// stack of resource cards, in brand colours. Pure SVG, no external art.
export function WheelIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden>
      <circle cx="118" cy="78" r="64" fill="#F45B0A" opacity=".08" />
      <circle cx="118" cy="78" r="44" fill="#F45B0A" opacity=".08" />
      {/* resource cards */}
      <g transform="rotate(-8 70 92)">
        <rect x="34" y="58" width="72" height="88" rx="8" fill="#FFFDF7" stroke="#D8D0C0" />
        <rect x="44" y="72" width="40" height="6" rx="3" fill="#3987C9" opacity=".55" />
        <rect x="44" y="84" width="52" height="4" rx="2" fill="#D8D0C0" />
        <rect x="44" y="93" width="46" height="4" rx="2" fill="#D8D0C0" />
        <rect x="44" y="102" width="50" height="4" rx="2" fill="#D8D0C0" />
      </g>
      <g transform="rotate(7 168 92)">
        <rect x="132" y="56" width="72" height="88" rx="8" fill="#FFFDF7" stroke="#D8D0C0" />
        <rect x="142" y="70" width="34" height="6" rx="3" fill="#29A66F" opacity=".6" />
        <rect x="142" y="82" width="52" height="4" rx="2" fill="#D8D0C0" />
        <rect x="142" y="91" width="44" height="4" rx="2" fill="#D8D0C0" />
        <rect x="142" y="100" width="50" height="4" rx="2" fill="#D8D0C0" />
      </g>
      <rect x="80" y="44" width="76" height="98" rx="9" fill="#171717" />
      <rect x="90" y="122" width="56" height="6" rx="3" fill="#F45B0A" />
      {/* wheel */}
      <g transform="translate(118 82)">
        <circle r="26" fill="none" stroke="#F45B0A" strokeWidth="5" />
        <circle r="7" fill="#3987C9" />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2="-24" stroke="#F45B0A" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="7" fill="#3987C9" />
        <circle r="2.5" fill="#FFFDF7" />
      </g>
      {/* crown */}
      <path d="M104 24 l7 10 7-14 7 14 7-10 -3 18 h-22 z" fill="#FFCC1C" stroke="#171717" strokeWidth="1.5" strokeLinejoin="round" />
      {/* sparkles */}
      <path d="M196 30 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" fill="#F45B0A" />
      <path d="M28 34 l2 4.5 4.5 2 -4.5 2 -2 4.5 -2 -4.5 -4.5 -2 4.5 -2z" fill="#3987C9" />
      <circle cx="186" cy="132" r="4" fill="#FFCC1C" />
      <circle cx="20" cy="120" r="3" fill="#29A66F" />
    </svg>
  );
}
