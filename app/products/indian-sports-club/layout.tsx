import type { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import "./indian-sports-club.css";

const display = Oswald({
  variable: "--isc-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--isc-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function IndianSportsClubLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`isc flex-1 ${display.variable} ${inter.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
