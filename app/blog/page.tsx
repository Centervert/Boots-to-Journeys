import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Deals | Boots to Journeys",
  description:
    "Travel tips, destination guides, and exclusive deals from Boots to Journeys.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Blog & Deals
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        Tips and offers
      </h1>
      <p className="mt-6 text-charcoal/80">
        Full content coming soon. Travel inspiration and exclusive deals for
        South Carolina travelers.
      </p>
    </section>
  );
}
