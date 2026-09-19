import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// StackBlitz-style project card. Image is a ~40% diagonal wedge, text ~60%.
// `mirror` flips it (image left / text right) so a row of two cards mirrors.
type Props = {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  cta?: string;
  accent?: string;
  mirror?: boolean;
};

export function WebProjectCard({
  title,
  subtitle,
  href,
  image,
  cta = "See the build",
  accent = "#3987C9",
  mirror = false,
}: Props) {
  const imageClip = mirror
    ? "polygon(0 0, 44% 0, 36% 100%, 0 100%)" // left wedge
    : "polygon(56% 0, 100% 0, 100% 100%, 64% 100%)"; // right wedge

  return (
    <Link
      href={href}
      className="group relative block min-h-[210px] overflow-hidden rounded-2xl border border-ink bg-white"
    >
      {/* footer accent strip: full width, sweeps in on hover from the text side.
          The image (on top) covers its far end along the diagonal. */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-14 transition-transform duration-500 ease-out group-hover:translate-x-0 ${
          mirror ? "translate-x-full" : "-translate-x-full"
        }`}
        style={{ backgroundColor: accent }}
      />

      {/* image: ~40% diagonal wedge, zooms on hover */}
      <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ clipPath: imageClip }}>
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* copy (~60%) */}
      <div className={`relative px-6 pb-20 pt-7 ${mirror ? "text-right" : ""}`}>
        <h3 className={`text-lg font-black leading-tight tracking-tight text-ink ${mirror ? "ml-auto" : ""} max-w-[58%]`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`mt-1 text-lg font-medium leading-tight tracking-tight text-ink/80 ${mirror ? "ml-auto" : ""} max-w-[58%]`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* CTA over the strip */}
      <span
        className={`absolute inset-x-0 bottom-0 flex h-14 items-center gap-2 px-6 text-[13px] font-bold ${
          mirror ? "justify-end" : ""
        }`}
        style={{ color: accent }}
      >
        <span className="transition-colors duration-300 group-hover:text-white">{cta}</span>
        <ArrowRight className="size-4 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
      </span>
    </Link>
  );
}
