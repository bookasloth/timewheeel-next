import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./coffee-landing.css";
import "./support.css";

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
    <div
      className={`${serif.variable} ${sans.variable} ${hand.variable} cf ct-page`}
    >
      {children}
    </div>
  );
}