import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <PageShell
      eyebrow="Solutions"
      title="Solutions for every workflow"
      intro="Use-case pages coming soon. Bookings, payments, events, and communities — built for ownership."
    />
  );
}
