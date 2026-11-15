import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import ProjectCard from "@/components/ProjectCard";
import GitLog from "@/components/GitLog";
import OffClock from "@/components/OffClock";
import { Reveal, SectionHead, SplitWords } from "@/components/Reveal";
import { getHobbies, getProfile, getProjects, getSkills, getTimeline } from "@/lib/api";

export default async function Home() {
  const [profile, skills, projects, timeline, hobbies] = await Promise.all([getProfile(), getSkills(), getProjects(), getTimeline(), getHobbies()]);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Hero profile={profile} projects={projects} />

      <div className="overflow-hidden border-y border-white/[.07] py-4" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm text-faint">
          {[...profile.interests, ...profile.interests, ...profile.interests, ...profile.interests].map((t, i) => (
            <span key={i} className="flex items-center gap-10">{t}<span className="text-white/15">/</span></span>
          ))}
        </div>
      </div>

      <section id="about" className="wrap scroll-mt-20 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal><p className="label mb-4"><span className="text-accent">01</span> <span className="text-faint">/</span> about</p></Reveal>
            <h2 className="h2"><SplitWords text="I like understanding how systems work end to end — then building them." /></h2>
            <Reveal delay={0.15}><p className="mt-7 text-lg leading-relaxed text-muted">{profile.summary}</p></Reveal>
            <Reveal delay={0.2}><p className="mt-4 text-lg leading-relaxed text-muted">I enjoy complex engineering problems: system design, distributed architectures, agentic AI and multi-agent systems, and how people interact with autonomous machines.</p></Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="card overflow-hidden font-mono text-[13px]">
              <div className="border-b border-white/[.07] px-4 py-3 text-xs text-faint">profile.json</div>
              <dl className="divide-y divide-white/[.06]">
                {[["role", profile.role], ["location", profile.location], ["education", "B.Tech, Electronics & Telecommunication"], ["published", "IEEE — PetroConnect"], ["range", "embedded → backend → cloud"], ["interests", "robotics, agentic AI, distributed systems"]].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 px-4 py-3 transition-colors hover:bg-white/[.03]">
                    <dt className="text-accent">{k}</dt><dd className="text-fg/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="stack" className="wrap scroll-mt-20 py-20 md:py-28">
        <SectionHead index="02" name="stack" title="Tools I build with" sub="From microcontrollers to cloud pipelines." />
        <Stack groups={skills} />
      </section>

      <section id="projects" className="wrap scroll-mt-20 py-20 md:py-28">
        <SectionHead index="03" name="projects" title="Selected work" sub="An IEEE-published IoT system, a drone swarm, a data platform and full-stack products." />
        <div className="space-y-5">
          {featured.map((p, i) => (
            <div key={p.slug} className="md:sticky" style={{ top: `${5 + i * 1.5}rem` }}><ProjectCard p={p} wide /></div>
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}
        </div>
        <Reveal className="mt-8"><Link href="/projects" className="link inline-flex items-center gap-2 text-sm">All projects <ArrowRight size={14} /></Link></Reveal>
      </section>

      <section id="experience" className="wrap scroll-mt-20 py-20 md:py-28">
        <SectionHead index="04" name="experience" title="History" />
        <GitLog items={timeline} />
      </section>

      <section id="off-the-clock" className="wrap scroll-mt-20 py-20 md:py-28">
        <SectionHead index="05" name="off the clock" title="Away from the keyboard" sub="Football, the gym, and whatever's new in tech." />
        <OffClock hobbies={hobbies} />
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="card dots relative overflow-hidden px-6 py-16 text-center sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface" aria-hidden />
          <div className="relative">
            <h2 className="h1 text-4xl sm:text-6xl"><SplitWords text="Let's build something." /></h2>
            <Reveal delay={0.2}><p className="mx-auto mt-4 max-w-md text-muted">Software, AI, robotics — happy to talk.</p></Reveal>
            <Reveal delay={0.3}><Link href="/contact" className="btn btn-primary mt-8">Get in touch <ArrowRight size={16} /></Link></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
