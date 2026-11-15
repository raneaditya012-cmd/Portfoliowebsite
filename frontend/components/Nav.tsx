"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommandPalette, { type PaletteItem } from "./CommandPalette";

const LINKS = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#play", label: "Play" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ items }: { items: PaletteItem[] }) {
  const pathname = usePathname();
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((o) => !o); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <nav className="wrap flex h-14 items-center justify-between" aria-label="Main">
          <Link href="/" className="text-base font-semibold">Aditya Rane</Link>
          <ul className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-sm text-muted transition-colors duration-150 hover:text-fg">{l.label}</Link></li>
            ))}
            <li><button onClick={() => setPalette(true)} className="tag transition-colors duration-150 hover:text-fg" aria-label="Open quick navigation">Ctrl K</button></li>
          </ul>
          <button onClick={() => setMenu((m) => !m)} className="btn btn-secondary md:hidden" aria-expanded={menu} aria-controls="mobile-menu">{menu ? "Close" : "Menu"}</button>
        </nav>
        {menu && (
          <ul id="mobile-menu" className="wrap border-t border-line py-2 md:hidden">
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} onClick={() => setMenu(false)} className="flex h-12 items-center text-base text-muted hover:text-fg">{l.label}</Link></li>
            ))}
          </ul>
        )}
      </header>
      <CommandPalette open={palette} onClose={() => setPalette(false)} items={items} />
    </>
  );
}
