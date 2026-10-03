"use client";

import { usePathname } from "next/navigation";
import { PreFooterCta } from "@/components/pre-footer-cta";

// The pre-footer contact band is global, but muted on pages that already render
// their own full lead form, so visitors never see two forms stacked. Edit this
// set to show/hide the band per route.
const SUPPRESSED = new Set<string>([
  "/30-days-30-websites",
  "/ai-marketing-automation-company-in-nagpur",
  "/book-a-demo",
  "/digital-marketing",
  "/digital-marketing-company-in-nagpur",
  "/digital-marketing-nagpur",
  "/restaurant-marketing",
  "/seo-company-in-nagpur",
  "/shopify-development-company-in-nagpur",
  "/social-media-marketing-company-in-nagpur",
  "/web-app-development-company-in-nagpur",
  "/web-development-company-in-nagpur",
  "/website-design-company-in-nagpur",
]);

export function PreFooterGate() {
  const pathname = usePathname();
  if (pathname && SUPPRESSED.has(pathname)) return null;
  return <PreFooterCta />;
}
