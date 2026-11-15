"use client";
import { useEffect, useState } from "react";

export type Step = { cmd: string; out: string[] };

/** Types each command, then prints its output. Runs once. */
export default function Terminal({ steps, title = "zsh" }: { steps: Step[]; title?: string }) {
  const [si, setSi] = useState(0);   // current step
  const [ci, setCi] = useState(0);   // chars typed of current cmd
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setInstant(true); setSi(steps.length); }
  }, [steps.length]);

  useEffect(() => {
    if (instant || si >= steps.length) return;
    const cmd = steps[si].cmd;
    const t = ci < cmd.length
      ? setTimeout(() => setCi(ci + 1), 38 + Math.random() * 40)
      : setTimeout(() => { setSi(si + 1); setCi(0); }, 520);
    return () => clearTimeout(t);
  }, [si, ci, steps, instant]);

  return (
    <div className="card overflow-hidden shadow-2xl shadow-black/40" onClick={() => { setInstant(true); setSi(steps.length); }}>
      <div className="flex items-center gap-2 border-b border-white/[.07] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-xs text-faint">{title}</span>
      </div>
      <div className="min-h-[19rem] p-5 font-mono text-[13px] leading-relaxed" aria-label="Terminal session introducing Aditya">
        {steps.map((s, i) => {
          if (i > si) return null;
          const typing = i === si;
          return (
            <div key={i} className="mb-3">
              <p><span className="text-ok">➜</span> <span className="text-accent">~</span> <span className="text-fg">{typing ? s.cmd.slice(0, ci) : s.cmd}</span>
                {typing && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-fg" />}</p>
              {!typing && s.out.map((o, k) => <p key={k} className="text-muted">{o}</p>)}
            </div>
          );
        })}
        {si >= steps.length && <p><span className="text-ok">➜</span> <span className="text-accent">~</span> <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-fg" /></p>}
      </div>
    </div>
  );
}
