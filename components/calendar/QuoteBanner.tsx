import { quoteForDate, TODAY } from "@/lib/mockData";

export default function QuoteBanner() {
  // TODO(API): GET /api/quotes/today  (or keep this client-side deterministic pick — no BE needed)
  const quote = quoteForDate(TODAY);

  return (
    <div className="flex items-baseline flex-wrap gap-2 border border-border border-l-2 border-l-moss rounded-r-lg rounded-l-none px-5 py-4 mb-5 bg-surface">
      <span className="text-[22px] leading-none font-semibold text-moss">“</span>
      <span className="text-[15px] italic text-text-dim flex-1 min-w-[200px]">{quote.text}</span>
      <span className="font-mono text-[11px] text-text-faint whitespace-nowrap">— {quote.author}</span>
    </div>
  );
}
