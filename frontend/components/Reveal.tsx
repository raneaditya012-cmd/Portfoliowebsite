"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 20, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/** Words slide up from a mask. The observer sits on the unclipped parent. */
export function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: 0.035, delayChildren: delay }}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[.12em] pr-[.26em] align-bottom" aria-hidden>
          <motion.span className="inline-block" variants={{ hidden: { y: "115%" }, show: { y: 0 } }} transition={{ duration: 0.7, ease: EASE }}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionHead({ index, name, title, sub }: { index: string; name: string; title: string; sub?: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal><p className="label mb-4"><span className="text-accent">{index}</span> <span className="text-faint">/</span> {name}</p></Reveal>
      <h2 className="h2 max-w-3xl"><SplitWords text={title} /></h2>
      {sub && <Reveal delay={0.15}><p className="mt-4 max-w-2xl text-muted text-lg leading-relaxed">{sub}</p></Reveal>}
    </div>
  );
}

/** Sets --x/--y on the element for the .spot hover light. */
export const spot = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};
