import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AzButton({
  href,
  variant = "accent",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: "accent" | "line" | "ghost";
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = cn(
    "az-btn",
    variant === "accent" && "az-btn--accent",
    variant === "line" && "az-btn--line",
    variant === "ghost" && "az-btn--ghost",
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