import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { isc } from "@/lib/indian-sports-club";
import { IscHero } from "@/components/indian-sports-club/hero";
import { IscProblem } from "@/components/indian-sports-club/problem";
import { IscSolution } from "@/components/indian-sports-club/solution";
import { IscCompare } from "@/components/indian-sports-club/compare";
import { IscFeatures } from "@/components/indian-sports-club/features";
import { IscProcess } from "@/components/indian-sports-club/process";
import { IscAudiences } from "@/components/indian-sports-club/audiences";
import { IscFaq } from "@/components/indian-sports-club/faq";
import { IscFinalCta } from "@/components/indian-sports-club/final-cta";

export const metadata: Metadata = {
  title: { absolute: isc.meta.title },
  description: isc.meta.description,
  ...social({ path: isc.path, title: isc.meta.title, description: isc.meta.description }),
  alternates: { canonical: isc.path },
};

const url = `${site.url}${isc.path}`;

// ponytail: no `offers` / `aggregateRating`: pricing is quote-only and there are
// no public reviews yet. Add them only when both are real and visible on the page.
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${url}#software`,
  name: "Indian Sports Club",
  url,
  applicationCategory: "CommunicationApplication",
  applicationSubCategory: "Online and offline sports community platform",
  operatingSystem: "Web",
  description: isc.hero.answer,
  featureList: isc.features.items.map((f) => f.name).concat(isc.features.also),
  author: orgRef(),
  publisher: orgRef(),
};

const blocks = [
  softwareLd,
  faqLd(isc.faq.items),
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Indian Sports Club", path: isc.path },
  ]),
];

export default function IndianSportsClubPage() {
  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
      ))}
      <IscHero />
      <IscProblem />
      <IscSolution />
      <IscCompare />
      <IscFeatures />
      <IscProcess />
      <IscAudiences />
      <IscFaq />
      <IscFinalCta />
    </>
  );
}
