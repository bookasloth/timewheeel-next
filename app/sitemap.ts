import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllSlugs, getAllTags, slugify } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/solutions",
    "/pricing",
    "/about",
    "/blog",
    ...getAllSlugs().map((slug) => `/blog/${slug}`),
    ...getAllTags().map((tag) => `/blog/tag/${slugify(tag)}`),
    "/digital-marketing",
    "/digital-marketing2",
    "/restaurant-marketing",
    "/web-development-company-in-india",
    "/seo-company-in-nagpur",
    "/case-studies",
    "/products/book-a-sloth",
    "/products/alluminaty",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/refund",
  ];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date(),
  }));
}
