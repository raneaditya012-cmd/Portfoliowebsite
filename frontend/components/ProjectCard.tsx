import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectArt from "./ProjectArt";
import type { Project } from "@/lib/types";

export function Status({ s }: { s: string }) {
  if (!s) return null;
  return (
    <span className="label inline-flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${/progress/i.test(s) ? "bg-accent" : "bg-ok"}`} aria-hidden />{s}
    </span>
  );
}

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded border border-line bg-surface transition-colors duration-150 hover:border-muted">
      <div className="aspect-[16/9] border-b border-line"><ProjectArt slug={p.slug} /></div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4"><span className="label">{p.kind}</span><Status s={p.status} /></div>
        <h3 className="mt-4 flex items-center gap-2 text-lg">
          {p.title}
          <ArrowUpRight size={16} className="text-muted transition-colors duration-150 group-hover:text-accent" aria-hidden />
        </h3>
        <p className="mt-2 text-sm text-muted">{p.blurb}</p>
        {p.stack.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-6">{p.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
        )}
      </div>
    </Link>
  );
}
