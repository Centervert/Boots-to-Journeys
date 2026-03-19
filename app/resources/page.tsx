import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Boots to Journeys",
  description:
    "Travel resources and guides from Boots to Journeys.",
};

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Resources
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        Travel resources
      </h1>
      <p className="mt-6 text-charcoal/80">
        Full content coming soon. Guides and tools to help you plan.
      </p>
    </section>
  );
}
