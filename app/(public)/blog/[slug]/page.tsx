import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { organizationLd, breadcrumbLd } from "@/lib/jsonld";
import {
  getAllSlugs,
  getPost,
  getAuthor,
  getRelatedPosts,
  getAdjacentPosts,
  extractFaq,
  extractHeadings,
  formatDate,
  slugify,
} from "@/lib/blog";
import { Markdown } from "@/components/blog/markdown";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareRail } from "@/components/blog/share-rail";
import { AuthorCard } from "@/components/blog/author-card";
import { RelatedPosts } from "@/components/blog/related-posts";
import { PostNav } from "@/components/blog/post-nav";
import { Comments } from "@/components/blog/comments";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { meta } = post;
  const url = `${site.url}/blog/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      publishedTime: meta.date,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content, comments } = post;
  const url = `${site.url}/blog/${slug}`;
  const author = getAuthor(meta.author);
  const headings = extractHeadings(content);
  const faq = extractFaq(content);
  const related = getRelatedPosts(slug, meta.category);
  const { prev, next } = getAdjacentPosts(slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    articleSection: meta.category,
    keywords: meta.tags.join(", "),
    image: `${url}/opengraph-image`,
    mainEntityOfPage: url,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };
  const graphLd = { "@context": "https://schema.org", "@graph": [organizationLd(), articleLd] };
  const faqLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: meta.title, path: `/blog/${slug}` },
  ];

  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <ChevronRight className="size-3" aria-hidden />
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          </ol>
        </nav>

        {/* cover hero */}
        <header className="mt-6 overflow-hidden rounded-3xl bg-brand p-8 text-[#141110] md:p-14">
          <span className="inline-flex items-center rounded-full bg-[#141110] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {meta.category}
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {meta.title}
          </h1>
          {meta.excerpt && <p className="mt-4 max-w-2xl text-black/70 md:text-lg">{meta.excerpt}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-medium">
            <span className="grid size-9 place-items-center rounded-full bg-[#141110] text-xs font-black text-white" aria-hidden>
              {author.initials}
            </span>
            <span className="font-semibold">{author.name}</span>
            <span className="text-black/50">·</span>
            <span>{formatDate(meta.date)}</span>
            <span className="text-black/50">·</span>
            <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {meta.readingTime} min read</span>
          </div>
        </header>

        {/* body layout: share rail · article · toc */}
        <div className="mt-10 lg:grid lg:grid-cols-[3rem_minmax(0,1fr)_15rem] lg:gap-10">
          <div className="hidden lg:block">
            <div className="sticky top-28"><ShareRail url={url} title={meta.title} /></div>
          </div>

          <article className="mx-auto min-w-0 max-w-2xl">
            {/* mobile share row */}
            <div className="mb-6 lg:hidden"><ShareRail url={url} title={meta.title} /></div>

            <Markdown content={content} />

            {/* tags */}
            {meta.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                {meta.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tag/${slugify(t)}`}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}

            <AuthorCard author={author} />
            <Comments postSlug={slug} postTitle={meta.title} comments={comments} />
          </article>

          <div className="hidden lg:block">
            <div className="sticky top-28"><TableOfContents headings={headings} /></div>
          </div>
        </div>

        <RelatedPosts posts={related} />
        <PostNav prev={prev} next={next} />
      </div>
    </div>
  );
}
