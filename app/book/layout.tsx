import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/book`;

export const metadata: Metadata = {
  title: "Book a planning call | Boots to Journeys",
  description:
    "Schedule a complimentary travel planning call with Boots to Journeys. Choose a time, share your trip goals, and we will follow up with a custom itinerary plan.",
  alternates: { canonical },
  openGraph: {
    title: "Book a planning call | Boots to Journeys",
    description:
      "Pick a time for your complimentary consult — veteran-owned travel concierge.",
    url: canonical,
  },
  robots: { index: true, follow: true },
};

export default function BookLayout({ children }: { children: ReactNode }) {
  return children;
}
