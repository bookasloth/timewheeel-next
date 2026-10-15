import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import "./archflow.css";

const display = Space_Grotesk({
  variable: "--af-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--af-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ArchflowLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={`af flex-1 ${display.variable} ${inter.variable}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
