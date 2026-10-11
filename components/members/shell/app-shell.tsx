"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Bell, ChevronDown, CreditCard, LogOut, Menu, Search, Shield, UserRound, X } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { MemberSidebar, MobileTabBar, statusLabel, type ShellMember } from "@/components/members/shell/sidebar";
import { markAllRead } from "@/lib/members/notification-actions";
import { timeAgo } from "@/lib/members/config";
import type { NotificationRow } from "@/lib/members/data";
import { cn } from "@/lib/utils";

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && close();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

function BellMenu({ unread, latest }: { unread: number; latest: NotificationRow[] }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
        className="relative grid size-10 place-items-center rounded-lg text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Bell className="size-5" strokeWidth={1.8} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white tabular-nums">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">Notifications</p>
            {unread > 0 && (
              <form action={markAllRead}>
                <button type="submit" className="text-xs font-semibold text-brand-text hover:underline">
                  Mark all read
                </button>
              </form>
            )}
          </div>
          {latest.length ? (
            <ul className="max-h-96 divide-y divide-border overflow-y-auto">
              {latest.map((n) => (
                <li key={n.id}>
                  <a
                    href={`/members/notifications/go/${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex gap-3 px-4 py-3 transition-colors hover:bg-secondary/60"
                  >
                    <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.read_at ? "bg-transparent" : "bg-brand")} />
                    <span className="min-w-0">
                      <span className={cn("block text-sm leading-snug", !n.read_at && "font-semibold")}>{n.title}</span>
                      {n.body && <span className="mt-0.5 block truncate text-xs text-muted-foreground">{n.body}</span>}
                      <span className="mt-0.5 block text-[11px] text-muted-foreground">{timeAgo(n.created_at)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">You&apos;re all caught up.</p>
          )}
          <Link
            href="/members/notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-border px-4 py-2.5 text-center text-sm font-semibold text-brand-text hover:bg-secondary/60"
          >
            See all notifications
          </Link>
        </div>
      )}
    </div>
  );
}

function AccountMenu({ member }: { member: ShellMember }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const item = "flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground";
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-secondary"
      >
        <Avatar name={member.name} src={member.avatarUrl} size={32} />
        <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-surface py-1">
          <div className="border-b border-border px-3 py-2.5">
            <p className="truncate text-sm font-semibold">{member.name}</p>
            <p className="truncate text-xs text-muted-foreground">{member.email}</p>
            <p className="mt-0.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-text">{statusLabel(member)}</p>
          </div>
          <Link href="/members/account" onClick={() => setOpen(false)} className={item}>
            <UserRound className="size-4" /> Profile & account
          </Link>
          <Link href="/members/premium" onClick={() => setOpen(false)} className={item}>
            <CreditCard className="size-4" /> Membership & billing
          </Link>
          {member.canWriteBlog && (
            <Link href={member.isAdmin ? "/admin" : "/admin/blog"} onClick={() => setOpen(false)} className={item}>
              <Shield className="size-4" /> {member.isAdmin ? "Admin console" : "Blog editor"}
            </Link>
          )}
          <Link href="/" className={item}>
            <ArrowUpRight className="size-4" /> Back to timewheel.co.in
          </Link>
          <form action="/auth/signout" method="post" className="mt-1 border-t border-border pt-1">
            <button type="submit" className={cn(item, "w-full text-destructive hover:text-destructive")}>
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export function MemberAppShell({
  member,
  unread,
  latest,
  children,
}: {
  member: ShellMember;
  unread: number;
  latest: NotificationRow[];
  children: ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();
  // Close the phone drawer after navigating.
  const [path, setPath] = useState(pathname);
  if (path !== pathname) {
    setPath(pathname);
    setDrawer(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="grid size-10 place-items-center rounded-lg text-foreground/75 hover:bg-secondary lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <Link href="/members" className="flex shrink-0 items-center gap-2">
            <Image src="/brand/svg/timewheel-icon.svg" alt="" width={30} height={30} />
            <span className="hidden font-heading text-[17px] font-extrabold tracking-tight sm:inline">
              TIME<span className="text-brand">WHEEL</span>
            </span>
            <span className="ml-1 hidden border-l border-border pl-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground md:inline">
              Members
            </span>
          </Link>

          <form action="/members/search" role="search" className="mx-auto hidden w-full max-w-md md:block">
            <label className="relative block">
              <span className="sr-only">Search the member area</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="q"
                placeholder="Search resources, posts, people..."
                className="h-10 w-full rounded-lg border border-border bg-background/70 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/80 hover:border-brand/40 focus:border-brand focus:ring-4 focus:ring-brand/15"
              />
            </label>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link href="/members/search" className="grid size-10 place-items-center rounded-lg text-foreground/75 hover:bg-secondary md:hidden" aria-label="Search">
              <Search className="size-5" strokeWidth={1.8} />
            </Link>
            <BellMenu unread={unread} latest={latest} />
            <AccountMenu member={member} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[268px] shrink-0 border-r border-border lg:block">
          <MemberSidebar member={member} unread={unread} />
        </aside>
        <main className="min-w-0 flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-8">{children}</main>
      </div>

      {drawer && (
        <>
          <div role="presentation" className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setDrawer(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-[86vw] max-w-[300px] overflow-y-auto bg-background lg:hidden">
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg text-foreground/70 hover:bg-secondary"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
            <div className="pt-10">
              <MemberSidebar member={member} unread={unread} onNavigate={() => setDrawer(false)} />
            </div>
          </aside>
        </>
      )}

      <MobileTabBar unread={unread} onMenu={() => setDrawer(true)} />
    </div>
  );
}
