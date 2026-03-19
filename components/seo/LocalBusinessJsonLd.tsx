import { siteConfig, siteUrlString } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const base = siteUrlString();
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    description:
      "Veteran-owned travel concierge offering custom itineraries, cruises, luxury travel, and group trips for travelers in South Carolina and beyond.",
    url: base,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.region,
    },
    sameAs: [siteConfig.legacySiteUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
