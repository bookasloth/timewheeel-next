import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Space_Grotesk, Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./case-study.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div
        className={`sx flex-1 ${grotesk.variable} ${inter.variable} ${jakarta.variable} ${poppins.variable}`}
      >
        <main className="sx-main">{children}</main>
      </div>
      <Footer />
    </>
  );
}