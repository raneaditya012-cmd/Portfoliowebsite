export type Profile = {
  name: string; role: string; location: string; tagline: string; summary: string;
  interests: string[]; links: { github: string; linkedin: string; email: string; resume: string };
};
export type SkillGroup = { group: string; items: string[]; note: string };
export type Project = {
  slug: string; status: string; title: string; kind: string; blurb: string; story: string;
  highlights: string[]; stack: string[]; stats: Record<string, string>; featured: boolean; links: Record<string, string>;
};
export type TimelineItem = { year: string; ref: string; title: string; text: string };
export type Hobby = { icon: string; title: string; text: string };
