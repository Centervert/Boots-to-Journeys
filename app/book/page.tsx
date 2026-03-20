"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
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

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

function localYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SchedulingBookPayload>({
    resolver: zodResolver(schedulingBookSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
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

  const onSubmit = async (data: SchedulingBookPayload) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/scheduling/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    } finally {
      setSubmitting(false);
    }
  };

  const minDate = localYmd(new Date());

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
          Tell us about your trip and pick a time that works for you.
          We&apos;ll take it from there.
        </p>

        <form
          className="relative mt-10 rounded-2xl border border-mist bg-white/95 p-8 shadow-sm backdrop-blur"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Honeypot */}
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

          <div className="grid gap-6">
            {/* Contact */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-charcoal">
                Full name
                <input
                  {...register("fullName")}
                  className="h-11 rounded-md border border-mist bg-white px-3"
                  placeholder="Shannon Carter"
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
                  placeholder="you@example.com"
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
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <span className="text-xs text-coral">
                    {errors.phone.message}
                  </span>
                )}
              </label>
              <label className="grid gap-2 text-sm text-charcoal">
                Trip type
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

            {/* Call date & time */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-charcoal">
                Preferred call date
                <input
                  {...register("preferredDate")}
                  type="date"
                  min={minDate}
                  className="h-11 rounded-md border border-mist bg-white px-3"
                />
                {errors.preferredDate && (
                  <span className="text-xs text-coral">
                    {errors.preferredDate.message}
                  </span>
                )}
              </label>
              <label className="grid gap-2 text-sm text-charcoal">
                Preferred call time (Eastern)
                <input
                  {...register("preferredTime")}
                  type="time"
                  className="h-11 rounded-md border border-mist bg-white px-3"
                />
                {errors.preferredTime && (
                  <span className="text-xs text-coral">
                    {errors.preferredTime.message}
                  </span>
                )}
              </label>
            </div>

            {/* Trip details */}
            <label className="grid gap-2 text-sm text-charcoal">
              Destination(s)
              <input
                {...register("destination")}
                className="h-11 rounded-md border border-mist bg-white px-3"
                placeholder="e.g. Caribbean, Alaska, Italy"
              />
              {errors.destination && (
                <span className="text-xs text-coral">
                  {errors.destination.message}
                </span>
              )}
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-charcoal">
                Earliest travel date
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
                Latest travel date
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

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-charcoal">
                Ideal travel window
                <input
                  {...register("travelDates")}
                  placeholder="e.g. Late June for 7–10 days"
                  className="h-11 rounded-md border border-mist bg-white px-3"
                />
                {errors.travelDates && (
                  <span className="text-xs text-coral">
                    {errors.travelDates.message}
                  </span>
                )}
              </label>
              <label className="grid gap-2 text-sm text-charcoal">
                Number of travelers
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
            </div>

            <label className="grid gap-2 text-sm text-charcoal">
              Anything else we should know?
              <textarea
                {...register("notes")}
                rows={3}
                className="rounded-md border border-mist bg-white px-3 py-2"
              />
            </label>

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
              By submitting, you agree to our{" "}
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

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Submitting…" : "Book my call"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
