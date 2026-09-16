import Link from "next/link";
import { FadeInImage } from "@/components/ui/FadeInImage";
import { LicenseNote } from "@/components/layout/Credentials";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Resources", href: "/resources" },
  { label: "Blog & Deals", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Book", href: "/book" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-mist bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl text-horizon">
              Boots to Journeys
            </p>
            <p className="mt-2 max-w-md text-sm text-charcoal">
              {siteConfig.nationwideLine}
            </p>
            <p className="mt-3 text-sm text-charcoal/80">
              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="text-ocean hover:underline"
              >
                {siteConfig.phoneDisplay}
              </a>
              {" · "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ocean hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-2 text-xs text-charcoal/65">
              {siteConfig.memberships[0].display}
              {" · Veteran-owned"}
            </p>
            <p className="mt-2 text-xs text-horizon">
              <a
                href={siteConfig.social.facebook}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              {" · "}
              <a
                href={siteConfig.social.instagram}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
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
          <p>
            © {new Date().getFullYear()} Boots to Journeys. All rights reserved.
          </p>
          <LicenseNote className="mt-2 max-w-3xl leading-relaxed" />
        </div>
        <div className="mt-10 flex justify-center">
          <FadeInImage
            src="/footer-center-logo.png"
            alt="Centervert"
            width={200}
            height={48}
            className="h-6 w-auto"
            sizes="200px"
          />
        </div>
      </div>
    </footer>
  );
}
