import { DayRecord, Goal, DailyTask, Quote } from "./types";
import { addDays, dayKey } from "./dateUtils";

// In the real app TODAY comes from the client clock; fixed here only for the mock.
export const TODAY = new Date(2026, 8, 17);

export function seedDayData(): Record<string, DayRecord> {
  const data: Record<string, DayRecord> = {};
  const seed = (
    offset: number,
    summary: string,
    goalText: string,
    priority: DayRecord["priority"],
    completed: boolean
  ) => {
    const d = addDays(TODAY, offset);
    data[dayKey(d)] = { date: dayKey(d), summary, goalText, priority, completed };
  };

  seed(-4, "Long focus day, planned the week properly.", "Set up CIL MT study tracker", "medium", true);
  seed(-3, "Good energy. Cleared the backlog on the dashboard rewrite.", "30 min run", "low", false); // failed day
  seed(-2, "Slow start but pushed through a hard bug.", "Read DDIA ch.5", "medium", true);
  seed(-1, "Solid day, socket layer mostly done.", "Read 20 pages — DDIA ch.6", "medium", true);
  seed(0, "Shipped the socket reconnect fix finally. Skipped the gym, will make up tomorrow.", "Write CIL MT mock test — Section B", "high", false); // today, open

  return data;
}

export const MOCK_GOALS: Goal[] = [
  { id: "g1", title: "Clear CIL MT exam", deadline: "2026-10-06", progressPct: 34, todayStepText: "Write CIL MT mock test — Section B" },
  { id: "g2", title: "Ship v2 of the dashboard", deadline: "2026-09-23", progressPct: 82, todayStepText: "Finish socket reconnect fix — done" },
  { id: "g3", title: "Run a 10K by December", deadline: "2026-12-15", progressPct: 18, todayStepText: "30 min run — makeup for today" },
];

export const MOCK_TASKS: DailyTask[] = [
  { id: "t1", text: "Finish socket reconnect fix", goalTitle: "Ship v2 of the dashboard", done: true },
  { id: "t2", text: "Read 20 pages — DDIA ch. 6", goalTitle: "Finish 4 technical books this year", done: true },
  { id: "t3", text: "Write CIL MT mock test — Section B", goalTitle: "Clear CIL MT exam", done: false },
  { id: "t4", text: "30 min run — makeup for today", goalTitle: "Run a 10K by December", done: false },
];

export const QUOTES: Quote[] = [
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "James Clear" },
  { text: "The chains of habit are too weak to be felt until they are too strong to be broken.", author: "Samuel Johnson" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "Motivation gets you going, but discipline keeps you growing.", author: "John C. Maxwell" },
  { text: "A goal without a deadline is just a dream.", author: "Napoleon Hill" },
];

export function quoteForDate(date: Date): Quote {
  const dayIndex = Math.floor(date.getTime() / 86400000) % QUOTES.length;
  return QUOTES[dayIndex];
}
