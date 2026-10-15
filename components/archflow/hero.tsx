import { ArrowRight } from "lucide-react";
import { arch } from "@/lib/archflow";
import { AfButton } from "./button";

const COLUMNS: [number, number][] = [
  [70, 60],
  [295, 60],
  [520, 60],
  [70, 230],
  [295, 230],
  [520, 230],
  [70, 400],
  [295, 400],
  [520, 400],
];

function delay(seconds: number) {
  return { animationDelay: `${seconds}s` };
}

function Blueprint() {
  return (
    <svg className="af-bp" viewBox="0 0 620 510" aria-hidden="true">
      <g className="af-bp-gridlines">
        {[70, 295, 520].map((x) => (
          <line key={`gx-${x}`} x1={x} y1="60" x2={x} y2="400" />
        ))}
        {[60, 230, 400].map((y) => (
          <line key={`gy-${y}`} x1="70" y1={y} x2="520" y2={y} />
        ))}
      </g>

      <g className="af-bp-walls">
        <rect className="af-draw" pathLength={1} style={delay(0.1)} x="70" y="60" width="450" height="340" />
        <line className="af-draw" pathLength={1} style={delay(0.55)} x1="295" y1="60" x2="295" y2="230" />
        <line className="af-draw" pathLength={1} style={delay(0.7)} x1="295" y1="230" x2="520" y2="230" />
        <line className="af-draw" pathLength={1} style={delay(0.85)} x1="70" y1="250" x2="295" y2="250" />
        <line className="af-draw" pathLength={1} style={delay(1)} x1="180" y1="250" x2="180" y2="400" />
        <line className="af-draw" pathLength={1} style={delay(1.15)} x1="405" y1="230" x2="405" y2="400" />
      </g>

      <g className="af-bp-doors">
        <path className="af-draw" pathLength={1} style={delay(1.35)} d="M255 180 A40 40 0 0 1 295 140" />
        <path className="af-draw" pathLength={1} style={delay(1.45)} d="M340 190 A40 40 0 0 1 380 230" />
        <path className="af-draw" pathLength={1} style={delay(1.55)} d="M160 250 A40 40 0 0 1 120 290" />
        <path className="af-draw" pathLength={1} style={delay(1.65)} d="M365 320 A40 40 0 0 1 405 280" />
      </g>

      <g className="af-bp-windows">
        <line x1="140" y1="60" x2="200" y2="60" />
        <line x1="360" y1="60" x2="420" y2="60" />
        <line x1="70" y1="300" x2="70" y2="360" />
      </g>

      <g className="af-bp-cols">
        {COLUMNS.map(([x, y], i) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5.5" style={delay(1.75 + i * 0.05)} />
        ))}
      </g>

      <g className="af-bp-dims">
        <line className="af-draw" pathLength={1} style={delay(2.15)} x1="70" y1="420" x2="520" y2="420" />
        <line x1="70" y1="411" x2="70" y2="429" />
        <line x1="520" y1="411" x2="520" y2="429" />
        <text className="af-bp-label" x="295" y="442" textAnchor="middle">45 000</text>

        <line className="af-draw" pathLength={1} style={delay(2.25)} x1="40" y1="60" x2="40" y2="400" />
        <line x1="31" y1="60" x2="49" y2="60" />
        <line x1="31" y1="400" x2="49" y2="400" />
        <text className="af-bp-label" x="24" y="230" textAnchor="middle" transform="rotate(-90 24 230)">36 000</text>

        <line className="af-draw" pathLength={1} style={delay(2.35)} x1="70" y1="30" x2="520" y2="30" />
        <line x1="70" y1="21" x2="70" y2="39" />
        <line x1="295" y1="21" x2="295" y2="39" />
        <line x1="520" y1="21" x2="520" y2="39" />
        <text className="af-bp-label" x="182" y="20" textAnchor="middle">18 000</text>
        <text className="af-bp-label" x="407" y="20" textAnchor="middle">27 000</text>
      </g>

      <g className="af-bp-compass" transform="translate(575 62)">
        <circle r="18" />
        <path className="af-north" d="M0 -13 L7 9 L0 3 L-7 9 Z" />
        <text className="af-bp-label" y="-25" textAnchor="middle">N</text>
      </g>

      <g className="af-bp-title">
        <rect x="20" y="455" width="292" height="46" rx="2" />
        <line x1="20" y1="473" x2="312" y2="473" />
        <line x1="182" y1="473" x2="182" y2="501" />
        <text className="af-bp-label" x="32" y="469">ARCHFLOW PROJECT SHEET</text>
        <text className="af-bp-label" x="32" y="492">SCALE 1:100</text>
        <text className="af-bp-label" x="194" y="492">REV C</text>
      </g>
    </svg>
  );
}

export function AfHero() {
  const h = arch.hero;
  return (
    <section className="af-hero">
      <div className="af-hero-deco" aria-hidden="true">
        <span className="af-hero-grid" />
        <span className="af-hero-veil" />
      </div>
      <div className="af-container af-hero-inner">
        <div className="af-hero-copy">
          <p className="af-eyebrow af-eyebrow--on-dark">
            <span className="af-hero-tick" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1 className="af-hero-title">
            {h.title} <span className="af-accent af-accent--on-dark">{h.titleAccent}</span>
          </h1>
          <p className="af-hero-answer">{h.answer}</p>
          <div className="af-actions">
            <AfButton href={h.primaryHref}>
              {h.primaryLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </AfButton>
            <AfButton href={h.secondaryHref} variant="line" className="af-btn--on-dark">
              {h.secondaryLabel}
            </AfButton>
          </div>
         
        </div>
        <div className="af-hero-figure" aria-hidden="true">
          <Blueprint />
          <span className="af-bp-pin af-bp-pin--a">Rev C live</span>
          <span className="af-bp-pin af-bp-pin--b">Snag #12 on site</span>
          <span className="af-bp-pin af-bp-pin--c">Material approved</span>
        </div>
      </div>
    </section>
  );
}
