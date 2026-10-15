import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { leader } from "@/lib/leader";
import { LfHero } from "@/components/leader/hero";
import { LfProblem } from "@/components/leader/problem";
import { LfSolution } from "@/components/leader/solution";
import { LfFeatures } from "@/components/leader/features";
import { LfProcess } from "@/components/leader/process";
import { LfIntegrations } from "@/components/leader/integrations";
import { LfStats } from "@/components/leader/stats";
import { LfAudiences } from "@/components/leader/audiences";
import { LfFaq } from "@/components/leader/faq";
import { LfFinalCta } from "@/components/leader/final-cta";

export const metadata: Metadata = {
  title: { absolute: leader.meta.title },
  description: leader.meta.description,
  ...social({ path: leader.path, title: leader.meta.title, description: leader.meta.description }),
  alternates: { canonical: leader.path },
};

const url = `${site.url}${leader.path}`;

// ponytail: no `offers` / `aggregateRating`: pricing is quote-only and there are
// no public reviews yet.
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${url}#software`,
  name: "Leader",
  url,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Lead generation and list-building tool",
  operatingSystem: "Web",
  description: leader.hero.answer,
  audience: { "@type": "BusinessAudience", name: "Agencies, consultants and sales teams" },
  featureList: leader.features.items.map((f) => f.name).concat(leader.features.also),
  author: orgRef(),
  publisher: orgRef(),
};

const blocks = [
  softwareLd,
  faqLd(leader.faq.items),
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Leader", path: leader.path },
  ]),
];

export default function LeaderPage() {
  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
      ))}
      <LfHero />
      <LfProblem />
      <LfSolution />
      <LfFeatures />
      <LfProcess />
      <LfIntegrations />
      <LfStats />
      <LfAudiences />
      <LfFaq />
      <LfFinalCta />
    </>
  );
}
