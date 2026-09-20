"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "@phosphor-icons/react/dist/ssr";
import { smm } from "@/lib/social-media-marketing";

// Floating book-a-call bar — slides up once past the hero, dismissible.
export function SmmStickyCta() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-border bg-card/95 p-2 pl-5 shadow-[0_20px_50px_-20px_rgba(26,29,36,0.5)] backdrop-blur">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold">
          Ready to grow your social presence?
        </p>
        <Link
          href={smm.hero.primaryCta.href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground"
        >
          {smm.hero.primaryCta.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          onClick={() => setClosed(true)}
          aria-label="Dismiss"
          className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
