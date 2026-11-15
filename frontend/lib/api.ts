import fallback from "./fallback.json";
import type { Content } from "./types";

const API = process.env.API_URL;

/** Content comes from the FastAPI backend when API_URL is set; otherwise from the bundled copy. */
export async function getContent(): Promise<Content> {
  if (API) {
    try {
      const r = await fetch(`${API}/api/content`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(2000) });
      if (r.ok) return (await r.json()) as Content;
    } catch { /* fall through to the bundled copy */ }
  }
  return fallback as unknown as Content;
}

export const allSlugs = () => (fallback as unknown as Content).projects.map((p) => p.slug);
