const steps = [
  {
    title: "Share your vision",
    description: "Tell us your travel goals, budget, and must-haves.",
  },
  {
    title: "We curate the plan",
    description: "Expect tailored options and insider upgrades.",
  },
  {
    title: "Travel with confidence",
    description: "We handle the details while you enjoy the journey.",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
            Our Process
          </p>
          <h2 className="mt-3 font-display text-3xl text-horizon">
            A concierge journey from start to touchdown
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-mist bg-cloud p-6"
            >
              <h3 className="text-lg font-semibold text-horizon">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
