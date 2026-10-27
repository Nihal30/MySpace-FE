"use client";

import ViewSwitch from "@/components/views/ViewSwitch";
import { ViewName } from "@/lib/types";

export default function MonthView({ onNavigate }: { onNavigate: (v: ViewName) => void }) {
  // TODO(API): GET /api/summary/month?month=2026-09  → { daysLogged, avgGoalProgress, goalsAtRisk, heatmap[] }
  const heatLevels = Array.from({ length: 30 }, () => Math.floor(Math.random() * 4));

  return (
    <section>
      <div className="flex justify-between items-end mb-8 flex-wrap gap-3.5">
        <div>
          <div className="text-[34px] font-semibold leading-tight">September</div>
          <div className="font-mono text-[12.5px] text-text-faint mt-1.5">MONTH 9 · 2026</div>
        </div>
        <ViewSwitch active="month" onChange={onNavigate} />
      </div>

      <div className="grid grid-cols-3 gap-3.5 mb-5.5">
        {[
          { num: "21/30", label: "DAYS LOGGED" },
          { num: "64%", label: "AVG GOAL PROGRESS" },
          { num: "1", label: "GOAL AT RISK" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-[10px] px-4 py-4 bg-surface">
            <div className="text-[26px] font-semibold">{s.num}</div>
            <div className="font-mono text-[10.5px] text-text-faint mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-baseline mb-3.5">
        <div className="text-[15px] font-semibold">Logging activity</div>
        <div className="font-mono text-[11px] text-text-faint">DARKER = MORE DONE</div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {heatLevels.map((level, i) => (
          <div
            key={i}
            className={`aspect-square rounded-[4px] ${
              level === 3 ? "bg-moss" : level === 2 ? "bg-moss/55" : level === 1 ? "bg-moss-dim" : "bg-surface-2"
            }`}
          />
        ))}
      </div>
      <div className="font-mono text-[10.5px] text-text-faint mt-2.5">30 days, 1 Sept → today</div>

      <div className="flex justify-between items-baseline mb-3.5 mt-9">
        <div className="text-[15px] font-semibold">Auto-summary</div>
        <div className="font-mono text-[11px] text-text-faint">GENERATED</div>
      </div>
      <div className="border-l-2 border-moss pl-4 py-1 text-[14.5px] text-text-dim leading-relaxed">
        Strong month for shipping — the dashboard rewrite is basically done. CIL MT prep started late (week 3) and
        is behind where it needs to be for the November date. Running goal has stalled since week 2.
      </div>
    </section>
  );
}
