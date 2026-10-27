# Daybook — Frontend (Next.js 14, App Router, TypeScript, Tailwind)

## Setup
```bash
npx create-next-app@latest daybook --typescript --tailwind --app --src-dir=false --import-alias "@/*"
# then copy these files into the generated project, overwriting the defaults:
#   app/, components/, lib/, tailwind.config.ts, app/globals.css
npm install
npm run dev
```

## File map
```
app/
  layout.tsx        — fonts + <AppProvider> wrapper
  page.tsx           — wires TopBar / Sidebar / active view / Footer
  globals.css         — CSS variable theme (dark + light), streak connector styles
components/
  layout/
    TopBar.tsx        — search, streak pill, + New entry, notifications, avatar
    Sidebar.tsx        — brand, Calendar entry card, nav, streak dots, theme toggle
    Footer.tsx
  views/
    TodayView.tsx      — journal entry + mood + task list
    WeekView.tsx        — stats + entries + auto-summary
    MonthView.tsx        — stats + heatmap + auto-summary
    CalendarView.tsx      — composes calendar/* below
    GoalsView.tsx          — goal cards (deadline, progress, today's step)
    ViewSwitch.tsx          — shared Today/Week/Month/Calendar/Goals tab row
  calendar/
    QuoteBanner.tsx     — daily motivational quote
    StreakBanner.tsx     — current streak summary
    PriorityRail.tsx      — open goals sorted by priority
    CalendarGrid.tsx        — month grid, cell states, streak-bridge lines
    DayDrawer.tsx             — click a day → mark goal done, write summary, set tomorrow's goal
lib/
  types.ts       — shared TS types (DayRecord, Goal, Priority, etc.)
  dateUtils.ts     — date helpers
  mockData.ts       — stand-in data; replace with API calls (see TODO(API) comments)
  store.tsx          — React Context holding dayData + streak/fail logic — this is
                        the piece that later gets swapped for real API calls
```

Every place the UI currently reads/writes mock data has a `// TODO(API): ...` comment
naming the exact endpoint from the system design doc that replaces it.
