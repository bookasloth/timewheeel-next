import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy" intro="Placeholder — real policy pending legal review.">
      <p>This page will describe what data Timewheel collects, how it is used, stored, and your rights over it.</p>
    </PageShell>
  );
}
