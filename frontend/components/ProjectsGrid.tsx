"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";

const FILTERS: [string, (p: Project) => boolean][] = [
  ["all", () => true],
  ["featured", (p) => p.featured],
  ["robotics", (p) => /robot/i.test(p.kind)],
  ["iot", (p) => /iot/i.test(p.kind)],
  ["data", (p) => /data/i.test(p.kind)],
  ["web", (p) => /full-stack|web/i.test(p.kind)],
];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [f, setF] = useState("all");
  const list = projects.filter(FILTERS.find(([n]) => n === f)![1]);
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-1" role="group" aria-label="Filter projects">
        {FILTERS.map(([n]) => (
          <button key={n} onClick={() => setF(n)} aria-pressed={f === n} className="relative rounded-md px-3 py-1.5 font-mono text-[13px]">
            {f === n && <motion.span layoutId="filter" className="absolute inset-0 rounded-md bg-white/[.08]" transition={{ duration: 0.25 }} />}
            <span className={`relative ${f === n ? "text-fg" : "text-muted hover:text-fg"}`}>{n}</span>
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-xs text-faint">{list.length} result{list.length === 1 ? "" : "s"}</span>
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} wide={i === 0 && f === "all"} />)}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
