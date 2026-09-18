import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Fraunces, Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./alluminaty.css";

const grotesk = Space_Grotesk({
  variable: "--az-font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--az-font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--az-font-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const serif = Fraunces({
  variable: "--az-font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AlluminatyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div
        className={`az flex-1 ${grotesk.variable} ${inter.variable} ${jakarta.variable} ${serif.variable}`}
      >
        <main>{children}</main>
      </div>
      <Footer accent="#1173cf" />
    </>
  );
}