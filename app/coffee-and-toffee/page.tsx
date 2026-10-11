import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { cf } from "@/lib/coffee-and-toffee";
import { JsonLd } from "@/components/json-ld";
import { CfHero } from "@/components/coffee-and-toffee/hero";
import { CfStats } from "@/components/coffee-and-toffee/stats";
import { CfProblem } from "@/components/coffee-and-toffee/problem";
import { CfSolution } from "@/components/coffee-and-toffee/solution";
import { CfFeatures } from "@/components/coffee-and-toffee/features";
import { CfCompare } from "@/components/coffee-and-toffee/compare";
import { CfBenefits } from "@/components/coffee-and-toffee/benefits";
import { CfProcess } from "@/components/coffee-and-toffee/process";
import { CfCapabilities } from "@/components/coffee-and-toffee/capabilities";
import { CfLicence } from "@/components/coffee-and-toffee/licence";
import { CfFaq } from "@/components/coffee-and-toffee/faq";
import { CfFinalCta } from "@/components/coffee-and-toffee/final-cta";

const PATH = "/coffee-and-toffee";
const PAGE_URL = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: { absolute: cf.meta.title },
  description: cf.meta.description,
  // Overrides the site-wide keywords from the root layout for this page.
  keywords: [...cf.meta.keywords],
  alternates: { canonical: PATH },
  ...social({ path: PATH, title: cf.meta.title, description: cf.meta.description }),
};

// The hosted platform: free to use, 0% platform fee on tips.
const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${PAGE_URL}#app`,
  name: "Coffee & Toffee",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: cf.solution.body,
  url: PAGE_URL,
  author: orgRef(),
  publisher: orgRef(),
  isAccessibleForFree: true,
  areaServed: { "@type": "Country", name: "India" },
  featureList: [...cf.solution.items],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free page with 0% platform fee on tips. Razorpay's processing fee applies.",
  },
};

// The paid single-creator site licence (upsell). Sales not open yet: PreOrder.
const licenceLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${PAGE_URL}#licence`,
  name: "Coffee & Toffee single-creator site licence",
  description: cf.licence.body,
  brand: { "@type": "Brand", name: "Coffee & Toffee" },
  manufacturer: orgRef(),
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: "2499",
    highPrice: "3650",
    offerCount: 2,
    availability: "https://schema.org/PreOrder",
    seller: orgRef(),
  },
};

export default function CoffeeAndToffeePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Coffee & Toffee", path: PATH }])} />
      <JsonLd data={appLd} />
      <JsonLd data={licenceLd} />
      <JsonLd data={faqLd([...cf.faq.items])} />
      <CfHero data={cf} />
      <CfStats data={cf} />
      <CfProblem data={cf} />
      <CfSolution data={cf} />
      <CfFeatures data={cf} />
      <CfCompare data={cf} />
      <CfBenefits data={cf} />
      <CfProcess data={cf} />
      <CfCapabilities data={cf} />
      <CfLicence data={cf} />
      <CfFaq data={cf} />
      <CfFinalCta data={cf} />
    </>
  );
}
