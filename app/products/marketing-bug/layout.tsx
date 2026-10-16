import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Poppins } from "next/font/google";
import "./marketing-bug.css";

// Brand uses Poppins throughout: 400 body, 600 labels, 700/800 headings.
const poppins = Poppins({
  variable: "--mb-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function MarketingBugLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`mb flex-1 ${poppins.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
