"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectArt from "./ProjectArt";
import { spot } from "./Reveal";
import type { Project } from "@/lib/types";

export function Status({ s }: { s: string }) {
  const live = /progress/i.test(s);
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-warm animate-pulse" : "bg-ok"}`} />{s}
    </span>
  );
}

export default function ProjectCard({ p, index = 0, wide = false }: { p: Project; index?: number; wide?: boolean }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.07 }} className={wide ? "md:col-span-2" : ""}>
      <Link href={`/projects/${p.slug}`} onPointerMove={spot}
        className={`card spot group grid h-full overflow-hidden transition-colors hover:border-white/20 ${wide ? "md:grid-cols-[1.1fr_1fr]" : ""}`}>
        <div className={`overflow-hidden border-white/[.07] ${wide ? "aspect-[16/10] border-b md:aspect-auto md:min-h-[340px] md:border-b-0 md:border-r" : "aspect-[16/9] border-b"}`}>
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"><ProjectArt slug={p.slug} /></div>
        </div>
        <div className="flex flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4"><span className="label">{p.kind}</span><Status s={p.status} /></div>
          <h3 className={`mt-5 font-semibold tracking-tight ${wide ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{p.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{p.blurb}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="flex flex-wrap gap-1.5">{p.stack.slice(0, wide ? 6 : 4).map((t) => <span key={t} className="tag">{t}</span>)}</div>
            <ArrowUpRight size={18} className="shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
