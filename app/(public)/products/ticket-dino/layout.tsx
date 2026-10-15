import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./ticket-dino.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--td-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--td-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Nested inside the (public) layout, which already provides Navbar + <main> + Footer.
export default function TicketDinoLayout({ children }: { children: ReactNode }) {
  return <div className={`td flex-1 ${jakarta.variable} ${inter.variable}`}>{children}</div>;
}
