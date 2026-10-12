import type { Metadata } from "next";
import Link from "next/link";
import { social } from "@/lib/metadata";
import { footerRows, type SiteLinkGroup } from "@/lib/site-links";
import { getAllPosts } from "@/lib/blog";
import { realCaseStudies } from "@/lib/services";
import { programPath, programs } from "@/lib/academy";
import { jobs } from "@/lib/jobs";

const TITLE = "Sitemap | Timewheel";
const DESC =
  "Every page on timewheel.co.in in one place: services, products, case studies, blog posts, Academy programs, careers, community and legal pages.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/sitemap" },
  ...social({ path: "/sitemap", title: TITLE, description: DESC }),
};

export const revalidate = 3600;

// Human sitemap. The footer groups come first, then the lists that change
// often (case studies, programs, roles, posts). /sitemap.xml stays the
// machine version for search engines.
export default async function SitemapPage() {
  const posts = await getAllPosts();

  const groups: SiteLinkGroup[] = [
    ...footerRows.flat(),
    { title: "Case studies", links: realCaseStudies.map((c) => ({ label: c.name, href: c.href })) },
    { title: "Academy programs", links: programs.map((p) => ({ label: p.title, href: programPath(p) })) },
    { title: "Open roles", links: jobs.map((j) => ({ label: j.title, href: `/careers/${j.slug}` })) },
  ].filter((g) => g.links.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">Sitemap</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Everything on Timewheel</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Every page on the site, grouped. Looking for the search engine version? It lives at{" "}
        <a href="/sitemap.xml" className="text-brand hover:underline">/sitemap.xml</a>.
      </p>

      <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {groups.map((g) => (
          <section key={g.title} className="mb-6 break-inside-avoid rounded-2xl border border-border bg-card p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide">{g.title}</h2>
            <ul className="mt-4 space-y-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {posts.length > 0 && (
        <section className="mt-4 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wide">Blog posts</h2>
            <span className="text-xs text-muted-foreground">{posts.length} posts</span>
          </div>
          <ul className="mt-4 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="text-sm text-muted-foreground hover:text-brand">{p.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
