import type { Metadata } from "next";
import { PostForm } from "@/components/admin/blog/post-form";
import { listAuthors, listCategories } from "@/lib/admin/blog-data";
import { requireBlogEditor } from "@/lib/members/session";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  const me = await requireBlogEditor();
  const [authors, categories] = await Promise.all([listAuthors(), listCategories()]);
  // Default byline: the author whose name matches the writer, else the first.
  const mine = authors.find((a) => a.name.toLowerCase() === me.name.toLowerCase()) ?? authors[0];
  return <PostForm post={null} authors={authors} categories={categories} revisions={[]} defaultAuthorId={mine?.id ?? null} />;
}
