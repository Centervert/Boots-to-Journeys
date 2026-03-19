import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Boots to Journeys",
  description:
    "Learn about Boots to Journeys — veteran-owned travel concierge in South Carolina.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        About
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        Our story
      </h1>
      <p className="mt-6 text-charcoal/80">
        Full content coming soon. Veteran-owned travel concierge helping South
        Carolina travelers plan unforgettable journeys.
      </p>
    </section>
  );
}
