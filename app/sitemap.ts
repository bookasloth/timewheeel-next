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
    "/performance-marketing-company-in-nagpur",
    "/restaurant-marketing",
    "/website-design-company-in-nagpur",
    "/web-app-development-company-in-nagpur",
    "/shopify-development-company-in-nagpur",
    "/web-development-company-in-nagpur",
    "/seo-company-in-nagpur",
    "/social-media-marketing-company-in-nagpur",
    "/ai-marketing-automation-company-in-nagpur",
    "/digital-marketing-nagpur",
    "/ai-automation-agency-in-nagpur",
    "/case-studies",
    ...caseStudies.map((cs) => cs.href),
    "/creators",
    "/coffee-and-toffee",
    "/products/book-a-sloth",
    "/products/alluminaty",
    "/products/ticket-dino",
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
