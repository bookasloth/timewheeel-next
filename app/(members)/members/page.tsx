import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Crown, Download, MessagesSquare, UserRound } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { CrownMark } from "@/components/members/crown-mark";
import { ResourceCard } from "@/components/members/library/resource-card";
import { RightRail } from "@/components/members/library/right-rail";
import { WelcomeTracker } from "@/components/members/welcome-tracker";
import {
  countDownloads,
  getBadges,
  getOnboarding,
  latestDownloads,
  listBookmarkIds,
  listBookmarks,
  listPosts,
} from "@/lib/members/data";
import { categoryLabel, timeAgo } from "@/lib/members/config";
import { premiumOffer } from "@/lib/members/premium";
import { requireMember } from "@/lib/members/session";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Overview" };

function greeting() {
  const h = Number(new Date().toLocaleString("en-IN", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default async function MembersDashboard({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember(), searchParams]);
  const [counts, latest, recent, { posts, total }, bookmarkIds, saved, steps] = await Promise.all([
    countDownloads(),
    latestDownloads(3),
    latestDownloads(3),
    listPosts({ limit: 5 }),
    listBookmarkIds(),
    listBookmarks(4),
    getOnboarding(m.id, m.profile),
  ]);
  const badges = await getBadges(posts.map((p) => p.author_id));
  const offer = premiumOffer();
  const done = steps.filter((s) => s.done).length;

  const tiles = [
    { href: "/members/library", icon: Download, label: "Resource library", stat: `${counts.free + counts.premium} resources` },
    { href: "/members/community", icon: MessagesSquare, label: "Community", stat: `${total} ${total === 1 ? "conversation" : "conversations"}` },
    { href: "/members/account", icon: UserRound, label: "Your profile", stat: "Profile & email settings" },
    { href: "/members/premium", icon: Crown, label: m.hasPaidPremium ? "Your Premium" : "Premium", stat: m.hasPaidPremium ? "Membership & billing" : `${counts.premium} Premium resources` },
  ];

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-8">
        {sp.welcome && <WelcomeTracker method={m.providers.includes("google") ? "google" : "email"} />}
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">{sp.welcome ? "Welcome aboard" : "Overview"}</p>
          <h1 className="mt-2 font-heading font-extrabold tracking-tight">
            {greeting()}, {m.firstName}
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            {sp.welcome ? "Your Timewheel account is ready. Here's how to get the most out of it." : "Here's what's new in your member area."}
          </p>
        </header>

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map(({ href, icon: Icon, label, stat }) => (
            <Link key={href} href={href} className="group rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand/50">
              <span className="grid size-10 place-items-center rounded-lg bg-brand/10 text-brand-text">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <p className="mt-3 text-sm font-semibold">{label}</p>
              <p className="mt-0.5 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="truncate">{stat}</span>
                <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          ))}
        </section>

        {done < steps.length && (
          <section className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-heading text-lg font-bold">Get started</p>
                <p className="text-sm text-muted-foreground">
                  {done} of {steps.length} done
                </p>
              </div>
              <div className="h-2 w-40 overflow-hidden rounded-full bg-secondary" aria-hidden>
                <div className="h-full rounded-full bg-brand" style={{ width: `${(done / steps.length) * 100}%` }} />
              </div>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {steps.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className={cn(
                      "flex h-full gap-3 rounded-lg border p-3 transition-colors",
                      s.done ? "border-border bg-secondary/40" : "border-border hover:border-brand/50",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border",
                        s.done ? "border-brand bg-brand text-white" : "border-foreground/30",
                      )}
                    >
                      {s.done && <Check className="size-3" strokeWidth={3} />}
                    </span>
                    <span>
                      <span className={cn("block text-sm font-semibold", s.done && "text-muted-foreground line-through")}>{s.label}</span>
                      {!s.done && <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{s.hint}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <p className="font-heading text-lg font-bold">New in the library</p>
            <Link href="/members/library" className="text-sm font-semibold text-brand-text hover:underline">
              Browse all
            </Link>
          </div>
          {latest.length ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
              {latest.map((row) => (
                <ResourceCard key={row.id} row={row} locked={row.tier === "premium" && !m.isPremium} saved={bookmarkIds.has(row.id)} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">The first resources are on their way.</p>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <p className="font-heading text-lg font-bold">Latest in the community</p>
            <Link href="/members/community" className="text-sm font-semibold text-brand-text hover:underline">
              Open community
            </Link>
          </div>
          {posts.length ? (
            <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link href={`/members/community/${p.id}`} className="flex items-start gap-3 p-4 transition-colors hover:bg-secondary/40">
                    <Avatar name={p.author?.full_name} src={p.author?.avatar_url} size={34} />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 text-sm font-semibold">{p.title}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          {p.author?.full_name || "Member"}
                          <CrownMark badge={badges[p.author_id]} />
                        </span>
                        · {categoryLabel(p.category)} · {p.reply_count} {p.reply_count === 1 ? "reply" : "replies"} · {timeAgo(p.last_activity_at)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
              No conversations yet.{" "}
              <Link href="/members/community/new?topic=introductions" className="font-semibold text-brand-text hover:underline">
                Introduce yourself
              </Link>
              .
            </div>
          )}
        </section>
      </div>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <RightRail member={m} saved={saved} recent={recent} premiumCount={counts.premium} price={offer.price} period={offer.period} />
      </div>
    </div>
  );
}
