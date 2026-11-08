"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { estimate, formatRs, nailArt, services } from "@/lib/akora-data";
import { cn } from "@/lib/utils";
import { SectionHead } from "./SectionHead";

export function Book() {
  const [svc, setSvc] = useState<string | null>("gel-mani");
  const [art, setArt] = useState<Record<string, number>>({});
  const est = estimate(svc, art);
  const setNails = (id: string, d: number) => setArt((a) => ({ ...a, [id]: Math.min(10, Math.max(0, (a[id] ?? 0) + d)) }));
  const copy = async () => {
    const s = services.find((x) => x.id === svc);
    const arts = Object.entries(art).filter(([, n]) => n > 0).map(([id, n]) => `${nailArt.find((a) => a.id === id)!.name} ×${n}`);
    const msg = `Hi Akora! I'd love to book: ${s?.name ?? "a service"}${arts.length ? ` + ${arts.join(", ")}` : ""}. Estimate ${formatRs(est.total)}${est.upwards ? "+" : ""}.`;
    try { await navigator.clipboard.writeText(msg); toast.success("Booking request copied — send it to Akora to confirm."); }
    catch { toast(msg); }
  };
  return (
    <section id="book" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 sm:py-32">
      <SectionHead n="04" eyebrow="Plan your set" title={<>Build your appointment, <em>see the estimate.</em></>} />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <fieldset>
            <legend className="eyebrow mb-4 text-muted-foreground">1 · Choose a service</legend>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Button key={s.id} variant="outline" onClick={() => setSvc(s.id)} aria-pressed={svc === s.id}
                  className={cn(
                    "h-auto rounded-full px-4 py-2 text-sm font-normal shadow-none transition",
                    svc === s.id
                      ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "bg-transparent hover:border-primary hover:bg-transparent hover:text-foreground",
                  )}>
                  {s.name}
                </Button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="eyebrow mb-4 text-muted-foreground">2 · Add nail art (number of nails)</legend>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {nailArt.map((a) => (
                <div key={a.id} className="flex items-center justify-between border-b py-3">
                  <span>{a.name} <span className="text-xs text-muted-foreground">{a.price ? `${formatRs(a.price)}${a.upwards ? "+" : ""}` : "free"}</span></span>
                  <span className="flex items-center gap-3">
                    <Button variant="outline" size="icon" aria-label={`Fewer ${a.name}`} onClick={() => setNails(a.id, -1)} className="h-8 w-8 rounded-full bg-transparent shadow-none transition hover:bg-muted">−</Button>
                    <span className="w-5 text-center tabular-nums">{art[a.id] ?? 0}</span>
                    <Button variant="outline" size="icon" aria-label={`More ${a.name}`} onClick={() => setNails(a.id, 1)} className="h-8 w-8 rounded-full bg-transparent shadow-none transition hover:bg-muted">+</Button>
                  </span>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        <aside className="h-fit rounded-[2rem] bg-wine p-8 text-wine-foreground lg:sticky lg:top-24">
          <p className="eyebrow text-gold">Your estimate</p>
          <p key={est.total} className="mt-4 animate-in fade-in slide-in-from-bottom-2 font-display text-6xl font-light">
            {formatRs(est.total)}{est.upwards && <span className="text-gold">+</span>}
          </p>
          <p className="mt-4 text-sm opacity-75">
            {est.upwards ? "Some art is priced “upwards” — the final price depends on detail. " : ""}
            Appointments take 1–3 hours. Cash or immediate bank transfer.
          </p>
          <Button onClick={copy} className="mt-8 h-auto w-full rounded-full bg-gold py-4 font-semibold text-wine shadow-none transition hover:-translate-y-0.5 hover:bg-gold hover:shadow-xl">
            Copy booking request
          </Button>
          <p className="mt-3 text-center text-xs opacity-60">Home-based studio · address shared on confirmation</p>
        </aside>
      </div>
    </section>
  );
}
