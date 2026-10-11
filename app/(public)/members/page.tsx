import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crown, Download, MessagesSquare } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { MemberPageHeader } from "@/components/members/page-header";
import { WelcomeTracker } from "@/components/members/welcome-tracker";
import { countDownloads, listDownloads, listPosts } from "@/lib/members/data";
import { categoryLabel, formatDate, isLifetime, timeAgo } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Dashboard" };

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export default async function MembersDashboard({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember(), searchParams]);
  const [counts, latest, { posts, total }] = await Promise.all([countDownloads(), listDownloads(undefined, 4), listPosts({ limit: 5 })]);

  const tiles = [
    { href: "/members/community", icon: MessagesSquare, label: "Community", stat: plural(total, "conversation", "conversations") },
    { href: "/members/free-downloads", icon: Download, label: "Free downloads", stat: plural(counts.free, "file", "files") },
    { href: "/members/premium-downloads", icon: Crown, label: "Premium downloads", stat: plural(counts.premium, "file", "files") },
  ];

  let premiumNote = "";
  if (m.isPremium) {
    if (m.isAdmin && !m.premiumUntil) premiumNote = "included with admin access";
    else if (isLifetime(m.premiumUntil)) premiumNote = "lifetime";
    else premiumNote = `until ${formatDate(m.premiumUntil)}`;
  }

  return (
    <div className="space-y-10">
      {sp.welcome && <WelcomeTracker method={m.providers.includes("google") ? "google" : "email"} />}
      <MemberPageHeader
        eyebrow={sp.welcome ? "Welcome aboard" : "Dashboard"}
        title={`Hi, ${m.firstName}`}
        intro={sp.welcome ? "Your Timewheel account is ready. Here's everything you can use." : "Here's what's new in your member area."}
      />

      <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Your membership</p>
            <p className="mt-1.5 font-heading text-xl font-extrabold">
              {m.isPremium ? "Premium" : "Free"}
              {premiumNote && <span className="ml-2 font-sans text-sm font-medium text-muted-foreground">{premiumNote}</span>}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {m.isPremium
                ? "You can open every download, free and Premium."
                : "Free downloads and the community are yours. Premium adds the full library."}
            </p>
          </div>
          {!m.isPremium && (
            <Link
              href="/members/premium-downloads"
              className="btn btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-brand-foreground"
            >
              See Premium
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {tiles.map(({ href, icon: Icon, label, stat }) => (
          <Link key={href} href={href} className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand/50">
            <Icon className="size-5 text-brand" strokeWidth={1.8} />
            <p className="mt-4 font-heading text-base font-bold">{label}</p>
            <p className="mt-0.5 flex items-center justify-between text-sm text-muted-foreground">
              {stat}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <p className="font-heading text-lg font-bold">Latest in the community</p>
            <Link href="/members/community" className="text-sm font-semibold text-brand-text hover:underline">
              Open
            </Link>
          </div>
          {posts.length ? (
            <ul className="divide-y divide-border rounded-lg border border-border bg-card">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link href={`/members/community/${p.id}`} className="flex items-start gap-3 p-4 hover:bg-secondary/50">
                    <Avatar name={p.author?.full_name} src={p.author?.avatar_url} size={30} />
                    <span className="min-w-0">
                      <span className="line-clamp-1 text-sm font-semibold">{p.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {categoryLabel(p.category)} · {plural(p.reply_count, "reply", "replies")} · {timeAgo(p.last_activity_at)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
              No conversations yet.{" "}
              <Link href="/members/community/new" className="font-semibold text-brand-text hover:underline">
                Start the first one
              </Link>
              .
            </div>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <p className="font-heading text-lg font-bold">New downloads</p>
            <Link href="/members/free-downloads" className="text-sm font-semibold text-brand-text hover:underline">
              All downloads
            </Link>
          </div>
          {latest.length ? (
            <ul className="divide-y divide-border rounded-lg border border-border bg-card">
              {latest.map((d) => (
                <li key={d.id}>
                  <Link
                    href={d.tier === "premium" ? "/members/premium-downloads" : "/members/free-downloads"}
                    className="flex items-center justify-between gap-3 p-4 hover:bg-secondary/50"
                  >
                    <span className="min-w-0">
                      <span className="line-clamp-1 text-sm font-semibold">{d.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {d.tier === "premium" ? "Premium" : "Free"} · {formatDate(d.created_at)}
                      </span>
                    </span>
                    {d.tier === "premium" ? (
                      <Crown className="size-4 shrink-0 text-brand" />
                    ) : (
                      <Download className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
              The first downloads are on their way. We&apos;ll list them here as soon as they&apos;re up.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
