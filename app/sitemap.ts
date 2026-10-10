import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts, getAllTags, slugify } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import { jobs } from "@/lib/jobs";
import { programPath, programs } from "@/lib/academy";

// Real "last changed" dates instead of new Date() on every crawl, which tells
// crawlers everything changed every time and weakens the freshness signal.
// Bump the matching constant when a group of pages is meaningfully edited.
const SITE_UPDATED = "2026-10-07"; // home, services, company pages
const CASE_STUDIES_UPDATED = "2026-10-07";
const PRODUCTS_UPDATED = "2026-10-07";
const CAREERS_UPDATED = "2026-10-09";
const ACADEMY_UPDATED = "2026-10-10";
const LEGAL_UPDATED = "2026-06-01";

type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry["changeFrequency"];

function entry(path: string, lastModified: string, priority: number, changeFrequency: Freq): Entry {
  return { url: `${site.url}${path}`, lastModified, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts[0]?.date || SITE_UPDATED;

  const services = [
    "/digital-marketing-company-in-nagpur",
    "/seo-company-in-nagpur",
    "/web-development-company-in-nagpur",
    "/website-design-company-in-nagpur",
    "/web-app-development-company-in-nagpur",
    "/shopify-development-company-in-nagpur",
    "/social-media-marketing-company-in-nagpur",
    "/restaurant-marketing",
  ];

  return [
    entry("", SITE_UPDATED, 1, "weekly"),
    ...services.map((p) => entry(p, SITE_UPDATED, 0.9, "monthly")),
    entry("/solutions", SITE_UPDATED, 0.7, "monthly"),
    entry("/pricing", SITE_UPDATED, 0.8, "monthly"),
    entry("/about", SITE_UPDATED, 0.7, "monthly"),
    entry("/contact", SITE_UPDATED, 0.6, "yearly"),
    entry("/book-a-demo", SITE_UPDATED, 0.6, "monthly"),
    entry("/30-days-30-websites", SITE_UPDATED, 0.7, "weekly"),
    entry("/careers", CAREERS_UPDATED, 0.5, "weekly"),
    ...jobs.map((j) => entry(`/careers/${j.slug}`, CAREERS_UPDATED, 0.5, "weekly")),
    entry("/academy", ACADEMY_UPDATED, 0.7, "monthly"),
    entry("/academy/programs", ACADEMY_UPDATED, 0.6, "monthly"),
    ...programs.map((p) => entry(programPath(p), ACADEMY_UPDATED, p.status === "upcoming" ? 0.4 : 0.6, "monthly")),
    ...["/academy/projects", "/academy/about", "/academy/faq"].map((p) => entry(p, ACADEMY_UPDATED, 0.5, "monthly")),
    entry("/case-studies", CASE_STUDIES_UPDATED, 0.8, "weekly"),
    ...caseStudies.map((cs) => entry(cs.href, CASE_STUDIES_UPDATED, 0.7, "monthly")),
    entry("/blog", latestPost, 0.8, "weekly"),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.date || latestPost, 0.7, "monthly")),
    ...getAllTags().map((tag) => entry(`/blog/tag/${slugify(tag)}`, latestPost, 0.3, "weekly")),
    entry("/products/book-a-sloth", PRODUCTS_UPDATED, 0.8, "monthly"),
    entry("/products/alluminaty", PRODUCTS_UPDATED, 0.7, "monthly"),
    entry("/products/ticket-dino", PRODUCTS_UPDATED, 0.5, "monthly"),
    entry("/coffee-and-toffee", PRODUCTS_UPDATED, 0.7, "monthly"),
    ...["/legal/privacy", "/legal/terms", "/legal/cookies", "/legal/refund"].map((p) =>
      entry(p, LEGAL_UPDATED, 0.2, "yearly"),
    ),
  ];
}
