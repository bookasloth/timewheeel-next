import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import "./ezshop.css";

const inter = Inter({
  variable: "--ez-font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--ez-font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export default function EzShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`ez flex-1 ${inter.variable} ${jakarta.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
