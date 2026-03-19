export function TrustSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
              Why Travelers Trust Us
            </p>
            <h2 className="mt-3 font-display text-3xl text-horizon">
              Veteran-owned service with five-star concierge care
            </h2>
            <p className="mt-4 text-sm text-charcoal">
              Our team protects your time and budget by handling the details,
              monitoring deals, and staying on call throughout your trip.
            </p>
          </div>
          <div className="rounded-2xl border border-mist bg-cloud p-6 text-sm text-charcoal">
            <ul className="space-y-3">
              <li>✓ Personalized itineraries with vetted partners</li>
              <li>✓ Deal alerts and exclusive resort perks</li>
              <li>✓ 24/7 travel support while you’re away</li>
              <li>✓ Transparent planning fees and expectations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
