import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsBridge } from "@/components/analytics-bridge";
import { EngagementTracker } from "@/components/engagement-tracker";
import { WebVitals } from "@/components/web-vitals";
import { ConsentBanner } from "@/components/consent-banner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const siteUrl = "https://timewheel.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Timewheel, Build on systems you control forever",
    template: "%s, Timewheel",
  },
  description:
    "Timewheel helps creators, consultants and growing businesses run bookings, payments, events and communities on systems they own, with no platform commissions.",
  keywords: [
    "Timewheel",
    "self-hosted business tools",
    "bookings",
    "payments",
    "events",
    "communities",
    "own your infrastructure",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Timewheel",
    title: "Timewheel, Build on systems you control forever",
    description:
      "One connected ecosystem for bookings, payments, events, and communities, built for ownership, not dependency.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timewheel, Build on systems you control forever",
    description:
      "One connected ecosystem for bookings, payments, events, and communities, built for ownership.",
  },
  // No site-wide canonical: a page that inherited one would tell Google it's a
  // duplicate of the homepage. Every indexable page sets its own.
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
        <AnalyticsBridge />
        <EngagementTracker />
        <WebVitals />
        <ConsentBanner />
      </body>
    </html>
  );
}