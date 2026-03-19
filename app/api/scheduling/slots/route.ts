import { NextResponse } from "next/server";
import { TZDate } from "@date-fns/tz";
import { getClientIp } from "@/lib/client-ip";
import { rateLimit } from "@/lib/rate-limit";
import { computeAvailableSlots } from "@/lib/scheduling/compute-slots";
import {
  fetchAppointmentsOverlappingRange,
  fetchDateOverride,
  fetchHostBySlug,
  fetchWeeklyRules,
} from "@/lib/scheduling/queries";
import { getServiceSupabase } from "@/lib/supabase/server";

const YMD = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  const sb = getServiceSupabase();
  if (!sb) {
    return NextResponse.json(
      { error: "Scheduling is not configured." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? "";
  const hostSlug = searchParams.get("hostSlug") ?? "default";

  if (!YMD.test(date)) {
    return NextResponse.json(
      { error: "Query `date` must be YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  const rl = rateLimit(`slots:${ip}`, 90, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  try {
    const host = await fetchHostBySlug(sb, hostSlug);
    if (!host) {
      return NextResponse.json({ error: "Host not found." }, { status: 404 });
    }

    const [weekly, override] = await Promise.all([
      fetchWeeklyRules(sb, host.id),
      fetchDateOverride(sb, host.id, date),
    ]);

    const overrides = override ? [override] : [];

    const [y, m, d] = date.split("-").map(Number);
    const dayMid = new TZDate(y, m - 1, d, 12, 0, 0, 0, host.timezone).getTime();
    const rangeStartIso = new Date(dayMid - 2 * 24 * 60 * 60 * 1000).toISOString();
    const rangeEndIso = new Date(dayMid + 2 * 24 * 60 * 60 * 1000).toISOString();

    const appointments = await fetchAppointmentsOverlappingRange(
      sb,
      host.id,
      rangeStartIso,
      rangeEndIso
    );

    const slots = computeAvailableSlots(
      date,
      host,
      weekly,
      overrides,
      appointments
    );

    return NextResponse.json({
      host: {
        slug: host.slug,
        displayName: host.display_name,
        timezone: host.timezone,
        slotDurationMinutes: host.slot_duration_minutes,
      },
      date,
      slots,
    });
  } catch (e) {
    console.error("scheduling/slots", e);
    return NextResponse.json(
      { error: "Could not load availability." },
      { status: 500 }
    );
  }
}
