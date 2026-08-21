import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { FeaturedProducts } from "@/components/home/featured-products";
import { PoweredBy } from "@/components/home/powered-by";
import { SocialProof } from "@/components/home/social-proof";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/final-cta";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description:
    "One connected ecosystem for bookings, payments, events, and communities — built for ownership.",
  makesOffer: products.map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "SoftwareApplication", name: p.name },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <PoweredBy />
      <SocialProof />
      <Testimonials />
      <FinalCta />
    </>
  );
}
