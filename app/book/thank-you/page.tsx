import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Request Received | Boots to Journeys",
  description: "Your travel request has been received.",
};

export default function ThankYouPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
        Thank you
      </p>
      <h1 className="mt-4 font-display text-4xl text-horizon">
        We received your request
      </h1>
      <p className="mt-6 text-charcoal/80">
        We&apos;ll be in touch within 24 hours to confirm availability and
        start building your custom itinerary.
      </p>
      <div className="mt-10">
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}
