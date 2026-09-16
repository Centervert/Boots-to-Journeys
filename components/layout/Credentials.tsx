import { licenseLine, siteConfig } from "@/lib/site-config";

export function CredentialsBar() {
  return (
    <section className="border-y border-mist bg-cloud py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
          Credentials &amp; care
        </p>
        <ul className="mt-6 grid gap-4 text-center text-sm text-charcoal sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <p className="font-semibold text-horizon">Veteran-owned</p>
            <p className="mt-1 text-charcoal/75">
              Operated by Shannon &amp; Michael Pickens
            </p>
          </li>
          <li>
            <p className="font-semibold text-horizon">ASTA member</p>
            <p className="mt-1 text-charcoal/75">
              American Society of Travel Advisors
            </p>
          </li>
          <li>
            <p className="font-semibold text-horizon">Licensed &amp; registered</p>
            <p className="mt-1 text-charcoal/75">{licenseLine()}</p>
          </li>
          <li>
            <p className="font-semibold text-horizon">Nationwide clients</p>
            <p className="mt-1 text-charcoal/75">
              Based in {siteConfig.headquarters}; we plan trips for travelers
              across the U.S.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function LicenseNote({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      {licenseLine()}
      {" · "}
      {siteConfig.mailingAddress}
      {" · "}
      ASTA member
    </p>
  );
}
