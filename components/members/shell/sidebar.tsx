"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, LogOut, Menu, Shield } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { isActive, memberNav, tabBar } from "@/components/members/shell/nav";
import { cn } from "@/lib/utils";

export type ShellMember = {
  name: string;
  email: string;
  avatarUrl: string | null;
  isPremium: boolean;
  hasPaidPremium: boolean;
  isAdmin: boolean;
  /** Admins and blog writers. */
  canWriteBlog?: boolean;
};

export function statusLabel(m: ShellMember) {
  if (m.hasPaidPremium) return "Premium member";
  if (m.isAdmin) return "Team";
  return "Free member";
}

function Count({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-md bg-brand px-1.5 text-[11px] font-bold text-white tabular-nums">
      {n > 99 ? "99+" : n}
    </span>
  );
}

export function MemberSidebar({ member, unread, onNavigate }: { member: ShellMember; unread: number; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col gap-5 p-4">
      <Link
        href="/members/account"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-brand/40"
      >
        <Avatar name={member.name} src={member.avatarUrl} size={42} />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{member.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{member.email}</span>
          <span
            className={cn(
              "mt-0.5 block text-[10.5px] font-bold uppercase tracking-[0.16em]",
              member.hasPaidPremium ? "text-brand-text" : "text-muted-foreground",
            )}
          >
            {statusLabel(member)}
          </span>
        </span>
      </Link>

      <nav aria-label="Member area" className="flex-1 space-y-5 overflow-y-auto">
        {memberNav.map((group) => (
          <div key={group.label}>
            <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{group.label}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = !item.external && isActive(pathname, item);
                const body = (
                  <>
                    <Icon className={cn("size-[18px] shrink-0", active ? "text-white" : "text-foreground/70")} strokeWidth={1.8} />
                    <span className="truncate">{item.label}</span>
                    {item.soon && (
                      <span className="ml-auto rounded-md bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-text">Soon</span>
                    )}
                    {item.external && <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" />}
                    {item.badge === "notifications" && <Count n={unread} />}
                  </>
                );
                const cls = cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-ink text-white" : "text-foreground/85 hover:bg-secondary hover:text-foreground",
                  item.soon && "pointer-events-none opacity-60",
                );
                return (
                  <li key={item.href}>
                    {item.soon ? (
                      <span className={cls} aria-disabled>
                        {body}
                      </span>
                    ) : (
                      <Link href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={cls}>
                        {body}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {member.canWriteBlog && (
          <div>
            <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Team</p>
            <Link
              href={member.isAdmin ? "/admin" : "/admin/blog"}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Shield className="size-[18px] text-foreground/70" strokeWidth={1.8} />
              {member.isAdmin ? "Admin console" : "Blog editor"}
              <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" />
            </Link>
          </div>
        )}
      </nav>

      <form action="/auth/signout" method="post" className="border-t border-border pt-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="size-[18px]" strokeWidth={1.8} />
          Sign out
        </button>
      </form>
    </div>
  );
}

export function MobileTabBar({ unread, onMenu }: { unread: number; onMenu: () => void }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Member area"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {tabBar.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn("relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium", active ? "text-brand-text" : "text-muted-foreground")}
          >
            <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
            {item.label}
            {item.badge === "notifications" && unread > 0 && (
              <span className="absolute right-[calc(50%-18px)] top-1.5 size-2 rounded-full bg-brand" aria-label={`${unread} unread`} />
            )}
          </Link>
        );
      })}
      <button type="button" onClick={onMenu} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground">
        <Menu className="size-5" strokeWidth={1.8} />
        Menu
      </button>
    </nav>
  );
}
