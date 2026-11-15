"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import Terminal from "./Terminal";
import { Magnetic } from "./Fx";
import type { Profile, Project } from "@/lib/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const up = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: EASE } });

export default function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const mx = useMotionValue(-400), my = useMotionValue(-400);
  const light = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(165,180,252,.08), transparent 65%)`;

  const steps = [
    { cmd: "whoami", out: [`${profile.name.toLowerCase()} — ${profile.role.toLowerCase()}, ${profile.location.toLowerCase()}`] },
    { cmd: "cat focus.txt", out: ["agentic ai · autonomous robotics", "distributed systems · iot · system architecture"] },
    { cmd: "ls projects/", out: projects.map((p) => `${p.slug}/`) },
    { cmd: "git log -1 --oneline", out: ["a1f3c9e publish: PetroConnect (IEEE)"] },
  ];

  return (
    <section className="relative overflow-hidden"
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}>
      <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" aria-hidden />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: light }} aria-hidden />

      <div className="wrap relative grid min-h-[100svh] items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <motion.p {...up(0.1)} className="label flex items-center gap-2"><MapPin size={13} /> {profile.location}</motion.p>
          <h1 className="h1 mt-5 text-[clamp(3.75rem,8.5vw,6.25rem)]">
            {profile.name.split(" ").map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[.08em]">
                <motion.span className={`block ${i ? "text-muted" : ""}`} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: EASE }}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...up(0.45)} className="mt-6 font-mono text-sm text-accent">{profile.role}</motion.p>
          <motion.p {...up(0.55)} className="mt-3 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{profile.tagline}</motion.p>
          <motion.div {...up(0.7)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic><Link href="/projects" className="btn btn-primary">View projects <ArrowRight size={16} /></Link></Magnetic>
            <Magnetic><a href={profile.links.resume} className="btn btn-ghost"><FileText size={15} /> Résumé</a></Magnetic>
            <Magnetic><Link href="/contact" className="btn btn-ghost">Get in touch</Link></Magnetic>
          </motion.div>
          <motion.dl {...up(0.85)} className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/[.07] pt-6">
            {[["IEEE", "published research"], [String(projects.length), "projects built"], ["HW → Cloud", "range"]].map(([n, l]) => (
              <div key={l}><dt className="text-xl font-semibold tracking-tight">{n}</dt><dd className="label mt-0.5">{l}</dd></div>
            ))}
          </motion.dl>
        </div>
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }}>
          <Terminal steps={steps} title="aditya@mumbai — zsh" />
        </motion.div>
      </div>
    </section>
  );
}
