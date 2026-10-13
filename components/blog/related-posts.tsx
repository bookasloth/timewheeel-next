import type { PostMeta } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-extrabold tracking-tight">Read next</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
