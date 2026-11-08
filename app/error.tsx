"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-svh place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow text-primary">Something went wrong</p>
        <h1 className="mt-3 text-4xl font-light">This page didn&apos;t load</h1>
        <p className="mt-4 text-muted-foreground">Something went wrong on our end. You can try again or head back home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} className="h-auto rounded-full px-6 py-3 font-semibold shadow-none">Try again</Button>
          <Button asChild variant="outline" className="h-auto rounded-full bg-transparent px-6 py-3 font-semibold shadow-none">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
