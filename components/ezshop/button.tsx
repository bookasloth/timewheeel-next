import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EzButton({
  href,
  variant = "accent",
  children,
}: {
  href: string;
  variant?: "accent" | "line";
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn("ez-btn", variant === "accent" ? "ez-btn--accent" : "ez-btn--line")}>
      {children}
    </Link>
  );
}

/** Numbered kicker + H2 + optional lede, shared by every section. */
export function EzHead({
  number,
  label,
  title,
  body,
  center,
}: {
  number: string;
  label: string;
  title: string;
  body?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("ez-head", center && "ez-head--center")}>
      <p className="ez-kicker">
        <span className="ez-kicker-num">{number}</span>
        {label}
      </p>
      <h2 className="ez-h">{title}</h2>
      {body && <p className="ez-lede">{body}</p>}
    </div>
  );
}
