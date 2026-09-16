import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Plan | Boots to Journeys",
  description:
    "Your Boots to Journeys roadmap: what we built on the site, how we’ll grow traffic and leads, and how we’ll measure success—with Centervert Connect scheduling included.",
};

const websiteUpdates = [
  { update: "FAQ Page", status: "Planned", details: "Common travel questions. Addresses the #1 request from Shannon." },
  { update: "Testimonials", status: "Planned", details: "Client quotes and trip stories. The Normandy trip with 21 people is a great flagship story." },
  { update: "Email Capture", status: "Planned", details: '"Get travel inspiration" signup. Builds your email list for ongoing marketing.' },
  {
    update: "Consultation booking (Centervert Connect)",
    status: "Done",
    details:
      "A polished /book experience: guests see real openings in their own timezone, share a few details, and confirm. Every appointment is saved to your Supabase database—no middleman. Confirmation page is live; automated emails and Google Calendar hooks are queued for Phase 2 when you’re ready.",
  },
  {
    update: "SEO & discoverability",
    status: "Done",
    details:
      "Search-friendly titles and descriptions, social preview tags, sitemap and robots files, rich business data on the homepage, and a contact page written to help travelers nationwide reach you.",
  },
  {
    update: "Privacy & terms",
    status: "Done",
    details:
      "Privacy Policy and Terms of Use that reflect how the site and booking flow actually work—linked in the footer on every page so trust stays upfront.",
  },
  {
    update: "Abuse & spam protection",
    status: "Done",
    details:
      "Smart throttling on booking requests, a hidden honeypot for bots, and optional Cloudflare Turnstile when you turn it on—so real clients get through and junk stays out.",
  },
  { update: "Travel Guides", status: "Planned", details: "3–5 destination guides (Caribbean, Europe/Normandy, Alaska, Mediterranean, Hawaii). SEO-optimized." },
  { update: "Group Trips Page", status: "Planned", details: "Dedicated page for upcoming group trips with dates, itineraries, and pricing." },
  { update: "Blog Content", status: "Planned", details: "2 posts/month minimum. Trip recaps, destination spotlights, travel tips." },
  { update: "Google Business Profile", status: "Planned", details: "Optimization: photos, reviews, posts. Currently getting 2 views/month." },
];

const foundationDone = [
  "A production-ready site you can send traffic to: full navigation, core pages (about, services, destinations, resources, blog structure, contact), a cinematic hero, and copy that sounds like Boots to Journeys—not generic travel filler.",
  "Centervert Connect: consultation scheduling lives on btj.travel itself—no extra Calendly bill. Travelers choose a time that respects their timezone, tell you what they need, and land on your calendar data with built-in double-booking protection.",
  "Secure booking under the hood: validated requests, sensible rate limits, and room to plug in optional bot protection. When you want CRM or automations, a webhook path is ready to wire up.",
  "An SEO baseline that works with you, not against you: clear page titles, shareable previews, sitemap and robots for crawlers, rich results for your business on the home page, and a contact page that nudges people toward a call or a booking.",
  "Privacy and terms that match reality—plus a booking flow that points people to those policies before they confirm, so expectations stay clear.",
  "Thoughtful motion and imagery (lazy-loaded, fade-in) so the site feels premium; a dedicated thank-you moment after someone books.",
  "Written Phase 2 notes for the team so follow-ons like confirmation email and calendar sync are defined work—not a scavenger hunt.",
];

const audiences = [
  { segment: "Younger Couples", age: "25–35", tripType: "Honeymoon / Romance", budget: "$3–8K", channel: "Instagram, Facebook" },
  { segment: "Affluent Older", age: "50–70", tripType: "Luxury cruises / resorts", budget: "$12–15K/couple", channel: "Facebook, Google, Email" },
  { segment: "Military / Veteran", age: "All ages", tripType: "Group trips (Normandy, heritage)", budget: "$5–10K", channel: "Veteran networks, Facebook groups" },
  { segment: "Multi-Gen Families", age: "35–60", tripType: "Family cruises, all-inclusive", budget: "$8–20K (group)", channel: "Facebook, Instagram, Google" },
];

