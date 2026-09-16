import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/services`;

export const metadata: Metadata = {
  title: "Services | Boots to Journeys",
  description:
    "Custom itineraries, ocean and river cruises, all-inclusive resorts, luxury travel, groups, family trips, and faith-based journeys — planned nationwide.",
  alternates: { canonical },
};

const cruiseLines = [
  "AmaWaterways",
  "American Cruise Lines",
  "Avalon Waterways",
  "Azamara",
  "Carnival Cruise Line",
  "Celebrity Cruises",
  "Cunard Line",
  "Disney Cruise Line",
  "Explora Journeys",
  "Holland America Line",
  "Hurtigruten",
  "Norwegian Cruise Line",
  "Oceania Cruises",
  "Princess Cruises",
  "Regent Seven Seas Cruises",
  "Royal Caribbean International",
  "Seabourn",
  "Silversea Cruises",
  "UnCruise Adventures",
  "Uniworld Boutique River Cruises",
  "Viking",
  "Virgin Voyages",
  "Windstar Cruises",
];

const otherServices = [
  {
    title: "Luxury travel",
    body: "When ordinary is not the option: luxury transfers, concierge service, and elevated stays — including private-jet or yacht charters when the trip calls for it.",
  },
  {
    title: "Group travel",
    body: "Reunions, veteran groups, and friends who want the same itinerary without the admin. We handle the moving parts so you can focus on the people.",
  },
  {
    title: "Family travel",
    body: "Multigenerational trips and school-break escapes. We do the work so you can make the memories.",
  },
  {
    title: "Romance & honeymoons",
    body: "Weekend getaways, proposals, weddings, honeymoons, babymoons, and anniversaries — planned around how you want the days to feel.",
  },
  {
    title: "Faith-based & mission teams",
    body: "Holy Land journeys, Paul’s footsteps, and mission trips. We find the fit for budget, dates, and extra transportation, then handle the administration.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pt-32 pb-8 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
          Services
        </p>
        <h1 className="mt-4 font-display text-4xl text-horizon">
          How we help you travel
        </h1>
        <p className="mt-6 text-lg text-charcoal/85">
          Custom itineraries, ocean and river cruises, all-inclusive resorts,
          luxury travel, groups, and faith-based journeys. You work with us
          directly. We serve clients nationwide.
        </p>
      </article>

      <ProcessSteps />

      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <section>
          <h2 className="font-display text-2xl text-horizon">
            Cruises — ocean and river
          </h2>
          <p className="mt-4 text-charcoal/80">
            There is a cruise that is right for you. We plan European river
            cruising, Alaska, the Caribbean, and ocean itineraries in Europe —
            plus expedition and boutique lines when that is the better fit.
            Shannon specializes in Disney, river, and ocean cruising; Michael
            focuses on European river cruising and military history tours.
          </p>
          <p className="mt-4 text-sm text-charcoal/70">
            Partner lines we regularly work with (availability varies by sailing):
          </p>
          <ul className="mt-4 columns-1 gap-x-8 text-sm text-charcoal/85 sm:columns-2">
            {cruiseLines.map((line) => (
              <li key={line} className="mb-1.5">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-horizon">
            All-inclusive &amp; resorts
          </h2>
          <p className="mt-4 text-charcoal/80">
            When you want the details taken care of, all-inclusive travel is
            often the way to go: airport transfers, full-service hotels and
            resorts, meals, and activities. Resorts can mean full relaxation or
            a packed activity slate. Whether you want a classic all-inclusive
            or a quieter exclusive setting, we match the property to you and
            your travel companions.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-horizon">
            More ways we plan
          </h2>
          <div className="mt-6 space-y-6">
            {otherServices.map((service) => (
              <div key={service.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-horizon">
                  {service.title}
                </h3>
                <p className="mt-2 text-charcoal/80">{service.body}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-charcoal/80">
          Planning fees depend on the trip. When a cruise line or tour operator
          pays a commission, there is often no extra cost to you. Detailed
          customization can require a fee — we discuss that in advance.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/book">
            <Button size="lg">Book a complimentary consult</Button>
          </Link>
          <Link href="/destinations">
            <Button
              size="lg"
              variant="outline"
              className="border-horizon text-horizon hover:bg-horizon/5"
            >
              Browse destinations
            </Button>
          </Link>
        </div>
      </article>
    </>
  );
}
