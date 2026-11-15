"use client";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";
import type { Profile } from "@/lib/types";

const LINKS = [
  { href: "/#about", label: "about" },
  { href: "/#stack", label: "stack" },
  { href: "/projects", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/contact", label: "contact" },
];

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date()));
    f();
    const id = setInterval(f, 20000);
    return () => clearInterval(id);
  }, []);
  return <span className="hidden font-mono text-xs tabular-nums text-muted lg:inline" title="Local time in Mumbai">{t && `${t} IST`}</span>;
}

export default function Nav({ links }: { links: Profile["links"] }) {
  const pathname = usePathname();
  const { scrollYProgress, scrollY } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hov, setHov] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || menu ? "border-b border-white/[.07] bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"}`}>
        <nav className="wrap flex h-14 items-center justify-between">
          <Link href="/" className="group flex items-baseline gap-0.5 text-[17px] font-semibold tracking-tight text-fg" aria-label="Aditya Rane — home">
            <span className="font-mono text-[15px] font-normal text-accent transition-transform group-hover:-translate-x-0.5">~/</span>aditya<span className="text-muted">.rane</span>
          </Link>
          <ul className="hidden items-center gap-0.5 md:flex" onPointerLeave={() => setHov(null)}>
            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href === "/projects" && pathname.startsWith("/projects"));
              return (
                <li key={l.href} className="relative" onPointerEnter={() => setHov(l.href)}>
                  {hov === l.href && <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-lg bg-white/[.06]" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                  <Link href={l.href} className={`relative block px-3.5 py-2 text-[14.5px] font-medium tracking-[-0.01em] capitalize transition-colors ${active ? "text-fg" : "text-fg/65 hover:text-fg"}`}>
                    {l.label}
                    {active && <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-[3px] h-px bg-accent" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3">
            <Clock />
            <button onClick={() => setOpen(true)} className="tag hidden hover:text-fg sm:block" aria-label="Open command palette">⌘K</button>
            <button onClick={() => setMenu((m) => !m)} className="tag md:hidden" aria-label="Menu" aria-expanded={menu}>{menu ? "close" : "menu"}</button>
          </div>
        </nav>
        <motion.div className="h-px origin-left bg-accent/70" style={{ scaleX: bar }} />
        {menu && (
          <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="wrap pb-4 md:hidden">
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="block border-t border-white/[.06] py-3 text-base font-medium capitalize text-fg/80 hover:text-fg">{l.label}</Link></li>
            ))}
          </motion.ul>
        )}
      </header>
      <CommandPalette open={open} setOpen={setOpen} links={links} />
    </>
  );
}
