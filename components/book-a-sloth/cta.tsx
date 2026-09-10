import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "line" | "accent";

export function SxButton({
  href,
  variant = "dark",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = cn(
    "btn group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold whitespace-nowrap",
    (variant === "accent" || variant === "dark") &&
      "btn-primary text-brand-foreground",
    variant === "line" && "btn-outline",
    className
  );
  if (external) {
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