// Halftone of the Timewheel mark (viewBox 0 0 1000 1000, centred at 500,500):
// outer ring + 8 tapered spokes + hub. We sample a grid and keep a dot wherever
// it falls inside the mark, so the background dots trace the logo's shape.
// Geometry mirrors public/brand/svg/timewheel-mark.svg.

type Dot = { x: number; y: number; r: number };

const WHEEL_DOTS: Dot[] = (() => {
  const dots: Dot[] = [];
  const cx = 500, cy = 500, step = 23, quarter = Math.PI / 4;
  for (let y = 52; y <= 948; y += step) {
    for (let x = 52; x <= 948; x += step) {
      const dx = x - cx, dy = y - cy;
      const r = Math.hypot(dx, dy);
      let inside = false, big = false;
      if (r >= 372 && r <= 462) { inside = true; big = true; }        // outer ring
      else if (r <= 124) { inside = true; }                            // hub
      else if (r >= 140 && r <= 372) {                                 // 8 spokes
        const ang = Math.atan2(dy, dx);
        let d = Math.abs(ang - Math.round(ang / quarter) * quarter);
        if (d > Math.PI) d = 2 * Math.PI - d;
        const halfWidth = Math.max(11, 34 - (22 * Math.abs(r - 256)) / 124);
        if (r * d <= halfWidth) inside = true;
      }
      if (inside) dots.push({ x, y, r: big ? 6 : 5 });
    }
  }
  return dots;
})();

/** Decorative dot-halftone of the Timewheel wheel. Colour comes from `text-*`. */
export function WheelHalftone({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1000 1000" fill="currentColor" className={className}>
      {WHEEL_DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} />
      ))}
    </svg>
  );
}
