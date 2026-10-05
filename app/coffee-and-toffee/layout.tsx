import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Baloo_2, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import "./coffee-landing.css";

const display = Baloo_2({
  variable: "--cf-font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const sans = DM_Sans({
  variable: "--cf-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      {/* `.cf` owns the page ground (warm oat canvas) and grows to fill the body
          column, so no seam shows between the nav, the page and the footer. */}
      <div className={`cf ${display.variable} ${sans.variable}`}>
        <main className="cf-main">{children}</main>
      </div>
      <Footer />
    </>
  );
}