import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function EditorialIntro() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
          The Luxury Travel Experts
        </p>
        <h2 className="mt-4 font-display text-4xl text-horizon sm:text-5xl">
          The world is vast. We make it feel effortless.
        </h2>
        <p className="mt-6 text-base text-charcoal sm:text-lg">
          Boots to Journeys is a veteran-owned concierge agency specializing in
          custom itineraries, elevated service, and exclusive perks. We start
          with how you want to feel, then design the journey to match it.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/book">
            <Button size="lg">Start Planning</Button>
          </Link>
          <Link href="/destinations">
            <Button size="lg" variant="outline">
              Explore Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
