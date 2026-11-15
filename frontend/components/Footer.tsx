import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/lib/types";

export default function Footer({ profile }: { profile: Profile }) {
  const l = profile.links;
  const items: [string, React.ReactNode, string][] = [[l.github, <Github key="g" size={16} />, "GitHub"], [l.linkedin, <Linkedin key="l" size={16} />, "LinkedIn"], [l.email, <Mail key="m" size={16} />, "Email"]];
  return (
    <footer className="mt-28 border-t border-white/[.07]">
      <div className="wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-faint">© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
        <p className="font-mono text-xs text-faint">next.js + fastapi · press <span className="text-muted">⌘K</span> to navigate</p>
        <div className="flex gap-1">
          {items.map(([href, icon, label]) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-white/[.06] hover:text-fg">{icon}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
