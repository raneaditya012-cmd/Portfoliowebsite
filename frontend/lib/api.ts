import fallback from "./fallback.json";
import type { Hobby, Profile, Project, SkillGroup, TimelineItem } from "./types";

const API = process.env.API_URL || "http://127.0.0.1:8000";

async function get<T>(path: string, fb: T): Promise<T> {
  try {
    const r = await fetch(`${API}${path}`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(1500) });
    if (!r.ok) throw new Error(String(r.status));
    return (await r.json()) as T;
  } catch {
    return fb; // graceful: site works even if the API is down
  }
}

export const getProfile = () => get<Profile>("/api/profile", fallback.profile as Profile);
export const getSkills = () => get<SkillGroup[]>("/api/skills", fallback.skills as SkillGroup[]);
export const getProjects = () => get<Project[]>("/api/projects", fallback.projects as unknown as Project[]);
export const getTimeline = () => get<TimelineItem[]>("/api/timeline", fallback.timeline as TimelineItem[]);
export const getHobbies = () => get<Hobby[]>("/api/hobbies", fallback.hobbies as Hobby[]);
export const allSlugs = () => (fallback.projects as unknown as Project[]).map((p) => p.slug);
