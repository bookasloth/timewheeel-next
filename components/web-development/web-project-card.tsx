import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// StackBlitz-style "before / after" card. At rest, the accent CTA bar is a thin
// diagonal wedge tucked in the bottom-right behind the image corner. On hover,
// the wedge sweeps left to fill the whole footer and the CTA text flips to
// white — a before→after reveal on one card.
type Props = {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  cta?: string;
  /** Accent colour of the sweeping wedge. */
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
      className="group relative block overflow-hidden rounded-2xl border border-ink bg-white"
    >
      {/* image, revealed through a diagonal corner (bottom-right), grows on hover */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[46%] transition-[width] duration-500 ease-out group-hover:w-[54%]"
        style={{ clipPath: "polygon(38% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, 60vw"
          className="object-cover"
        />
      </div>

      {/* copy */}
      <div className="relative px-8 pb-24 pt-10">
        <h3 className="max-w-[62%] text-2xl font-black leading-tight tracking-tight text-ink">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 max-w-[62%] text-2xl font-medium leading-tight tracking-tight text-ink/80">
            {subtitle}
          </p>
        )}
      </div>

      {/* footer: accent wedge sweeps in on hover, behind the CTA text */}
      <div className="absolute inset-x-0 bottom-0 h-16">
        <span
          aria-hidden
          className="absolute inset-0 translate-x-[62%] transition-transform duration-500 ease-out group-hover:translate-x-0"
          style={{ backgroundColor: accent, clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
        <span
          className="relative flex h-full items-center gap-2 px-8 text-sm font-bold transition-colors duration-300"
          style={{ color: accent }}
        >
          <span className="transition-colors duration-300 group-hover:text-white">{cta}</span>
          <ArrowRight className="size-4 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
        </span>
      </div>
    </Link>
  );
}
