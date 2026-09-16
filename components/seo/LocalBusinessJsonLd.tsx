import { siteConfig, siteUrlString } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const base = siteUrlString();
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    description: siteConfig.description,
    url: base,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    founder: siteConfig.owners,
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: siteConfig.postalAddress.poBox,
      addressLocality: siteConfig.postalAddress.locality,
      addressRegion: siteConfig.postalAddress.region,
      postalCode: siteConfig.postalAddress.postalCode,
      addressCountry: siteConfig.postalAddress.country,
    },
    areaServed: {
      "@type": "Country",
      name: siteConfig.areaServed,
    },
    memberOf: siteConfig.memberships.map((membership) => ({
      "@type": "Organization",
      name: membership.fullName,
      alternateName: membership.name,
    })),
    sameAs: [
      siteConfig.legacySiteUrl,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
