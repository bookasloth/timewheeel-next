"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Code,
  FileText,
  MagnifyingGlass,
  PenNib,
  ShareNetwork,
  Storefront,
  PresentationChart,
  BookOpenText,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { featuredProducts } from "@/lib/products";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Products come from the shared featured list so the navbar and homepage
// ecosystem never drift. Order + names live in lib/products.ts.
const navProducts = featuredProducts;

type NavService = { name: string; icon: Icon; accent: string; href: string; desc: string };

const serviceGroups: { title: string; icon: Icon; items: NavService[] }[] = [
  {
    title: "Tech",
    icon: Code,
    items: [
      { name: "Website Design", icon: PenNib, accent: "#ff4d93", href: "/website-design-company-in-nagpur", desc: "Interfaces built to convert, not just impress." },
      { name: "Website Development", icon: Code, accent: "#269cef", href: "/web-development-company-in-nagpur", desc: "Fast, clean builds that ship on time." },
      { name: "Shopify Development", icon: Storefront, accent: "#5e8e3e", href: "/shopify-development-company-in-nagpur", desc: "Storefronts tuned to sell." },
    ],
  },
  {
    title: "Marketing",
    icon: MagnifyingGlass,
    items: [
      { name: "Social Media Marketing", icon: ShareNetwork, accent: "#269cef", href: "/social-media-marketing-company-in-nagpur", desc: "Content that stops the scroll." },
      { name: "Search Engine Optimization", icon: MagnifyingGlass, accent: "#4ab765", href: "/seo-company-in-nagpur", desc: "Rank higher. Get found. Get leads." },
      { name: "Performance Marketing", icon: FileText, accent: "#ffcc1c", href: "/performance-marketing-company-in-nagpur", desc: "Ad spend that pays back." },
    ],
  },
];

const resourceItems = [
  { name: "Case Studies", href: "/case-studies", icon: PresentationChart, accent: "#fe5100" },
  { name: "Blog", href: "/blog", icon: BookOpenText, accent: "#269cef" },
];

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<"services" | null>(null);
  // Delay the close so the cursor can cross the gap between the trigger and the
  // viewport-centered mega panel without the menu snapping shut.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu("services");
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<
    "products" | "services" | "resources" | null
  >("services");

  // Overlay mode: transparent, light-text header over the homepage dark hero;
  // solidifies to the cream bar after a little scroll, and on every other page.
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const light = pathname === "/" && !scrolled && !mobileOpen;
  const linkBase = "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors";
  const linkTone = light ? "text-white/85 hover:text-white" : "text-foreground/90 hover:text-foreground";

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
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        light
          ? "bg-transparent"
          : "border-b border-border/60 bg-background",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className={cn("text-xl font-black tracking-tight", light ? "text-white" : "text-foreground")}
        >
          TIME<span className="text-brand">WHEEL</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Services */}
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button className={cn(linkBase, linkTone)}>
              What We Offer
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  openMenu === "services" && "rotate-180",
                )}
              />
            </button>
            {openMenu === "services" && (
              <div
                className="fixed left-1/2 top-16 w-[min(1060px,92vw)] -translate-x-1/2 pt-3"
                onMouseEnter={openServices}
                onMouseLeave={scheduleClose}
              >
                <div className="grid grid-cols-[1.55fr_0.85fr] overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
                  {/* left: headline + two service columns */}
                  <div className="p-6">
                    <h3 className="text-lg font-black tracking-tight text-foreground">
                      Quality over quantity, always
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      End-to-end tech and marketing, built in Nagpur.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1">
                      {serviceGroups.map((g) => (
                        <div key={g.title}>
                          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                            <g.icon className="size-4" weight="fill" />
                            {g.title}
                          </p>
                          {g.items.map((s) => (
                            <Link
                              key={s.name}
                              href={s.href}
                              className="group relative flex items-start gap-3 overflow-hidden rounded-xl p-2"
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                                style={{ backgroundColor: `${s.accent}1f` }}
                              />
                              <span
                                className="relative z-10 mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--a)]/15 text-[var(--a)]"
                                style={{ "--a": s.accent } as CSSProperties}
                              >
                                <s.icon className="size-5" weight="regular" />
                                <s.icon className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" weight="fill" />
                              </span>
                              <span className="relative z-10 min-w-0">
                                <span className="block text-sm font-semibold text-foreground">{s.name}</span>
                                <span className="block truncate text-xs text-muted-foreground">{s.desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* right: tinted rail — SaaS + Resources */}
                  <div className="border-l border-border bg-secondary/60 p-6">
                    <p className="text-sm font-bold text-foreground">Software as a Service</p>
                    <div className="mt-3 space-y-1">
                      {navProducts.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          className="block rounded-lg px-2 py-1.5 text-sm font-medium text-foreground/80 hover:bg-background hover:text-foreground"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                    <p className="mt-5 text-sm font-bold text-foreground">Resources</p>
                    <div className="mt-3 space-y-1">
                      {/* Case Studies lives in the top-level Portfolio link, so it is filtered out here */}
                      {resourceItems.filter((r) => r.href !== "/case-studies").map((r) => (
                        <Link
                          key={r.name}
                          href={r.href}
                          className="block rounded-lg px-2 py-1.5 text-sm font-medium text-foreground/80 hover:bg-background hover:text-foreground"
                        >
                          {r.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* footer strip */}
                  <div className="col-span-2 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border bg-background px-6 py-3">
                    {navLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {l.label}
                      </Link>
                    ))}
                    <Link
                      href={site.demoUrl}
                      className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      Book A Meeting
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/case-studies"
            className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", linkTone)}
          >
            Portfolio
          </Link>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", linkTone)}
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
            className={cn("grid size-10 place-items-center rounded-lg hover:bg-secondary md:hidden", light && "text-white")}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      </header>

      {/* mobile menu, full-screen overlay with collapsible sections */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-background px-6 pb-8 pt-2 md:hidden">
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

          {/* Resources */}
          <button
            className="flex w-full items-center justify-between border-b border-border/60 py-4 text-base font-semibold"
            onClick={() =>
              setMobileSection((s) => (s === "resources" ? null : "resources"))
            }
          >
            Resources
            <ChevronDown
              className={cn(
                "size-5 transition-transform",
                mobileSection === "resources" && "rotate-180",
              )}
            />
          </button>
          {mobileSection === "resources" && (
            <div className="py-2">{resourceItems.map(mobileRow)}
            </div>
          )}

          {navLinks.length > 0 &&
            navLinks.map((l) => (
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
