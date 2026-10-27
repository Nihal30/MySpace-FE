"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import TodayView from "@/components/views/TodayView";
import WeekView from "@/components/views/WeekView";
import MonthView from "@/components/views/MonthView";
import CalendarView from "@/components/views/CalendarView";
import GoalsView from "@/components/views/GoalsView";
import { ViewName } from "@/lib/types";

export default function Home() {
  const [active, setActive] = useState<ViewName>("calendar");
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    setIsLight((v) => !v);
    document.documentElement.setAttribute("data-theme", isLight ? "dark" : "light");
  };

  return (
    <>
      <TopBar />
      <div className="flex-1 grid md:grid-cols-[232px_1fr]">
        <Sidebar active={active} onChange={setActive} onToggleTheme={toggleTheme} isLight={isLight} />
        <main className="px-6 md:px-11 pt-8.5 pb-14 ">
          {active === "today" && <TodayView onNavigate={setActive} />}
          {active === "week" && <WeekView onNavigate={setActive} />}
          {active === "month" && <MonthView onNavigate={setActive} />}
          {active === "calendar" && <CalendarView onNavigate={setActive} />}
          {active === "goals" && <GoalsView onNavigate={setActive} />}
        </main>
      </div>
      <Footer />
    </>
  );
}
