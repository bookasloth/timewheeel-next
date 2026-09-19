import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// StackBlitz-style "before / after" card.
//   Before (rest):  clean white card, accent-coloured CTA text, image tucked
//                   into a diagonal corner bottom-right.
//   After (hover):  an accent bar sweeps in to fill the footer, CTA text flips
//                   to white, and the image corner grows.
type Props = {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  cta?: string;
  /** Accent colour of the sweeping footer bar. */
  accent?: string;
};

export function WebProjectCard({
  title,
  subtitle,
  href,
  image,
  cta = "Read the release",
  accent = "#3987C9",
}: Props) {
  return (
    <Link
      href={href}
      className="group relative block min-h-[240px] overflow-hidden rounded-2xl border border-ink bg-white"
    >
      {/* footer accent strip: full width, hidden off-left at rest, sweeps in on
          hover. The image (on top) covers its right end, so the strip visually
          ends exactly along the image's diagonal. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-16 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"
        style={{ backgroundColor: accent }}
      />

      {/* image: full-bleed cover clipped to a diagonal right wedge, on top of
          the strip. Zooms on hover. Seam runs 56% (top) → 38% (bottom). */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "polygon(56% 0, 100% 0, 100% 100%, 38% 100%)" }}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 440px, 60vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* copy */}
      <div className="relative px-8 pb-24 pt-10">
        <h3 className="max-w-[60%] text-2xl font-black leading-tight tracking-tight text-ink">{title}</h3>
        {subtitle && (
          <p className="mt-1 max-w-[60%] text-2xl font-medium leading-tight tracking-tight text-ink/80">
            {subtitle}
          </p>
        )}
      </div>

      {/* CTA text over the footer, above both bar and image */}
      <span className="absolute inset-x-0 bottom-0 flex h-16 items-center gap-2 px-8 text-sm font-bold" style={{ color: accent }}>
        <span className="transition-colors duration-300 group-hover:text-white">{cta}</span>
        <ArrowRight className="size-4 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
      </span>
    </Link>
  );
}
