import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeInImage } from "@/components/ui/FadeInImage";

const differentiators = [
  {
    title: "Veteran values",
    description:
      "Loyalty, integrity, and excellence are the standards we were trained to uphold.",
    image: "/veteran-values.jpg",
  },
  {
    title: "Personal service",
    description:
      "You work directly with us, not a call center. We stay one call away.",
    image: "/experts-2.jpg",
  },
  {
    title: "Expert planning",
    description:
      "We research, customize, and perfect every detail so you can be present.",
    image: "/expert-planning.png",
  },
];

export function LuxuryExpertsSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute right-0 top-10 hidden h-64 w-64 bg-[url('/soft-contour.svg')] bg-contain bg-no-repeat opacity-60 md:block" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/70">
            About Boots to Journeys
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base text-charcoal/80 sm:text-lg">
            After 28 years of military service, we learned that the best
            missions are the ones worth coming home to. Boots to Journeys was
            born from a simple belief: travel should reconnect you with the
            people and places that matter most. Based in South Carolina, we
            serve clients nationwide.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/book">
              <Button size="lg">Start Your Journey</Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.3em] text-charcoal">
            What we believe
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal/70">
            Travel is not a transaction. It is a transformation. We do not sell
            packages. We craft experiences that keep you present.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {differentiators.map((item) => (
            <div key={item.title}>
              <div className="relative h-56 w-full overflow-hidden rounded-sm border border-mist bg-mist/30">
                <FadeInImage
                  src={item.image}
                  alt={item.title}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-charcoal">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-charcoal/75">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/services">
            <Button variant="outline" size="lg">
              Learn About Our Process
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
