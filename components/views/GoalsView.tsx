"use client";

import ViewSwitch from "@/components/views/ViewSwitch";
import { ViewName } from "@/lib/types";
import { MOCK_GOALS } from "@/lib/mockData";

function daysLeft(deadline: string): number {
  const d = new Date(deadline);
  const today = new Date(2026, 8, 17);
  return Math.ceil((d.getTime() - today.getTime()) / 86400000);
}

export default function GoalsView({ onNavigate }: { onNavigate: (v: ViewName) => void }) {
  return (
    <section>
      <div className="flex justify-between items-end mb-8 flex-wrap gap-3.5">
        <div>
          <div className="text-[34px] font-semibold leading-tight">Goals</div>
          <div className="font-mono text-[12.5px] text-text-faint mt-1.5">{MOCK_GOALS.length} ACTIVE</div>
        </div>
        <ViewSwitch active="goals" onChange={onNavigate} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_GOALS.map((goal) => {
          const left = daysLeft(goal.deadline);
          const urgent = left <= 10;
          return (
            <div key={goal.id} className="border border-border bg-surface rounded-[10px] px-5 py-4.5">
              <div className="flex justify-between items-start gap-2.5">
                <div className="text-base font-semibold leading-snug">{goal.title}</div>
                <div
                  className={`font-mono text-[11px] whitespace-nowrap px-2 py-[3px] rounded-md shrink-0 ${
                    urgent ? "bg-rust-dim text-rust" : "bg-moss-dim text-moss"
                  }`}
                >
                  {left} days left
                </div>
              </div>
              <div className="h-1.5 rounded bg-surface-2 my-3.5 overflow-hidden">
                <div className="h-full bg-moss rounded" style={{ width: `${goal.progressPct}%` }} />
              </div>
              <div className="flex justify-between font-mono text-[11px] text-text-faint">
                <span>{goal.progressPct}% complete</span>
                <span>DUE {new Date(goal.deadline).getDate()} {new Date(goal.deadline).toLocaleString("en", { month: "short" }).toUpperCase()}</span>
              </div>
              <div className="mt-3.5 pt-3 border-t border-border text-[13.5px] text-text-dim">
                <b className="block font-mono font-normal text-[10.5px] text-text-faint mb-1 normal-case">
                  TODAY&apos;S STEP
                </b>
                {goal.todayStepText}
              </div>
            </div>
          );
        })}

        <button className="border border-dashed border-border rounded-[10px] flex items-center justify-center text-text-faint font-mono text-[12.5px] min-h-[110px] hover:text-text-dim hover:border-text-faint">
          + Add a new goal
        </button>
      </div>

      <footer className="mt-14 pt-4.5 border-t border-border font-mono text-[11px] text-text-faint leading-relaxed">
        Each goal breaks into a deadline and a daily step. Right now you write the steps yourself when you create
        the goal — the planned AI layer will later generate the full day-by-day roadmap toward the deadline
        automatically.
      </footer>
    </section>
  );
}
