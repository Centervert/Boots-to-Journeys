import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LuxuryExpertsSection } from "@/components/home/LuxuryExpertsSection";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { TravelDiscovery } from "@/components/home/TravelDiscovery";
import { CredentialsBar } from "@/components/layout/Credentials";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { siteConfig, siteUrlString } from "@/lib/site-config";

const canonical = siteUrlString();

export const metadata: Metadata = {
  title: "Boots to Journeys | Veteran-owned travel concierge",
  description: siteConfig.description,
  keywords: [
    "Boots to Journeys",
    "veteran owned travel agency",
    "nationwide travel concierge",
    "luxury travel concierge",
    "custom vacation itinerary",
    "cruise travel planner",
    "all-inclusive resort planner",
    "group travel planner",
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
      <Hero />
      <LuxuryExpertsSection />
      <ProcessSteps className="pt-8 pb-16 sm:pb-20" />
      <TravelDiscovery />
      <CredentialsBar />
    </>
  );
}
