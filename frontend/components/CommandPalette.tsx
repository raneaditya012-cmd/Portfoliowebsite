"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";

type Item = { label: string; hint: string; run: () => void };

export default function CommandPalette({ open, setOpen, links }: { open: boolean; setOpen: (b: boolean) => void; links: { github: string; linkedin: string; email: string; resume: string } }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => [
    { label: "Home", hint: "page", run: () => router.push("/") },
    { label: "About", hint: "section", run: () => router.push("/#about") },
    { label: "Stack", hint: "section", run: () => router.push("/#stack") },
    { label: "Projects", hint: "page", run: () => router.push("/projects") },
    { label: "Experience", hint: "section", run: () => router.push("/#experience") },
    { label: "Contact", hint: "page", run: () => router.push("/contact") },
    { label: "PetroConnect — IEEE-published IoT system", hint: "project", run: () => router.push("/projects/petroconnect") },
    { label: "Aegis-MAS — autonomous drone swarm", hint: "project", run: () => router.push("/projects/aegis-mas") },
    { label: "Customer Behaviour Analytics — AWS data platform", hint: "project", run: () => router.push("/projects/customer-behaviour-analytics") },
    { label: "GitHub", hint: "link", run: () => window.open(links.github, "_blank") },
    { label: "LinkedIn", hint: "link", run: () => window.open(links.linkedin, "_blank") },
    { label: "Résumé", hint: "link", run: () => window.open(links.resume, "_blank") },
    { label: "Email", hint: "link", run: () => (window.location.href = links.email) },
  ], [router, links]);

  const filtered = items.filter((x) => (x.label + x.hint).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(""); setI(0); setTimeout(() => inputRef.current?.focus(), 40); } }, [open]);
  useEffect(() => setI(0), [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
    if (e.key === "Enter" && filtered[i]) { filtered[i].run(); setOpen(false); }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div data-lenis-prevent className="fixed inset-0 z-[96] flex items-start justify-center bg-bg/70 px-4 pt-[16vh] backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div role="dialog" aria-label="Command palette" className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-raised shadow-2xl shadow-black/60"
            initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
            <div className="flex items-center gap-3 border-b border-white/[.08] px-4">
              <Search size={16} className="text-muted" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Jump to…"
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-faint" />
              <kbd className="tag">esc</kbd>
            </div>
            <ul className="max-h-80 overflow-auto p-1.5">
              {filtered.length === 0 && <li className="p-4 text-sm text-muted">No matches.</li>}
              {filtered.map((x, idx) => (
                <li key={x.label}>
                  <button onMouseEnter={() => setI(idx)} onClick={() => { x.run(); setOpen(false); }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${idx === i ? "bg-white/[.07] text-fg" : "text-muted"}`}>
                    <span>{x.label}</span>
                    <span className="flex items-center gap-2 font-mono text-[11px] text-faint">{x.hint}{idx === i && <CornerDownLeft size={12} />}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
