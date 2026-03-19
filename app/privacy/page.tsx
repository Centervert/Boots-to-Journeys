import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/privacy`;

export const metadata: Metadata = {
  title: "Privacy Policy | Boots to Journeys",
  description:
    "How Boots to Journeys collects, uses, and protects personal information when you use our website and booking tools.",
  alternates: { canonical },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const updated = "March 19, 2026";
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-horizon">Privacy Policy</h1>
      <p className="mt-2 text-sm text-charcoal/60">Last updated: {updated}</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-charcoal/90 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-horizon [&_ul]:mt-3 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_a]:text-ocean [&_a]:underline-offset-2 hover:[&_a]:underline">
        <p>
          {siteConfig.name} (“we,” “us”) respects your privacy. This policy
          describes how we handle information when you visit{" "}
          <strong>{siteUrlString()}</strong> or submit a booking or contact
          request.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Booking &amp; scheduling:</strong> When you book a
            planning call, we collect the details you provide (such as name,
            email, phone, trip preferences, and notes). This information is
            stored in our secure database (Supabase) so we can prepare for your
            call and follow up.
          </li>
          <li>
            <strong>Technical data:</strong> Our hosting provider (e.g. Vercel)
            and infrastructure partners may process IP addresses, device/browser
            data, and logs for security, performance, and abuse prevention.
          </li>
          <li>
            <strong>Spam protection:</strong> If enabled, we may use{" "}
            <strong>Cloudflare Turnstile</strong> to verify that submissions are
            made by humans. Turnstile may process technical data according to{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare’s privacy policy
            </a>
            .
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To schedule and conduct travel planning consultations</li>
          <li>To respond to inquiries and provide customer support</li>
          <li>To operate, secure, and improve our website</li>
          <li>To detect fraud, spam, and misuse (e.g. rate limits, honeypot checks)</li>
          <li>To comply with legal obligations when required</li>
        </ul>

        <h2>Legal bases (EEA/UK visitors)</h2>
        <p>
          If applicable law requires a “legal basis,” we rely on{" "}
          <strong>contract</strong> (taking steps at your request before a
          contract), <strong>legitimate interests</strong> (operating and securing
          our business, unless overridden by your rights), and{" "}
          <strong>legal obligation</strong> where required.
        </p>

        <h2>Sharing &amp; processors</h2>
        <p>
          We use trusted service providers (“processors”) to run the site and
          store data, including hosting, database, and (if configured) email or
          calendar integrations you authorize. We do not sell your personal
          information.
        </p>

        <h2>Retention</h2>
        <p>
          We retain booking and contact information as long as needed to serve
          you, meet legal or accounting requirements, and resolve disputes.
          You may request deletion where applicable law allows.
        </p>

        <h2>Your choices &amp; rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict certain processing of your personal data, or to
          object or port data. To exercise these rights, contact us at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
          <a href={`tel:${siteConfig.phoneE164}`}>
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>

        <h2>Children</h2>
        <p>
          Our services are not directed to children under 13, and we do not
          knowingly collect their personal information.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. The “Last updated” date
          reflects the latest revision.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy:{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>

        <p className="text-sm text-charcoal/65">
          This page is provided for transparency and does not constitute legal
          advice. Consult an attorney for jurisdiction-specific requirements.
        </p>

        <p className="mt-8">
          <Link href="/" className="text-ocean underline-offset-2 hover:underline">
            ← Home
          </Link>
        </p>
      </div>
    </article>
  );
}
