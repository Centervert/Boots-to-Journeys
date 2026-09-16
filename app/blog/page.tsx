import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blog & Deals | Boots to Journeys",
  description:
    "Travel tips, destination guides, and exclusive deals from Boots to Journeys for travelers nationwide.",
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
        Destination stories and exclusive deals will live here. In the
        meantime, start with a complimentary planning call — we watch
        sailings, resort perks, and group departures for clients nationwide.
      </p>
      <div className="mt-8">
        <Link href="/book">
          <Button size="lg">Book a planning call</Button>
        </Link>
      </div>
    </section>
  );
}
