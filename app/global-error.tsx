"use client";

import Link from "next/link";

// Replaces the root layout when it crashes, so it must render its own <html>/<body>
// and cannot rely on the site stylesheet or fonts.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ font: "15px/1.5 system-ui, -apple-system, sans-serif", background: "#fbf6f0", color: "#2b1a1c", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0, padding: "1.5rem" }}>
        <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>This page didn&apos;t load</h1>
          <p style={{ color: "#6b5254", margin: "0 0 1.5rem" }}>Something went wrong on our end. You can try refreshing or head back home.</p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={reset} style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid transparent", background: "#6b1f33", color: "#fff", font: "inherit", cursor: "pointer" }}>Try again</button>
            <Link href="/" style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid #d9c7bd", color: "#2b1a1c", textDecoration: "none" }}>Go home</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