const channels = [
  { name: "Facebook", role: "Primary: Awareness + Lead Gen", bullets: ["3 posts/week: trip inspiration, client stories, destination highlights", "Facebook Groups: travel planning, veteran, local Greenville", "Facebook Events for group trips", "Targeted ads to 4 audience segments"] },
  { name: "Instagram", role: "Visual Storytelling", bullets: ["3–4 posts/week + daily stories during trips", "Reels: destination spotlights, packing tips, cruise day-in-the-life", "Cross-post from Facebook where appropriate"] },
  { name: "Google", role: "Intent Capture", bullets: ["Google Business Profile: photos, reviews, weekly posts", "Search ads: travel agent Greenville SC, honeymoon planning, luxury cruise planner, military group travel, Normandy tour veteran"] },
  { name: "Email Marketing", role: "Nurture + Bookings", bullets: ["Monthly newsletter: upcoming trips, tips, exclusive deals", "Automated sequences: inquiry → consult → booking → pre-trip → post-trip review", "List building from website capture + past clients"] },
  { name: "Referral Program", role: "Luxury tier", bullets: ["$100–250 credit per referral that books", '"Refer a friend, get credit toward your next trip"'] },
];

const metrics = [
  { metric: "Monthly website visitors", now: "~100 or less", target: "500+" },
  { metric: "Google Business Profile views", now: "2/month", target: "50+/month" },
  { metric: "Email list size", now: "0", target: "200+" },
  { metric: "Social followers (FB + IG)", now: "Unknown", target: "+200" },
  { metric: "New booking inquiries/month", now: "Referral only", target: "5–10 from marketing" },
  { metric: "Bookings from marketing", now: "0", target: "1–2/month" },
  { metric: "Group trip signups", now: "Organic only", target: "1 promoted trip with 10+ signups" },
];

const questions = [
  "What's your current monthly revenue, and what's your annual revenue target? This helps us set realistic booking goals for the ad campaigns.",
  "How many active sub-agents/ICs do you have? We want to factor in IC capacity when we ramp up lead volume.",
  "Do you have professional trip photos we can use? The Normandy trip, family cruises, resort stays. Real photos outperform stock 3-to-1 in ads.",
  "Are you comfortable with $900–1,500/mo in direct ad spend to start? We can start lower and scale up as we see results.",
  "Do you want to be the \"face\" on social media (personal brand) or keep it brand-focused? Personal brands convert better, but it's your call.",
  "What group trips are planned for 2026? Dates and destinations? We want to start promoting these early so we have time to fill seats.",
];

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-2xl font-semibold text-horizon sm:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}

function SectionKicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.3em] text-ocean ${className}`}
    >
      {children}
    </p>
  );
}

export default function OurPlanPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="bg-horizon px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sunset">
            Our Plan
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Your marketing plan
          </h1>
          <p className="mt-6 text-lg text-white/90">
            Built by Centervert for Boots to Journeys
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80">
            This is your playbook: strategy from our discovery and audit, plus everything we&apos;ve built since—scheduling that writes straight to your data, search and trust foundations, and guardrails against spam. Below you&apos;ll see what&apos;s live, what&apos;s queued next, where we&apos;ll show up in market, how we&apos;ll measure wins, and a short list of questions where your input sharpens the plan.
          </p>
        </div>
      </section>

      {/* What We've Done on the Website */}
      <Section className="bg-white">
        <SectionKicker>Website</SectionKicker>
        <SectionTitle className="mt-2">What we&apos;ve done on your website</SectionTitle>
        <p className="mt-6 text-charcoal/80 leading-relaxed">
          Great marketing needs a site that earns the click. We&apos;ve tightened the foundation on btj.travel so visitors meet a credible brand, clear next steps, and a booking path that actually works—before we put real spend behind traffic.
        </p>

        <div className="mt-8 rounded-lg border-2 border-sunset/40 bg-gradient-to-br from-cloud to-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ocean">
            Included with your build
          </p>
          <h3 className="mt-3 font-display text-xl font-semibold text-horizon sm:text-2xl">
            Centervert Connect
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/85 sm:text-base">
            We built you something we use ourselves:{" "}
            <span className="font-medium text-horizon">Centervert Connect</span>—our own version of Calendly, built from the ground up by Centervert. It runs on{" "}
            <span className="font-medium text-horizon">your</span> site and{" "}
            <span className="font-medium text-horizon">your</span> data, so leads never leave btj.travel and you never pay a separate scheduling subscription. Tools like Calendly run about{" "}
            <span className="font-semibold text-ocean">$49.99/month</span>—that&apos;s money you get to keep. Think of it as our way of saying thank you for partnering with Centervert on Boots to Journeys.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-sm font-semibold text-horizon">Foundation (done)</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-charcoal/80">
            {foundationDone.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-10 overflow-hidden rounded-lg border border-mist">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-mist bg-cloud/50">
                  <th className="px-4 py-3 font-semibold text-horizon">Update</th>
                  <th className="px-4 py-3 font-semibold text-horizon">Status</th>
                  <th className="px-4 py-3 font-semibold text-horizon">Details</th>
                </tr>
              </thead>
              <tbody>
                {websiteUpdates.map((row, i) => (
                  <tr key={i} className="border-b border-mist last:border-0">
                    <td className="px-4 py-3 text-charcoal">{row.update}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          row.status === "Done"
                            ? "text-ocean font-medium"
                            : "text-charcoal/70"
                        }
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-charcoal/80">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Design Style */}
      <Section className="bg-cloud">
        <SectionKicker>Brand</SectionKicker>
        <SectionTitle className="mt-2">Design style</SectionTitle>
        <p className="mt-6 text-charcoal/80">
          The site is built to match Boots to Journeys&apos; positioning: veteran-owned, military precision, luxury travel, and a nationwide clientele with South Carolina headquarters. Clean typography (Playfair Display for headlines, Inter for body), a restrained palette (horizon navy, ocean teal, sunset gold, charcoal), and plenty of whitespace so the content and imagery lead. Every section is built to feel high-end and trustworthy—so when we send traffic here from ads and social, visitors see a brand that matches the promise.
        </p>
      </Section>

      {/* Target Audience */}
      <Section className="bg-white">
        <SectionKicker>Audience</SectionKicker>
        <SectionTitle className="mt-2">Who we&apos;re reaching</SectionTitle>
        <p className="mt-6 text-charcoal/80">
          Each segment gets a different mix of channels. Together they build awareness, capture intent, and convert leads into bookings.
        </p>
        <div className="mt-10 space-y-4">
          {audiences.map((row, i) => (
            <div
              key={i}
              className="rounded-lg border border-mist bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-horizon">{row.segment}</p>
              <p className="mt-1 text-sm text-charcoal/70">
                {row.age} · {row.tripType} · {row.budget}
              </p>
              <p className="mt-2 text-xs text-ocean">Primary: {row.channel}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Going to Marketing */}
      <Section className="bg-horizon text-white">
        <SectionKicker className="text-sunset">Marketing</SectionKicker>
        <SectionTitle className="mt-2 text-white">Where we show up</SectionTitle>
        <p className="mt-6 text-white/85">
          Each channel serves a purpose. Together they build awareness, capture intent, and convert leads into bookings.
        </p>
        <div className="mt-10 space-y-8">
          {channels.map((ch, i) => (
            <div key={i}>
              <p className="font-display text-lg font-semibold text-sunset">
                {ch.name}
              </p>
              <p className="mt-1 text-sm text-white/70">{ch.role}</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-white/90">
                {ch.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* How We Measure Success */}
      <Section className="bg-cloud">
        <SectionKicker>Tracking</SectionKicker>
        <SectionTitle className="mt-2">How we measure success</SectionTitle>
        <p className="mt-6 text-charcoal/80">
          We&apos;re not guessing. Every dollar is tracked. We&apos;ll meet once a month to review performance, adjust targeting, and optimize spend.
        </p>
        <div className="mt-10 space-y-3">
          {metrics.map((row, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-lg border border-mist bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="font-medium text-charcoal">{row.metric}</p>
              <div className="flex shrink-0 gap-4 text-sm">
                <span className="text-charcoal/60">Now: {row.now}</span>
                <span className="font-semibold text-ocean">90-day: {row.target}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Questions We'd Like to Know */}
      <Section className="bg-white">
        <SectionKicker>Your input</SectionKicker>
        <SectionTitle className="mt-2">Questions we&apos;d like to know</SectionTitle>
        <p className="mt-6 text-charcoal/80">
          These will help us fine-tune the plan. Answer whenever you&apos;re ready—even a quick text or voice memo works.
        </p>
        <ol className="mt-10 list-decimal list-inside space-y-6 text-charcoal/85">
          {questions.map((q, i) => (
            <li key={i} className="pl-2">
              {q}
            </li>
          ))}
        </ol>
      </Section>

      {/* Infrastructure */}
      <Section className="bg-cloud">
        <SectionKicker>Infrastructure</SectionKicker>
        <SectionTitle className="mt-2">Domains &amp; phone</SectionTitle>
        <p className="mt-6 text-charcoal/80 leading-relaxed">
          Behind the scenes, we&apos;re consolidating your digital infrastructure so everything is in one place, easier to manage, and ready to scale.
        </p>

        <div className="mt-10 space-y-8">
          {/* Domain Migration */}
          <div>
            <h3 className="font-display text-lg font-semibold text-horizon">
              Domain migration
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              Our team has initiated the transfer of all four of your domains from Squarespace to GoDaddy. The transfers are fully underway on our end—we&apos;re now waiting on the registrar migration to complete, which typically takes a few days.
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border border-mist">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-mist bg-white">
                    <th className="px-4 py-3 font-semibold text-horizon">Domain</th>
                    <th className="px-4 py-3 font-semibold text-horizon">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "bootstojourneys.com",
                    "btjtravel.com",
                    "endlesssojournstravel.com",
                    "pickcreativeprop.com",
                  ].map((domain) => (
                    <tr key={domain} className="border-b border-mist last:border-0">
                      <td className="px-4 py-3 text-charcoal">{domain}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <span className="h-2 w-2 rounded-full bg-ocean" />
                          Transfer in progress
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Phone System */}
          <div>
            <h3 className="font-display text-lg font-semibold text-horizon">
              Phone system
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              We&apos;re developing a plan to migrate your phone lines from RingCentral to{" "}
              <span className="font-medium text-horizon">Centervert Connect Phone</span>—our
              unified communications platform. This transition hasn&apos;t been initiated yet; it&apos;s
              slated for the next phase of work so we can coordinate the cutover without interrupting
              your day-to-day calls.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-mist bg-white px-4 py-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-charcoal/30" />
              <span className="text-charcoal/70">Not yet initiated — next phase</span>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-horizon text-white">
        <SectionKicker className="text-sunset">Next step</SectionKicker>
        <SectionTitle className="mt-2 text-white">Ready to launch?</SectionTitle>
        <p className="mt-6 text-white/85">
          Everything above is ready to go. We just need the green light.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="mailto:tyler@centervert.com?subject=Boots%20to%20Journeys%20-%20We're%20ready"
            className="inline-flex h-12 items-center justify-center rounded-sm bg-sunset px-8 font-semibold uppercase tracking-[0.2em] text-horizon transition hover:bg-sunset/90"
          >
            We&apos;re ready — go
          </a>
          <a
            href="mailto:tyler@centervert.com?subject=Boots%20to%20Journeys%20-%20Let's%20talk"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-white/70 px-8 font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
          >
            Let&apos;s talk first
          </a>
        </div>
        <p className="mt-10 text-sm text-white/70">
          Tyler Amos:{" "}
          <a href="mailto:tyler@centervert.com" className="underline hover:text-white">
            tyler@centervert.com
          </a>{" "}
          / (864) 987-8282 · Jordan Pierce:{" "}
          <a href="mailto:jordan@centervert.com" className="underline hover:text-white">
            jordan@centervert.com
          </a>
        </p>
      </Section>

      <footer className="border-t border-mist bg-cloud py-6 text-center text-xs text-charcoal/60">
        Last updated: March 2025
      </footer>
    </article>
  );
}
