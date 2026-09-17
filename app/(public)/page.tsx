import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { EcosystemBento } from "@/components/home/ecosystem-bento";
import { PoweredBy } from "@/components/home/powered-by";
import { SocialProof } from "@/components/home/social-proof";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/json-ld";
import { homeLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <JsonLd data={homeLd()} />
      <Hero />
      <ValueProps />
      <EcosystemBento />
      <PoweredBy />
      <SocialProof />
      <Testimonials />
      <FinalCta />
    </>
  );
}
