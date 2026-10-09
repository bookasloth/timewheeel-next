import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/blog";
import { BlogListing } from "@/components/blog/blog-listing";

const TITLE = "Digital Marketing, SEO and AI Search Blog";
const DESC =
  "Practical guides on digital marketing, SEO, AI search and building without platform lock-in, written by the Timewheel team for growing businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/blog" },
  ...social({ path: "/blog", title: TITLE, description: DESC }),
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-text">Resources</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">The Timewheel blog</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Guides on digital marketing, SEO, AI search and building on systems you own.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted-foreground">Posts coming soon.</p>
        ) : (
          <BlogListing posts={posts} />
        )}
      </div>
    </>
  );
}
