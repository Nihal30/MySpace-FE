"use client";

import { useApp } from "@/lib/store";
import QuoteBanner from "@/components/calendar/QuoteBanner";
import StreakBanner from "@/components/calendar/StreakBanner";
import PriorityRail from "@/components/calendar/PriorityRail";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import DayDrawer from "@/components/calendar/DayDrawer";
import ViewSwitch from "@/components/views/ViewSwitch";
import { ViewName } from "@/lib/types";

export default function CalendarView({
  onNavigate,
}: {
  onNavigate: (v: ViewName) => void;
}) {
  const { dayData, currentStreak } = useApp();

  return (
    <section>
      <div className="flex justify-between items-end mt-3 mb-8 flex-wrap gap-3.5">
        <div>
          <div className="text-[34px] font-semibold leading-tight">
            Calendar
          </div>
          <div className="font-mono text-[12.5px] text-text-faint mt-1.5">
            DAILY LOG STRICTNESS
          </div>
        </div>
        <ViewSwitch
          active="calendar"
          onChange={onNavigate}
          className="mb-6 w-fit"
        />
      </div>

      <QuoteBanner />
      {/* <StreakBanner streak={currentStreak()} /> */}

      <div className="flex justify-between items-baseline mb-3.5">
        <div className="text-[15px] font-semibold">Goals in play</div>
        <div className="font-mono text-[11px] text-text-faint">
          SORTED BY PRIORITY
        </div>
      </div>
      <PriorityRail dayData={dayData} />

      <CalendarGrid />

      <footer className="mt-14 pt-4.5 border-t border-border font-mono text-[11px] text-text-faint leading-relaxed">
        Click any day to open its log. A day only counts as &quot;logged&quot;
        once that day&apos;s carried-forward goal is marked done — leave it
        unchecked and the day flips to failed, breaking the streak, even if you
        wrote a summary.
      </footer>

      <DayDrawer />
    </section>
  );
}
