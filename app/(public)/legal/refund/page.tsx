import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Refund & SLA" };

export default function RefundPage() {
  return (
    <PageShell title="Refund & SLA" intro="Placeholder — real policy pending legal review.">
      <p>This page will cover refunds, service-level commitments, and support response targets.</p>
    </PageShell>
  );
}
