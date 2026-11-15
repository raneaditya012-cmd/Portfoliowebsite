"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = ["init portfolio", "load modules", "mount ui"];

export default function Loader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("booted"); } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const done = () => { setShow(false); try { sessionStorage.setItem("booted", "1"); } catch {} };
    const ts = [...LINES.map((_, i) => setTimeout(() => setN(i + 1), 260 * (i + 1))), setTimeout(done, 1150)];
    window.addEventListener("keydown", done, { once: true });
    return () => { ts.forEach(clearTimeout); window.removeEventListener("keydown", done); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div data-lenis-prevent className="fixed inset-0 z-[100] grid place-items-center bg-bg" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={() => setShow(false)}>
          <div className="w-72 font-mono text-sm">
            {LINES.map((l, i) => (
              <div key={l} className={`flex justify-between transition-opacity ${i < n ? "opacity-100" : "opacity-0"}`}>
                <span className="text-muted"><span className="text-faint">&gt;</span> {l}</span><span className="text-ok">ok</span>
              </div>
            ))}
            <div className="mt-4 h-px bg-white/10"><div className="h-px bg-accent transition-all duration-300" style={{ width: `${(n / LINES.length) * 100}%` }} /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
