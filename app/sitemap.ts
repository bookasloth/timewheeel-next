import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/solutions",
    "/pricing",
    "/about",
    "/blog",
    "/digital-marketing",
    "/digital-marketing2",
    "/restaurant-marketing",
    "/web-development-company-in-india",
    "/products/book-a-sloth",
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
