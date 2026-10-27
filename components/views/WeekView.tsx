"use client";

import ViewSwitch from "@/components/views/ViewSwitch";
import { ViewName } from "@/lib/types";

const ENTRIES = [
  { day: "TUE 16", text: "Long debugging day on the socket layer. Low energy but stayed consistent — pushed through." },
  { day: "MON 15", text: "Good focus block in the morning. Started the CIL MT syllabus properly instead of just skimming." },
  { day: "SUN 14", text: "Rest day. Read instead of coding. Felt necessary." },
];

export default function WeekView({ onNavigate }: { onNavigate: (v: ViewName) => void }) {
  return (
    <section>
      <div className="flex justify-between items-end mb-8 flex-wrap gap-3.5">
        <div>
          <div className="text-[34px] font-semibold leading-tight">Week 38</div>
          <div className="font-mono text-[12.5px] text-text-faint mt-1.5">15 SEPT – 21 SEPT</div>
        </div>
        <ViewSwitch active="week" onChange={onNavigate} />
      </div>

      <div className="grid grid-cols-3 gap-3.5 mb-5.5">
        {[
          { num: "5/7", label: "DAYS LOGGED" },
          { num: "11", label: "TASKS DONE" },
          { num: "3", label: "GOALS TOUCHED" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-[10px] px-4 py-4 bg-surface">
            <div className="text-[26px] font-semibold">{s.num}</div>
            <div className="font-mono text-[10.5px] text-text-faint mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-5.5">
        <div>
          <div className="text-[15px] font-semibold mb-3.5">Entries this week</div>
          <div className="flex flex-col">
            {ENTRIES.map((e, i) => (
              <div key={e.day} className={`py-3.5 border-b border-border ${i === 0 ? "pt-0" : ""}`}>
                <div className="font-mono text-[10.5px] text-text-faint mb-1.5">{e.day}</div>
                <div className="text-sm text-text-dim leading-relaxed">{e.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-3.5">
            <div className="text-[15px] font-semibold">Auto-summary</div>
            <div className="font-mono text-[11px] text-text-faint">GENERATED</div>
          </div>
          {/* TODO(API): GET /api/summary/week?start=2026-09-15 */}
          <div className="border-l-2 border-moss pl-4 py-1 text-[14.5px] text-text-dim leading-relaxed">
            Most of this week went into the dashboard rewrite and getting the exam prep off the ground. Fitness
            slipped — 2 of 3 planned runs missed. Reading held steady.
          </div>
        </div>
      </div>
    </section>
  );
}
