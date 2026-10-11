import { cn } from "@/lib/utils";

// Profile picture (Google accounts) or initials. Plain <img>: Google avatar
// hosts vary, and these are tiny.
export function Avatar({ name, src, size = 36, className }: { name?: string | null; src?: string | null; size?: number; className?: string }) {
  const initials =
    (name ?? "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "?";
  const style = { width: size, height: size };
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" width={size} height={size} referrerPolicy="no-referrer" style={style} className={cn("shrink-0 rounded-full border border-border object-cover", className)} />
    );
  }
  return (
    <span
      aria-hidden
      style={{ ...style, fontSize: Math.max(11, size * 0.38) }}
      className={cn("grid shrink-0 place-items-center rounded-full bg-brand/12 font-heading font-bold text-brand-text", className)}
    >
      {initials}
    </span>
  );
}
