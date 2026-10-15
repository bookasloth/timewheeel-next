import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { td } from "@/lib/ticket-dino";
import { TdHero } from "@/components/ticket-dino/hero";
import { TdProblem } from "@/components/ticket-dino/problem";
import { TdSolution } from "@/components/ticket-dino/solution";
import { TdCompare } from "@/components/ticket-dino/compare";
import { TdFeatures } from "@/components/ticket-dino/features";
import { TdProcess } from "@/components/ticket-dino/process";
import { TdAudiences } from "@/components/ticket-dino/audiences";
import { TdFaq } from "@/components/ticket-dino/faq";
import { TdFinalCta } from "@/components/ticket-dino/final-cta";

export const metadata: Metadata = {
  title: { absolute: td.meta.title },
  description: td.meta.description,
  alternates: { canonical: td.path },
  ...social({ path: td.path, title: td.meta.title, description: td.meta.description }),
};

const url = `${site.url}${td.path}`;

// ponytail: no `offers`/`aggregateRating`: pricing is 2% per ticket (not a fixed
// price) and there are no public reviews yet. Add them only when both are real.
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${url}#software`,
  name: "Ticket Dino",
  url,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Event ticketing software",
  operatingSystem: "Web",
  description: td.hero.answer,
  featureList: td.features.items.map((f) => f.name).concat(td.features.also),
  author: orgRef(),
  publisher: orgRef(),
};

const blocks = [
  softwareLd,
  faqLd(td.faq.items),
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Ticket Dino", path: td.path },
  ]),
];

export default function TicketDinoPage() {
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}
      <TdHero />
      <TdProblem />
      <TdSolution />
      <TdCompare />
      <TdFeatures />
      <TdProcess />
      <TdAudiences />
      <TdFaq />
      <TdFinalCta />
    </>
  );
}
