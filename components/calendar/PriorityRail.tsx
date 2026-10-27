import { DayRecord, Priority } from "@/lib/types";
import { MONTH_NAMES } from "@/lib/dateUtils";
import { TODAY } from "@/lib/mockData";

const ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
const BAR_COLOR: Record<Priority, string> = {
  high: "bg-rust",
  medium: "bg-[#C9A24A]",
  low: "bg-moss",
};
const PILL_CLASS: Record<Priority, string> = {
  high: "bg-rust-dim text-rust",
  medium: "bg-[#3A331F] text-[#D9B15C]",
  low: "bg-moss-dim text-moss",
};

export default function PriorityRail({ dayData }: { dayData: Record<string, DayRecord> }) {
  // TODO(API): GET /api/goals/open?sort=priority — server should return this pre-sorted
  const items = Object.values(dayData)
    .filter((rec) => rec.goalText && !rec.completed)
    .sort((a, b) => ORDER[a.priority] - ORDER[b.priority]);

  if (items.length === 0) {
    return (
      <div className="font-mono text-[10.5px] text-text-faint px-0.5 py-1 mb-8">
        No open goals right now — nice and clear.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mb-8">
      {items.map((rec) => {
        const [y, m, d] = rec.date.split("-").map(Number);
        const date = new Date(y, m - 1, d);
        const isToday = date.toDateString() === TODAY.toDateString();
        const when = isToday
          ? "Due today"
          : date > TODAY
          ? `Due ${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)}`
          : `Overdue · ${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)}`;

        return (
          <div key={rec.date} className="flex items-center gap-3 border border-border bg-surface rounded-lg px-3.5 py-2.5">
            <span className={`w-[3px] self-stretch rounded-sm shrink-0 ${BAR_COLOR[rec.priority]}`} />
            <span className="flex-1 text-[13.5px] text-text min-w-0">{rec.goalText}</span>
            <span className="font-mono text-[10.5px] text-text-faint whitespace-nowrap">{when}</span>
            <span className={`font-mono text-[10px] uppercase px-2 py-[3px] rounded ${PILL_CLASS[rec.priority]}`}>
              {rec.priority}
            </span>
          </div>
        );
      })}
    </div>
  );
}
