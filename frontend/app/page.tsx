import { ArrowUpRight, Mail } from "lucide-react";
import CopyEmail from "@/components/CopyEmail";
import AiStoryCard from "@/components/AiStoryCard";
import ProjectCard from "@/components/ProjectCard";
import { getAiStory } from "@/lib/aiNews";
import { getContent } from "@/lib/api";

export default async function Home() {
  const { profile, experience, skills, projects } = await getContent();
  const { links } = profile;
  const story = await getAiStory();

  return (
    <>
      <section className="wrap py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_320px] md:items-end">
          <div>
            <p className="label">{profile.role}, {profile.company}</p>
            <h1 className="mt-4 text-3xl md:text-4xl">{profile.name}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="btn btn-primary">View projects</a>
              <a href={`mailto:${links.email}`} className="btn btn-secondary"><Mail size={16} /> Email me</a>
            </div>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {profile.facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[96px_1fr] gap-4 py-4 text-sm">
                <dt className="text-muted">{k}</dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="wrap section-grid">
          <h2 className="section-title">Experience</h2>
          <ol className="divide-y divide-line">
            {experience.map((e) => (
              <li key={e.title + e.org} className="grid gap-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[112px_1fr] sm:gap-6">
                <p className="label pt-1">{e.label}</p>
                <div>
                  <h3 className="text-lg">{e.title}{e.org && <span className="font-normal text-muted">, {e.org}</span>}</h3>
                  <p className="mt-2 max-w-xl text-muted">{e.text}</p>
                  {e.link && (
                    <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="link mt-4 inline-flex items-center gap-1 text-sm">
                      {e.link.label} <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="wrap section-grid">
          <h2 className="section-title">Projects</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {projects.map((p) => <li key={p.slug}><ProjectCard p={p} /></li>)}
          </ul>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="wrap section-grid">
          <h2 className="section-title">Skills</h2>
          <dl className="divide-y divide-line">
            {skills.map((g) => (
              <div key={g.group} className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[176px_1fr] sm:gap-6">
                <dt className="text-muted">{g.group}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="about" className="section">
        <div className="wrap section-grid">
          <h2 className="section-title">About</h2>
          <div className="max-w-xl space-y-4 text-lg">
            {profile.about.map((p) => <p key={p}>{p}</p>)}
            <p className="text-muted">{profile.outside}</p>
          </div>
        </div>
      </section>

      {story && (
        <section id="ai" className="section">
          <div className="wrap section-grid">
            <h2 className="section-title">AI today</h2>
            <div className="max-w-xl"><AiStoryCard story={story} email={links.email} /></div>
          </div>
        </section>
      )}

      <section id="contact" className="section">
        <div className="wrap section-grid">
          <h2 className="section-title">Contact</h2>
          <div>
            <p className="max-w-xl text-lg">Email is the best way to reach me.</p>
            <p className="mt-4"><a href={`mailto:${links.email}`} className="link text-xl font-medium">{links.email}</a></p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CopyEmail email={links.email} />
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn <ArrowUpRight size={16} aria-hidden /></a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub <ArrowUpRight size={16} aria-hidden /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
