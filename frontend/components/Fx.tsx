"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

/** Pulls its child gently toward the pointer. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  return (
    <motion.span className="inline-block" style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.span>
  );
}
