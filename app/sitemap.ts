import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllSlugs, getAllTags, slugify } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/solutions",
    "/pricing",
    "/about",
    "/contact",
    "/blog",
    ...getAllSlugs().map((slug) => `/blog/${slug}`),
    ...getAllTags().map((tag) => `/blog/tag/${slugify(tag)}`),
    "/digital-marketing",
    "/digital-marketing-company-in-india",
    "/social-media-marketing-company-in-india",
    "/restaurant-marketing",
    "/website-design-company-in-india",
    "/web-app-development-company-in-india",
    "/web-development-company-in-india",
    "/seo-company-in-nagpur",
    "/digital-marketing-nagpur",
    "/case-studies",
    ...caseStudies.map((cs) => cs.href),
    "/creators",
    "/coffee-and-toffee",
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
