"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type TabKey = "traveler" | "destination" | "month";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "traveler", label: "By Traveler" },
  { key: "destination", label: "By Destination" },
  { key: "month", label: "By Month" },
];

const cards: Record<TabKey, Array<{ title: string; image: string }>> = {
  traveler: [
    { title: "Family", image: "/travel-family.jpg" },
    { title: "Couples", image: "/travel-couples.jpg" },
    { title: "Groups", image: "/travel-groups.jpg" },
    { title: "Honeymoon", image: "/travel-honeymoon.jpg" },
    { title: "Solo", image: "/travel-solo.jpg" },
  ],
  destination: [
    { title: "Tanzania", image: "/hero-video/ezgif-frame-140.jpg" },
    { title: "Italy", image: "/hero-video/ezgif-frame-220.jpg" },
    { title: "France", image: "/hero-video/ezgif-frame-300.jpg" },
    { title: "Norway", image: "/hero-video/ezgif-frame-380.jpg" },
    { title: "Japan", image: "/hero-video/ezgif-frame-460.jpg" },
  ],
  month: [
    { title: "January", image: "/hero-video/ezgif-frame-520.jpg" },
    { title: "March", image: "/hero-video/ezgif-frame-560.jpg" },
    { title: "June", image: "/hero-video/ezgif-frame-620.jpg" },
    { title: "September", image: "/hero-video/ezgif-frame-700.jpg" },
    { title: "December", image: "/hero-video/ezgif-frame-760.jpg" },
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
              <div className="overflow-hidden rounded-sm border border-mist">
                <img
                  src={card.image}
                  alt=""
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-charcoal">
                {card.title}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg">View More</Button>
        </div>
      </div>
    </section>
  );
}
