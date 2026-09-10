"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  AppWindow,
  Code,
  FileText,
  MagnifyingGlass,
  PenNib,
  Robot,
  ShareNetwork,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { featuredProducts } from "@/lib/products";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Products come from the shared featured list so the navbar and homepage
// ecosystem never drift. Order + names live in lib/products.ts.
const navProducts = featuredProducts;

type NavService = { name: string; icon: Icon; accent: string; href: string };

const serviceGroups: { title: string; items: NavService[] }[] = [
  {
    title: "Tech",
    items: [
      { name: "Website Design", icon: PenNib, accent: "#ff4d93", href: "#" },
      { name: "Website Development", icon: Code, accent: "#269cef", href: "#" },
      { name: "Web App Development", icon: AppWindow, accent: "#4ab765", href: "#" },
      { name: "Shopify Development", icon: Storefront, accent: "#fe5100", href: "#" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { name: "Social Media Marketing", icon: ShareNetwork, accent: "#269cef", href: "#" },
      { name: "Search Engine Optimization", icon: MagnifyingGlass, accent: "#4ab765", href: "#" },
      { name: "AI + Marketing Automation", icon: Robot, accent: "#ff4d93", href: "#" },
      { name: "Performance Marketing", icon: FileText, accent: "#ffcc1c", href: "/digital-marketing2" },
    ],
  },
];

const navLinks = [
  { label: "Resources", href: "/blog" },
  { label: "Company", href: "/about" },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<"products" | "services" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"products" | "services" | null>(
    "products",
  );

  const mobileRow = (item: { name: string; icon: Icon; accent: string; href: string }) => (
    <Link
      key={item.name}
      href={item.href}
      onClick={() => setMobileOpen(false)}
      className="group flex items-center gap-3 rounded-xl p-2 active:bg-secondary"
    >
      <span
        className="relative grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--a)]/15 text-[var(--a)]"
        style={{ "--a": item.accent } as CSSProperties}
      >
        <item.icon className="size-5" weight="regular" />
        <item.icon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-active:opacity-100" weight="fill" />
      </span>
      <span className="truncate text-sm font-semibold">{item.name}</span>
    </Link>
  );

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-black tracking-tight">
          TIME<span className="text-brand">WHEEL</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Products */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("products")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:text-foreground">
              What We Built
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  openMenu === "products" && "rotate-180",
                )}
              />
            </button>
            {openMenu === "products" && (
              <div className="absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-border bg-popover p-3">
                  <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Products
                  </p>
                  {navProducts.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="group relative flex items-center gap-3 overflow-hidden rounded-xl p-2"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                        style={{ backgroundColor: `${p.accent}1f` }}
                      />
                      <span
                        className="relative z-10 grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--a)]/15 text-[var(--a)]"
                        style={{ "--a": p.accent } as CSSProperties}
                      >
                        <p.icon className="size-5" weight="regular" />
                        <p.icon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" weight="fill" />
                      </span>
                      <span className="relative z-10 block text-sm font-semibold">{p.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:text-foreground">
              What We Offer
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  openMenu === "services" && "rotate-180",
                )}
              />
            </button>
            {openMenu === "services" && (
              <div className="absolute left-1/2 top-full w-[600px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-popover p-3">
                  {serviceGroups.map((g) => (
                    <div key={g.title}>
                      <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {g.title}
                      </p>
                      {g.items.map((s) => (
                        <Link
                          key={s.name}
                          href={s.href}
                          className="group relative flex items-center gap-3 overflow-hidden rounded-xl p-2 text-sm font-semibold"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                            style={{ backgroundColor: `${s.accent}1f` }}
                          />
                          <span
                            className="relative z-10 grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--a)]/15 text-[var(--a)]"
                            style={{ "--a": s.accent } as CSSProperties}
                          >
                            <s.icon className="size-5" weight="regular" />
                            <s.icon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" weight="fill" />
                          </span>
                          <span className="relative z-10">{s.name}</span>
                        </Link>
                      ))}
                    </div>
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
            Book A Meeting
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

      </header>

      {/* mobile menu — full-screen overlay with collapsible sections */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-background px-6 pb-8 pt-2 md:hidden">
          {/* Products */}
          <button
            className="flex w-full items-center justify-between border-b border-border/60 py-4 text-base font-semibold"
            onClick={() =>
              setMobileSection((s) => (s === "products" ? null : "products"))
            }
          >
            What We Built
            <ChevronDown
              className={cn(
                "size-5 transition-transform",
                mobileSection === "products" && "rotate-180",
              )}
            />
          </button>
          {mobileSection === "products" && (
            <div className="py-2">{navProducts.map(mobileRow)}</div>
          )}

          {/* Services */}
          <button
            className="flex w-full items-center justify-between border-b border-border/60 py-4 text-base font-semibold"
            onClick={() =>
              setMobileSection((s) => (s === "services" ? null : "services"))
            }
          >
            What We Offer
            <ChevronDown
              className={cn(
                "size-5 transition-transform",
                mobileSection === "services" && "rotate-180",
              )}
            />
          </button>
          {mobileSection === "services" && (
            <div className="py-2">
              {serviceGroups.map((g) => (
                <div key={g.title} className="pb-2">
                  <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {g.title}
                  </p>
                  {g.items.map(mobileRow)}
                </div>
              ))}
            </div>
          )}

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block border-b border-border/60 py-4 text-base font-semibold active:text-brand"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href={site.demoUrl}
            className="btn btn-primary mt-6 block rounded-lg px-4 py-3 text-center text-sm font-semibold text-brand-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Book A Meeting
          </Link>
        </div>
      )}
    </>
  );
}
