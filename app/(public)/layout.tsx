import type { ReactNode } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { ButtonGlow } from "@/components/button-glow";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ButtonGlow />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}