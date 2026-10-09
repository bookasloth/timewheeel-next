import type { Metadata } from "next";
import { social } from "@/lib/metadata";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

const TITLE = "Solutions for Bookings, Events and Communities";
const DESC =
  "Explore Timewheel solutions: booking, ticketing, membership and creator platforms, plus custom websites and apps, all on systems your business owns.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/solutions" },
  ...social({ path: "/solutions", title: TITLE, description: DESC }),
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <PageShell
        eyebrow="Solutions"
        title="Solutions for every workflow"
        intro="Use-case pages coming soon. Bookings, payments, events, and communities, built for ownership."
      />
    </>
  );
}
