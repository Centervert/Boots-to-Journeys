import { NextResponse } from "next/server";
import { addMinutes } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";
import {
  computeAvailableSlots,
  resolveDayWindow,
} from "@/lib/scheduling/compute-slots";
import {
  fetchAppointmentsOverlappingRange,
  fetchDateOverride,
  fetchHostBySlug,
  fetchWeeklyRules,
} from "@/lib/scheduling/queries";
import { schedulingBookSchema } from "@/lib/scheduling/schema";
import { getServiceSupabase } from "@/lib/supabase/server";
import { turnstileRequired, verifyTurnstileToken } from "@/lib/turnstile";

const WEBHOOK_TIMEOUT_MS = 12_000;

function ymdFromInstantInHostTz(instant: Date, hostTz: string): string {
  const d = new TZDate(instant, hostTz);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function POST(request: Request) {
  const sb = getServiceSupabase();
  if (!sb) {
    return NextResponse.json(
      { error: "Scheduling is not configured." },
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
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
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

  const hostSlug = body.hostSlug ?? "default";
  const startsAt = new Date(body.startsAt);
  if (Number.isNaN(startsAt.getTime())) {
    return NextResponse.json({ error: "Invalid start time." }, { status: 400 });
  }

  try {
    const host = await fetchHostBySlug(sb, hostSlug);
    if (!host) {
      return NextResponse.json({ error: "Host not found." }, { status: 404 });
    }

    const endsAt = addMinutes(startsAt, host.slot_duration_minutes);
    const ymd = ymdFromInstantInHostTz(startsAt, host.timezone);

    const [weekly, override] = await Promise.all([
      fetchWeeklyRules(sb, host.id),
      fetchDateOverride(sb, host.id, ymd),
    ]);
    const overrides = override ? [override] : [];
    const window = resolveDayWindow(ymd, host, weekly, overrides);
    if (!window) {
      return NextResponse.json(
        { error: "That time is not within available hours." },
        { status: 400 }
      );
    }

    const startMs = startsAt.getTime();
    const endMs = endsAt.getTime();
    if (startMs < window.startMs || endMs > window.endMs) {
      return NextResponse.json(
        { error: "That time is not within available hours." },
        { status: 400 }
      );
    }

    const [yy, mm, dd] = ymd.split("-").map(Number);
    const dayMid = new TZDate(yy, mm - 1, dd, 12, 0, 0, 0, host.timezone).getTime();

    const rangeStartIso = new Date(dayMid - 2 * 24 * 60 * 60 * 1000).toISOString();
    const rangeEndIso = new Date(dayMid + 2 * 24 * 60 * 60 * 1000).toISOString();

    const appointments = await fetchAppointmentsOverlappingRange(
      sb,
      host.id,
      rangeStartIso,
      rangeEndIso
    );

    const stillOpen = computeAvailableSlots(
      ymd,
      host,
      weekly,
      overrides,
      appointments
    );
    const iso = startsAt.toISOString();
    if (!stillOpen.includes(iso)) {
      return NextResponse.json(
        { error: "That slot is no longer available. Pick another time." },
        { status: 409 }
      );
    }

    const row = {
      host_id: host.id,
      starts_at: iso,
      ends_at: endsAt.toISOString(),
      status: "confirmed" as const,
      guest_timezone: body.guestTimezone ?? null,
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
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "That slot was just taken. Pick another time." },
          { status: 409 }
        );
      }
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
