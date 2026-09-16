import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Cinematic still hero. Replaces the former scroll-scrub reel
 * (`HeroScroll` + canvas frames / video currentTime).
 *
 * Unused assets kept in `public/` (not deleted):
 * - `/hero-video/destination-reel.mp4`
 * - `/hero-video/ezgif-frame-*.jpg`
 * - `/hero-fallback-v2.jpg` (previous reel poster)
 */
const HERO_STILL_SRC = "/destination-alaska.jpg";

export function Hero() {
  return (
    <section
      id="hero-scroll"
      className="-mt-20 h-screen"
      aria-label="Introduction"
    >
      <div className="relative h-screen w-full overflow-hidden bg-charcoal">
        <Image
          src={HERO_STILL_SRC}
          alt="Aerial view of an Alaskan glacier, alpine lake, and autumn tundra"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-10 lg:px-16">
          <div
            className="hero-copy max-w-4xl text-center text-white"
            style={{
              textShadow:
                "0 2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <p className="hero-copy-item text-xs font-semibold uppercase tracking-[0.3em] text-sunset">
              Veteran-Owned Travel Concierge
            </p>
            <h1 className="hero-copy-item mt-6 font-display text-4xl leading-tight text-white/90 sm:text-6xl lg:text-7xl">
              Bespoke journeys, handled with military precision.
            </h1>
            <p className="hero-copy-item mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg">
              We curate luxury vacations, group trips, and exclusive deals for
              travelers nationwide so you can focus on the adventure. Book a
              consult to start planning.
            </p>
            <div className="hero-copy-item mt-10">
              <Link href="/book">
                <Button size="lg">Book a Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
