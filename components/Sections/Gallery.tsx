"use client";

import { useState } from "react";
import Image from "next/image";
import chrome from "@/assets/nails-chrome.jpg";
import cateye from "@/assets/nails-cateye.jpg";
import tips from "@/assets/nails-tips.jpg";
import { SectionHead } from "./SectionHead";

const shots = [
  { src: chrome, alt: "Short square pearl chrome nails with pearl accents", tag: "Chrome · Pearls" },
  { src: cateye, alt: "Long burgundy cat eye nails with a marble accent nail", tag: "Cat Eye · Marble" },
  { src: tips, alt: "French tips and lilac blooming gel floral set", tag: "French · Blooming Gel" },
];

export function Gallery() {
  const [active, setActive] = useState(0);
  return (
    <section id="gallery" className="scroll-mt-20 bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead n="02" eyebrow="Gallery" title={<>A look at <em>the work.</em></>} />
        <div className="flex h-[70svh] max-h-[640px] flex-col gap-3 sm:flex-row">
          {shots.map((s, i) => (
            <button key={s.tag} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
              aria-label={s.tag}
              className={`group relative overflow-hidden rounded-3xl transition-[flex-grow] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${active === i ? "grow-[5]" : "grow"}`}
              style={{ flexBasis: 0 }}>
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 640px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              <span className={`absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 text-sm font-medium transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}>{s.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
