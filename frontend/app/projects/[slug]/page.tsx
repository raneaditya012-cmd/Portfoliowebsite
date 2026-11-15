import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ProjectArt from "@/components/ProjectArt";
import { Status } from "@/components/ProjectCard";
import { Reveal, SplitWords } from "@/components/Reveal";
import { allSlugs, getProjects } from "@/lib/api";

export const generateStaticParams = () => allSlugs().map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = (await getProjects()).find((x) => x.slug === params.slug);
  return { title: p?.title ?? "Project", description: p?.blurb };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const links = Object.entries(p.links).filter(([, u]) => u && u !== "#");

  return (
    <article className="wrap pt-28">
      <Link href="/projects" className="label inline-flex items-center gap-2 transition-colors hover:text-fg"><ArrowLeft size={13} /> projects<span className="text-faint">/</span>{p.slug}</Link>

      <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-4"><span className="label">{p.kind}</span><Status s={p.status} /></div>
          <h1 className="h1 mt-5 text-5xl sm:text-7xl"><SplitWords text={p.title} /></h1>
          <Reveal delay={0.15}><p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">{p.blurb}</p></Reveal>
          {links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {links.map(([k, u]) => <a key={k} href={u} target="_blank" rel="noreferrer" className="btn btn-ghost capitalize">{k} <ExternalLink size={14} /></a>)}
            </div>
          )}
        </div>
        <Reveal delay={0.1}><div className="card aspect-[4/3] overflow-hidden"><ProjectArt slug={p.slug} /></div></Reveal>
      </header>

      <Reveal>
        <dl className="mt-14 grid grid-cols-3 divide-x divide-white/[.07] rounded-2xl border border-white/[.08]">
          {Object.entries(p.stats).map(([k, v]) => (
            <div key={k} className="px-4 py-5 sm:px-7"><dt className="label">{k.toLowerCase()}</dt><dd className="mt-1.5 text-lg font-semibold tracking-tight sm:text-2xl">{v}</dd></div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal><h2 className="label mb-4">overview</h2><p className="text-lg leading-relaxed text-fg/90">{p.story}</p></Reveal>
          <h2 className="label mb-5 mt-12">highlights</h2>
          <ol className="divide-y divide-white/[.07] border-y border-white/[.07]">
            {p.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.05}>
                <li className="flex gap-5 py-4"><span className="font-mono text-xs text-accent pt-1">{String(i + 1).padStart(2, "0")}</span><span className="text-lg">{h}</span></li>
              </Reveal>
            ))}
          </ol>
        </div>
        <aside>
          <Reveal delay={0.1}>
            <h2 className="label mb-4">built with</h2>
            <div className="flex flex-wrap gap-2">{p.stack.map((t) => <span key={t} className="tag !text-[13px] !text-fg">{t}</span>)}</div>
          </Reveal>
        </aside>
      </div>

      <Link href={`/projects/${next.slug}`} className="group mt-24 flex items-end justify-between border-t border-white/[.08] pt-8">
        <div><p className="label">next project</p><p className="mt-2 text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-5xl">{next.title}</p></div>
        <ArrowRight className="mb-2 shrink-0 text-faint transition-all group-hover:translate-x-2 group-hover:text-accent" size={28} />
      </Link>
    </article>
  );
}
