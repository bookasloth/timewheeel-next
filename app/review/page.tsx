import type { Metadata } from "next";
import { ReviewFlow } from "@/components/review/review-flow";

export const metadata: Metadata = {
  title: { absolute: "Share your Timewheel experience" },
  description:
    "Tell us about your experience with Timewheel and we will help you turn it into a clear Google review you can post in one tap.",
  // Utility funnel page, not meant to rank or appear in search.
  robots: { index: false, follow: false },
  alternates: { canonical: "/review" },
};

export default function ReviewPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <ReviewFlow />
    </main>
  );
}
