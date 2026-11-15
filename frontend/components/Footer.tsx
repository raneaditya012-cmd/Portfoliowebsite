import type { Profile } from "@/lib/types";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <ul className="flex gap-6">
          <li><a className="transition-colors duration-150 hover:text-fg" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="transition-colors duration-150 hover:text-fg" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="transition-colors duration-150 hover:text-fg" href={`mailto:${profile.links.email}`}>Email</a></li>
        </ul>
      </div>
    </footer>
  );
}
