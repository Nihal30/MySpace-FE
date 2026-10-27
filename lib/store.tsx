"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { DayRecord, DayStatus, Priority } from "./types";
import { addDays, dayKey } from "./dateUtils";
import { seedDayData, TODAY } from "./mockData";

interface AppState {
  today: Date;
  dayData: Record<string, DayRecord>;
  /** currently open drawer date, or null if closed */
  drawerDate: Date | null;
  openDrawer: (date: Date) => void;
  closeDrawer: () => void;
  getDay: (date: Date) => DayRecord | undefined;
  dayStatus: (date: Date) => DayStatus;
  saveDay: (date: Date, patch: { summary?: string; completed?: boolean }) => void;
  /** sets tomorrow's carried-forward goal from `date`'s drawer */
  setNextDayGoal: (date: Date, goalText: string, priority: Priority) => void;
  currentStreak: () => number;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // TODO(API): replace seedDayData() with a fetch of GET /api/entries?range=... on mount
  const [dayData, setDayData] = useState<Record<string, DayRecord>>(() => seedDayData());
  const [drawerDate, setDrawerDate] = useState<Date | null>(null);

  const getDay = (date: Date) => dayData[dayKey(date)];

  const dayStatus = (date: Date): DayStatus => {
    if (date > TODAY) return "future";
    const rec = getDay(date);
    if (!rec) return "missed";
    if (rec.goalText) {
      const isToday = date.toDateString() === TODAY.toDateString();
      if (!rec.completed && !isToday) return "failed";
      if (!rec.completed && isToday) return "pending-today";
      return "logged";
    }
    return rec.summary ? "logged" : "missed";
  };

  const blankRecord = (date: Date): DayRecord => ({
    date: dayKey(date),
    summary: "",
    goalText: "",
    priority: "medium",
    completed: false,
  });

  const saveDay: AppState["saveDay"] = (date, patch) => {
    // TODO(API): PATCH /api/entries/:date  { summary, completed }
    setDayData((prev) => {
      const k = dayKey(date);
      const existing = prev[k] ?? blankRecord(date);
      return { ...prev, [k]: { ...existing, ...patch } };
    });
  };

  const setNextDayGoal: AppState["setNextDayGoal"] = (date, goalText, priority) => {
    // TODO(API): POST /api/entries/:nextDate/goal  { goalText, priority }
    const nextKey = dayKey(addDays(date, 1));
    setDayData((prev) => {
      const existing = prev[nextKey] ?? blankRecord(addDays(date, 1));
      return { ...prev, [nextKey]: { ...existing, goalText, priority, completed: false } };
    });
  };

  const currentStreak = () => {
    // TODO(API): this normally comes pre-computed from GET /api/streak (server is source of truth)
    let streak = 0;
    let cursor = new Date(TODAY);
    while (true) {
      const s = dayStatus(cursor);
      if (s === "logged" || s === "pending-today") {
        streak++;
        cursor = addDays(cursor, -1);
      } else break;
    }
    return streak;
  };

  const value = useMemo<AppState>(
    () => ({
      today: TODAY,
      dayData,
      drawerDate,
      openDrawer: setDrawerDate,
      closeDrawer: () => setDrawerDate(null),
      getDay,
      dayStatus,
      saveDay,
      setNextDayGoal,
      currentStreak,
    }),
    [dayData, drawerDate]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
