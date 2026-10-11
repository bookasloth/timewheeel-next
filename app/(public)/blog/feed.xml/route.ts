import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

// RSS 2.0 feed of live blog posts (/blog/feed.xml). Revalidated by the blog
// editor on save, and hourly as a backstop for scheduled posts.
export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = (await getAllPosts()).slice(0, 50);
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return [
        "<item>",
        `<title>${esc(p.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(p.date).toUTCString()}</pubDate>`,
        `<category>${esc(p.category)}</category>`,
        `<description>${esc(p.excerpt || p.description)}</description>`,
        "</item>",
      ].join("");
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(`${site.name} blog`)}</title><link>${site.url}/blog</link><atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml"/><description>Guides on digital marketing, SEO, AI search and building on systems you own.</description><language>en-in</language>${posts[0] ? `<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` : ""}${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
