/** Public marketing + SEO facts (edit if your details change). */
export const siteConfig = {
  name: "Boots to Journeys",
  tagline: "Veteran-owned travel concierge",
  region: "South Carolina, USA",
  /** Primary public site (no trailing slash). */
  defaultUrl: "https://www.btj.travel",
  phoneDisplay: "(803) 490-0390",
  phoneE164: "+18034900390",
  /** Update if your inbox differs. */
  email: "hello@btj.travel",
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
