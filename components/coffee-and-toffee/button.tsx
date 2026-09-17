import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "gold" | "line";

export function CfButton({
  href,
  variant = "gold",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http");
  const cls = `cf-btn cf-btn--${variant} ${className}`.trim();
  if (isExternal) {
    return (
      <a href={href} className={cls} rel="noreferrer" target="_blank">
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
