import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/resources`;

export const metadata: Metadata = {
  title: "Resources | Boots to Journeys",
  description:
    "Planning FAQs and official U.S. travel resources from Boots to Journeys — passports, alerts, STEP, and how we work.",
  alternates: { canonical },
};

const faqs = [
  {
    q: "Do I need a passport?",
    a: "Depending on the destination and that country’s rules, a passport is almost always needed and highly encouraged — even on a closed-loop cruise.",
  },
  {
    q: "Do you charge a fee?",
    a: "It depends on the trip. When a cruise line or tour operator pays a commission, there is often no extra cost to you. Detailed customization or extra research time can require a planning fee. We always discuss that in advance.",
  },
  {
    q: "Is there a better time of year to travel?",
    a: "It starts with when you can go. Spring break, graduations, and holidays change both demand and price. We plan around your calendar, then look for the best seasonal fit.",
  },
  {
    q: "Do you provide military, senior, or other discounts?",
    a: "We start with your wish list and what you want from the getaway. Then we search suppliers for the right match — and check whether a discount, special, or amenity applies.",
  },
  {
    q: "Do you set up excursions or individual tours?",
    a: "Yes. We use vetted partners with credible reviews so the day you booked is the day you get.",
  },
  {
    q: "Do you provide customized itineraries?",
    a: "Yes. You receive a digital plan with flight details, resort or ship information, destination or port notes, and the occasional hidden stop we do not want you to miss — easy to open on your phone.",
  },
];

const officialLinks = [
  {
    group: "Time",
    links: [
      { label: "Official U.S. Time", href: "https://www.time.gov/" },
      { label: "World clock", href: "https://www.timeanddate.com/worldclock/" },
    ],
  },
  {
    group: "Passports & State Department",
    links: [
      {
        label: "Traveler’s checklist",
        href: "https://travel.state.gov/content/travel/en/international-travel/before-you-go.html",
      },
      { label: "Find a U.S. embassy abroad", href: "https://www.usembassy.gov/" },
      {
        label: "Travel advisories",
        href: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html",
      },
      {
        label: "Country information",
        href: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages.html",
      },
      {
        label: "STEP: Smart Traveler Enrollment Program",
        href: "https://step.state.gov/",
      },
    ],
  },
  {
    group: "Health & screening",
    links: [
      { label: "CDC travel health", href: "https://wwwnc.cdc.gov/travel" },
      { label: "TSA PreCheck", href: "https://www.tsa.gov/precheck" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Resources
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        Travel resources
      </h1>
      <p className="mt-6 text-lg text-charcoal/85">
        Answers we give every week, plus official links we send clients before
        they fly. Bookmark this page; use{" "}
        <Link href="/book" className="text-ocean underline-offset-2 hover:underline">
          a planning call
        </Link>{" "}
        when you want the itinerary built for you.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-horizon">Planning FAQs</h2>
        <dl className="mt-6 space-y-8">
          {faqs.map((item) => (
            <div key={item.q}>
              <dt className="text-sm font-semibold uppercase tracking-[0.15em] text-horizon">
                {item.q}
              </dt>
              <dd className="mt-2 text-charcoal/80">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-horizon">
          Official tools we recommend
        </h2>
        <p className="mt-3 text-sm text-charcoal/70">
          These are U.S. government and widely used public references — not
          booking widgets.
        </p>
        <div className="mt-6 space-y-8">
          {officialLinks.map((group) => (
            <div key={group.group}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
                {group.group}
              </h3>
              <ul className="mt-3 space-y-2 text-charcoal/85">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ocean underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Link href="/book">
          <Button size="lg">Start a planning call</Button>
        </Link>
      </div>
    </article>
  );
}
