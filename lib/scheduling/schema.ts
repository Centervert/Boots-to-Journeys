import { z } from "zod";
import { bookingSchema } from "@/lib/booking-schema";

const YMD = /^\d{4}-\d{2}-\d{2}$/;
const HHMM = /^\d{2}:\d{2}$/;

export const schedulingBookSchema = bookingSchema.extend({
  preferredDate: z
    .string()
    .min(1, "Pick a date for your call.")
    .refine((s) => YMD.test(s), "Invalid date format."),
  preferredTime: z
    .string()
    .min(1, "Pick a time for your call.")
    .refine((s) => HHMM.test(s), "Invalid time format."),
  /** Honeypot — must stay empty (bots often fill hidden "company website" fields). */
  companyUrl: z
    .string()
    .optional()
    .refine((s) => !s?.trim(), { message: "Invalid submission." }),
  /** Cloudflare Turnstile token when `TURNSTILE_SECRET_KEY` is configured. */
  turnstileToken: z.string().optional(),
});

export type SchedulingBookPayload = z.infer<typeof schedulingBookSchema>;
