import type { Metadata } from "next";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/jsonld";
import { ComingSoon } from "@/components/shared/coming-soon";

const PATH = "/products/ticket-dino";
const url = `${site.url}${PATH}`;
const title = "Ticket Dino | Event Ticketing & Management, Timewheel";
const description =
  "Ticket Dino, an event ticketing and management platform for modern organizers, from ticket sales and attendee management to analytics. Launching soon.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", url, siteName: site.name, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Ticket Dino", path: PATH },
];

export default function TicketDinoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }} />
      <ComingSoon
        eyebrow="Ticket Dino"
        title="Ticket Dino"
        blurb="An event ticketing and management platform engineered for modern organizers, ticket sales, attendee management, analytics and workflows at scale. This product is on the way."
        accent="#269cef"
      />
    </>
  );
}
