import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Resources"
      title="The Timewheel blog"
      intro="Guides on ownership, operations, and building without platform lock-in. Posts coming soon."
    />
  );
}
