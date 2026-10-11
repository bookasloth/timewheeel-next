import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { ez } from "@/lib/ezshop";
import { ORG_ID, breadcrumbLd, faqLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { EzHero } from "@/components/ezshop/hero";
import { EzProblem } from "@/components/ezshop/problem";
import { EzFeatures } from "@/components/ezshop/features";
import { EzAdmin } from "@/components/ezshop/admin";
import { EzAudiences } from "@/components/ezshop/audiences";
import { EzCompare } from "@/components/ezshop/compare";
import { EzProcess } from "@/components/ezshop/process";
import { EzFaq } from "@/components/ezshop/faq";
import { EzFinalCta } from "@/components/ezshop/final-cta";

export const metadata: Metadata = {
  title: { absolute: ez.meta.title },
  description: ez.meta.description,
  ...social({ path: ez.path, title: ez.meta.title, description: ez.meta.description }),
  alternates: { canonical: ez.path },
};

const PAGE_URL = `${site.url}${ez.path}`;

// No `offers` (no published price) and no aggregateRating (no real reviews yet).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${PAGE_URL}#software`,
    name: "EZShop",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "E-commerce store builder",
    operatingSystem: "Web",
    description: ez.hero.definition,
    audience: { "@type": "BusinessAudience", name: "D2C brands and local shops in India" },
    featureList: ez.features.items.map((f) => f.name),
    author: { "@type": "Organization", "@id": ORG_ID, name: site.name },
    publisher: { "@id": ORG_ID },
  },
  faqLd(ez.faq.items),
  breadcrumbLd([
    // ponytail: no /products index page exists, so no middle crumb.
    { name: "Home", path: "/" },
    { name: "EZShop", path: ez.path },
  ]),
];

export default function EzShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <EzHero />
      <EzProblem />
      <EzFeatures />
      <EzAdmin />
      <EzAudiences />
      <EzCompare />
      <EzProcess />
      <EzFaq />
      <EzFinalCta />
    </>
  );
}
