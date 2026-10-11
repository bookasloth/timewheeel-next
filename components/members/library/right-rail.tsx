import Link from "next/link";
import { Bookmark, Check, CircleHelp, Crown, Lock, Sparkles } from "lucide-react";
import { kindOf } from "@/components/members/library/resource-card";
import type { DownloadRow } from "@/lib/members/data";
import { formatDate, isLifetime } from "@/lib/members/config";
import type { Member } from "@/lib/members/session";
import { cn } from "@/lib/utils";

function Panel({ title, icon: Icon, action, children }: { title: string; icon: typeof Bookmark; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-heading text-[15px] font-bold">
          <Icon className="size-4" strokeWidth={2} />
          {title}
        </p>
        {action}
      </div>
      {children}
    </section>
  );
}

function MiniList({ rows }: { rows: DownloadRow[] }) {
  return (
    <ul className="space-y-1">
      {rows.map((r) => {
        const k = kindOf(r);
        const Icon = k.icon;
        return (
          <li key={r.id}>
            <Link
              href={r.tier === "premium" ? "/members/premium-downloads" : "/members/free-downloads"}
              className="flex items-center gap-3 rounded-md p-1.5 transition-colors hover:bg-secondary/70"
            >
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-md", r.tier === "premium" ? "bg-brand/12 text-brand-text" : cn(k.tile, k.ink))}>
                <Icon className="size-4" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium">{r.title}</span>
                <span className="block text-[11px] text-muted-foreground">
                  {r.tier === "premium" ? "Premium" : k.label} · {formatDate(r.created_at)}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function MembershipCard({ member, premiumCount, price, period }: { member: Member; premiumCount: number; price: number | null; period: string }) {
  if (member.hasPaidPremium || member.isAdmin) {
    return (
      <section className="rounded-lg bg-ink p-5 text-white">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-brand">
            <Crown className="size-5" />
          </span>
          <div>
            <p className="font-heading text-base font-extrabold">{member.hasPaidPremium ? "Premium member" : "Team access"}</p>
            <p className="text-xs text-white/65">
              {member.hasPaidPremium
                ? isLifetime(member.premiumUntil)
                  ? "Lifetime access"
                  : `Active until ${formatDate(member.premiumUntil)}`
                : "Admins can open every resource"}
            </p>
          </div>
        </div>
        <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[13px]">
          {["Every free and Premium download", "Full community access", "New Premium resources as they're added"].map((t) => (
            <li key={t} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {t}
            </li>
          ))}
        </ul>
        <Link href="/members/premium" className="mt-4 block text-center text-[13px] font-semibold text-brand hover:underline">
          Membership & billing
        </Link>
      </section>
    );
  }
  const perks: [boolean, string][] = [
    [true, "Free downloads"],
    [true, "Community access"],
    [false, premiumCount ? `Premium downloads (${premiumCount} now)` : "Premium downloads"],
    [false, "In-depth playbooks and guides"],
    [false, "New Premium resources as they're added"],
  ];
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-lg bg-brand text-white">
          <Crown className="size-5" />
        </span>
        <div>
          <p className="font-heading text-base font-extrabold">Free membership</p>
          <p className="text-xs text-muted-foreground">Access to all free resources.</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2 border-t border-border pt-4 text-[13px]">
        {perks.map(([has, t]) => (
          <li key={t} className={cn("flex gap-2", !has && "text-muted-foreground")}>
            {has ? <Check className="mt-0.5 size-4 shrink-0 text-brand" /> : <Lock className="mt-0.5 size-4 shrink-0" />} {t}
          </li>
        ))}
      </ul>
      <Link
        href="/members/premium"
        className="btn btn-primary mt-4 flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold text-brand-foreground"
      >
        Upgrade to Premium{price ? ` · ₹${price.toLocaleString("en-IN")}/${period === "1 year" ? "yr" : period}` : ""}
      </Link>
    </section>
  );
}

export function RightRail({
  member,
  saved,
  recent,
  premiumCount,
  price,
  period,
}: {
  member: Member;
  saved: DownloadRow[];
  recent: DownloadRow[];
  premiumCount: number;
  price: number | null;
  period: string;
}) {
  return (
    <aside className="space-y-4">
      <MembershipCard member={member} premiumCount={premiumCount} price={price} period={period} />
      <Panel
        title="Saved resources"
        icon={Bookmark}
        action={
          saved.length ? (
            <Link href="/members/library?saved=1" className="text-xs font-semibold text-brand-text hover:underline">
              View all
            </Link>
          ) : undefined
        }
      >
        {saved.length ? (
          <MiniList rows={saved} />
        ) : (
          <p className="text-[13px] leading-relaxed text-muted-foreground">Tap the bookmark on any resource to keep it here.</p>
        )}
      </Panel>
      <Panel
        title="Recently added"
        icon={Sparkles}
        action={
          <Link href="/members/library" className="text-xs font-semibold text-brand-text hover:underline">
            View all
          </Link>
        }
      >
        {recent.length ? <MiniList rows={recent} /> : <p className="text-[13px] text-muted-foreground">New resources will appear here.</p>}
      </Panel>
      <section className="flex gap-3 rounded-lg border border-border bg-surface p-4">
        <CircleHelp className="mt-0.5 size-5 shrink-0" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-semibold">Need help?</p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">Questions about your membership or resources?</p>
          <Link href="/members/help" className="btn btn-outline mt-3 inline-flex rounded-lg px-4 py-2 text-xs font-semibold">
            Contact support
          </Link>
        </div>
      </section>
    </aside>
  );
}
