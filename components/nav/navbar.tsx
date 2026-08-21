"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/blog" },
  { label: "Company", href: "/about" },
];

export function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-black tracking-tight">
          TIME<span className="text-brand">WHEEL</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:text-foreground">
              Products
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  productsOpen && "rotate-180",
                )}
              />
            </button>
            {productsOpen && (
              <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-3">
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={p.href}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                    >
                      <span
                        className="grid size-9 shrink-0 place-items-center rounded-lg"
                        style={{ backgroundColor: `${p.accent}22`, color: p.accent }}
                      >
                        <p.icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{p.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {p.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={site.demoUrl}
            className="btn btn-primary hidden rounded-lg px-4 py-2 text-sm font-semibold text-brand-foreground md:inline-block"
          >
            Book A Demo
          </Link>
          <button
            className="grid size-10 place-items-center rounded-lg hover:bg-secondary md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background px-6 py-4 md:hidden">
          <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Products
          </p>
          <div className="grid grid-cols-2 gap-1 pb-3">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="flex items-center gap-2 rounded-lg p-2 hover:bg-secondary"
                onClick={() => setMobileOpen(false)}
              >
                <p.icon className="size-4" style={{ color: p.accent }} />
                <span className="truncate text-sm">{p.name}</span>
              </Link>
            ))}
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-lg px-1 py-2 text-sm font-medium hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={site.demoUrl}
            className="btn btn-primary mt-3 block rounded-lg px-4 py-2 text-center text-sm font-semibold text-brand-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Book A Demo
          </Link>
        </div>
      )}
    </header>
  );
}
