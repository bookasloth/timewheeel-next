"use client";

import { useEffect } from "react";

export function PrintBar({ title }: { title: string }) {
  // The browser uses the document title as the PDF file name.
  useEffect(() => {
    document.title = `Invoice ${title.replaceAll("/", "-")}`;
  }, [title]);
  return (
    <div className="mx-auto mb-4 flex max-w-[794px] items-center justify-between px-4 print:hidden">
      <p className="text-sm text-gray-600">Pick &quot;Save as PDF&quot; in the print dialog to download.</p>
      <button type="button" onClick={() => window.print()} className="h-9 rounded-[3px] bg-[#F45B0A] px-4 text-sm font-medium text-white hover:bg-[#D94E06]">
        Print / Save PDF
      </button>
    </div>
  );
}
