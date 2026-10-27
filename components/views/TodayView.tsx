"use client";

import { useState } from "react";
import ViewSwitch from "@/components/views/ViewSwitch";
import { ViewName, DailyTask } from "@/lib/types";
import { MOCK_TASKS } from "@/lib/mockData";

const MOODS = ["🙂", "💪", "😐", "😤", "😴"];

export default function TodayView({ onNavigate }: { onNavigate: (v: ViewName) => void }) {
  const [entry, setEntry] = useState(
    "Shipped the socket reconnect fix finally — took longer than expected because of a stale closure bug. Felt good once it clicked. Skipped the gym, will make up tomorrow."
  );
  const [mood, setMood] = useState("💪");
  const [tasks, setTasks] = useState<DailyTask[]>(MOCK_TASKS);

  const toggleTask = (id: string) => {
    // TODO(API): PATCH /api/tasks/:id  { done }
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <section>
      <div className="flex justify-between items-end mb-8 flex-wrap gap-3.5">
        <div>
          <div className="text-[34px] font-semibold leading-tight">Wednesday, 17 Sept</div>
          <div className="font-mono text-[12.5px] text-text-faint mt-1.5">DAY 172 · ENTRY NOT SAVED YET</div>
        </div>
        <ViewSwitch active="today" onChange={onNavigate} />
      </div>

      <div className="bg-surface border border-border rounded-[10px] px-6 py-5.5 mb-7.5">
        <div className="font-mono text-[11px] text-text-faint mb-3">TODAY&apos;S ENTRY</div>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Kaisa raha aaj ka din — kaam, mood, koi win ya blocker..."
          className="w-full min-h-[90px] bg-transparent outline-none text-[16px] leading-relaxed text-text-dim resize-y placeholder:text-text-faint"
        />
        <div className="flex gap-2 mt-4">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`w-[30px] h-[30px] rounded-full border flex items-center justify-center text-sm bg-surface-2 ${
                mood === m ? "border-moss shadow-[0_0_0_1px_var(--moss)_inset]" : "border-border"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-baseline mb-3.5 mt-9">
        <div className="text-[15px] font-semibold">Today&apos;s tasks</div>
        <div className="font-mono text-[11px] text-text-faint">
          {doneCount} of {tasks.length} done
        </div>
      </div>

      <div className="flex flex-col border-t border-border">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3.5 py-3.5 border-b border-border">
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-[17px] h-[17px] rounded-md border-[1.5px] flex items-center justify-center text-[11px] shrink-0 ${
                task.done ? "bg-moss border-moss text-bg" : "border-text-faint"
              }`}
            >
              {task.done ? "✓" : ""}
            </button>
            <div className="flex-1 min-w-0">
              <div className={`text-[14.5px] ${task.done ? "text-text-faint line-through" : "text-text"}`}>
                {task.text}
              </div>
              <div className="font-mono text-[10.5px] text-text-faint mt-0.5">
                <span className="text-moss">●</span> {task.goalTitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-14 pt-4.5 border-t border-border font-mono text-[11px] text-text-faint leading-relaxed">
        Tasks are auto-suggested from each goal&apos;s roadmap — right now you set them by hand. Later this is
        where the AI-generated roadmap will drop in daily tasks automatically.
      </footer>
    </section>
  );
}
