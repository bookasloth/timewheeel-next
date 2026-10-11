import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { ResourceCard } from "@/components/members/library/resource-card";
import { listBookmarkIds, searchAll } from "@/lib/members/data";
import { categoryLabel, timeAgo } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [m, sp] = await Promise.all([requireMember("/members/search"), searchParams]);
  const q = (sp.q ?? "").trim().slice(0, 60);
  const [results, bookmarkIds] = await Promise.all([searchAll(q), listBookmarkIds()]);
  const count = results.posts.length + results.downloads.length;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="font-heading font-extrabold tracking-tight">Search</h1>
        <form className="relative mt-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            defaultValue={q}
            autoFocus
            placeholder="Search resources and posts"
            className="h-12 w-full rounded-lg border border-border bg-surface pl-12 pr-4 text-[15px] outline-none transition-colors hover:border-brand/40 focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </form>
        {q.length >= 2 && (
          <p className="mt-3 text-sm text-muted-foreground">
            {count ? `${count} result${count === 1 ? "" : "s"} for "${q}"` : `Nothing found for "${q}".`}
          </p>
        )}
      </header>

      {results.downloads.length > 0 && (
        <section>
          <p className="mb-3 font-heading text-lg font-bold">Resources</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
            {results.downloads.map((row) => (
              <ResourceCard key={row.id} row={row} locked={row.tier === "premium" && !m.isPremium} saved={bookmarkIds.has(row.id)} />
            ))}
          </div>
        </section>
      )}

      {results.posts.length > 0 && (
        <section>
          <p className="mb-3 font-heading text-lg font-bold">Community posts</p>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {results.posts.map((p) => (
              <li key={p.id}>
                <Link href={`/members/community/${p.id}`} className="flex items-start gap-3 p-4 transition-colors hover:bg-secondary/40">
                  <Avatar name={p.author?.full_name} src={p.author?.avatar_url} size={32} />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{p.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {p.author?.full_name || "Member"} · {categoryLabel(p.category)} · {timeAgo(p.last_activity_at)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}
