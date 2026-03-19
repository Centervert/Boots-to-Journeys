import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, siteUrlString } from "@/lib/site-config";

const canonical = `${siteUrlString()}/terms`;

export const metadata: Metadata = {
  title: "Terms of Use | Boots to Journeys",
  description:
    "Terms of use for the Boots to Journeys website and online scheduling. Travel services are subject to separate agreements and supplier terms.",
  alternates: { canonical },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const updated = "March 19, 2026";
  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-horizon">Terms of Use</h1>
      <p className="mt-2 text-sm text-charcoal/60">Last updated: {updated}</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-charcoal/90 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-horizon [&_a]:text-ocean [&_a]:underline-offset-2 hover:[&_a]:underline">
        <p>
          Welcome to {siteConfig.name}. By accessing{" "}
          <strong>{siteUrlString()}</strong> or using our tools (including
          online scheduling), you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <h2>Not a binding travel contract</h2>
        <p>
          Submitting information through our website — including booking a
          planning call — does <strong>not</strong> by itself create a final
          travel booking. Fares, availability, deposits, cancellation rules, and
          supplier terms are confirmed separately. You may be asked to sign
          additional agreements or authorizations before purchases are made
          on your behalf.
        </p>

        <h2>Accuracy of information</h2>
        <p>
          You agree to provide accurate contact and trip details. We rely on
          this information to prepare recommendations and communicate with you.
        </p>

        <h2>Acceptable use</h2>
        <p>
          You may not misuse the site or APIs (including spam, scraping,
          attempts to overwhelm our systems, or fraudulent bookings). We may
          suspend access, rate-limit requests, or block submissions that appear
          abusive.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Site content, branding, and materials are owned by {siteConfig.name}{" "}
          or our licensors. You may not copy or redistribute them without
          permission, except as allowed by law.
        </p>

        <h2>Disclaimer</h2>
        <p>
          The site is provided “as is.” To the fullest extent permitted by law,
          we disclaim warranties not expressly stated. Travel involves third
          parties (airlines, hotels, tour operators); we are not responsible
          for their acts, errors, or failures, though we will work in good faith
          to assist when you book through us.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law,{" "}
          {siteConfig.name} and its owners will not be liable for indirect,
          incidental, special, consequential, or punitive damages arising from
          your use of the website. Some jurisdictions do not allow certain
          limitations; in those cases, our liability is limited to the fullest
          extent allowed.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of South Carolina,
          USA, without regard to conflict-of-law rules, except where prohibited
          by law.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms. Continued use after changes constitutes
          acceptance of the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <br />
          <a href={`tel:${siteConfig.phoneE164}`}>
            {siteConfig.phoneDisplay}
          </a>
        </p>

        <p className="mt-8">
          <Link href="/privacy" className="text-ocean underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/" className="text-ocean underline-offset-2 hover:underline">
            Home
          </Link>
        </p>
      </div>
    </article>
  );
}
