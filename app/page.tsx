import type { Metadata } from "next";
import { HeroScroll } from "@/components/home/HeroScroll";
import { LuxuryExpertsSection } from "@/components/home/LuxuryExpertsSection";
import { TravelDiscovery } from "@/components/home/TravelDiscovery";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { siteUrlString } from "@/lib/site-config";

const canonical = siteUrlString();

export const metadata: Metadata = {
  title: "Boots to Journeys | Veteran-owned travel concierge",
  description:
    "Plan custom vacations with a veteran-owned South Carolina travel concierge: luxury trips, cruises, all-inclusive resorts, group travel, honeymoons, and faith-based journeys — with personalized itineraries and white-glove support.",
  keywords: [
    "Boots to Journeys",
    "South Carolina travel agent",
    "veteran owned travel agency",
    "luxury travel concierge",
    "custom vacation itinerary",
    "cruise travel planner",
    "group travel South Carolina",
  ],
  alternates: { canonical },
  openGraph: {
    title: "Boots to Journeys | Veteran-owned travel concierge",
    description:
      "Custom itineraries, cruises, and luxury travel — planned with military precision and a personal touch.",
    url: canonical,
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HeroScroll />
      <LuxuryExpertsSection />
      <TravelDiscovery />
    </>
  );
}
