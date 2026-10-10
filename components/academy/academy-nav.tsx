"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Overview", href: "/academy" },
  { label: "Programs", href: "/academy/programs" },
  { label: "Projects", href: "/academy/projects" },
  { label: "About", href: "/academy/about" },
  { label: "FAQ", href: "/academy/faq" },
];

// Section bar for every /academy page, under the site header. Plain links, so
// every Academy page is one crawlable click from any other. Scrolls sideways on
// narrow screens instead of wrapping or overflowing the page. z-30 keeps it
// under the site header (z-50) and the mobile menu overlay (z-40).
export function AcademyNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/academy" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="sticky top-16 z-30 border-b border-border/60 bg-background/95 backdrop-blur">
      <nav aria-label="Academy" className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/academy"
          className="hidden shrink-0 items-center gap-2 text-sm font-extrabold tracking-tight sm:inline-flex"
        >
          <GraduationCap aria-hidden className="size-4 text-brand" strokeWidth={2} />
          Academy
        </Link>
        <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />
        <ul className="-mx-1.5 flex sm:-mx-2 h-full min-w-0 flex-1 items-stretch gap-1 overflow-x-auto [scrollbar-width:none]">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href} className="flex shrink-0">
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center px-1.5 text-sm font-medium sm:px-2 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  {active && <span aria-hidden className="absolute inset-x-1.5 bottom-0 h-0.5 sm:inset-x-2 rounded-full bg-brand" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/academy#register"
          className="hidden shrink-0 text-sm font-semibold text-brand-text underline-offset-4 hover:underline md:inline"
        >
          Register interest
        </Link>
      </nav>
    </div>
  );
}
