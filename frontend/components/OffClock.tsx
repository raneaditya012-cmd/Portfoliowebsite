"use client";
import { motion, useAnimate } from "framer-motion";
import { Cpu, Dumbbell, Goal } from "lucide-react";
import { useEffect, useState } from "react";
import Ball from "./Ball";
import { spot } from "./Reveal";
import type { Hobby } from "@/lib/types";

const ICONS: Record<string, React.ReactNode> = { football: <Goal size={18} />, gym: <Dumbbell size={18} />, tech: <Cpu size={18} /> };

export default function OffClock({ hobbies }: { hobbies: Hobby[] }) {
  const [count, setCount] = useState(0);
  const [best, setBest] = useState(0);
  const [scope, animate] = useAnimate();

  useEffect(() => { try { setBest(Number(localStorage.getItem("juggle-best") || 0)); } catch {} }, []);
  useEffect(() => { // the ball drops if you stop
    if (!count) return;
    const t = setTimeout(() => setCount(0), 1400);
    return () => clearTimeout(t);
  }, [count]);

  const touch = () => {
    const n = count + 1;
    setCount(n);
    if (n > best) { setBest(n); try { localStorage.setItem("juggle-best", String(n)); } catch {} }
    animate(scope.current, { y: [0, -70, 0], rotate: [0, (Math.random() - 0.5) * 220] }, { duration: 0.45, ease: "easeOut" });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-4 sm:grid-cols-3">
        {hobbies.map((h, i) => (
          <motion.div key={h.title} onPointerMove={spot} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
            className="card spot p-6 transition-colors hover:border-white/20">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-accent">{ICONS[h.icon]}</span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="card flex flex-col items-center justify-between p-6 text-center">
        <div className="flex w-full justify-between font-mono text-xs text-faint"><span>keepy-uppy.exe</span><span>best: {best}</span></div>
        <button ref={scope} onClick={touch} aria-label="Juggle the ball" className="my-6 rounded-full opacity-90 transition-opacity hover:opacity-100"><Ball size={84} /></button>
        <div>
          <div className="font-mono text-3xl tabular-nums">{count}</div>
          <p className="mt-1 font-mono text-xs text-muted">{count === 0 ? "click the ball — keep it up" : count > 14 ? "ok, that's impressive" : "don't let it drop"}</p>
        </div>
      </div>
    </div>
  );
}
