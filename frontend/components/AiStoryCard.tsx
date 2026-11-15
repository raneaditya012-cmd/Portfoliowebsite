import { ArrowUpRight } from "lucide-react";
import type { AiStory } from "@/lib/aiNews";

export default function AiStoryCard({ story, email }: { story: AiStory; email: string }) {
  const day = story.date ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(story.date)) : "";
  const reply = `mailto:${email}?subject=${encodeURIComponent("An AI story worth sharing")}&body=${encodeURIComponent("Hi Aditya, here is something in AI I found interesting:\n\n")}`;
  return (
    <aside aria-labelledby="ai-today" className="mb-6 rounded border border-line p-6">
      <p id="ai-today" className="label">Today in AI{day && ` · ${day}`}</p>
      <p className="mt-1 label">Most upvoted AI story on Hacker News in the last 48 hours</p>
      <h4 className="mt-4 text-lg">
        <a href={story.url} target="_blank" rel="noopener noreferrer nofollow" className="link inline-flex items-start gap-1">
          {story.title} <ArrowUpRight size={16} className="mt-1 shrink-0" aria-hidden />
        </a>
      </h4>
      <p className="mt-2 text-sm text-muted">{story.host} · {story.points} points · <a className="link" href={story.discussion} target="_blank" rel="noopener noreferrer">{story.comments} comments</a></p>
      <p className="mt-4 text-sm text-muted">Seen something better? <a className="link" href={reply}>Send it to me</a>.</p>
    </aside>
  );
}
