import { z } from "zod";

export const bookingSchema = z.object({
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

export type BookingFormValues = z.infer<typeof bookingSchema>;
