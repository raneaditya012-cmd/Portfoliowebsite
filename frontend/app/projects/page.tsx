import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";
import { SectionHead } from "@/components/Reveal";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="wrap pb-10 pt-32">
      <SectionHead index="~" name="projects" title="Projects" sub="IoT, robotics, data engineering and full-stack. Open any project for the details." />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
