"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Download, LayoutDashboard, LogOut, MessagesSquare, Shield, UserRound } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { cn } from "@/lib/utils";

const items = [
  { href: "/members", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members/community", label: "Community", icon: MessagesSquare },
  { href: "/members/free-downloads", label: "Free downloads", icon: Download },
  { href: "/members/premium-downloads", label: "Premium downloads", icon: Crown },
  { href: "/members/account", label: "Account", icon: UserRound },
];

export function MemberSidebar({
  name,
  email,
  avatarUrl,
  isPremium,
  isAdmin,
}: {
  name: string;
  email: string;
  avatarUrl: string | null;
  isPremium: boolean;
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  const nav = isAdmin ? [...items, { href: "/members/admin", label: "Admin", icon: Shield }] : items;
  const active = (href: string) => (href === "/members" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <aside className="min-w-0 md:sticky md:top-24 md:self-start">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        <Avatar name={name} src={avatarUrl} size={40} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
          <p className={cn("mt-0.5 text-[11px] font-bold uppercase tracking-[0.16em]", isPremium ? "text-brand-text" : "text-muted-foreground")}>
            {isAdmin ? "Admin" : isPremium ? "Premium member" : "Free member"}
          </p>
        </div>
      </div>

      <nav aria-label="Member area" className="-mx-4 mt-4 flex gap-1 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={active(href) ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active(href) ? "bg-ink text-white" : "text-foreground/80 hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4" strokeWidth={1.9} />
            {label}
          </Link>
        ))}
        <form action="/auth/signout" method="post" className="shrink-0 md:mt-2 md:border-t md:border-border md:pt-2">
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="size-4" strokeWidth={1.9} />
            Sign out
          </button>
        </form>
      </nav>
    </aside>
  );
}
