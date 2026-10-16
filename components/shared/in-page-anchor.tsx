"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

// In-page anchor button. Next's Link breaks `#section` navigation (it
// preventDefaults the click, then its hash-only "navigation" never re-scrolls
// — and never scrolls at all when the hash is already set). This renders a
// plain <a> and scrolls the target itself on every click, first or repeat.
type Props = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "children">;

export function InPageAnchor({ href, children, ...rest }: Props) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#") || href === "#") return;
    e.preventDefault();
    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (window.location.hash !== href) {
      window.history.replaceState(null, "", href);
    }
  };
  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
