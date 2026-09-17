import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Fraunces, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./coffee-landing.css";

const inter = Inter({
  variable: "--cf-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--cf-font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Fraunces({
  variable: "--cf-font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CoffeeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div
        className={`cf flex-1 ${inter.variable} ${jakarta.variable} ${serif.variable}`}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
