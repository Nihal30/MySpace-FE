"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import { addDays, dayKey, fmtLongDate } from "@/lib/dateUtils";
import { Priority } from "@/lib/types";
import { TODAY } from "@/lib/mockData";

const PRIORITIES: Priority[] = ["high", "medium", "low"];
const PRIORITY_BTN_SELECTED: Record<Priority, string> = {
  high: "bg-rust-dim text-rust border-transparent",
  medium: "bg-[#3A331F] text-[#D9B15C] border-transparent",
  low: "bg-moss-dim text-moss border-transparent",
};
const PILL_CLASS: Record<Priority, string> = {
  high: "bg-rust-dim text-rust",
  medium: "bg-[#3A331F] text-[#D9B15C]",
  low: "bg-moss-dim text-moss",
};

export default function DayDrawer() {
  const { drawerDate, closeDrawer, getDay, saveDay, setNextDayGoal, dayStatus } = useApp();

  const [summary, setSummary] = useState("");
  const [completed, setCompleted] = useState(false);
  const [nextGoalText, setNextGoalText] = useState("");
  const [nextPriority, setNextPriority] = useState<Priority>("medium");

  // re-hydrate the form whenever a new day is opened
  useEffect(() => {
    if (!drawerDate) return;
    const rec = getDay(drawerDate);
    setSummary(rec?.summary ?? "");
    setCompleted(rec?.completed ?? false);

    const nextRec = getDay(addDays(drawerDate, 1));
    setNextGoalText(nextRec?.goalText ?? "");
    setNextPriority(nextRec?.priority ?? "medium");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerDate]);

  if (!drawerDate) return null;

  const rec = getDay(drawerDate);
  const isToday = drawerDate.toDateString() === TODAY.toDateString();
  const status = dayStatus(drawerDate);

  const handleSave = () => {
    // TODO(API): PATCH /api/entries/:date  { summary, completed }
    saveDay(drawerDate, { summary, completed });
    // TODO(API): POST /api/entries/:nextDate/goal  { goalText, priority }  (only if nextGoalText is non-empty)
    if (nextGoalText.trim()) setNextDayGoal(drawerDate, nextGoalText.trim(), nextPriority);
    closeDrawer();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={(e) => e.target === e.currentTarget && closeDrawer()}
    >
      <aside className="w-[420px] max-w-[92vw] h-full bg-bg border-l border-border flex flex-col animate-[slideIn_.18s_ease-out]">
        <div className="flex justify-between items-start px-[22px] pt-[22px] pb-4 border-b border-border">
          <div>
            <div className="text-xl font-semibold">{fmtLongDate(drawerDate)}</div>
            <div className="font-mono text-[11px] text-text-faint mt-1">
              {isToday ? "Today" : status === "failed" ? "Failed day" : "Logged day"}
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="w-7 h-7 rounded-md border border-border bg-surface text-text-dim"
          >
            ✕
          </button>
        </div>

        <div className="px-[22px] py-5 overflow-y-auto flex-1 flex flex-col gap-6">
          {rec?.goalText && (
            <div className="flex flex-col gap-2">
              <div className="font-mono text-[11px] text-text-faint">Goal carried into this day</div>
              <div className="flex items-center gap-2.5 border border-border bg-surface rounded-lg px-3.5 py-3">
                <label className="flex items-center gap-2.5 flex-1 text-[13.5px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="w-4 h-4 accent-moss cursor-pointer"
                  />
                  {rec.goalText}
                </label>
                <span className={`font-mono text-[10px] px-2 py-[3px] rounded ${PILL_CLASS[rec.priority]}`}>
                  {rec.priority}
                </span>
              </div>
              <div className="font-mono text-[10.5px] text-text-faint leading-relaxed">
                Unchecked at day&apos;s end = this day counts as <b className="text-rust">failed</b> and the streak resets.
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="font-mono text-[11px] text-text-faint">Daily summary</div>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Kaisa raha ye din — kaam, mood, koi win ya blocker..."
              className="w-full min-h-[110px] bg-surface border border-border rounded-lg px-3.5 py-3 text-text font-serif text-sm leading-relaxed resize-y placeholder:text-text-faint"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-mono text-[11px] text-text-faint">Set goal for tomorrow</div>
            <input
              type="text"
              value={nextGoalText}
              onChange={(e) => setNextGoalText(e.target.value)}
              placeholder="e.g. Finish reading chapter 7"
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-text font-serif text-sm placeholder:text-text-faint"
            />
            <div className="flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  onClick={() => setNextPriority(p)}
                  className={`flex-1 font-mono text-[11.5px] py-2 rounded-md border capitalize ${
                    nextPriority === p ? PRIORITY_BTN_SELECTED[p] : "border-border bg-surface text-text-dim"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="font-mono text-[10.5px] text-text-faint leading-relaxed">
              This will appear as tomorrow&apos;s carried-forward goal — visible the moment tomorrow opens.
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 px-[22px] py-4 border-t border-border">
          <button
            onClick={closeDrawer}
            className="flex-1 font-mono text-[12.5px] py-2.5 rounded-lg border border-border text-text-dim"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 font-mono text-[12.5px] py-2.5 rounded-lg bg-moss text-bg font-semibold hover:opacity-90"
          >
            Save day
          </button>
        </div>
      </aside>
    </div>
  );
}
