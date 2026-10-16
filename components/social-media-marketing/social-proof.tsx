import { Reveal } from "@/components/reveal";
import { smm } from "@/lib/social-media-marketing";
import { RevealHeading } from "@/components/anim/reveal-heading";
import { SmmTestimonialCarousel } from "@/components/social-media-marketing/testimonial-carousel";

// DEMO DATA. smm.testimonials is invented sample copy for layout preview —
// swap every item for a real, permissioned client quote before this page ships.
// Colour comes from the .smm-page scope (brand = crimson rose) so the section
// stays in the page's pink family.
export function SmmSocialProof() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <Reveal>
        <RevealHeading as="h2" className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          {smm.testimonials.heading}
        </RevealHeading>
      </Reveal>

      <Reveal className="mt-12">
        <SmmTestimonialCarousel />
      </Reveal>
    </section>
  );
}
