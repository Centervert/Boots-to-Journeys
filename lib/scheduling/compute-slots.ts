import { TZDate } from "@date-fns/tz";
import { addMinutes } from "date-fns";
import type {
  AppointmentRow,
  DateOverrideRow,
  SchedulingHostRow,
  WeeklyRuleRow,
} from "./types";

function parseYmd(ymd: string): { y: number; m: number; d: number } {
  const parts = ymd.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    throw new Error("Invalid date");
  }
  const [y, m, d] = parts;
  return { y, m, d };
}

function parsePgTime(timeStr: string): { h: number; min: number } {
  const [h, min] = timeStr.split(":").map(Number);
  return { h, min: min ?? 0 };
}

/** Host-local calendar weekday (0 = Sunday … 6 = Saturday) for this Y-M-D in host TZ. */
export function weekdayInHostTz(ymd: string, hostTz: string): number {
  const { y, m, d } = parseYmd(ymd);
  const inst = new TZDate(y, m - 1, d, 12, 0, 0, 0, hostTz);
  return inst.getDay();
}

type Window = { startMs: number; endMs: number };

function hostLocalWindowForDay(
  ymd: string,
  hostTz: string,
  open: { h: number; min: number },
  close: { h: number; min: number }
): Window {
  const { y, m, d } = parseYmd(ymd);
  const start = new TZDate(y, m - 1, d, open.h, open.min, 0, 0, hostTz);
  const end = new TZDate(y, m - 1, d, close.h, close.min, 0, 0, hostTz);
  return { startMs: start.getTime(), endMs: end.getTime() };
}

function expandAppointmentBusy(
  apt: AppointmentRow,
  bufferBefore: number,
  bufferAfter: number
): { from: number; to: number } {
  const start = new Date(apt.starts_at).getTime();
  const end = new Date(apt.ends_at).getTime();
  return {
    from: addMinutes(new Date(start), -bufferBefore).getTime(),
    to: addMinutes(new Date(end), bufferAfter).getTime(),
  };
}

function overlaps(aFrom: number, aTo: number, bFrom: number, bTo: number) {
  return aFrom < bTo && aTo > bFrom;
}

/**
 * Resolve open/close window for `ymd` (host-local calendar date) from weekly rules and overrides.
 */
export function resolveDayWindow(
  ymd: string,
  host: SchedulingHostRow,
  weekly: WeeklyRuleRow[],
  overrides: DateOverrideRow[]
): Window | null {
  const o = overrides.find((r) => r.override_date === ymd);
  if (o?.is_closed) return null;
  if (o && !o.is_closed && o.start_local_time && o.end_local_time) {
    const open = parsePgTime(o.start_local_time);
    const close = parsePgTime(o.end_local_time);
    return hostLocalWindowForDay(ymd, host.timezone, open, close);
  }

  const dow = weekdayInHostTz(ymd, host.timezone);
  const rule = weekly.find((w) => w.weekday === dow);
  if (!rule) return null;
  const open = parsePgTime(rule.start_local_time);
  const close = parsePgTime(rule.end_local_time);
  return hostLocalWindowForDay(ymd, host.timezone, open, close);
}

/**
 * Returns confirmed slot **start** instants as UTC ISO strings.
 */
export function computeAvailableSlots(
  ymd: string,
  host: SchedulingHostRow,
  weekly: WeeklyRuleRow[],
  overrides: DateOverrideRow[],
  appointments: AppointmentRow[],
  nowMs: number = Date.now()
): string[] {
  const window = resolveDayWindow(ymd, host, weekly, overrides);
  if (!window) return [];

  const duration = host.slot_duration_minutes;
  const durationMs = duration * 60_000;
  const busy = appointments.map((a) =>
    expandAppointmentBusy(a, host.buffer_before_minutes, host.buffer_after_minutes)
  );

  const slots: string[] = [];
  let slotStart = window.startMs;

  while (slotStart + durationMs <= window.endMs) {
    const slotEnd = slotStart + durationMs;
    if (slotStart >= nowMs) {
      const blocked = busy.some((b) => overlaps(slotStart, slotEnd, b.from, b.to));
      if (!blocked) {
        slots.push(new Date(slotStart).toISOString());
      }
    }
    slotStart = addMinutes(new Date(slotStart), duration).getTime();
  }

  return slots;
}
