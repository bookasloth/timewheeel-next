import type { ReactNode } from "react";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import "./leader.css";

const display = Space_Grotesk({
  variable: "--lf-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--lf-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--lf-font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function LeaderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`lf flex-1 ${display.variable} ${inter.variable} ${mono.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}

