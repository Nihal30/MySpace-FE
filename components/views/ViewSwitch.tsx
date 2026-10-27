"use client";

import { ViewName } from "@/lib/types";

const TABS: { key: ViewName; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "calendar", label: "Calendar" },
  { key: "goals", label: "Goals" },
];

interface Props {
  active: ViewName;
  onChange: (v: ViewName) => void;
  className?: string;
}

export default function ViewSwitch({ active, onChange, className = "" }: Props) {
  return (
    <div className={`flex gap-0.5 border border-border rounded-lg p-[3px] ${className}`}>
      {TABS.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`font-mono text-[11.5px] px-3.5 py-1.5 rounded-md ${
            active === t.key ? "bg-surface-2 text-text" : "text-text-dim"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
