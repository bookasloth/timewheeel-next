import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { getClientLogos } from "@/lib/seo-client-logos";

// Client logo wall. The list comes from /public/seo-client at build time — see
// lib/seo-client-logos.ts. Add a file there and it appears here; no other edit.

const COLS = 4; // desktop columns; mobile is always 2
const MOBILE_COLS = 2;

// The logo exports are mixed media: some are dark marks on an opaque white
// canvas, others are light marks on transparency. The navy wall cannot show
// either consistently, so each mark is placed on its own white plate.

function Plus({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`absolute -translate-x-1/2 -translate-y-1/2 text-lg leading-none text-white/25 ${className}`}
      style={style}
    >
      +
    </span>
  );
}

// Fractional positions of the interior grid lines, used for the plus marks.
function interiorLines(lines: number): number[] {
  return Array.from({ length: Math.max(0, lines - 1) }, (_, i) => ((i + 1) / lines) * 100);
}

const pct = (n: number) => `${n}%`;

// Every crossing of an interior vertical line and an interior horizontal line.
function crossings(cols: number, rows: number, mobile: boolean) {
  const ys = interiorLines(rows);
  const out: { key: string; left: number; top: number }[] = [];

  if (mobile) {
    // 2 columns -> a single interior vertical line at 50%.
    for (const top of ys) out.push({ key: `m${top}`, left: 50, top });
    return out;
  }
  for (const left of interiorLines(cols)) {
    for (const top of ys) out.push({ key: `d${left}-${top}`, left, top });
  }
  return out;
}

// Oversized marks that need to render smaller than the standard h-14.
const SMALL_LOGOS = new Set(["banarasee.png"]);
// Undersized marks that need to render a little bigger than h-14.
const BIG_LOGOS = new Set(["upsilon.png"]);

export function SmmCollaborators() {
  const logos = getClientLogos();
  if (!logos.length) return null;

  const rows = Math.ceil(logos.length / COLS);
  // Trailing blanks keep the gap-px ground from showing through a short last row.
  const blanks = rows * COLS - logos.length;
  // Mobile runs 2-up, so it wraps at a different row than the desktop grid.
  const mobileRows = Math.ceil((rows * COLS) / MOBILE_COLS);

  return (
    <section className="bg-navy py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <RevealHeading as="h2" className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-r from-white/50 via-white to-white/50 bg-clip-text text-transparent transition-all duration-300 hover:[filter:drop-shadow(0_0_12px_rgba(255,255,255,0.8))_drop-shadow(0_0_32px_rgba(255,255,255,0.4))]">
              Companies we collaborate with.
            </span>
          </RevealHeading>
        </Reveal>

        <Reveal delay={0.1}>
          {/* gap-px over a light ground draws the grid lines — no nth-child math */}
          <ul className="relative mt-12 grid grid-cols-2 gap-px rounded-lg border border-white/10 bg-white/10 sm:grid-cols-4">
            {/* plus marks at interior line crossings */}
            <span aria-hidden className="pointer-events-none absolute inset-0">
              {crossings(MOBILE_COLS, mobileRows, true).map((c) => (
                <Plus key={c.key} className="sm:hidden" style={{ left: pct(c.left), top: pct(c.top) }} />
              ))}
              {crossings(COLS, rows, false).map((c) => (
                <Plus key={c.key} className="hidden sm:block" style={{ left: pct(c.left), top: pct(c.top) }} />
              ))}
            </span>

            {logos.map((logo) => {
              const small = SMALL_LOGOS.has(logo.file.toLowerCase());
              const big = BIG_LOGOS.has(logo.file.toLowerCase());
              const imgH = small ? "h-8" : big ? "h-20" : "h-14";
              const boxCls = small ? "h-8 w-24" : big ? "h-20 w-56" : "h-14 w-40";
              return (
              <li
                key={logo.file}
                className="group flex items-center justify-center gap-2.5 bg-navy py-8 transition-colors duration-300 hover:bg-white/[0.04] md:py-10"
              >
                {/* Static, in colour, no hover. Artwork that is itself near-black cannot read
                    on the ink wall in its own colours, so only those are forced
                    to a white silhouette; everything else shows brand colour. */}
                {logo.photo ? (
                  <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
                    <Image src={logo.src} alt={logo.label} fill sizes="112px" className="object-cover" />
                  </span>
                ) : logo.width && logo.height ? (
                  // Intrinsic size, so the mark lays out at its own aspect and no
                  // fixed wrapper box is left around it.
                  <Image
                    src={logo.src}
                    alt={logo.label}
                    width={logo.width}
                    height={logo.height}
                    sizes="160px"
                    className={`${imgH} w-auto shrink-0 ${logo.dark ? "brightness-0 invert" : ""}`}
                  />
                ) : (
                  <span className={`relative ${boxCls} shrink-0`}>
                    <Image
                      src={logo.src}
                      alt={logo.label}
                      fill
                      sizes="160px"
                      className={`object-contain ${logo.dark ? "brightness-0 invert" : ""}`}
                    />
                  </span>
                )}
              </li>
              );
            })}

            {Array.from({ length: blanks }, (_, i) => (
              <li key={`blank-${i}`} aria-hidden className="bg-navy" />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}