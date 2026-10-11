import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, Pin, Trash2 } from "lucide-react";
import { Avatar } from "@/components/members/avatar";
import { ReplyForm } from "@/components/members/community-forms";
import { Linkified } from "@/components/members/linkified";
import { ConfirmSubmit, SubmitButton } from "@/components/members/ui";
import { deletePost, deleteReply, moderatePost } from "@/lib/members/community-actions";
import { getPost } from "@/lib/members/data";
import { categoryLabel, timeAgo } from "@/lib/members/config";
import { requireMember } from "@/lib/members/session";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const found = await getPost(id);
  return { title: found ? found.post.title : "Community" };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const m = await requireMember(`/members/community/${id}`);
  const found = await getPost(id);
  if (!found) notFound();
  const { post, replies } = found;
  const canDelete = post.author_id === m.id || m.isAdmin;

  return (
    <div className="space-y-8">
      <Link href="/members/community" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        Community
      </Link>

      <article className="rounded-lg border border-border bg-card p-5 sm:p-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-text">
          {categoryLabel(post.category)}
          {post.pinned && (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Pin className="size-3" /> Pinned
            </span>
          )}
          {post.locked && (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Lock className="size-3" /> Locked
            </span>
          )}
        </p>
        <h1 className="mt-2 font-heading font-extrabold leading-tight tracking-tight">{post.title}</h1>
        <div className="mt-4 flex items-center gap-3">
          <Avatar name={post.author?.full_name} src={post.author?.avatar_url} size={34} />
          <p className="text-sm">
            <span className="font-semibold">{post.author?.full_name || "Member"}</span>
            <span className="text-muted-foreground">
              {" "}
              · {timeAgo(post.created_at)}
              {post.edited_at && " · edited"}
            </span>
          </p>
        </div>
        <Linkified text={post.body} className="mt-5 text-[15px] leading-relaxed text-foreground/90" />

        {(canDelete || m.isAdmin) && (
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
            {m.isAdmin && (
              <>
                <form action={moderatePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="op" value={post.pinned ? "unpin" : "pin"} />
                  <SubmitButton variant="outline" className="px-3 py-1.5 text-xs">
                    <Pin className="size-3.5" />
                    {post.pinned ? "Unpin" : "Pin"}
                  </SubmitButton>
                </form>
                <form action={moderatePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="op" value={post.locked ? "unlock" : "lock"} />
                  <SubmitButton variant="outline" className="px-3 py-1.5 text-xs">
                    <Lock className="size-3.5" />
                    {post.locked ? "Unlock" : "Lock replies"}
                  </SubmitButton>
                </form>
              </>
            )}
            {canDelete && (
              <form action={deletePost} className="ml-auto">
                <input type="hidden" name="id" value={post.id} />
                <ConfirmSubmit message="Delete this post and all its replies? This can't be undone.">
                  <Trash2 className="size-3.5" />
                  Delete post
                </ConfirmSubmit>
              </form>
            )}
          </div>
        )}
      </article>

      <section aria-labelledby="replies-heading">
        <p id="replies-heading" className="font-heading text-lg font-bold">
          {replies.length === 0 ? "No replies yet" : replies.length === 1 ? "1 reply" : `${replies.length} replies`}
        </p>
        {replies.length > 0 && (
          <ul className="mt-4 space-y-3">
            {replies.map((r) => (
              <li key={r.id} id={`reply-${r.id}`} className="rounded-lg border border-border bg-card p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <Avatar name={r.author?.full_name} src={r.author?.avatar_url} size={30} />
                  <p className="min-w-0 flex-1 text-sm">
                    <span className="font-semibold">{r.author?.full_name || "Member"}</span>
                    {r.author_id === post.author_id && <span className="ml-2 text-xs font-semibold text-brand-text">Author</span>}
                    <span className="text-muted-foreground"> · {timeAgo(r.created_at)}</span>
                  </p>
                  {(r.author_id === m.id || m.isAdmin) && (
                    <form action={deleteReply}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="post_id" value={post.id} />
                      <ConfirmSubmit message="Delete this reply?">
                        <Trash2 className="size-3.5" />
                        <span className="sr-only sm:not-sr-only">Delete</span>
                      </ConfirmSubmit>
                    </form>
                  )}
                </div>
                <Linkified text={r.body} className="mt-3 text-sm leading-relaxed text-foreground/90" />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 rounded-lg border border-border bg-card p-4 sm:p-5">
          {post.locked ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="size-4" />
              This thread is locked, so it can&apos;t take new replies.
            </p>
          ) : (
            <ReplyForm postId={post.id} />
          )}
        </div>
      </section>
    </div>
  );
}
