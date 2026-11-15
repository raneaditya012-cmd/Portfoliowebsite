export type Profile = {
  name: string; role: string; company: string; location: string; intro: string;
  about: string[]; outside: string; facts: [string, string][];
  links: { github: string; linkedin: string; email: string };
};
export type Experience = { label: string; title: string; org: string; text: string; link: { label: string; href: string } | null };
export type SkillGroup = { group: string; items: string[] };
export type Project = {
  slug: string; title: string; kind: string; status: string; blurb: string; overview: string;
  highlights: string[]; stack: string[]; links: Record<string, string>;
};
export type Statement = { text: string; true: boolean };
export type Round = { statements: Statement[]; reveal: string; ask: { question: string; options: string[] } };
export type Game = { title: string; intro: string; rounds: Round[] };
export type Content = { profile: Profile; experience: Experience[]; skills: SkillGroup[]; projects: Project[]; game: Game };
