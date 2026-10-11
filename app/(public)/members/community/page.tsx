import type { Metadata } from "next";
import Link from "next/link";
import { Lock, MessageSquare, Pin, Plus } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { MemberPageHeader } from "@/components/members/page-header";
import { Alert } from "@/components/members/ui";
import { POSTS_PER_PAGE, listPosts } from "@/lib/members/data";
import { categoryLabel, communityCategories, timeAgo } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Community" };

export default async function CommunityPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const [, sp] = await Promise.all([requireMember("/members/community"), searchParams]);
  const category = communityCategories.some((c) => c.slug === sp.topic) ? sp.topic : undefined;
  const page = Math.max(1, Math.floor(Number(sp.page) || 1));
  const { posts, total } = await listPosts({ category, page });
  const pages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const href = (o: { topic?: string; page?: number }) => {
    const q = new URLSearchParams();
    if (o.topic) q.set("topic", o.topic);
    if (o.page && o.page > 1) q.set("page", String(o.page));
    const s = q.toString();
    return `/members/community${s ? `?${s}` : ""}`;
  };

  return (
    <div className="space-y-6">
      <MemberPageHeader
        eyebrow="Community"
        title="Member community"
        intro="Ask questions, share what you're working on and help each other out. Only signed-in members can see this."
        action={
          <Link
            href={category ? `/members/community/new?topic=${category}` : "/members/community/new"}
            className="btn btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-brand-foreground"
          >
            <Plus className="size-4" />
            New post
          </Link>
        }
      />

      {sp.deleted && <Alert tone="good">The post was deleted.</Alert>}

      <nav aria-label="Topics" className="-mx-4 flex gap-1 overflow-x-auto border-b border-border px-4 sm:mx-0 sm:px-0">
        {[{ slug: undefined, label: "All" }, ...communityCategories].map((c) => (
          <Link
            key={c.label}
            href={href({ topic: c.slug })}
            aria-current={category === c.slug ? "page" : undefined}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              category === c.slug ? "border-brand text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {c.label}
          </Link>
        ))}
      </nav>

      {posts.length ? (
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {posts.map((p) => (
            <li key={p.id}>
              <Link href={`/members/community/${p.id}`} className="flex gap-4 p-4 hover:bg-secondary/50 sm:p-5">
                <Avatar name={p.author?.full_name} src={p.author?.avatar_url} size={38} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-heading text-base font-bold leading-snug">
                    {p.pinned && <Pin className="size-3.5 shrink-0 text-brand" aria-label="Pinned" />}
                    {p.locked && <Lock className="size-3.5 shrink-0 text-muted-foreground" aria-label="Locked" />}
                    <span className="line-clamp-1">{p.title}</span>
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{p.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {p.author?.full_name || "Member"} · {categoryLabel(p.category)} · {timeAgo(p.last_activity_at)}
                  </p>
                </div>
                <span className="flex shrink-0 items-start gap-1.5 text-sm text-muted-foreground">
                  <MessageSquare className="mt-0.5 size-4" />
                  {p.reply_count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-border px-6 py-14 text-center">
          <p className="font-heading text-lg font-bold">{category ? `Nothing in ${categoryLabel(category)} yet` : "No posts yet"}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Be the first: introduce yourself, ask a question or share something you made.</p>
          <Link
            href={category ? `/members/community/new?topic=${category}` : "/members/community/new"}
            className="btn btn-outline mt-5 inline-flex rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Write the first post
          </Link>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pages" className="flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={href({ topic: category, page: page - 1 })} className="font-semibold text-brand-text hover:underline">
              Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="text-muted-foreground">
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link href={href({ topic: category, page: page + 1 })} className="font-semibold text-brand-text hover:underline">
              Older
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
