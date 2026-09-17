const steps = [
  {
    title: "Tell us your ideas",
    description:
      "Share the trip you want — travelers, dates, budget, and must-haves. We research and design a customized itinerary with lodging and excursions.",
  },
  {
    title: "Choose your adventure",
    description:
      "We finalize the plan together, then make the arrangements. You make your deposit and pack your bags.",
  },
  {
    title: "Enjoy yourself",
    description:
      "Travel with a trip built around you. We stay standing by if you need assistance while you are away.",
  },
];

export function ProcessSteps({
  className = "py-24",
}: {
  className?: string;
} = {}) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
            Three easy steps
          </p>
          <h2 className="mt-3 font-display text-3xl text-horizon">
            How working with us works
          </h2>
          <p className="mt-4 text-sm text-charcoal/75">
            The same concierge process we have used for families, groups, and
            luxury travelers nationwide — planning, research, and personalization
            handled for you.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-mist bg-cloud p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ocean">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-horizon">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
