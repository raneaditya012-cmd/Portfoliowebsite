import Link from "next/link";

import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="wrap py-24">
      <p className="label">404</p>
      <h1 className="mt-4 text-2xl md:text-3xl">Page not found</h1>
      <p className="mt-6 max-w-xl text-lg text-muted">That address does not match any page on this site.</p>
      <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
    </div>
  );
}
