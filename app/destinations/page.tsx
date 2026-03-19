import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | Boots to Journeys",
  description:
    "Explore destinations we plan — from Italy and Greece to Alaska and the Caribbean.",
};

export default function DestinationsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Destinations
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        Where we take you
      </h1>
      <p className="mt-6 text-charcoal/80">
        Full content coming soon. Curated destinations and itineraries for
        every type of traveler.
      </p>
    </section>
  );
}
