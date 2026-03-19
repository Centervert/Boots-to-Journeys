import { Button } from "@/components/ui/Button";

export function Newsletter() {
  return (
    <section className="bg-horizon py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sunset">
              Deals & Alerts
            </p>
            <h2 className="mt-3 font-display text-3xl">
              Get weekly travel deals and insider tips
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Join the Boots to Journeys list for limited-time offers and
              curated destination guides.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full border border-white/30 bg-white/10 px-4 text-sm text-white placeholder:text-white/70"
            />
            <Button type="submit" size="lg" className="bg-sunset text-horizon">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
