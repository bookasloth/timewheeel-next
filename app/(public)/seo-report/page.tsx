import type { Metadata } from "next";
import { Suspense } from "react";
import { SeoReportClient } from "@/components/seo/report-client";

export const metadata: Metadata = {
  title: "Your SEO Audit Report",
  description: "Your full AI + SEO audit report, every issue we found and how to fix it.",
  robots: { index: false, follow: false },
};

export default function SeoReportPage() {
  return (
    <Suspense fallback={null}>
      <SeoReportClient />
    </Suspense>
  );
}
