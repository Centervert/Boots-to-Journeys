import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CredentialsBar } from "@/components/layout/Credentials";
import { siteConfig, siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/about`;

export const metadata: Metadata = {
  title: "About | Boots to Journeys",
  description:
    "Meet Shannon and Michael Pickens of Boots to Journeys — a veteran-owned travel concierge serving clients nationwide.",
  alternates: { canonical },
};

export default function AboutPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
          About
        </p>
        <h1 className="mt-4 font-display text-4xl text-horizon">Our story</h1>
        <p className="mt-6 text-lg text-charcoal/85">
          {siteConfig.name} is a <strong>veteran-owned and operated</strong>{" "}
          travel concierge. After 28 years of military service, we learned that
          the best missions are the ones worth coming home to. We plan custom
          journeys for travelers nationwide — based in{" "}
          {siteConfig.headquarters}, not limited to it.
        </p>
        <p className="mt-4 text-charcoal/80">
          We do not sell generic packages. We research, customize, and
          personalize every itinerary so you can be present. Our work is built
          on loyalty, integrity, commitment, and excellence.
        </p>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-horizon">
            Meet Shannon &amp; Michael Pickens
          </h2>
          <p className="mt-4 text-charcoal/80">
            <strong>Michael</strong> is a retired CW5 with more than 28 years of
            service. Customer service and clear briefings for senior leaders
            shaped how this company was founded. He specializes in European
            river cruising, military history tours, speaking, and marketing —
            and in building the lasting relationships travel makes possible.
          </p>
          <p className="mt-4 text-charcoal/80">
            <strong>Shannon</strong> is a military spouse and mom of two
            college-age daughters. She treats every getaway like it is her own:
            airport transfers, VIP details, and the small moments that make a
            trip feel effortless. Her specializations include Disney, European
            river cruises, and ocean cruises in Europe, Alaska, and the
            Caribbean.
          </p>
          <p className="mt-4 text-charcoal/80">
            We work directly with you — not a call center — and stay one call
            away before and during your trip.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-horizon">What we believe</h2>
          <p className="mt-4 text-charcoal/80">
            Each time you travel it is a journey, and it should fit your
            expectations and needs. We deliver specially designed experiences
            through the food, culture, and beauty of this planet — with the
            respect and honor you deserve, and the maximum value for your time
            and money.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-mist bg-cloud/40 p-8">
          <h2 className="font-display text-xl text-horizon">
            Credentials you can check
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/85">
            <li>Veteran-owned and operated</li>
            <li>
              ASTA member — American Society of Travel Advisors (Shannon is
              verified)
            </li>
            <li>
              Seller-of-travel registrations: Florida ST41443, California
              2113317-40, Washington UBID 603 308 394
            </li>
            <li>Mailing address: {siteConfig.mailingAddress}</li>
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/book">
            <Button size="lg">Book a planning call</Button>
          </Link>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-horizon text-horizon hover:bg-horizon/5"
            >
              See our services
            </Button>
          </Link>
        </div>
      </article>
      <CredentialsBar />
    </>
  );
}
