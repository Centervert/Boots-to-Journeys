import { NextResponse } from "next/server";
import { TZDate } from "@date-fns/tz";
import { addMinutes } from "date-fns";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";
import { schedulingBookSchema } from "@/lib/scheduling/schema";
import { getServiceSupabase } from "@/lib/supabase/server";
import { turnstileRequired, verifyTurnstileToken } from "@/lib/turnstile";

const HOST_TZ = "America/New_York";
const CALL_DURATION_MIN = 30;
const WEBHOOK_TIMEOUT_MS = 12_000;

export async function POST(request: Request) {
  const sb = getServiceSupabase();
  if (!sb) {
    return NextResponse.json(
      { error: "Booking is not configured." },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  const rl = rateLimit(`book:${ip}`, 8, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many booking attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = schedulingBookSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Invalid booking data." },
      { status: 400 }
    );
  }

  const body = parsed.data;

  if (turnstileRequired()) {
    const secret = process.env.TURNSTILE_SECRET_KEY!.trim();
    const ok = await verifyTurnstileToken(body.turnstileToken, secret, ip);
    if (!ok) {
      return NextResponse.json(
        { error: "Security check failed. Refresh the page and try again." },
        { status: 400 }
      );
    }
  }

  const [y, m, d] = body.preferredDate.split("-").map(Number);
  const [h, min] = body.preferredTime.split(":").map(Number);
  const startsAt = new TZDate(y, m - 1, d, h, min, 0, 0, HOST_TZ);
  if (Number.isNaN(startsAt.getTime())) {
    return NextResponse.json(
      { error: "Invalid date or time." },
      { status: 400 }
    );
  }
  const endsAt = addMinutes(startsAt, CALL_DURATION_MIN);

  try {
    const row = {
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      status: "confirmed" as const,
      guest_timezone: HOST_TZ,
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      preferred_start: body.preferredStart,
      preferred_end: body.preferredEnd,
      trip_type: body.tripType,
      destination: body.destination,
      travel_dates: body.travelDates,
      travelers: body.travelers,
      notes: body.notes ?? null,
    };

    const { data: inserted, error } = await sb
      .from("appointments")
      .insert(row)
      .select("id, cancellation_token")
      .single();

    if (error) {
      console.error("appointments insert", error);
      return NextResponse.json(
        { error: "Could not complete booking. Try again." },
        { status: 500 }
      );
    }

    const webhookUrl = process.env.BOOKING_WEBHOOK_URL?.trim();
    if (webhookUrl) {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      const secret = process.env.BOOKING_WEBHOOK_SECRET?.trim();
      if (secret) headers.Authorization = `Bearer ${secret}`;
      try {
        const webhookPayload = { ...body };
        delete webhookPayload.companyUrl;
        delete webhookPayload.turnstileToken;
        const upstream = await fetch(webhookUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({
            ...webhookPayload,
            appointmentId: inserted.id,
          }),
          signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
        });
        if (!upstream.ok) {
          console.error("BOOKING_WEBHOOK_URL returned", upstream.status);
        }
      } catch (e) {
        console.error("BOOKING_WEBHOOK_URL failed", e);
      }
    }

    return NextResponse.json({
      success: true,
      appointmentId: inserted.id,
      cancellationToken: inserted.cancellation_token,
    });
  } catch (e) {
    console.error("scheduling/book", e);
    return NextResponse.json(
      { error: "Could not complete booking." },
      { status: 500 }
    );
  }
}
