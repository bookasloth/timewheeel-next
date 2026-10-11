import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Globe, MapPin, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { CrownMark } from "@/components/members/crown-mark";
import { getBadges, getPerson, listPosts } from "@/lib/members/data";
import { categoryLabel, formatDate, timeAgo } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPerson((await params).id);
  return { title: p?.full_name || "Member" };
}

export default async function PersonPage({ params }: Props) {
  const { id } = await params;
  const m = await requireMember(`/members/people/${id}`);
  const person = await getPerson(id);
  if (!person) notFound();
  const [{ posts, total }, badges] = await Promise.all([listPosts({ authorId: id, limit: 20 }), getBadges([id])]);
  const host = person.website ? person.website.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/members/people" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> People
      </Link>
      <section className="rounded-lg border border-border bg-surface p-6">
        <div className="flex flex-wrap items-start gap-5">
          <Avatar name={person.full_name} src={person.avatar_url} size={80} />
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-2 font-heading font-extrabold tracking-tight">
              {person.full_name || "Member"} <CrownMark badge={badges[id]} />
            </h1>
            {person.headline && <p className="mt-1 text-[15px] text-muted-foreground">{person.headline}</p>}
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {person.business_name && <span className="font-medium text-foreground/80">{person.business_name}</span>}
              {person.city && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> {person.city}
                </span>
              )}
              {host && person.website && (
                <a href={person.website} target="_blank" rel="nofollow ugc noopener noreferrer" className="inline-flex items-center gap-1 text-brand-text hover:underline">
                  <Globe className="size-3.5" /> {host}
                </a>
              )}
              <span>Member since {formatDate(person.created_at)}</span>
            </p>
          </div>
          {person.id === m.id && (
            <Link href="/members/account#profile" className="btn btn-outline rounded-lg px-4 py-2 text-sm font-semibold">
              Edit profile
            </Link>
          )}
        </div>
        {person.bio && <p className="mt-5 whitespace-pre-line border-t border-border pt-5 text-[15px] leading-relaxed text-foreground/90">{person.bio}</p>}
      </section>

      <section>
        <p className="mb-3 font-heading text-lg font-bold">
          Posts <span className="text-muted-foreground">({total})</span>
        </p>
        {posts.length ? (
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {posts.map((p) => (
              <li key={p.id}>
                <Link href={`/members/community/${p.id}`} className="flex items-start justify-between gap-3 p-4 transition-colors hover:bg-secondary/40">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{p.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {categoryLabel(p.category)} · {timeAgo(p.created_at)}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="size-3.5" /> {p.reply_count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        )}
      </section>
    </div>
  );
}
