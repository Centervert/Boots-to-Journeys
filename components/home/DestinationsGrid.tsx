const destinations = [
  "Italy",
  "Japan",
  "Morocco",
  "Greece",
  "Costa Rica",
  "French Polynesia",
];

const experiences = [
  "Family Escapes",
  "Luxury Resorts",
  "Cruises",
  "Faith-Based Trips",
  "Group Getaways",
  "Honeymoons",
];

export function DestinationsGrid() {
  return (
    <section className="bg-cloud py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
              Destinations
            </p>
            <h2 className="mt-4 font-display text-3xl text-horizon sm:text-4xl">
              Curated places worth the journey
            </h2>
          </div>
          <p className="text-sm text-charcoal">
            Handpicked stays, experiences, and partners that deliver the extra
            details.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination}
              className="group overflow-hidden rounded-3xl border border-mist bg-white shadow-sm"
            >
              <div className="h-56 bg-gradient-to-br from-horizon/70 via-ocean/40 to-sunset/40 transition group-hover:scale-105" />
              <div className="p-5">
                <p className="text-lg font-semibold text-horizon">
                  {destination}
                </p>
                <p className="mt-2 text-sm text-charcoal">
                  Bespoke itineraries with curated stays and concierge support.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
            Experiences
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <div
                key={experience}
                className="rounded-2xl border border-mist bg-white px-5 py-4 text-sm font-medium text-horizon"
              >
                {experience}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
