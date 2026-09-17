import { HeroSection } from "@/components/support/hero-section";
import { ContactOptions } from "@/components/support/contact-options";
import { HelpCenter } from "@/components/support/help-center";
import { FinalCta } from "@/components/support/final-cta";

export default function CoffeeToffeePage() {
  return (
    <main>
      <HeroSection />
      <ContactOptions />
      <HelpCenter />
      <FinalCta />
    </main>
  );
}