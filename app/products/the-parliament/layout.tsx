import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./the-parliament.css";

const display = Bricolage_Grotesque({
  variable: "--tp-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--tp-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function TheParliamentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`tp flex-1 ${display.variable} ${inter.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
