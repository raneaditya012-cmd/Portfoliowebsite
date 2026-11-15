"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

export type PaletteItem = { label: string; hint: string; href: string; external?: boolean };

export default function CommandPalette({ open, onClose, items }: { open: boolean; onClose: () => void; items: PaletteItem[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => items.filter((x) => `${x.label} ${x.hint}`.toLowerCase().includes(q.toLowerCase())), [items, q]);

  useEffect(() => { if (open) { setQ(""); setI(0); inputRef.current?.focus(); } }, [open]);
  useEffect(() => setI(0), [q]);

  if (!open) return null;

  const run = (x: PaletteItem) => {
    onClose();
    if (x.external) window.open(x.href, "_blank", "noopener,noreferrer");
    else router.push(x.href);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
    else if (e.key === "Enter" && filtered[i]) run(filtered[i]);
    else if (e.key === "Escape") onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 px-6 pt-24" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Go to" className="w-full max-w-lg overflow-hidden rounded border border-line bg-surface shadow-overlay"
        onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="flex items-center gap-2 border-b border-line px-4">
          <Search size={16} className="text-muted" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Go to…" aria-label="Search pages and links"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted" />
          <kbd className="tag">esc</kbd>
        </div>
        <ul className="max-h-80 overflow-auto p-2">
          {filtered.length === 0 && <li className="px-2 py-4 text-sm text-muted">No matches.</li>}
          {filtered.map((x, idx) => (
            <li key={x.label}>
              <button onMouseEnter={() => setI(idx)} onClick={() => run(x)}
                className={`flex h-10 w-full items-center justify-between rounded px-2 text-left text-sm ${idx === i ? "bg-line text-fg" : "text-muted"}`}>
                <span>{x.label}</span><span className="label">{x.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
