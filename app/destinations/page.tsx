import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeInImage } from "@/components/ui/FadeInImage";
import { siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/destinations`;

export const metadata: Metadata = {
  title: "Destinations | Boots to Journeys",
  description:
    "Italy, Ireland, Greece, Alaska, Spain, the Caribbean, and more — custom destination planning for travelers nationwide.",
  alternates: { canonical },
};

const destinations = [
  {
    title: "Italy",
    image: "/destination-italy.jpg",
    body: "Cities, countryside, and coast — paced so you can actually enjoy the table you sat down for.",
  },
  {
    title: "Ireland",
    image: "/destination-ireland.jpg",
    body: "Castles, cliffs, and quiet towns. Strong in spring, and a favorite for family and heritage trips.",
  },
  {
    title: "Greece",
    image: "/destination-greece.jpg",
    body: "Islands and mainland, including late-year escapes when the crowds thin.",
  },
  {
    title: "Alaska",
    image: "/destination-alaska.jpg",
    body: "Ocean cruising and land time — a frequent request for groups and first-time cruisers.",
  },
  {
    title: "Spain",
    image: "/destination-spain.jpg",
    body: "Cities, food, and coast itineraries built around how you like to spend a day.",
  },
  {
    title: "Caribbean",
    image: "/month-caribbean.jpg",
    body: "Winter sun, all-inclusives, and cruise itineraries when you want the details handled.",
  },
];

export default function DestinationsPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Destinations
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        Where we take you
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-charcoal/85">
        Let the destination guide the plan — not a catalog of leftover
        inventory. We design lodging, transfers, and excursions around the
        trip you actually want, for clients anywhere in the United States.
      </p>
      <p className="mt-4 max-w-3xl text-charcoal/80">
        Shannon specializes in Disney, European river cruises, and ocean
        cruises in Europe, Alaska, and the Caribbean. Michael focuses on
        European river cruising and military history tours. If you have
        another place in mind, start with a consult — we research from
        scratch.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {destinations.map((destination) => (
          <div key={destination.title}>
            <div className="relative h-56 w-full overflow-hidden rounded-sm border border-mist bg-mist/30">
              <FadeInImage
                src={destination.image}
                alt={destination.title}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-horizon">
              {destination.title}
            </h2>
            <p className="mt-2 text-sm text-charcoal/80">{destination.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-mist bg-cloud/40 p-8">
        <h2 className="font-display text-xl text-horizon">
          Shore days and excursions
        </h2>
        <p className="mt-3 text-charcoal/80">
          Yes — we set up excursions and individual tours through vetted
          partners, including options for cruise ports. Ask during your
          planning call and we will match the day ashore to your pace.
        </p>
      </section>

      <div className="mt-10">
        <Link href="/book">
          <Button size="lg">Ask about a destination</Button>
        </Link>
      </div>
    </article>
  );
}
