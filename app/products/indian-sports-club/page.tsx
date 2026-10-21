import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { isc } from "@/lib/indian-sports-club";
import { IscHero } from "@/components/indian-sports-club/hero";
import { IscAudiences } from "@/components/indian-sports-club/audiences";
import { IscProblem } from "@/components/indian-sports-club/problem";
import { IscSolution } from "@/components/indian-sports-club/solution";
import { IscCompare } from "@/components/indian-sports-club/compare";
import { IscFeatures } from "@/components/indian-sports-club/features";
import { IscProcess } from "@/components/indian-sports-club/process";
import { IscFaq } from "@/components/indian-sports-club/faq";
import { IscFinalCta } from "@/components/indian-sports-club/final-cta";

export const metadata: Metadata = {
  title: { absolute: isc.meta.title },
  description: isc.meta.description,
  ...social({ path: isc.path, title: isc.meta.title, description: isc.meta.description }),
  alternates: { canonical: isc.path },
};

const url = `${site.url}${isc.path}`;

const communityLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${url}#organization`,
  name: "Indian Sports Club",
  url,
  description: isc.hero.answer,
  sameAs: [],
};

const blocks = [
  communityLd,
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
      <IscAudiences />
      <IscProblem />
      <IscSolution />
      <IscCompare />

      <IscFeatures />
      <IscProcess />
      <IscFaq />
      <IscFinalCta />
    </>
  );
}
