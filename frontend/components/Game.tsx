"use client";
import { useState } from "react";
import { Mail, RotateCcw } from "lucide-react";
import type { Game as GameData } from "@/lib/types";

type Phase = "guess" | "ask" | "done";

/** Two truths and a lie. The visitor guesses, then answers a question back; the results can be emailed. */
export default function Game({ game, email }: { game: GameData; email: string }) {
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase>("guess");
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ q: string; a: string }[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);

  const total = game.rounds.length;
  const r = game.rounds[Math.min(round, total - 1)];
  const lie = r.statements.findIndex((s) => !s.true);
  const revealed = picked !== null;

  const guess = (i: number) => {
    if (revealed) return;
    setPicked(i);
    if (i === lie) setScore((s) => s + 1);
  };
  const answer = (a: string) => {
    setChosen(a);
    setAnswers((prev) => [...prev, { q: r.ask.question, a }]);
  };
  const next = () => {
    if (round + 1 >= total) { setPhase("done"); return; }
    setRound(round + 1); setPhase("guess"); setPicked(null); setChosen(null);
  };
  const reset = () => { setRound(0); setPhase("guess"); setPicked(null); setScore(0); setAnswers([]); setChosen(null); };

  const mailto = () => {
    const body = [
      `Hi Aditya, I played Two truths and a lie on your portfolio and scored ${score}/${total}.`,
      "", ...answers.map((x) => `${x.q}\n${x.a}\n`), "Name:", "",
    ].join("\n");
    return `mailto:${email}?subject=${encodeURIComponent("Two truths and a lie")}&body=${encodeURIComponent(body)}`;
  };

  const card = "rounded border border-line bg-surface p-6";

  if (phase === "done") {
    return (
      <div className={card}>
        <p className="label">Finished</p>
        <p className="mt-4 text-xl font-semibold">You spotted {score} of {total}.</p>
        <p className="mt-2 text-muted">Thanks for playing. Here is what you told me:</p>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {answers.map((x) => (
            <div key={x.q} className="grid gap-1 py-3 text-sm sm:grid-cols-[1fr_auto] sm:gap-6"><dt className="text-muted">{x.q}</dt><dd>{x.a}</dd></div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={mailto()} className="btn btn-primary"><Mail size={16} aria-hidden /> Email me your answers</a>
          <button type="button" onClick={reset} className="btn btn-secondary"><RotateCcw size={16} aria-hidden /> Play again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={card}>
      <div className="flex items-center justify-between">
        <p className="label">Round {round + 1} of {total}</p>
        <p className="label">Score {score}</p>
      </div>

      {phase === "guess" && (
        <>
          <p className="mt-4 text-lg">Which statement about me is false?</p>
          <ul className="mt-4 space-y-2">
            {r.statements.map((s, i) => {
              const isLie = i === lie;
              const state = !revealed ? "border-line hover:border-muted" : isLie ? "border-ok" : picked === i ? "border-accent" : "border-line opacity-60";
              return (
                <li key={s.text}>
                  <button type="button" onClick={() => guess(i)} disabled={revealed} aria-pressed={picked === i}
                    className={`w-full rounded border px-4 py-3 text-left text-sm transition-colors duration-150 ${state}`}>
                    {s.text}
                    {revealed && <span className="label mt-1 block">{isLie ? "False" : "True"}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
          <div aria-live="polite">
            {revealed && (
              <div className="mt-6">
                <p className="font-medium">{picked === lie ? "Correct." : "Not quite."}</p>
                <p className="mt-1 text-muted">{r.reveal}</p>
                <button type="button" onClick={() => setPhase("ask")} className="btn btn-primary mt-6">Your turn</button>
              </div>
            )}
          </div>
        </>
      )}

      {phase === "ask" && (
        <>
          <p className="label mt-4">Your turn</p>
          <p className="mt-2 text-lg">{r.ask.question}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {r.ask.options.map((o) => (
              <li key={o}>
                <button type="button" onClick={() => answer(o)} disabled={chosen !== null} aria-pressed={chosen === o}
                  className={`h-10 rounded border px-4 text-sm transition-colors duration-150 ${chosen === o ? "border-accent text-fg" : chosen ? "border-line text-muted opacity-60" : "border-line hover:border-muted"}`}>{o}</button>
              </li>
            ))}
          </ul>
          {chosen && <button type="button" onClick={next} className="btn btn-primary mt-6">{round + 1 >= total ? "See results" : "Next round"}</button>}
        </>
      )}
    </div>
  );
}
