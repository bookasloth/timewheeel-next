import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Instrument_Serif, Inter } from "next/font/google";
import "./creators.css";

const serif = Instrument_Serif({
  variable: "--ct-font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--ct-font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function CreatorsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`ct flex-1 ${serif.variable} ${sans.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}