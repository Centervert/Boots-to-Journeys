import Link from "next/link";
import { Button } from "@/components/ui/Button";

const travelerTypes = ["Families", "Couples", "Groups", "Honeymoons", "Solo"];
const popularSpots = ["Italy", "Tanzania", "Mexico", "Norway", "Japan", "Greece"];
const months = ["January", "March", "June", "September", "December"];

export function JourneyCTA() {
  return (
    <section className="bg-horizon py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sunset">
          Start Your Journey
        </p>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl">
          Explore by traveler, timing, or what you want to feel.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              By Traveler
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {travelerTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/90"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Most Popular
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {popularSpots.map((spot) => (
                <span
                  key={spot}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/90"
                >
                  {spot}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              By Month
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {months.map((month) => (
                <span
                  key={month}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/90"
                >
                  {month}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/book">
            <Button size="lg" className="bg-sunset text-horizon">
              Book a Consultation
            </Button>
          </Link>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
            >
              See All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
