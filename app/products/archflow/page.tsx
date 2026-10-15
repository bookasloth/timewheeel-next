import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { arch } from "@/lib/archflow";
import { AfHero } from "@/components/archflow/hero";
import { AfProblem } from "@/components/archflow/problem";
import { AfSolution } from "@/components/archflow/solution";
import { AfFeatures } from "@/components/archflow/features";
import { AfProcess } from "@/components/archflow/process";
import { AfIntegrations } from "@/components/archflow/integrations";
import { AfStats } from "@/components/archflow/stats";
import { AfAudiences } from "@/components/archflow/audiences";
import { AfFaq } from "@/components/archflow/faq";
import { AfFinalCta } from "@/components/archflow/final-cta";

export const metadata: Metadata = {
  title: { absolute: arch.meta.title },
  description: arch.meta.description,
  ...social({ path: arch.path, title: arch.meta.title, description: arch.meta.description }),
  alternates: { canonical: arch.path },
};

const url = `${site.url}${arch.path}`;

// ponytail: no `offers` / `aggregateRating`: pricing is quote-only and there are
// no public reviews yet.
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${url}#software`,
  name: "Archflow",
  url,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Architecture and construction project workspace",
  operatingSystem: "Web",
  description: arch.hero.answer,
  audience: { "@type": "BusinessAudience", name: "Architecture and construction studios" },
  featureList: arch.features.items.map((f) => f.name).concat(arch.features.also),
  author: orgRef(),
  publisher: orgRef(),
};

const blocks = [
  softwareLd,
  faqLd(arch.faq.items),
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Archflow", path: arch.path },
  ]),
];

export default function ArchflowPage() {
  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
      ))}
      <AfHero />
      <AfProblem />
      <AfSolution />
      <AfFeatures />
      <AfProcess />
      <AfIntegrations />
      <AfStats />
      <AfAudiences />
      <AfFaq />
      <AfFinalCta />
    </>
  );
}
