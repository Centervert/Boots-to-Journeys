import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Boots to Journeys",
  description:
    "Travel services from Boots to Journeys: luxury, group, family, cruises, and more.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Services
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        How we help you travel
      </h1>
      <p className="mt-6 text-charcoal/80">
        Full content coming soon. Custom itineraries, group trips, luxury
        travel, cruises, and exclusive deals.
      </p>
    </section>
  );
}
