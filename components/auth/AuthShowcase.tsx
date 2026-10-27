import { quoteForDate, TODAY } from "@/lib/mockData";

export default function AuthShowcase() {
  const quote = quoteForDate(TODAY);

  return (
    <div className="hidden md:flex flex-col justify-between border-r border-border bg-surface px-12 py-10">
      <div>
        <div className="flex items-baseline gap-2.5">
          <span className="inline-block w-[9px] h-[9px] rounded-full bg-moss -translate-y-px" />
          <span className="text-2xl font-semibold">Daybook</span>
        </div>
        <div className="font-mono text-[11px] text-text-faint mt-0.5">personal log &amp; goals</div>
      </div>

      <div className="max-w-[420px]">
        <div className="text-[34px] font-semibold leading-tight mb-4">
          Write the day.
          <br />
          Keep the streak.
        </div>
        <p className="text-[15px] text-text-dim leading-relaxed mb-8">
          Log what happened, set tomorrow&apos;s goal, and don&apos;t break the chain.
        </p>

        <div className="flex gap-1.5 mb-2.5">
          {[1, 1, 1, 0, 1, 1, 1].map((on, i) => (
            <span key={i} className={`w-6 h-6 rounded-md ${on ? "bg-moss-dim" : "bg-rust-dim"}`} />
          ))}
        </div>
        <div className="font-mono text-[10.5px] text-text-faint">one missed goal and the chain breaks</div>
      </div>

      <div className="border-l-2 border-moss pl-4">
        <div className="text-[14.5px] italic text-text-dim leading-relaxed">“{quote.text}”</div>
        <div className="font-mono text-[11px] text-text-faint mt-1.5">— {quote.author}</div>
      </div>
    </div>
  );
}
