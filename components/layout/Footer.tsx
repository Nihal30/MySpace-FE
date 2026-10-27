export default function Footer() {
  return (
    <footer className="flex-none flex items-center justify-between gap-3.5 px-[22px] py-3.5 border-t border-border font-mono text-[11px] text-text-faint flex-wrap">
      <div className="flex items-center gap-2">
        <span className="inline-block w-[7px] h-[7px] rounded-full bg-moss" />
        <span>Daybook — personal journal &amp; goal tracker</span>
      </div>
      <div className="flex gap-[18px]">
        <a className="hover:text-text-dim cursor-pointer">v0.1 · beta</a>
        <a className="hover:text-text-dim cursor-pointer">Export data</a>
        <a className="hover:text-text-dim cursor-pointer">Help</a>
      </div>
    </footer>
  );
}
