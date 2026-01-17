const testimonials = [
  {
    name: "Samantha R.",
    quote:
      "Boots to Journeys handled every detail for our anniversary cruise. It felt effortless.",
  },
  {
    name: "Marcus & Dana",
    quote:
      "We finally had a family trip with no stress. The resort perks were incredible.",
  },
  {
    name: "Rev. Thompson",
    quote:
      "Our mission team itinerary was flawless. Every transfer and hotel was prepared.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cloud py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-3xl text-horizon">
            Trusted by travelers across the Carolinas
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-mist bg-white p-6"
            >
              <p className="text-sm text-charcoal">“{testimonial.quote}”</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-horizon">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
