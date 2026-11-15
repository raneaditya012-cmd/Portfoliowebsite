export type AiStory = { title: string; url: string; host: string; points: number; comments: number; discussion: string; date: string };

const API = process.env.NEWS_API_URL || "https://hn.algolia.com/api/v1/search";
const WINDOW_HOURS = 48;

/**
 * The most upvoted AI story on Hacker News from the last 48 hours.
 * Cached for 24 hours by Next.js (ISR), so the page refreshes it about once a day.
 * Returns null on any failure so the page simply omits the card.
 */
export async function getAiStory(): Promise<AiStory | null> {
  try {
    const since = Math.floor(Date.now() / 1000) - WINDOW_HOURS * 3600;
    const qs = new URLSearchParams({ query: "AI", tags: "story", hitsPerPage: "20", numericFilters: `created_at_i>${since},points>20` });
    const r = await fetch(`${API}?${qs}`, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(4000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = (await r.json()) as { hits?: { title?: string; url?: string; points?: number; num_comments?: number; objectID?: string; created_at?: string }[] };
    const hit = (data.hits ?? [])
      .filter((h) => h.title && h.url && h.objectID && h.title.length <= 160 && /^https:\/\//.test(h.url))
      .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))[0];
    if (!hit) return null;
    return {
      title: hit.title!, url: hit.url!, host: new URL(hit.url!).hostname.replace(/^www\./, ""),
      points: hit.points ?? 0, comments: hit.num_comments ?? 0,
      discussion: `https://news.ycombinator.com/item?id=${hit.objectID}`, date: hit.created_at ?? "",
    };
  } catch (e) {
    console.log(`[ai-news] unavailable: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}
