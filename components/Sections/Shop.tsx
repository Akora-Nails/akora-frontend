"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import products from "@/assets/products.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHead } from "./SectionHead";

const shopItems = [
  { id: "oil", name: "Cuticle Oil", note: "Daily nourishment between appointments", pos: "18% 30%" },
  { id: "gel", name: "Gel Polish", note: "Shades from the studio collection", pos: "48% 40%" },
  { id: "file", name: "Nail File", note: "Gentle shaping at home", pos: "30% 80%" },
  { id: "charms", name: "Gems & Charms", note: "Little extras for DIY sparkle", pos: "80% 70%" },
];

export function Shop() {
  const [bag, setBag] = useState<string[]>([]);
  const toggle = (id: string) => setBag((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]));
  const send = async () => {
    const msg = `Hi Akora! I'd like to ask about: ${bag.map((id) => shopItems.find((s) => s.id === id)!.name).join(", ")}.`;
    try { await navigator.clipboard.writeText(msg); toast.success("Enquiry copied — paste it into a message to Akora."); }
    catch { toast(msg); }
  };
  return (
    <section id="shop" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 sm:py-32">
      <SectionHead n="03" eyebrow="Shop" title={<>Take the care <em>home.</em></>} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shopItems.map((p, i) => {
          const inBag = bag.includes(p.id);
          return (
            <article key={p.id} className="group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-blush">
                <Image src={products} alt={p.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: p.pos }}
                  className="scale-[1.8] object-cover transition-transform duration-700 group-hover:scale-[2]" />
                <Button onClick={() => toggle(p.id)} aria-pressed={inBag}
                  className={cn(
                    "absolute bottom-4 right-4 h-auto rounded-full px-4 py-2 text-sm font-semibold shadow-none transition",
                    inBag ? "bg-primary text-primary-foreground hover:bg-primary" : "bg-background/90 text-foreground hover:bg-background",
                  )}>
                  {inBag ? "Added ✓" : "+ Enquire"}
                </Button>
              </div>
              <h3 className="mt-4 text-xl">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.note}</p>
              <p className="mt-1 eyebrow text-primary">Price on request</p>
            </article>
          );
        })}
      </div>
      <div className={`sticky bottom-4 z-30 mt-10 flex items-center justify-between gap-4 rounded-full bg-foreground px-6 py-3 text-background transition-all duration-500 ${bag.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
        <span className="text-sm">{bag.length} item{bag.length === 1 ? "" : "s"} in your enquiry</span>
        <Button onClick={send} className="h-auto rounded-full bg-background px-5 py-2 text-sm font-semibold text-foreground shadow-none hover:bg-background/90">Copy enquiry</Button>
      </div>
    </section>
  );
}
