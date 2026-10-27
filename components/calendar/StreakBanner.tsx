import { addDays, MONTH_NAMES } from "@/lib/dateUtils";
import { TODAY } from "@/lib/mockData";

export default function StreakBanner({ streak }: { streak: number }) {
  const sinceDate = addDays(TODAY, -(streak - 1));

  return (
    <div className="flex items-center gap-3 border border-border bg-surface rounded-lg px-5 py-4 mb-6">
      <div className="text-[30px] leading-none font-semibold text-moss">{streak}</div>
      <div className="font-mono text-[11.5px] text-text-dim leading-relaxed">
        Current streak — <b className="text-text">day {streak}</b>, unbroken since {sinceDate.getDate()}{" "}
        {MONTH_NAMES[sinceDate.getMonth()].slice(0, 3)}.
        <br />
        Today&apos;s goal is still open — mark it done before the day ends or the streak resets tomorrow.
      </div>
    </div>
  );
}
