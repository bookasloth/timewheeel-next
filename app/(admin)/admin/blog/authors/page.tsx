import type { Metadata } from "next";
import { PageHeader, Panel } from "@/components/admin/ui";
import { AuthorForm, NewAuthor } from "@/components/admin/blog/author-form";
import { listAuthors } from "@/lib/admin/blog-data";
import { requireBlogEditor } from "@/lib/members/session";

export const metadata: Metadata = { title: "Blog authors" };

export default async function AuthorsPage() {
  await requireBlogEditor();
  const authors = await listAuthors();
  return (
    <>
      <PageHeader
        title="Authors"
        description="Bylines shown on posts and sent to Google as author (Person) schema. Real names, roles and experience build trust with search and AI engines."
      />
      <div className="space-y-5">
        {authors.map((a) => (
          <Panel key={a.id} title={`${a.name} · ${a.posts ?? 0} post${a.posts === 1 ? "" : "s"}`}>
            <AuthorForm author={a} />
          </Panel>
        ))}
        <NewAuthor />
      </div>
    </>
  );
}
