import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Check, ChevronRight, Clock, User } from "lucide-react";
import { site } from "@/lib/site";
import { organizationLd, websiteLd, breadcrumbLd } from "@/lib/jsonld";
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
import { ReadingProgress } from "@/components/blog/reading-progress";
import { PostCta } from "@/components/blog/post-cta";

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
      modifiedTime: meta.date,
      authors: [meta.author],
      images: [`${url}/opengraph-image`],
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
  const heroDate = (() => {
    const d = new Date(meta.date);
    return Number.isNaN(+d)
      ? formatDate(meta.date)
      : `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} '${String(d.getFullYear()).slice(-2)}`;
  })();
  const readLabel = `${meta.readingTime} Minute${meta.readingTime === 1 ? "" : "s"}`;

  // Torn-paper hero treatment (matches the collage image style):
  // crumpled fold shading + fibre grain, clipped to a rough deckled edge.
  const paperFolds =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='340'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.011' numOctaves='5' seed='7' stitchTiles='stitch'/%3E%3CfeDiffuseLighting lighting-color='white' surfaceScale='2.2'%3E%3CfeDistantLight azimuth='235' elevation='58'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")";
  const paperFibre =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")";
  const tornEdge =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='700' preserveAspectRatio='none'%3E%3Cfilter id='r'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.016 0.03' numOctaves='2' seed='4' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='22'/%3E%3C/filter%3E%3Crect x='11' y='11' width='1178' height='678' rx='30' fill='%23fff' filter='url(%23r)'/%3E%3C/svg%3E\")";
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
    inLanguage: "en",
    wordCount: content.trim().split(/\s+/).length,
    image: `${url}/opengraph-image`,
    mainEntityOfPage: url,
    isPartOf: { "@id": `${site.url}/#website` },
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };
  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [organizationLd(), websiteLd(), articleLd],
  };
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
      <ReadingProgress />
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
            <ChevronRight className="size-3" aria-hidden />
            <li className="max-w-[60vw] truncate text-foreground/70" aria-current="page">{meta.title}</li>
          </ol>
        </nav>

        {/* cover hero: coloured text panel on the left, standalone image on the right */}
        <div className="relative left-1/2 mt-6 grid w-[min(1400px,94vw)] -translate-x-1/2 items-stretch gap-6 md:grid-cols-[3fr_2fr]">
          <header
            className="relative bg-brand p-8 text-[#141110] md:p-12"
            style={{ maskImage: tornEdge, WebkitMaskImage: tornEdge, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}
          >
            {/* crumpled paper folds (light/shadow) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
              style={{ backgroundImage: paperFolds, backgroundSize: "340px 340px" }}
            />
            {/* fibre tooth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
              style={{ backgroundImage: paperFibre, backgroundSize: "180px 180px" }}
            />
            {/* warm paper wash + edge shading */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ backgroundImage: "radial-gradient(120% 120% at 12% 0%, rgba(255,246,230,0.5), rgba(90,30,0,0.22) 75%)" }}
            />
            <div className="relative z-10">
              <span className="inline-flex items-center rounded-full bg-[#141110] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {meta.category}
              </span>
              <h1 className="mt-5 text-2xl font-black leading-tight tracking-tight md:text-4xl">
                {meta.title}
              </h1>
              {meta.excerpt && <p className="mt-4 text-black/70 md:text-lg">{meta.excerpt}</p>}

              <p className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-semibold text-[#141110]">
                <span className="inline-flex items-center gap-1.5"><User className="size-4" strokeWidth={2} /> Team {author.name}</span>
                <span className="text-black/30" aria-hidden>|</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-4" strokeWidth={2} /> {readLabel}</span>
                <span className="text-black/30" aria-hidden>|</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" strokeWidth={2} /> {heroDate}</span>
              </p>
            </div>
          </header>

          {/* standalone image; branded panel when no cover is set */}
          {meta.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={meta.cover}
              alt={meta.title}
              className="h-full min-h-[240px] w-full rounded-3xl border border-border object-cover shadow-sm"
            />
          ) : (
            <div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-brand/25 bg-gradient-to-br from-brand/25 to-brand/5">
              <span className="text-2xl font-black tracking-tight text-brand/80 md:text-3xl">
                TIME<span className="text-foreground/50">WHEEL</span>
              </span>
            </div>
          )}
        </div>

        {/* body layout: share rail · article · toc */}
        <div className="mt-10 lg:grid lg:grid-cols-[3rem_minmax(0,1fr)_15rem] lg:gap-10">
          <div className="hidden lg:block">
            <div className="sticky top-28"><ShareRail url={url} title={meta.title} /></div>
          </div>

          <article className="mx-auto min-w-0 max-w-2xl">
            {/* mobile share row */}
            <div className="mb-6 lg:hidden"><ShareRail url={url} title={meta.title} /></div>

            {meta.takeaways && meta.takeaways.length > 0 && (
              <aside className="mb-8 rounded-2xl border border-brand/20 bg-brand/5 p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-brand">Key takeaways</p>
                <ul className="mt-3 space-y-2">
                  {meta.takeaways.map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm text-foreground/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

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

        <PostCta />
        <RelatedPosts posts={related} />
        <PostNav prev={prev} next={next} />
      </div>
    </div>
  );
}
