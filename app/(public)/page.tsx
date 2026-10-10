import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { EcosystemBento } from "@/components/home/ecosystem-bento";
import { PoweredBy } from "@/components/home/powered-by";
import { SocialProof } from "@/components/home/social-proof";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/json-ld";
import { homeLd, faqLd } from "@/lib/jsonld";
import { homeFaq } from "@/lib/home-faq";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: site.url } };

export default function Home() {
  return (
    <>
      <JsonLd data={homeLd()} />
      {/* FAQPage mirrors the visible FAQ below (same homeFaq.items source). */}
      <JsonLd data={faqLd(homeFaq.items)} />
      <Hero />
      <ValueProps />
      <EcosystemBento />
      <PoweredBy />
      {/* <SocialProof /> */}
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
