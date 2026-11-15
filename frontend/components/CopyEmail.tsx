"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies the address and confirms it, so the action always has visible feedback. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`; // clipboard blocked: open the mail client instead
    }
  };
  return (
    <button type="button" onClick={copy} className="btn btn-secondary" aria-live="polite">
      {copied ? <Check size={16} className="text-ok" /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
