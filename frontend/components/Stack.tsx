"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { spot } from "./Reveal";
import type { SkillGroup } from "@/lib/types";

export default function Stack({ groups }: { groups: SkillGroup[] }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((g, i) => (
        <motion.div key={g.group} onPointerMove={spot} onPointerEnter={() => setHover(g.group)} onPointerLeave={() => setHover(null)}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          className={`card spot p-5 transition-[opacity,border-color] duration-300 hover:border-white/20 ${hover && hover !== g.group ? "opacity-50" : ""}`}>
          <p className="font-mono text-xs text-accent">{g.group}<span className="text-faint">/</span></p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {g.items.map((it) => <li key={it} className="rounded-md bg-white/[.05] px-2.5 py-1 text-sm text-fg">{it}</li>)}
          </ul>
          <p className="mt-4 text-sm text-muted">{g.note}</p>
        </motion.div>
      ))}
    </div>
  );
}
