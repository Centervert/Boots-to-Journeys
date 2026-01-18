"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a phone number."),
  preferredStart: z.string().min(1, "Select a preferred start date."),
  preferredEnd: z.string().min(1, "Select a preferred end date."),
  tripType: z.string().min(1, "Select a trip type."),
  destination: z.string().min(2, "Tell us your destination."),
  travelDates: z.string().min(2, "Share your ideal travel window."),
  travelers: z.string().min(1, "Number of travelers is required."),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const tripTypes = [
  "All-Inclusive",
  "Cruise",
  "Faith-Based",
  "Family",
  "Group",
  "Luxury",
  "Romance",
];

export default function BookingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("booking_request", data);
  };

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
          Tell us about your trip
        </h1>
        <p className="mt-4 text-sm text-charcoal/80">
          Share a few details and we will reach out to confirm availability and
          build your custom itinerary.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 grid gap-6 rounded-2xl border border-mist bg-white/95 p-8 shadow-sm backdrop-blur"
        >
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

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
