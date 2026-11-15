"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { TimelineItem } from "@/lib/types";

const HASH = ["a1f3c9e", "7be2d04", "3c90af1", "e04b7d2", "9d1c6a8"];

/** Experience rendered as a commit history; the graph line draws as you scroll. */
export default function GitLog({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-white/[.07] px-5 py-3 font-mono text-xs text-faint"><span className="text-ok">➜</span> git log --graph career</div>
      <div ref={ref} className="relative p-6 sm:p-8">
        <div className="absolute bottom-10 left-[2.05rem] top-10 w-px bg-white/10 sm:left-[2.55rem]" />
        <motion.div style={{ scaleY }} className="absolute bottom-10 left-[2.05rem] top-10 w-px origin-top bg-accent sm:left-[2.55rem]" />
        <ol className="space-y-10">
          {items.map((it, i) => (
            <motion.li key={it.title} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
              className="relative pl-9 sm:pl-12">
              <span className="absolute left-[.2rem] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-accent bg-bg"><span className="h-1.5 w-1.5 rounded-full bg-accent" /></span>
              <p className="font-mono text-xs">
                <span className="text-warm">{HASH[i % HASH.length]}</span>
                {it.ref && <span className="text-faint"> (<span className="text-accent">{it.ref}</span>)</span>}
                <span className="text-faint"> · {it.year}</span>
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{it.title}</h3>
              <p className="mt-1.5 max-w-2xl text-muted">{it.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
