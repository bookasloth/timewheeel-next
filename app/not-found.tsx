import type { Metadata } from "next";
import NotFoundPage from "@/components/not-found";

export const metadata: Metadata = {
  title: "404, Page Not Found",
  description:
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
};

export default function NotFound() {
  return <NotFoundPage />;
}