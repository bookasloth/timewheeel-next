import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Replacing dependency with ownership"
      intro="Timewheel builds connected systems businesses own — instead of renting fragmented SaaS. Full story coming soon."
    />
  );
}
