import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAiStory } from "@/lib/aiNews";
import { getContent } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono" });

const description = "Software engineer at ICICI Lombard in Mumbai, working across web, cloud and embedded systems, with a focus on AI, robotics and distributed systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  applicationName: "Aditya Rane",
  authors: [{ name: "Aditya Rane", url: SITE_URL }],
  keywords: ["Aditya Rane", "Aditya Rane software engineer", "Aditya Rane ICICI Lombard", "software engineer Mumbai", "PetroConnect IEEE", "Aegis-MAS"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  title: { default: "Aditya Rane | Software Engineer at ICICI Lombard, Mumbai", template: "%s | Aditya Rane" },
  description,
  openGraph: { title: "Aditya Rane | Software Engineer at ICICI Lombard, Mumbai", description, type: "website", url: "/", siteName: "Aditya Rane", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Aditya Rane | Software Engineer at ICICI Lombard, Mumbai", description },
};
export const viewport: Viewport = { themeColor: "#0c0c0d" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { profile, projects } = await getContent();
  const showAi = (await getAiStory()) !== null;
  const items = [
    { label: "Experience", hint: "Section", href: "/#experience" },
    { label: "Projects", hint: "Section", href: "/#projects" },
    { label: "Skills", hint: "Section", href: "/#skills" },
    { label: "About", hint: "Section", href: "/#about" },
    ...(showAi ? [{ label: "AI today", hint: "Section", href: "/#ai" }] : []),
    { label: "Contact", hint: "Section", href: "/#contact" },
    ...projects.map((p) => ({ label: p.title, hint: "Project", href: `/projects/${p.slug}` })),
    { label: "GitHub", hint: "Link", href: profile.links.github, external: true },
    { label: "LinkedIn", hint: "Link", href: profile.links.linkedin, external: true },
  ];
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role,
    worksFor: { "@type": "Organization", name: profile.company, url: "https://www.icicilombard.com" },
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    alumniOf: "B.Tech, Electronics and Telecommunication Engineering",
    email: `mailto:${profile.links.email}`,
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsAbout: ["Software engineering", "Artificial intelligence", "Robotics", "Distributed systems", "IoT", "Cloud computing"],
  };
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-2 focus:z-50 focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
        <Nav items={items} showAi={showAi} />
        <main id="main">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
