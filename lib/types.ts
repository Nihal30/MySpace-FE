export type Priority = "high" | "medium" | "low";

export type ViewName = "today" | "week" | "month" | "calendar" | "goals";

/** One calendar day's record — matches the BE DailyEntry document. */
export interface DayRecord {
  /** "YYYY-M-D" local-date key, no timezone math needed for the UI mock */
  date: string;
  summary: string;
  /** the goal carried INTO this day (set the previous day as "goal for tomorrow") */
  goalText: string;
  priority: Priority;
  completed: boolean;
  mood?: string;
}

export type DayStatus = "future" | "missed" | "failed" | "logged" | "pending-today";

export interface Goal {
  id: string;
  title: string;
  deadline: string; // ISO date
  progressPct: number;
  todayStepText: string;
}

export interface DailyTask {
  id: string;
  text: string;
  goalTitle: string;
  done: boolean;
}

export interface Quote {
  text: string;
  author: string;
}
