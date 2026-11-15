import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap grid min-h-[80svh] place-items-center pt-24 text-center">
      <div>
        <p className="font-mono text-sm text-muted"><span className="text-warm">404</span> — no route matched</p>
        <h1 className="h1 mt-4 text-5xl sm:text-7xl">Page not found</h1>
        <Link href="/" className="btn btn-primary mt-8">Back home</Link>
      </div>
    </div>
  );
}
