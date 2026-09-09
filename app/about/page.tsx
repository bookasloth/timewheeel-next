import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageShell
        eyebrow="Company"
        title="Replacing dependency with ownership"
        intro="Timewheel builds connected systems businesses own — instead of renting fragmented SaaS. Full story coming soon."
      />
    </>
  );
}
