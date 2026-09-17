"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type Heading = { text: string; id: string };

export function LegalSidebar() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("article h2")
    );
    const h = els.map((el) => {
      const id = el.id || slugify(el.textContent?.trim() ?? "");
      el.id = id;
      return { text: el.textContent?.trim() ?? "", id };
    });
    setHeadings(h);
    setActive("");
  }, [pathname]);

  useEffect(() => {
    if (!headings.length) return;

    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  if (headings.length < 2) return null;

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <nav className="sticky top-24 text-sm" aria-label="On this page">
        <p className="mb-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          On this page
        </p>
        <ul className="space-y-2 border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(h.id);
                }}
                className={`-ml-px block border-l-2 pl-3 leading-snug transition-colors ${
                  active === h.id
                    ? "border-brand font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}