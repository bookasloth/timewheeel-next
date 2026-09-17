import { site } from "@/lib/site";
import { LeadForm } from "@/components/shared/lead-form";

export function ContactForm() {
  return (
    <LeadForm
      eyebrow="Send us a message"
      heading="Tell us what you're building."
      blurb="Share a few details and we'll come back with a clear, scoped next step — no pushy follow-up after the first reply."
      infoRows={[
        { k: "Email", v: site.contact.email },
        { k: "Location", v: `${site.contact.city}, ${site.contact.region}` },
        { k: "Response time", v: site.contact.responseTime },
        { k: "Working hours", v: site.contact.hours },
      ]}
      serviceOptions={[
        "Website Design & Development",
        "Web App Development",
        "eCommerce / Shopify",
        "SEO",
        "Digital Marketing",
        "AI & Automation",
        "Something else",
      ]}
      serviceLabel="What do you need?"
      submitLabel="Send message"
      successHeading="Message sent."
      successBody="Thanks for reaching out — we reply within one business day. Meanwhile, here's what usually comes next: a short scope conversation, then a fixed quote within 24 hours."
      idPrefix="contact"
      source="contact-page"
    />
  );
}