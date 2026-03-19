"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import {
  schedulingBookSchema,
  type SchedulingBookPayload,
} from "@/lib/scheduling/schema";

const tripTypes = [
  "All-Inclusive",
  "Cruise",
  "Faith-Based",
  "Family",
  "Group",
  "Luxury",
  "Romance",
];

const HOST_SLUG = "default";
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

type SlotsResponse = {
  host: {
    slug: string;
    displayName: string;
    timezone: string;
    slotDurationMinutes: number;
  };
  date: string;
  slots: string[];
};

function localYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatSlotTime(iso: string, timeZone: string) {
  return new Date(iso).toLocaleString(undefined, {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guestTz, setGuestTz] = useState("America/New_York");
  const [pickDate, setPickDate] = useState("");
  const [slotsRes, setSlotsRes] = useState<SlotsResponse | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SchedulingBookPayload>({
    resolver: zodResolver(schedulingBookSchema),
    defaultValues: {
      hostSlug: HOST_SLUG,
      startsAt: "",
      fullName: "",
      email: "",
      phone: "",
      preferredStart: "",
      preferredEnd: "",
      tripType: "",
      destination: "",
      travelDates: "",
      travelers: "",
      notes: "",
      companyUrl: "",
      turnstileToken: "",
    },
  });

  const startsAt = watch("startsAt");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setGuestTz(tz);
    } catch {
      /* ignore */
    }
    setPickDate(localYmd(new Date()));
  }, []);

  const loadSlots = useCallback(async (date: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    setSlotsLoading(true);
    setSlotsError(null);
    setSlotsRes(null);
    try {
      const q = new URLSearchParams({ date, hostSlug: HOST_SLUG });
      const res = await fetch(`/api/scheduling/slots?${q}`);
      const body = (await res.json()) as SlotsResponse & { error?: string };
      if (!res.ok) {
        setSlotsError(body.error ?? "Could not load times.");
        return;
      }
      setSlotsRes(body);
    } catch {
      setSlotsError("Could not load times.");
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (step === 1 && pickDate) loadSlots(pickDate);
  }, [pickDate, step, loadSlots]);

  const minDate = useMemo(() => localYmd(new Date()), []);

  const goStep2 = () => {
    if (!startsAt) {
      setSlotsError("Choose a time to continue.");
      return;
    }
    setValue("guestTimezone", guestTz);
    setSlotsError(null);
    setStep(2);
  };

  const goStep3 = async () => {
    const ok = await trigger();
    if (!ok) return;
    setStep(3);
  };

  const onFinalSubmit = async (data: SchedulingBookPayload) => {
    setSubmitError(null);
    const res = await fetch("/api/scheduling/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        hostSlug: HOST_SLUG,
        guestTimezone: guestTz,
      }),
    });
    if (!res.ok) {
      try {
        const body = (await res.json()) as { error?: string };
        setSubmitError(
          body.error ??
            "Something went wrong. Please try again or contact us directly."
        );
      } catch {
        setSubmitError(
          "Something went wrong. Please try again or contact us directly."
        );
      }
      return;
    }
    router.push("/book/thank-you");
  };

  const values = watch();

  return (
    <section
      className="relative overflow-hidden bg-white bg-cover bg-top pt-32 pb-24 -mt-20"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,1) 70%), url('/start-booking-hero.jpg')",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean">
          Start Booking
        </p>
        <h1 className="mt-4 font-display text-4xl text-horizon">
          Book a planning call
        </h1>
        <p className="mt-4 text-sm text-charcoal/80">
          Pick a time, share your trip details, and confirm — like Calendly,
          built for Boots to Journeys.
        </p>

        <ol className="mt-8 flex gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
          <li className={step === 1 ? "text-ocean" : ""}>1. Schedule</li>
          <li aria-hidden>·</li>
          <li className={step === 2 ? "text-ocean" : ""}>2. Trip details</li>
          <li aria-hidden>·</li>
          <li className={step === 3 ? "text-ocean" : ""}>3. Confirm</li>
        </ol>

        <div className="relative mt-10 rounded-2xl border border-mist bg-white/95 p-8 shadow-sm backdrop-blur">
          <div
            className="pointer-events-none absolute -left-[10000px] top-0 h-px w-px overflow-hidden opacity-0"
            aria-hidden
          >
            <label htmlFor="booking-company-url">Company website</label>
            <input
              id="booking-company-url"
              {...register("companyUrl")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {step === 1 && (
            <div className="grid gap-6">
              <div className="grid gap-2 text-sm text-charcoal">
                <span className="font-medium">Your timezone</span>
                <input
                  value={guestTz}
                  onChange={(e) => setGuestTz(e.target.value)}
                  className="h-11 rounded-md border border-mist bg-white px-3"
                  placeholder="e.g. America/Chicago"
                  aria-label="IANA timezone"
                />
                <span className="text-xs text-charcoal/60">
                  Used to display times. Usually detected automatically; adjust
                  if needed.
                </span>
              </div>
              <label className="grid gap-2 text-sm text-charcoal">
                Date (host calendar day)
                <input
                  type="date"
                  min={minDate}
                  value={pickDate}
                  onChange={(e) => {
                    setPickDate(e.target.value);
                    setValue("startsAt", "");
                  }}
                  className="h-11 rounded-md border border-mist bg-white px-3"
                />
              </label>
              {slotsRes && (
                <p className="text-xs text-charcoal/70">
                  {slotsRes.host.displayName} ·{" "}
                  {slotsRes.host.slotDurationMinutes} min · Host timezone:{" "}
                  {slotsRes.host.timezone}
                </p>
              )}
              {slotsLoading && (
                <p className="text-sm text-charcoal/70">Loading open times…</p>
              )}
              {slotsError && (
                <p className="text-sm text-coral">{slotsError}</p>
              )}
              {!slotsLoading && slotsRes && slotsRes.slots.length === 0 && (
                <p className="text-sm text-charcoal/70">
                  No open times that day. Try another date.
                </p>
              )}
              {slotsRes && slotsRes.slots.length > 0 && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {slotsRes.slots.map((iso) => {
                    const selected = startsAt === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => setValue("startsAt", iso)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          selected
                            ? "border-ocean bg-ocean/10 text-horizon"
                            : "border-mist bg-white text-charcoal hover:border-ocean/50"
                        }`}
                      >
                        {formatSlotTime(iso, guestTz)}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="flex justify-end pt-2">
                <Button type="button" size="lg" onClick={goStep2}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-charcoal">
                  Full Name
                  <input
                    {...register("fullName")}
                    className="h-11 rounded-md border border-mist bg-white px-3"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-coral">
                      {errors.fullName.message}
                    </span>
                  )}
                </label>
                <label className="grid gap-2 text-sm text-charcoal">
                  Email
                  <input
                    {...register("email")}
                    type="email"
                    className="h-11 rounded-md border border-mist bg-white px-3"
                  />
                  {errors.email && (
                    <span className="text-xs text-coral">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-charcoal">
                  Phone
                  <input
                    {...register("phone")}
                    type="tel"
                    className="h-11 rounded-md border border-mist bg-white px-3"
                  />
                  {errors.phone && (
                    <span className="text-xs text-coral">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
                <label className="grid gap-2 text-sm text-charcoal">
                  Trip Type
                  <select
                    {...register("tripType")}
                    className="h-11 rounded-md border border-mist bg-white px-3"
                  >
                    <option value="">Select</option>
                    {tripTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.tripType && (
                    <span className="text-xs text-coral">
                      {errors.tripType.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-charcoal">
                  Preferred Start
                  <input
                    {...register("preferredStart")}
                    type="date"
                    className="h-11 rounded-md border border-mist bg-white px-3"
                  />
                  {errors.preferredStart && (
                    <span className="text-xs text-coral">
                      {errors.preferredStart.message}
                    </span>
                  )}
                </label>
                <label className="grid gap-2 text-sm text-charcoal">
                  Preferred End
                  <input
                    {...register("preferredEnd")}
                    type="date"
                    className="h-11 rounded-md border border-mist bg-white px-3"
                  />
                  {errors.preferredEnd && (
                    <span className="text-xs text-coral">
                      {errors.preferredEnd.message}
                    </span>
                  )}
                </label>
              </div>

              <label className="grid gap-2 text-sm text-charcoal">
                Destination(s)
                <input
                  {...register("destination")}
                  className="h-11 rounded-md border border-mist bg-white px-3"
                />
                {errors.destination && (
                  <span className="text-xs text-coral">
                    {errors.destination.message}
                  </span>
                )}
              </label>

              <label className="grid gap-2 text-sm text-charcoal">
                Ideal Travel Dates / Window
                <input
                  {...register("travelDates")}
                  placeholder="e.g. Late June for 7-10 days"
                  className="h-11 rounded-md border border-mist bg-white px-3"
                />
                {errors.travelDates && (
                  <span className="text-xs text-coral">
                    {errors.travelDates.message}
                  </span>
                )}
              </label>

              <label className="grid gap-2 text-sm text-charcoal">
                Number of Travelers
                <input
                  {...register("travelers")}
                  type="number"
                  min="1"
                  className="h-11 rounded-md border border-mist bg-white px-3"
                />
                {errors.travelers && (
                  <span className="text-xs text-coral">
                    {errors.travelers.message}
                  </span>
                )}
              </label>

              <label className="grid gap-2 text-sm text-charcoal">
                Notes
                <textarea
                  {...register("notes")}
                  rows={4}
                  className="rounded-md border border-mist bg-white px-3 py-2"
                />
              </label>

              <div className="flex justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button type="button" size="lg" onClick={goStep3}>
                  Continue
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form
              className="grid gap-6"
              onSubmit={handleSubmit(onFinalSubmit)}
            >
              <div className="rounded-lg border border-mist bg-cloud/40 p-4 text-sm text-charcoal">
                <p className="font-semibold text-horizon">Call time</p>
                <p className="mt-1">
                  {startsAt
                    ? formatSlotTime(startsAt, guestTz)
                    : "—"}
                </p>
                <p className="mt-4 font-semibold text-horizon">Contact</p>
                <p className="mt-1">
                  {values.fullName} · {values.email} · {values.phone}
                </p>
                <p className="mt-4 font-semibold text-horizon">Trip</p>
                <p className="mt-1">
                  {values.tripType} · {values.destination}
                </p>
                <p className="mt-1 text-charcoal/80">
                  Travelers: {values.travelers} · Window:{" "}
                  {values.travelDates}
                </p>
                {values.notes && (
                  <p className="mt-2 text-charcoal/80">Notes: {values.notes}</p>
                )}
              </div>

              {submitError && (
                <p className="text-sm text-coral">{submitError}</p>
              )}

              {TURNSTILE_SITE_KEY ? (
                <div className="flex min-h-[65px] items-center justify-center">
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setValue("turnstileToken", token)}
                    onExpire={() => setValue("turnstileToken", "")}
                    onError={() => setValue("turnstileToken", "")}
                  />
                </div>
              ) : null}

              <p className="text-center text-xs text-charcoal/60">
                By confirming, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-ocean underline-offset-2 hover:underline"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-ocean underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="flex justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button type="submit" size="lg">
                  Confirm booking
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
