"use client";

import { useApp } from "@/lib/store";

export default function TopBar() {
  const { currentStreak } = useApp();

  return (
    <header className="flex-none flex items-center justify-between gap-4 px-[22px] py-3 border-b border-border bg-bg sticky top-0 z-10">
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-[360px]">
        <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 w-full text-text-faint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search entries, goals..."
            className="bg-transparent outline-none text-text font-mono text-[12.5px] w-full placeholder:text-text-faint"
          />
          <span className="font-mono text-[10px] text-text-faint border border-border rounded px-[5px] py-[1px]">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-1.5 font-mono text-xs text-moss border border-moss-dim bg-moss-dim rounded-full px-3 py-1.5">
          🔥 {currentStreak()} day streak
        </div>
        <button className="font-mono text-xs text-bg bg-moss rounded-lg px-3.5 py-2 hover:opacity-90">
          + New entry
        </button>
        <button className="relative w-[34px] h-[34px] rounded-lg border border-border bg-surface flex items-center justify-center text-text-dim hover:border-text-faint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 01-3.4 0" />
          </svg>
          <span className="absolute top-1.5 right-[7px] w-1.5 h-1.5 rounded-full bg-rust" />
        </button>
        <div className="w-[34px] h-[34px] rounded-full bg-surface-2 border border-border flex items-center justify-center font-mono text-[12.5px] cursor-pointer">
          N
        </div>
      </div>
    </header>
  );
}
