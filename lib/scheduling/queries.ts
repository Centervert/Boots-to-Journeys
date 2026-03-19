import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AppointmentRow,
  DateOverrideRow,
  SchedulingHostRow,
  WeeklyRuleRow,
} from "./types";

export async function fetchHostBySlug(
  sb: SupabaseClient,
  slug: string
): Promise<SchedulingHostRow | null> {
  const { data, error } = await sb
    .from("scheduling_hosts")
    .select(
      "id, slug, display_name, timezone, slot_duration_minutes, buffer_before_minutes, buffer_after_minutes"
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as SchedulingHostRow | null;
}

export async function fetchWeeklyRules(
  sb: SupabaseClient,
  hostId: string
): Promise<WeeklyRuleRow[]> {
  const { data, error } = await sb
    .from("scheduling_weekly_rules")
    .select("weekday, start_local_time, end_local_time")
    .eq("host_id", hostId);
  if (error) throw error;
  return (data ?? []) as WeeklyRuleRow[];
}

export async function fetchDateOverride(
  sb: SupabaseClient,
  hostId: string,
  ymd: string
): Promise<DateOverrideRow | null> {
  const { data, error } = await sb
    .from("scheduling_date_overrides")
    .select("override_date, is_closed, start_local_time, end_local_time")
    .eq("host_id", hostId)
    .eq("override_date", ymd)
    .maybeSingle();
  if (error) throw error;
  return data as DateOverrideRow | null;
}

export async function fetchAppointmentsOverlappingRange(
  sb: SupabaseClient,
  hostId: string,
  rangeStartIso: string,
  rangeEndIso: string
): Promise<AppointmentRow[]> {
  const { data, error } = await sb
    .from("appointments")
    .select("starts_at, ends_at")
    .eq("host_id", hostId)
    .eq("status", "confirmed")
    .lt("starts_at", rangeEndIso)
    .gt("ends_at", rangeStartIso);
  if (error) throw error;
  return (data ?? []) as AppointmentRow[];
}
