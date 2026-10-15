import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MbButton({
  href,
  variant = "accent",
  className,
  children,
}: {
  href: string;
  variant?: "accent" | "line";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn("mb-btn", `mb-btn--${variant}`, className)}>
      {children}
    </Link>
  );
}
