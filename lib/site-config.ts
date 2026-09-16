/** Public marketing + SEO facts (edit if your details change). */
export const siteConfig = {
  name: "Boots to Journeys",
  tagline: "Veteran-owned travel concierge",
  /** Short nationwide line for footer, trust row, and metadata. */
  nationwideLine:
    "Veteran-owned travel concierge helping travelers nationwide plan unforgettable, stress-free journeys.",
  description:
    "Veteran-owned travel concierge serving clients nationwide with custom itineraries, ocean and river cruises, all-inclusive resorts, luxury travel, and group trips.",
  owners: "Shannon & Michael Pickens",
  /** Headquarters / legal home — not a service-area limit. */
  headquarters: "Sandy Springs, South Carolina",
  region: "South Carolina, USA",
  areaServed: "United States",
  /** Primary public site (no trailing slash). */
  defaultUrl: "https://www.btj.travel",
  phoneDisplay: "(803) 490-0390",
  phoneE164: "+18034900390",
  /** Public inbox published on the legacy site and used by the clients. */
  email: "travel@bootstojourneys.com",
  /** Alternate inbox on the new domain. */
  emailAlt: "hello@btj.travel",
  mailingAddress: "PO Box 722, Sandy Springs, SC 29677",
  postalAddress: {
    poBox: "722",
    locality: "Sandy Springs",
    region: "SC",
    postalCode: "29677",
    country: "US",
  },
  licenses: [
    { jurisdiction: "Florida", id: "ST41443" },
    { jurisdiction: "California", id: "2113317-40" },
    { jurisdiction: "Washington", id: "UBID 603 308 394" },
  ],
  /** Text-only memberships — no official marks in the repo. */
  memberships: [
    {
      name: "ASTA",
      fullName: "American Society of Travel Advisors",
      display: "ASTA member",
    },
  ],
  social: {
    facebook: "https://www.facebook.com/BootstoJourneys/",
    instagram: "https://www.instagram.com/bootstojourneys/",
  },
  /** Legacy / alternate site for brand continuity */
  legacySiteUrl: "https://www.bootstojourneys.com",
} as const;

export function siteUrlString(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (raw) return raw;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return siteConfig.defaultUrl;
}

export function licenseLine(): string {
  return siteConfig.licenses
    .map((license) => {
      if (license.jurisdiction === "Florida") return `FL ${license.id}`;
      if (license.jurisdiction === "California") return `CA ${license.id}`;
      return `WAS ${license.id}`;
    })
    .join(" / ");
}
