import { z } from "zod";
import { bookingSchema } from "@/lib/booking-schema";

export const schedulingBookSchema = bookingSchema.extend({
  startsAt: z
    .string()
    .min(1, "Select a time slot.")
    .refine((s) => !Number.isNaN(Date.parse(s)), "Invalid start time."),
  guestTimezone: z.string().optional(),
  hostSlug: z.string().optional(),
  /** Honeypot — must stay empty (bots often fill hidden “company website” fields). */
  companyUrl: z
    .string()
    .optional()
    .refine((s) => !s?.trim(), { message: "Invalid submission." }),
  /** Cloudflare Turnstile token when `TURNSTILE_SECRET_KEY` is configured. */
  turnstileToken: z.string().optional(),
});

export type SchedulingBookPayload = z.infer<typeof schedulingBookSchema>;
