import type { ReactNode } from "react";
import { LegalSidebar } from "@/components/legal/legal-sidebar";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
        <LegalSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}