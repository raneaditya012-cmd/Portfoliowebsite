import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectArt from "@/components/ProjectArt";
import { Status } from "@/components/ProjectCard";
import { allSlugs, getContent } from "@/lib/api";

export const generateStaticParams = () => allSlugs().map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = (await getContent()).projects.find((x) => x.slug === params.slug);
  return p ? { title: p.title, description: p.blurb } : { title: "Project not found" };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { projects } = await getContent();
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const links = Object.entries(p.links);

  return (
    <article>
      <header className="wrap py-16">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-fg"><ArrowLeft size={14} aria-hidden /> All projects</Link>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-4"><span className="label">{p.kind}</span><Status s={p.status} /></div>
            <h1 className="mt-4 text-2xl md:text-3xl">{p.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{p.blurb}</p>
            {links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {links.map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{label} <ArrowUpRight size={16} aria-hidden /></a>
                ))}
              </div>
            )}
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded border border-line"><ProjectArt slug={p.slug} /></div>
        </div>
      </header>

      <section className="section">
        <div className="wrap section-grid">
          <h2 className="section-title">Overview</h2>
          <p className="max-w-xl text-lg">{p.overview}</p>
        </div>
      </section>

      {p.highlights.length > 0 && (
        <section className="section">
          <div className="wrap section-grid">
            <h2 className="section-title">What it covers</h2>
            <ul className="divide-y divide-line">
              {p.highlights.map((h) => <li key={h} className="py-4 first:pt-0 last:pb-0">{h}</li>)}
            </ul>
          </div>
        </section>
      )}

      {p.stack.length > 0 && (
        <section className="section">
          <div className="wrap section-grid">
            <h2 className="section-title">Built with</h2>
            <ul className="flex flex-wrap gap-2">{p.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6">
            <span><span className="label block">Next project</span><span className="mt-2 block text-xl font-semibold transition-colors duration-150 group-hover:text-accent">{next.title}</span></span>
            <ArrowRight className="shrink-0 text-muted transition-colors duration-150 group-hover:text-accent" size={24} aria-hidden />
          </Link>
        </div>
      </section>
    </article>
  );
}
