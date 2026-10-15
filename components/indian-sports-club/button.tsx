import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function IscButton({
  href,
  variant = "accent",
  className,
  children,
}: {
  href: string;
  variant?: "accent" | "line" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  const cls = cn("isc-btn", `isc-btn--${variant}`, className);
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
