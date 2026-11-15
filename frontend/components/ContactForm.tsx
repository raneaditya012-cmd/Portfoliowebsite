"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

const INTENTS = [["hiring", "Hiring"], ["collab", "Collaboration"], ["hello", "Just saying hi"]] as const;

export default function ContactForm({ email }: { email: string }) {
  const [v, setV] = useState({ name: "", email: "", message: "", intent: "hiring" });
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [res, setRes] = useState<{ code: number | string; body: string } | null>(null);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending"); setRes(null);
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...v, website: hp }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setRes({ code: r.status, body: typeof j.detail === "string" ? j.detail : "Please check the fields and try again." }); setState("error"); return; }
      setRes({ code: r.status, body: '{ "ok": true }' }); setState("done");
    } catch {
      setRes({ code: "ERR", body: `Couldn't reach the server — email ${email.replace("mailto:", "")} instead.` }); setState("error");
    }
  };

  const field = "w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-faint focus:border-accent/60";
  const K = ({ k }: { k: string }) => <span className="text-accent">&quot;{k}&quot;</span>;
  const S = ({ s }: { s: string }) => <span className="text-warm break-words">&quot;{s}&quot;</span>;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="space-y-4">
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Reason for contact">
          {INTENTS.map(([val, l]) => (
            <button type="button" key={val} role="radio" aria-checked={v.intent === val} onClick={() => setV({ ...v, intent: val })}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${v.intent === val ? "border-accent/50 bg-accent/10 text-fg" : "border-white/10 text-muted hover:text-fg"}`}>{l}</button>
          ))}
        </div>
        <input value={v.name} onChange={set("name")} required maxLength={80} placeholder="Name" className={field} autoComplete="name" aria-label="Name" />
        <input value={v.email} onChange={set("email")} type="email" required placeholder="Email" className={field} autoComplete="email" aria-label="Email" />
        <textarea value={v.message} onChange={set("message")} required minLength={5} maxLength={2000} rows={6} placeholder="Message" className={field} aria-label="Message" />
        <input value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button disabled={state === "sending" || state === "done"} className="btn btn-primary disabled:opacity-50">
          {state === "sending" ? "Sending…" : state === "done" ? "Sent" : "Send message"} <Send size={15} />
        </button>
      </form>

      {/* live request preview */}
      <div className="card overflow-hidden font-mono text-[13px]" aria-hidden>
        <div className="flex items-center justify-between border-b border-white/[.07] px-4 py-3 text-xs">
          <span><span className="text-ok">POST</span> <span className="text-muted">/api/contact</span></span>
          <span className="text-faint">application/json</span>
        </div>
        <pre className="whitespace-pre-wrap p-5 leading-relaxed text-muted">
{"{\n  "}<K k="intent" />: <S s={v.intent} />,{"\n  "}<K k="name" />: <S s={v.name} />,{"\n  "}<K k="email" />: <S s={v.email} />,{"\n  "}<K k="message" />: <S s={v.message} />{"\n}"}
        </pre>
        <div className="border-t border-white/[.07] px-5 py-4">
          {res ? (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <span className={state === "done" ? "text-ok" : "text-warm"}>{res.code}</span> <span className="text-muted">{res.body}</span>
            </motion.p>
          ) : <p className="text-faint">{state === "sending" ? "… awaiting response" : "// response appears here"}</p>}
        </div>
      </div>
      <p role="status" className="sr-only">{state === "done" ? "Message sent." : state === "error" ? res?.body : ""}</p>
    </div>
  );
}
