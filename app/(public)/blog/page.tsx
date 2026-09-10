import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageShell
        eyebrow="Resources"
        title="The Timewheel blog"
        intro="Guides on ownership, operations, and building without platform lock-in. Posts coming soon."
      />
    </>
  );
}
