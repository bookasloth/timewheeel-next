import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { az } from "@/lib/alluminaty";
import { site } from "@/lib/site";
import { breadcrumbLd, faqLd, orgRef } from "@/lib/jsonld";
import { JsonLd } from "@/components/json-ld";
import { AzHero } from "@/components/alluminaty/hero";
import { AzStats } from "@/components/alluminaty/stats";
import { AzProblem } from "@/components/alluminaty/problem";
import { AzSolution } from "@/components/alluminaty/solution";
import { AzFeatures } from "@/components/alluminaty/features";
import { AzProcess } from "@/components/alluminaty/process";
import { AzCapabilities } from "@/components/alluminaty/capabilities";
import { AzTestimonials } from "@/components/alluminaty/testimonials";
import { AzCommunity } from "@/components/alluminaty/community";
import { AzFaq } from "@/components/alluminaty/faq";
import { AzFinalCta } from "@/components/alluminaty/final-cta";

const PATH = "/products/alluminaty";
const PAGE_URL = `${site.url}${PATH}`;

export const metadata: Metadata = {
  title: { absolute: az.meta.title },
  description: az.meta.description,
  ...social({ path: PATH, title: az.meta.title, description: az.meta.description }),
  alternates: { canonical: PATH },
};

// No `offers`: institution pricing is quote-based (the old price "0" claimed it was free).
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${PAGE_URL}#software`,
  name: "Alluminaty",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Alumni management software",
  operatingSystem: "Web",
  description: az.hero.body,
  url: PAGE_URL,
  audience: { "@type": "EducationalAudience", audienceType: "Schools, colleges and universities" },
  author: orgRef(),
  publisher: orgRef(),
};

export default function AlluminatyPage() {
  return (
    <>
      <JsonLd data={softwareLd} />
      <JsonLd data={faqLd(az.faq.items)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Alluminaty", path: PATH },
        ])}
      />
      <AzHero />
      <AzStats />
      <AzProblem />
      <AzSolution />
      <AzFeatures />
      <AzProcess />
      <AzCapabilities />
      <AzTestimonials />
      <AzCommunity />
      <AzFaq />
      <AzFinalCta />
    </>
  );
}