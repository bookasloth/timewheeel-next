"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowSquareOut, CaretDown, CaretRight, List, MagnifyingGlass, SignOut, UserCircle, X } from "@phosphor-icons/react";
import { ICONS } from "@/components/admin/icon-map";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { consoleLogout } from "@/lib/admin/console-login-actions";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/admin/feedback";
import { NAV as ALL_NAV, activeItem, activeSection, sectionBadgeCount, type Badges, type NavSection } from "@/components/admin/nav-config";

// Two-level console shell modelled on The Parliament admin: full-width top
// bar, then the icon-only primary rail + the secondary sidebar for the active
// section + the page. Timewheel orange replaces Parliament's blue for primary
// actions and active accents; section icons keep their own colours.

export type AdminIdentity = { name: string; email: string; avatarUrl: string | null };
/** Admins see every section; writers only the blog. */
export type ConsoleScope = "admin" | "writer";

const NavContext = createContext<NavSection[]>(ALL_NAV);
const useNav = () => useContext(NavContext);

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "A";

function PrimaryRail({ badges }: { badges: Badges }) {
  const NAV = useNav();
  const pathname = usePathname();
  const active = activeSection(NAV, pathname);
  return (
    <nav aria-label="Console sections" className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-gray-200 bg-gray-50 py-3 lg:flex">
      {NAV.map((section) => {
        const Icon = ICONS[section.icon];
        const isActive = section.key === active.key;
        const count = sectionBadgeCount(section, badges);
        return (
          <Link
            key={section.key}
            href={section.items[0]?.href ?? "/admin"}
            aria-label={section.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex size-10 items-center justify-center rounded-[4px] transition-colors hover:bg-gray-100"
          >
            {isActive && <span className="absolute bottom-1.5 left-0 top-1.5 w-0.5 rounded-r" style={{ backgroundColor: section.color }} />}
            <span className={`flex size-10 items-center justify-center rounded-[4px] ${isActive ? "bg-gray-100" : ""}`}>
              {Icon && <Icon size={22} weight={isActive ? "fill" : "regular"} color={section.color} />}
            </span>
            {count > 0 && <span aria-hidden className="absolute right-1 top-1 size-2 rounded-full bg-[#F45B0A] ring-2 ring-gray-50" />}
            <span className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-[3px] border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-900 opacity-0 transition-opacity group-hover:opacity-100">
              {section.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function SecondarySidebar({ badges, onNavigate }: { badges: Badges; onNavigate?: () => void }) {
  const NAV = useNav();
  const pathname = usePathname();
  const section = activeSection(NAV, pathname);
  // Only the best match is active (so /admin/blog/new doesn't also light up Posts).
  const current = activeItem(NAV, pathname);
  return (
    <div className="flex h-full w-[220px] flex-col border-r border-gray-200 bg-gray-50">
      <div className="flex h-12 shrink-0 items-center px-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{section.label}</p>
      </div>
      <ul className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {section.items.map((item) => {
          const Icon = ICONS[item.icon];
          const active = !item.external && current?.href === item.href;
          const count = item.badge ? (badges[item.badge] ?? 0) : 0;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`relative flex items-center gap-2.5 rounded-[3px] px-2.5 py-2 text-[13px] font-medium transition-colors ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {active && <span className="absolute bottom-1 left-0 top-1 w-0.5 rounded-r" style={{ backgroundColor: section.color }} />}
                {Icon && <Icon size={18} weight="regular" color={active ? section.color : undefined} />}
                <span className="flex-1">{item.label}</span>
                {count > 0 && (
                  <span className="rounded-[3px] border border-orange-200 bg-orange-50 px-1.5 text-[10px] font-semibold text-[#C2410C]">{count > 99 ? "99+" : count}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* All sections, for the phone drawer where the rail is hidden */}
      <div className="border-t border-gray-200 p-3 lg:hidden">
        <p className="px-1 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500">Sections</p>
        <div className="grid grid-cols-2 gap-1">
          {NAV.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <Link key={s.key} href={s.items[0].href} onClick={onNavigate} className="flex items-center gap-2 rounded-[3px] px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100">
                {Icon && <Icon size={16} color={s.color} weight="duotone" />} {s.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Breadcrumb() {
  const NAV = useNav();
  const pathname = usePathname();
  const section = activeSection(NAV, pathname);
  const item = activeItem(NAV, pathname);
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px]">
      <span className="text-gray-500">{section.label}</span>
      {item && (
        <>
          <CaretRight size={12} className="text-gray-400" />
          <span className="font-medium text-gray-900">{item.label}</span>
        </>
      )}
    </nav>
  );
}

function CommandPalette({ onClose }: { onClose: () => void }) {
  const NAV = useNav();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const items = useMemo(() => {
    const all = NAV.flatMap((s) => s.items.map((it) => ({ ...it, section: s })));
    const n = q.trim().toLowerCase();
    return n ? all.filter((it) => `${it.label} ${it.section.label}`.toLowerCase().includes(n)) : all;
  }, [q, NAV]);
  useEffect(() => input.current?.focus(), []);
  const go = (href: string) => {
    onClose();
    router.push(href);
  };
  return (
    <>
      <div role="presentation" className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      <div role="dialog" aria-label="Search the console" className="fixed left-1/2 top-[12vh] z-50 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[5px] border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-200 px-3">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") setI((v) => Math.min(v + 1, items.length - 1));
              if (e.key === "ArrowUp") setI((v) => Math.max(v - 1, 0));
              if (e.key === "Enter" && items[i]) go(items[i].href);
            }}
            placeholder="Jump to a page..."
            className="h-12 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
          <kbd className="rounded-[3px] border border-gray-200 px-1.5 py-0.5 font-mono text-[10px] text-gray-400">Esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto py-1">
          {items.map((it, idx) => {
            const Icon = ICONS[it.icon];
            return (
              <li key={it.href}>
                <button
                  type="button"
                  onMouseEnter={() => setI(idx)}
                  onClick={() => go(it.href)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm ${idx === i ? "bg-gray-100" : ""}`}
                >
                  {Icon && <Icon size={18} color={it.section.color} weight="duotone" />}
                  <span className="flex-1 text-gray-900">{it.label}</span>
                  <span className="text-xs text-gray-400">{it.section.label}</span>
                </button>
              </li>
            );
          })}
          {!items.length && <li className="px-3 py-6 text-center text-sm text-gray-500">No matches.</li>}
        </ul>
      </div>
    </>
  );
}

function ProfileMenu({ admin }: { admin: AdminIdentity }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-[3px] px-2 py-1.5 transition-colors hover:bg-gray-100">
        {admin.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={admin.avatarUrl} alt="" referrerPolicy="no-referrer" className="size-8 rounded-[3px] object-cover" />
        ) : (
          <span className="flex size-8 items-center justify-center rounded-[3px] bg-[#F45B0A] text-xs font-bold text-white">{initials(admin.name)}</span>
        )}
        <span className="hidden text-left md:block">
          <span className="block text-xs font-semibold leading-tight text-gray-900">{admin.name}</span>
          <span className="block text-[10px] text-gray-500">{admin.email}</span>
        </span>
        <CaretDown size={14} className="hidden text-gray-500 md:block" />
      </button>
      {open && (
        <>
          <div role="presentation" className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-[3px] border border-gray-200 bg-white py-1">
            <Link href="/members/account" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <UserCircle size={16} /> My account
            </Link>
            <Link href="/members" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <ArrowSquareOut size={16} /> Member area
            </Link>
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <ArrowSquareOut size={16} /> View live site
            </Link>
            <div className="my-1 border-t border-gray-200" />
            <form action={consoleLogout}>
              <SignOutButton />
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function SignOutButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-500/10 disabled:opacity-70">
      {pending ? <Spinner className="size-4" /> : <SignOut size={16} />} {pending ? "Signing out..." : "Sign out"}
    </button>
  );
}

export function AdminShell({
  admin,
  badges,
  env,
  scope = "admin",
  children,
}: {
  admin: AdminIdentity;
  badges: Badges;
  env: string;
  scope?: ConsoleScope;
  children: ReactNode;
}) {
  const nav = useMemo(() => (scope === "writer" ? ALL_NAV.filter((s) => s.writer) : ALL_NAV), [scope]);
  const [drawer, setDrawer] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <NavContext.Provider value={nav}>
    <div className="admin-console flex h-[100dvh] flex-col bg-gray-50 text-gray-900">
      <NextTopLoader color="#F45B0A" height={2} showSpinner={false} shadow={false} />
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 sm:px-6">
        <button type="button" onClick={() => setDrawer(true)} className="rounded-[3px] p-2 text-gray-600 hover:bg-gray-100 lg:hidden" aria-label="Open menu">
          <List size={20} />
        </button>
        <Link href={scope === "writer" ? "/admin/blog" : "/admin"} className="flex items-center gap-2.5">
          <Image src="/brand/svg/timewheel-icon.svg" alt="" width={32} height={32} />
          <span className="hidden sm:block">
            <span className="block text-sm font-bold leading-tight text-gray-900">Timewheel</span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#C2410C]">{scope === "writer" ? "Blog editor" : "Admin console"}</span>
          </span>
        </Link>
        <div className="ml-2 hidden md:block">
          <Breadcrumb />
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setPalette(true)}
          className="hidden w-56 items-center gap-2 rounded-[3px] border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-gray-300 sm:flex"
        >
          <MagnifyingGlass size={16} />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="rounded-[3px] border border-gray-200 px-1 py-0.5 font-mono text-[10px] text-gray-400">⌘K</kbd>
        </button>
        <button type="button" onClick={() => setPalette(true)} className="rounded-[3px] p-2 text-gray-500 hover:bg-gray-100 sm:hidden" aria-label="Search">
          <MagnifyingGlass size={20} />
        </button>
        <span
          className={`hidden rounded-[3px] border px-2 py-1 text-[10px] font-bold uppercase tracking-wider md:inline-block ${
            env === "Production" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600" : env === "Preview" ? "border-amber-500/30 bg-amber-500/10 text-amber-600" : "border-gray-300 bg-gray-100 text-gray-600"
          }`}
        >
          {env}
        </span>
        <ProfileMenu admin={admin} />
      </header>

      <div className="flex min-h-0 flex-1">
        <PrimaryRail badges={badges} />
        <aside className="hidden lg:block">
          <SecondarySidebar badges={badges} />
        </aside>
        {drawer && (
          <>
            <div role="presentation" className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setDrawer(false)} />
            <aside className="fixed left-0 top-0 z-50 h-full lg:hidden">
              <button type="button" onClick={() => setDrawer(false)} className="absolute -right-10 top-4 rounded-[3px] bg-white/20 p-1.5 text-white" aria-label="Close menu">
                <X size={20} />
              </button>
              <SecondarySidebar badges={badges} onNavigate={() => setDrawer(false)} />
            </aside>
          </>
        )}
        <main className="min-w-0 flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>

      {palette && <CommandPalette onClose={() => setPalette(false)} />}
      <Toaster position="bottom-right" toastOptions={{ className: "!rounded-[4px] !text-[13px]" }} />
    </div>
    </NavContext.Provider>
  );
}

export type { NavSection };
