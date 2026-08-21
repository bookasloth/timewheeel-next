import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <PageShell title="Cookie Policy" intro="Placeholder — real policy pending legal review.">
      <p>This page will explain the cookies Timewheel uses and how to manage them.</p>
    </PageShell>
  );
}
