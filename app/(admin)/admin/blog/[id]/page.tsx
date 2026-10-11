import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/blog/post-form";
import { getAdminPost, listAuthors, listCategories, listRevisions } from "@/lib/admin/blog-data";
import { requireBlogEditor } from "@/lib/members/session";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [, { id }] = await Promise.all([requireBlogEditor(), params]);
  const post = await getAdminPost(id);
  if (!post) notFound();
  const [authors, categories, revisions] = await Promise.all([listAuthors(), listCategories(), listRevisions(id)]);
  return <PostForm post={post} authors={authors} categories={categories} revisions={revisions} defaultAuthorId={null} />;
}
