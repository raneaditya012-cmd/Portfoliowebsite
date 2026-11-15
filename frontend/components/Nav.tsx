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
  return <span className="hidden font-mono text-xs text-muted lg:inline" title="Local time in Mumbai">{t && `${t} IST`}</span>;
}

export default function Nav({ links }: { links: Profile["links"] }) {
  const pathname = usePathname();
  const { scrollYProgress, scrollY } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <Link href="/" className="font-mono text-sm text-fg"><span className="text-faint">~/</span>aditya-rane</Link>
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href === "/projects" && pathname.startsWith("/projects"));
              return (
                <li key={l.href}>
                  <Link href={l.href} className={`rounded-md px-3 py-1.5 font-mono text-[13px] transition-colors ${active ? "text-fg bg-white/[.06]" : "text-muted hover:text-fg"}`}>{l.label}</Link>
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
              <li key={l.href}><Link href={l.href} className="block border-t border-white/[.06] py-3 font-mono text-sm text-muted hover:text-fg">{l.label}</Link></li>
            ))}
          </motion.ul>
        )}
      </header>
      <CommandPalette open={open} setOpen={setOpen} links={links} />
    </>
  );
}
