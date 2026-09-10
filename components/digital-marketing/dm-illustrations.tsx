import type { SVGProps } from "react";

// Custom ink-style SVG illustration kit for the digital marketing page.
// All components are decorative (aria-hidden) and inherit stroke color from
// `currentColor`, so they blend with each section's palette.

export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 12" fill="none" aria-hidden {...props}>
      <path
        d="M2 8 C22 2 38 11 58 6 C78 2 94 9 118 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Three-line asterisk / burst mark.
export function AsteriskMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3v18M5 6.5l14 11M19 6.5L5 17.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Cluster of tiny four-point twinkles.
export function Sparkles(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 42 24" fill="none" aria-hidden {...props}>
      <path
        d="M7 3.5c.3 1.6 1.1 2.4 2.6 2.7C8.1 6.5 7.3 7.3 7 8.9 6.7 7.3 5.9 6.5 4.4 6.2 5.9 5.9 6.7 5.1 7 3.5z"
        fill="currentColor"
      />
      <path
        d="M21 1.5l1.1 3 3 1.1-3 1.1L21 9.7l-1.1-3-3-1.1 3-1.1L21 1.5z"
        fill="currentColor"
      />
      <path
        d="M33 11l.8 2.3 2.3.8-2.3.8L33 17.3l-.8-2.4-2.3-.8 2.3-.8L33 11z"
        fill="currentColor"
      />
    </svg>
  );
}

// Concentric dashed orbit rings with satellite dots. Animate with .dm-orbit.
export function OrbitRings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden {...props}>
      <g stroke="currentColor" strokeWidth="1.25">
        <circle cx="100" cy="100" r="36" strokeDasharray="2 7" />
        <circle cx="100" cy="100" r="58" strokeDasharray="8 10" />
        <circle cx="100" cy="100" r="82" />
      </g>
      <g fill="currentColor">
        <circle cx="100" cy="18" r="5" />
        <circle cx="182" cy="100" r="4" />
        <circle cx="100" cy="182" r="3" />
      </g>
    </svg>
  );
}

// Signal strength bars — measurement motif for the dark metrics section.
export function SignalBars(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <rect x="3" y="13" width="3.4" height="8" rx="1.2" />
      <rect x="10.3" y="8" width="3.4" height="13" rx="1.2" />
      <rect x="17.6" y="3" width="3.4" height="18" rx="1.2" />
    </svg>
  );
}

// Radar / spider-web chart decorating the measurement section.
export function RadarIllo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden {...props}>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="80" cy="80" r="22" strokeDasharray="2 5" />
        <circle cx="80" cy="80" r="40" strokeDasharray="4 6" />
        <circle cx="80" cy="80" r="58" />
        <circle cx="80" cy="80" r="76" />
        <path d="M80 4v152M4 80h152M26.5 26.5l107 107M133.5 26.5l-107 107" />
      </g>
      <g fill="currentColor" fillOpacity="0.35">
        <path
          d="M80 30 117 55l22 45-22 45-35-20-35 20-22-45 22-45z"
          fill="currentColor"
        />
      </g>
      <path
        d="M80 30 117 55l22 45-22 45-35-20-35 20-22-45 22-45z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

// Simple gauge illustration for the measurement section.
export function GaugeIllo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 82" fill="none" aria-hidden {...props}>
      <path
        d="M10 72 A50 50 0 0 1 110 72"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M36 72 A24 24 0 0 1 84 72"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <path
        d="M60 72 L79 30"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Editorial collage cover for the case-study cards — distinct composition per
// index, tinted by accent. Purely decorative.
export function CollageCover({ index, accent }: { index: number; accent: string }) {
  const v = index % 3;
  return (
    <div className="relative h-full w-full">
      {v === 0 && (
        <>
<span
              aria-hidden
              className="absolute -right-8 -top-10 h-28 w-28 rounded-full"
              style={{ backgroundColor: `${accent}59` }}
            />
          <span
            aria-hidden
            className="absolute bottom-6 right-14 h-24 w-24 rounded-full border-2 border-dashed"
            style={{ borderColor: `${accent}99` }}
          />
          <span
            aria-hidden
            className="absolute bottom-20 left-6 h-2 w-16 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span aria-hidden className="absolute bottom-24 right-8 size-3 rounded-full bg-foreground/25" />
        </>
      )}
      {v === 1 && (
        <>
          <svg
            aria-hidden
            viewBox="0 0 120 60"
            className="absolute -bottom-2 -right-2 h-28 w-28"
            fill="none"
          >
            <path
              d="M120 60 L4 60 C4 20 40 6 96 6 L96 60"
              fill={`${accent}26`}
              stroke={accent}
              strokeWidth="2"
            />
          </svg>
          <span
            aria-hidden
            className="absolute left-10 top-8 h-20 w-32 opacity-50"
            style={{
              backgroundImage: `radial-gradient(${accent} 1.2px, transparent 1.2px)`,
              backgroundSize: "12px 12px",
            }}
          />
          <span aria-hidden className="absolute right-8 top-8 h-1.5 w-14 rounded-full bg-foreground/20" />
        </>
      )}
      {v === 2 && (
        <>
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: `${accent}80` }}
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
            style={{ borderColor: `${accent}66` }}
          />
          <span
            aria-hidden
            className="absolute left-6 top-6 size-24 rotate-12 rounded-lg border"
            style={{ borderColor: `${accent}59` }}
          />
          <span aria-hidden className="absolute bottom-5 right-6 h-2 w-12 rounded-full bg-foreground/25" />
        </>
      )}
      <span
        aria-hidden
        className="absolute bottom-4 right-5 select-none text-6xl font-black leading-none text-foreground/15"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}