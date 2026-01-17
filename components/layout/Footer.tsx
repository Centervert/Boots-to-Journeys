import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blog & Deals", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-mist bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl text-horizon">
              Boots to Journeys
            </p>
            <p className="mt-2 max-w-md text-sm text-charcoal">
              Veteran-owned travel concierge helping South Carolina travelers
              book unforgettable, stress-free journeys.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-horizon">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-mist pt-6 text-xs text-charcoal/70">
          © 2026 Boots to Journeys. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
