"use client";

import { useEffect, useRef, useState } from "react";

/* Reveal-on-view helper (IntersectionObserver, no scroll listeners) */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

export function SectionHead({ n, eyebrow, title }: { n: string; eyebrow: string; title: React.ReactNode }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const cls = `transition-all duration-1000 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;
  return (
    <div ref={ref} className={`${cls} mb-12 flex items-end justify-between gap-6 border-b border-border pb-6`}>
      <div>
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-light leading-tight sm:text-6xl">{title}</h2>
      </div>
      <span className="hidden font-display text-6xl font-light text-primary/20 sm:block">{n}</span>
    </div>
  );
}
