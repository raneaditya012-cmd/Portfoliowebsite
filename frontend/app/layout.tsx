import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/api";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono" });

const description = "Software engineer at ICICI Lombard in Mumbai, working across web, cloud and embedded systems, with a focus on AI, robotics and distributed systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aditya-rane-portfolio.vercel.app"),
  title: { default: "Aditya Rane, Software Engineer", template: "%s | Aditya Rane" },
  description,
  openGraph: { title: "Aditya Rane, Software Engineer", description, type: "website", url: "/" },
  twitter: { card: "summary_large_image", title: "Aditya Rane, Software Engineer", description },
};
export const viewport: Viewport = { themeColor: "#0c0c0d" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { profile, projects } = await getContent();
  const items = [
    { label: "Experience", hint: "Section", href: "/#experience" },
    { label: "Projects", hint: "Section", href: "/#projects" },
    { label: "Skills", hint: "Section", href: "/#skills" },
    { label: "About", hint: "Section", href: "/#about" },
    { label: "Contact", hint: "Section", href: "/#contact" },
    ...projects.map((p) => ({ label: p.title, hint: "Project", href: `/projects/${p.slug}` })),
    { label: "GitHub", hint: "Link", href: profile.links.github, external: true },
    { label: "LinkedIn", hint: "Link", href: profile.links.linkedin, external: true },
  ];
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-2 focus:z-50 focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
        <Nav items={items} />
        <main id="main">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
