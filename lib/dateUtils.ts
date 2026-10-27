export const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
export const DOW_NAMES = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

export function fmtLongDate(date: Date): string {
  return `${DOW_NAMES[(date.getDay() + 6) % 7]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)}`;
}

export function fmtShortDate(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)}`;
}

/** Builds a Monday-first month grid. `null` = leading blank cell. */
export function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}
