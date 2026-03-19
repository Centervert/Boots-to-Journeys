export type SchedulingHostRow = {
  id: string;
  slug: string;
  display_name: string;
  timezone: string;
  slot_duration_minutes: number;
  buffer_before_minutes: number;
  buffer_after_minutes: number;
};

export type WeeklyRuleRow = {
  weekday: number;
  start_local_time: string;
  end_local_time: string;
};

export type DateOverrideRow = {
  override_date: string;
  is_closed: boolean;
  start_local_time: string | null;
  end_local_time: string | null;
};

export type AppointmentRow = {
  starts_at: string;
  ends_at: string;
};
