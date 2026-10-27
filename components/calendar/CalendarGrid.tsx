"use client";

import { useState } from "react";
import { buildMonthGrid, DOW_NAMES, MONTH_NAMES } from "@/lib/dateUtils";
import { useApp } from "@/lib/store";
import { TODAY } from "@/lib/mockData";

const CELL_BASE =
  "relative aspect-square rounded-lg border p-2 flex flex-col justify-between";

export default function CalendarGrid() {
  const { dayStatus, openDrawer } = useApp();
  const [cursor, setCursor] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = buildMonthGrid(year, month);

  // figure out which logged cells sit next to each other (same row) for the streak-bridge line
  const statuses = cells.map((d) => (d ? dayStatus(d) : null));

  return (
    <div>
      <div className="flex items-center justify-between mb-4.5 flex-wrap gap-3">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="w-7 h-7 rounded-md border border-border bg-surface text-text-dim hover:border-text-faint"
          >
            ‹
          </button>
          <div className="text-lg font-semibold min-w-[150px] text-center">
            {MONTH_NAMES[month]} {year}
          </div>
          <button
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="w-7 h-7 rounded-md border border-border bg-surface text-text-dim hover:border-text-faint"
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10.5px] text-text-faint">
          <span className="flex items-center gap-1.5">
            <i className="w-[11px] h-[11px] rounded-sm bg-moss inline-block" /> goal met
          </span>
          <span className="flex items-center gap-1.5">
            <i className="w-[11px] h-[11px] rounded-sm bg-rust inline-block" /> goal failed
          </span>
          <span className="flex items-center gap-1.5">
            <i className="w-[11px] h-[11px] rounded-sm bg-surface-2 border border-border inline-block" /> not logged
          </span>
          <span className="flex items-center gap-1.5">
            <i className="w-[11px] h-[11px] rounded-sm border-[1.5px] border-rust inline-block" /> today
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {DOW_NAMES.map((d) => (
          <span key={d} className="font-mono text-[10.5px] text-text-faint text-center">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} className="aspect-square" />;

          const status = statuses[idx];
          const visual = status === "pending-today" ? "missed" : status;
          const isToday = date.toDateString() === TODAY.toDateString();

          const visualClasses =
            visual === "logged"
              ? "bg-moss-dim border-transparent"
              : visual === "failed"
              ? "bg-rust-dim border-transparent"
              : "bg-surface border-border";

          const numClass =
            visual === "logged" ? "text-text" : visual === "failed" ? "text-rust" : "text-text-faint";
          const dotClass = visual === "logged" ? "bg-moss" : visual === "failed" ? "bg-rust" : "bg-text-faint opacity-40";

          // streak-bridge: connect to horizontally adjacent "logged" cells in the same row
          const col = idx % 7;
          const prevStatus = col > 0 ? statuses[idx - 1] : null;
          const nextStatus = col < 6 ? statuses[idx + 1] : null;
          const linkLeft = visual === "logged" && prevStatus === "logged";
          const linkRight = visual === "logged" && nextStatus === "logged";

          return (
            <button
              key={idx}
              onClick={() => openDrawer(date)}
              className={`${CELL_BASE} ${visualClasses} ${isToday ? "ring-[1.5px] ring-rust ring-inset" : ""} ${
                linkLeft ? "streak-link-left" : ""
              } ${linkRight ? "streak-link-right" : ""} cursor-pointer hover:border-text-faint`}
            >
              <span className={`font-mono text-[11px] ${isToday ? "font-semibold text-rust" : numClass}`}>
                {date.getDate()}
              </span>
              <span className={`w-[7px] h-[7px] rounded-full self-end ${dotClass}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
