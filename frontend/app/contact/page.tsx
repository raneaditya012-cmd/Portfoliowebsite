import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Reveal, SectionHead } from "@/components/Reveal";
import { getProfile } from "@/lib/api";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const profile = await getProfile();
  const l = profile.links;
  const direct: [string, string, React.ReactNode][] = [[l.email, l.email.replace("mailto:", ""), <Mail key="m" size={15} />], [l.github, "GitHub", <Github key="g" size={15} />], [l.linkedin, "LinkedIn", <Linkedin key="l" size={15} />]];
  return (
    <div className="wrap pb-10 pt-32">
      <SectionHead index="~" name="contact" title="Get in touch" sub="Hiring, collaborating or just saying hi — the form posts straight to my API." />
      <Reveal><ContactForm email={l.email} /></Reveal>
      <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-3 border-t border-white/[.07] pt-8">
        {direct.map(([href, label, icon]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="btn btn-ghost">{icon} {label}</a>)}
      </Reveal>
    </div>
  );
}
