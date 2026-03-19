const services = [
  "All-Inclusive & Resorts",
  "Cruises",
  "Destinations",
  "Faith-Based & Mission Teams",
  "Family Travel",
  "Group Travel",
  "Luxury Travel",
  "Romance & Honeymoons",
];

export function ServicesGrid() {
  return (
    <section className="bg-cloud py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl text-horizon">
              Concierge planning for every style of travel
            </h2>
          </div>
          <p className="text-sm text-charcoal">
            From multigenerational trips to luxury escapes, we manage the
            details.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-2xl border border-mist bg-white p-5 text-sm font-medium text-horizon"
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
