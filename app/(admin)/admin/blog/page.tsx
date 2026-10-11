import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Article, CalendarCheck, NotePencil, Plus, Globe } from "@phosphor-icons/react/dist/ssr";
import { EmptyState, PageHeader, StatCard, StatusBadge, Table, Td, Th, btn } from "@/components/admin/ui";
import { PostRowActions, PostsFilterBar, SegChip, SegLegend } from "@/components/admin/blog/list-client";
import { blogCounts, isScheduled, listAdminPosts, type BlogStatusFilter } from "@/lib/admin/blog-data";
import { requireBlogEditor } from "@/lib/members/session";

export const metadata: Metadata = { title: "Blog posts" };

const when = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const FILTERS = new Set(["all", "published", "scheduled", "draft"]);

export default async function BlogPostsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const [, sp] = await Promise.all([requireBlogEditor(), searchParams]);
  const status = (FILTERS.has(sp.status ?? "") ? sp.status : "all") as BlogStatusFilter;
  const q = (sp.q ?? "").slice(0, 80);
  const [posts, counts] = await Promise.all([listAdminPosts({ q, status }), blogCounts()]);
  const filtered = Boolean(q) || status !== "all";

  return (
    <>
      <PageHeader
        title="Blog posts"
        description="Write, schedule and optimise posts for timewheel.co.in/blog."
        actions={
          <Link href="/admin/blog/new" className={btn.primary}>
            <Plus size={16} weight="bold" /> New post
          </Link>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="All posts" value={String(counts.total)} icon={<Article size={18} />} />
        <StatCard label="Live" value={String(counts.published)} icon={<Globe size={18} />} />
        <StatCard label="Scheduled" value={String(counts.scheduled)} icon={<CalendarCheck size={18} />} />
        <StatCard label="Drafts" value={String(counts.drafts)} icon={<NotePencil size={18} />} />
      </div>

      <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <Suspense>
          <PostsFilterBar />
        </Suspense>
        <SegLegend />
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title={filtered ? "No posts match" : "No posts yet"}
          description={filtered ? "Try a different search or status." : "Write your first post. Drafts stay private until you publish."}
          action={
            !filtered && (
              <Link href="/admin/blog/new" className={btn.primary}>
                <Plus size={16} weight="bold" /> New post
              </Link>
            )
          }
        />
      ) : (
        <section className="rounded-[5px] border border-gray-200 bg-white">
          <Table minWidth={760}>
            <thead>
              <tr>
                <Th>Post</Th>
                <Th className="w-8 text-center">S</Th>
                <Th className="w-8 text-center">G</Th>
                <Th className="w-8 text-center">E</Th>
                <Th>Status</Th>
                <Th>Author</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => {
                const sched = isScheduled(p);
                const live = p.status === "published" && !sched;
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 shrink-0 overflow-hidden rounded-[3px] border border-gray-200 bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {p.cover && <img src={p.cover} alt="" className="size-full object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <Link href={`/admin/blog/${p.id}`} className="block max-w-[26rem] truncate font-medium text-gray-900 hover:underline">
                            {p.title}
                          </Link>
                          <p className="truncate text-xs text-gray-500">
                            /blog/{p.slug}
                            {p.category ? ` · ${p.category}` : ""}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td className="text-center"><SegChip which="s" seg={p.scores.s} /></Td>
                    <Td className="text-center"><SegChip which="g" seg={p.scores.g} /></Td>
                    <Td className="text-center"><SegChip which="e" seg={p.scores.e} /></Td>
                    <Td>
                      <StatusBadge status={sched ? "scheduled" : p.status} />
                      <p className="mt-0.5 text-[11px] text-gray-500">
                        {p.published_at && p.status === "published" ? (sched ? `Goes live ${when(p.published_at)}` : when(p.published_at)) : `Edited ${when(p.updated_at)}`}
                      </p>
                    </Td>
                    <Td className="text-xs">{p.author ?? <span className="text-gray-400">None</span>}</Td>
                    <Td>
                      <PostRowActions id={p.id} slug={p.slug} live={live} status={p.status} />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>
      )}
    </>
  );
}
