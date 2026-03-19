import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig, siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/contact`;

export const metadata: Metadata = {
  title: "Contact | Boots to Journeys",
  description:
    "Contact Boots to Journeys — veteran-owned South Carolina travel concierge. Call, email, or book a complimentary planning call for custom itineraries, cruises, and luxury travel.",
  keywords: [
    "Boots to Journeys contact",
    "South Carolina travel agent",
    "veteran owned travel agency",
    "luxury travel concierge",
    "custom vacation planning",
  ],
  alternates: { canonical },
  openGraph: {
    title: "Contact Boots to Journeys",
    description:
      "Reach our veteran-owned travel team for custom itineraries, group trips, cruises, and luxury travel planning.",
    url: canonical,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Contact
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        Get in touch with Boots to Journeys
      </h1>
      <p className="mt-6 text-lg text-charcoal/85">
        We are a <strong>veteran-owned and operated</strong> travel concierge
        based in <strong>{siteConfig.region}</strong>, helping families and
        groups design stress-free trips — from all-inclusive resorts and{" "}
        <Link href="/services" className="text-ocean underline-offset-2 hover:underline">
          ocean &amp; river cruises
        </Link>{" "}
        to{" "}
        <Link
          href="/destinations"
          className="text-ocean underline-offset-2 hover:underline"
        >
          custom destinations
        </Link>{" "}
        and luxury experiences.
      </p>

      <section className="mt-12 rounded-2xl border border-mist bg-cloud/40 p-8">
        <h2 className="font-display text-xl text-horizon">Call or email</h2>
        <ul className="mt-4 space-y-3 text-charcoal">
          <li>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
              Phone
            </span>
            <br />
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="text-lg text-ocean hover:underline"
            >
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
              Email
            </span>
            <br />
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-lg text-ocean hover:underline"
            >
              {siteConfig.email}
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl text-horizon">
          Book a complimentary planning call
        </h2>
        <p className="mt-4 text-charcoal/80">
          Schedule a time that works for you — share your trip goals, dates,
          and traveler details in one flow. Your request is saved securely so
          we can prepare before we speak.
        </p>
        <div className="mt-6">
          <Link href="/book">
            <Button size="lg">Schedule a call</Button>
          </Link>
        </div>
      </section>

      <section className="mt-12 border-t border-mist pt-12">
        <h2 className="font-display text-xl text-horizon">
          What we help with
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-charcoal/85">
          <li>Personalized itineraries with lodging, transfers, and tours</li>
          <li>All-inclusive resorts, cruises, and faith-based or group travel</li>
          <li>Luxury travel, honeymoons, and multi-generational trips</li>
          <li>Research and booking support before and during your journey</li>
        </ul>
        <p className="mt-6 text-sm text-charcoal/70">
          Learn more on our{" "}
          <Link href="/about" className="text-ocean underline-offset-2 hover:underline">
            About
          </Link>{" "}
          page or browse{" "}
          <Link href="/resources" className="text-ocean underline-offset-2 hover:underline">
            resources &amp; travel tips
          </Link>
          .
        </p>
      </section>

      <p className="mt-12 text-xs text-charcoal/55">
        Brand continuity: you can also find legacy content at{" "}
        <a
          href={siteConfig.legacySiteUrl}
          className="text-ocean underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          bootstojourneys.com
        </a>
        .
      </p>
    </article>
  );
}
