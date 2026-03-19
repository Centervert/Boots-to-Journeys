"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeInImage } from "@/components/ui/FadeInImage";

type TabKey = "traveler" | "destination" | "month";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "traveler", label: "By Traveler" },
  { key: "destination", label: "By Destination" },
  { key: "month", label: "By Month" },
];

type Card = { title: string; image: string; subtitle?: string };

const cards: Record<TabKey, Array<Card>> = {
  traveler: [
    { title: "Family", image: "/travel-family.jpg" },
    { title: "Couples", image: "/travel-couples.jpg" },
    { title: "Groups", image: "/travel-groups.jpg" },
    { title: "Honeymoon", image: "/travel-honeymoon.jpg" },
    { title: "Solo", image: "/travel-solo.jpg" },
  ],
  destination: [
    { title: "Italy", image: "/destination-italy.jpg" },
    { title: "Ireland", image: "/destination-ireland.jpg" },
    { title: "Greece", image: "/destination-greece.jpg" },
    { title: "Alaska", image: "/destination-alaska.jpg" },
    { title: "Spain", image: "/destination-spain.jpg" },
  ],
  month: [
    {
      title: "Jan–Feb",
      subtitle: "Caribbean",
      image: "/month-caribbean.jpg",
    },
    {
      title: "Mar–Apr",
      subtitle: "Ireland",
      image: "/month-ireland.jpg",
    },
    {
      title: "May–Jun",
      subtitle: "Alaska",
      image: "/month-alaska.jpg",
    },
    {
      title: "Jul–Aug",
      subtitle: "Iceland",
      image: "/month-iceland.jpg",
    },
    {
      title: "Nov–Dec",
      subtitle: "Greece",
      image: "/month-greece.jpg",
    },
  ],
};

export function TravelDiscovery() {
  const [active, setActive] = useState<TabKey>("traveler");

  return (
    <section className="bg-cloud py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 h-px w-full bg-mist" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.35em] text-charcoal">
            How do you travel?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/70">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={`relative pb-3 transition ${
                  active === tab.key ? "text-charcoal" : "text-charcoal/60"
                }`}
              >
                {tab.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-charcoal transition ${
                    active === tab.key ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards[active].map((card) => (
            <div key={card.title} className="group">
              <div className="relative h-64 w-full overflow-hidden rounded-sm border border-mist bg-mist/30">
                <FadeInImage
                  src={card.image}
                  alt={card.subtitle ? `${card.title} — ${card.subtitle}` : card.title}
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal">
                  {card.title}
                </p>
                {card.subtitle && (
                  <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-charcoal/70">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/destinations">
            <Button size="lg">View More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
