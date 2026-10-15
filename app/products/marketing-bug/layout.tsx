import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Poppins, Inter } from "next/font/google";
import "./marketing-bug.css";

const display = Poppins({
  variable: "--mb-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--mb-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function MarketingBugLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`mb flex-1 ${display.variable} ${inter.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
