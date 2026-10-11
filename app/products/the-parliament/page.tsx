import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { tp } from "@/lib/the-parliament";
import { TpHero } from "@/components/the-parliament/hero";
import { TpProblem } from "@/components/the-parliament/problem";
import { TpSolution } from "@/components/the-parliament/solution";
import { TpCompare } from "@/components/the-parliament/compare";
import { TpFeatures } from "@/components/the-parliament/features";
import { TpProcess } from "@/components/the-parliament/process";
import { TpAudiences } from "@/components/the-parliament/audiences";
import { TpCapabilities } from "@/components/the-parliament/capabilities";
import { TpFaq } from "@/components/the-parliament/faq";
import { TpFinalCta } from "@/components/the-parliament/final-cta";

export const metadata: Metadata = {
  title: { absolute: tp.meta.title },
  description: tp.meta.description,
  ...social({ path: tp.path, title: tp.meta.title, description: tp.meta.description }),
  alternates: { canonical: tp.path },
};

const url = `${site.url}${tp.path}`;

// ponytail: no `offers` / `aggregateRating`: pricing is quote-only and there are
// no public reviews yet. Add them only when both are real and visible on the page.
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${url}#software`,
  name: "The Parliament",
  url,
  applicationCategory: "CommunicationApplication",
  applicationSubCategory: "Online community platform",
  operatingSystem: "Web",
  description: tp.hero.answer,
  featureList: tp.features.items.map((f) => f.name).concat(tp.features.also),
  author: orgRef(),
  publisher: orgRef(),
};

const blocks = [
  softwareLd,
  faqLd(tp.faq.items),
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "The Parliament", path: tp.path },
  ]),
];

export default function TheParliamentPage() {
  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
      ))}
      <TpHero />
      <TpProblem />
      <TpSolution />
      <TpCompare />
      <TpFeatures />
      <TpProcess />
      <TpAudiences />
      <TpCapabilities />
      <TpFaq />
      <TpFinalCta />
    </>
  );
}
