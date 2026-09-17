import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./support.css";

const serif = Fraunces({
  variable: "--ct-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--ct-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hand = Caveat({
  variable: "--ct-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Coffee & Toffee — Support",
  description:
    "Friendly help for Coffee & Toffee. Search articles, email us, or chat — real support for creators and supporters.",
};

export default function CoffeeToffeeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${serif.variable} ${sans.variable} ${hand.variable} ct-page`}
    >
      {children}
    </div>
  );
}