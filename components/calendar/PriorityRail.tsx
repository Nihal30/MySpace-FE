
import { DayRecord, Priority } from "@/lib/types";
import { MONTH_NAMES } from "@/lib/dateUtils";
import { TODAY } from "@/lib/mockData";

const ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

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

export default function PriorityRail({
  dayData,
}: {
  dayData: Record<string, DayRecord>;
}) {
  const items = Object.values(dayData)
    .filter((rec) => rec.goalText && !rec.completed)
    .sort((a, b) => ORDER[a.priority] - ORDER[b.priority]);

  if (items.length === 0) {
    return (
      <div className="mb-8 rounded-xl border border-border bg-surface px-4 py-6 text-center font-mono text-[11px] text-text-faint">
        No open goals right now — nice and clear.
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
          <div
            key={rec.date}
            className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface/80"
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 h-8 w-1 shrink-0 rounded-full ${BAR_COLOR[rec.priority]}`}
              />

              <p className="min-w-0 flex-1 break-words text-sm font-medium leading-5 text-text">
                {rec.goalText}
              </p>

              <span
                className={`shrink-0 rounded px-2 py-1 font-mono text-[10px] uppercase ${PILL_CLASS[rec.priority]}`}
              >
                {rec.priority}
              </span>
            </div>

            <div className="mt-auto border-t border-border pt-3">
              <span className="font-mono text-[11px] text-text-faint">
                {when}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
