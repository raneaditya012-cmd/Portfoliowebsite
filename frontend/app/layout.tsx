import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import { getProfile } from "@/lib/api";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "Aditya Rane — Software Engineer", template: "%s · Aditya Rane" },
  description: "Software engineer building intelligent, scalable systems across full-stack, cloud, IoT and autonomous robotics. IEEE-published. Based in Mumbai.",
  openGraph: { title: "Aditya Rane — Software Engineer", description: "Full-stack, AI, robotics and IoT.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#0b0c0e" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <Loader />
          <Nav links={profile.links} />
          <main>{children}</main>
          <Footer profile={profile} />
        </MotionConfig>
      </body>
    </html>
  );
}
