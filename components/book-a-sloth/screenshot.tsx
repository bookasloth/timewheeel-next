import Image from "next/image";
import { cn } from "@/lib/utils";

export function Screenshot({
  src,
  alt,
  width,
  height,
  url,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  url?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("sx-browser", className)}>
      {url ? (
        <div className="sx-browser-bar">
          <span className="sx-browser-dot" />
          <span className="sx-browser-dot" />
          <span className="sx-browser-dot" />
          <span className="sx-browser-url">{url}</span>
        </div>
      ) : null}
      <div className="sx-shot">
        <Image
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 700}
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 100vw, 80vw"}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export function ScreenshotCaption({
  label,
  desc,
  tag,
  className,
}: {
  label: string;
  desc?: string;
  tag?: string;
  className?: string;
}) {
  return (
    <figcaption className={cn("sx-cap", className)}>
      <span className="sx-cap-label">{label}</span>
      {tag ? <span className="sx-cap-tag">{tag}</span> : null}
      {desc ? <p className="sx-cap-desc">{desc}</p> : null}
    </figcaption>
  );
}