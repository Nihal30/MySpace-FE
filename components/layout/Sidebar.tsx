"use client";

import { ViewName } from "@/lib/types";

const NAV_ITEMS: { key: ViewName; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This week" },
  { key: "month", label: "This month" },
  { key: "goals", label: "Goals" },
];

interface Props {
  active: ViewName;
  onChange: (v: ViewName) => void;
  onToggleTheme: () => void;
  isLight: boolean;
}

export default function Sidebar({ active, onChange, onToggleTheme, isLight }: Props) {
  return (
    <aside className="hidden md:flex flex-col gap-[10px] border-r border-border px-[22px] py-7">
      <div>
        <div className="flex items-baseline gap-2.5">
          <span className="inline-block w-[9px] h-[9px] rounded-full bg-moss -translate-y-px" />
          <span className="text-xl font-semibold">Daybook</span>
        </div>
        <div className="font-mono text-[11px] text-text-faint mt-0.5">personal log &amp; goals</div>
      </div>

      <button
        onClick={() => onChange("calendar")}
        className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg border text-left ${
          active === "calendar" ? "border-moss bg-moss-dim" : "border-border bg-surface hover:border-text-faint"
        }`}
      >
        <span className="w-[26px] h-[26px] rounded-md bg-surface-2 border border-border relative overflow-hidden shrink-0">
          <span className="absolute top-0 left-0 right-0 h-1.5 bg-rust" />
          <span className="absolute bottom-0.5 left-0 right-0 text-center font-mono text-[10px] text-text-dim">17</span>
        </span>
        <span className="flex flex-col gap-px">
          <span className="font-mono text-[13px] text-text">Calendar</span>
          <span className="font-mono text-[10px] text-text-faint">streak &amp; history</span>
        </span>
      </button>

      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`font-mono text-[13px] px-2.5 py-2.5 rounded-md flex justify-between items-center cursor-pointer ${
              active === item.key ? "bg-surface-2 text-text" : "text-text-dim"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto pt-2 border-t border-border">
        <div className="flex gap-[5px] mb-2.5">
          {[1, 1, 1, 1, 1, 0, 0].map((on, i) => (
            <span key={i} className={`w-3.5 h-3.5 rounded-sm ${on ? "bg-moss" : "bg-moss-dim"}`} />
          ))}
        </div>
        <div className="font-mono text-[11px] text-text-faint">5-day logging streak</div>
        <button
          onClick={onToggleTheme}
          className="mt-4 font-mono text-[11px] text-text-faint border border-border rounded-md px-2.5 py-1.5 hover:text-text hover:border-text-faint"
        >
          {isLight ? "Switch to dark" : "Switch to light"}
        </button>
      </div>
    </aside>
  );
}
