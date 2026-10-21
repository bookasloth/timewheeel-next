import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { mb } from "@/lib/marketing-bug";
import { MbHero } from "@/components/marketing-bug/hero";
import { MbValueProps } from "@/components/marketing-bug/value-props";
import { MbAbout } from "@/components/marketing-bug/about";
import { MbServices } from "@/components/marketing-bug/services";
import { MbMomentum } from "@/components/marketing-bug/momentum";
import { MbProcess } from "@/components/marketing-bug/process";
import { MbIntegrations } from "@/components/marketing-bug/integrations";
import { MbFaq } from "@/components/marketing-bug/faq";
import { MbFinalCta } from "@/components/marketing-bug/final-cta";

export const metadata: Metadata = {
  title: { absolute: mb.meta.title },
  description: mb.meta.description,
  ...social({ path: mb.path, title: mb.meta.title, description: mb.meta.description }),
  alternates: { canonical: mb.path },
};

const url = `${site.url}${mb.path}`;

// ponytail: no `offers` / `aggregateRating`: the plans are template placeholders
// and the 4.8 rating is unverified, so neither belongs in structured data.
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${url}#software`,
  name: "Marketing Bug",
  url,
  applicationCategory: "NewsApplication",
  applicationSubCategory: "Daily AI marketing newsletter",
  operatingSystem: "Web",
  description: mb.meta.description,
  featureList: [
    ...mb.valueProps.items.map((v) => v.name),
    ...mb.services.items.map((s) => s.name),
  ],
  author: orgRef(),
  publisher: orgRef(),
};

const blocks = [
  softwareLd,
  faqLd(mb.faq.items),
  breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Marketing Bug", path: mb.path },
  ]),
];

export default function MarketingBugPage() {
  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
      ))}
      <MbHero />
      <MbValueProps />
      <MbAbout />
      <MbServices />
      <MbMomentum />
      <MbProcess />
      <MbIntegrations />
      <MbFaq />
      <MbFinalCta />
    </>
  );
}
