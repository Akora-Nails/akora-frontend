import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow text-primary">404</p>
        <h1 className="mt-3 text-4xl font-light">Page not found</h1>
        <p className="mt-4 text-muted-foreground">We couldn&apos;t find the page you were looking for.</p>
        <Button asChild className="mt-8 h-auto rounded-full px-6 py-3 font-semibold shadow-none">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
