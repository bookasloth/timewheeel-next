import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <PageShell title="Terms of Service" intro="Placeholder — real terms pending legal review.">
      <p>This page will set out the terms governing use of Timewheel products and services.</p>
    </PageShell>
  );
}
