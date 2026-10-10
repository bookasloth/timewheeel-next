import type { ReactNode } from "react";
import { AcademyNav } from "@/components/academy/academy-nav";

// Every /academy page gets the Academy section bar under the site header.
export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <AcademyNav />
      {children}
    </div>
  );
}
