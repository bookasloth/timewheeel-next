import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Caveat } from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import "./coffee-landing.css";

const serif = Fraunces({
  variable: "--cf-font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--cf-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hand = Caveat({
  variable: "--cf-font-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Coffee & Toffee, Support",
  description:
    "Friendly help for Coffee & Toffee. Search articles, email us, or chat, real support for creators and supporters.",
};

export default function CoffeeToffeeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* `.cf` owns the page ground (warm cream) and grows to fill the body
          column, so no white seam shows between the nav, the page and the footer. */}
      <div
        className={`cf ${serif.variable} ${sans.variable} ${hand.variable}`}
      >
        <main className="cf-main">{children}</main>
      </div>
      <Footer />
    </>
  );
}