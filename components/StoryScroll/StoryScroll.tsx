"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bottle from "@/assets/bottle.png";
import chrome from "@/assets/nails-chrome.jpg";
import cateye from "@/assets/nails-cateye.jpg";
import tips from "@/assets/nails-tips.jpg";
import { Button } from "@/components/ui/button";
import { formatRs, services } from "@/lib/akora-data";

const mani = services.filter((s) => s.group === "Manicure");
const enh = [
  { name: "Gel X", from: 4000 },
  { name: "Gel / Polygel", from: 4500 },
  { name: "Acrylic", from: 5000 },
];
const artWords = ["Chrome", "Cat Eye", "Blooming Gel", "Marble", "Ombré", "Foil", "3D Art", "French"];

export function StoryScroll() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1024px)",
        tablet: "(min-width: 640px) and (max-width: 1023px)",
        mobile: "(max-width: 639px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { desktop, tablet, mobile, reduce } = ctx.conditions as Record<string, boolean>;
        const m = desktop ? 1 : tablet ? 0.7 : 0.45; // motion amplitude
        const q = gsap.utils.selector(el);
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: reduce ? true : 0.8, invalidateOnRefresh: true },
        });
        const T = (v: number) => (reduce ? 0 : v); // transforms disabled for reduced motion

        // The navbar logo + header backdrop appear only once the hero wordmark has landed on them.
        const logo = document.getElementById("nav-logo");
        const giant = q(".s1 .giant")[0] as HTMLElement | undefined;
        const stage = el.firstElementChild as HTMLElement;
        const textRect = (node: Node) => {
          const r = document.createRange();
          r.selectNodeContents(node);
          return r.getBoundingClientRect();
        };
        // Where the wordmark must travel (the hero is centred in the pinned stage, which sits at the viewport top).
        const flight = () => {
          if (!logo?.firstChild || !giant) return { x: 0, y: 0, scale: 1 };
          const to = textRect(logo.firstChild); // the "Akora" text node, without the trailing dot
          return {
            x: to.left + to.width / 2 - stage.clientWidth / 2,
            y: to.top + to.height / 2 - stage.clientHeight / 2,
            scale: to.width / giant.offsetWidth,
          };
        };

        // initial states
        gsap.set(q(".scene"), { autoAlpha: 0 });
        gsap.set(q(".s1"), { autoAlpha: 1 });
        gsap.set(q(".bg-blush, .bg-wine"), { autoAlpha: 0 });
        gsap.set("#nav-logo, #site-header-bg", { autoAlpha: 0 });

        // Scene 1 -> 2 : bottle drifts right & tilts, "Akora" flies up into the navbar logo
        // (on phones the bottle shrinks into the gap above the text card instead of sitting behind it)
        tl.to(q(".bottle"), { xPercent: T(mobile ? 30 : 55 * m), yPercent: T(mobile ? -46 : 0), rotate: T(-12), scale: mobile ? 0.6 : 0.92, duration: 1 }, 0)
          .to(q(".s1 .giant"), { x: () => T(flight().x), y: () => T(flight().y), scale: () => (reduce ? 1 : flight().scale), duration: 0.9, ease: "power3.inOut" }, 0)
          .to(q(".s1 .giant"), { autoAlpha: 0, duration: 0.15, ease: "none" }, 0.85)
          .to("#nav-logo, #site-header-bg", { autoAlpha: 1, duration: 0.15, ease: "none" }, 0.85)
          .to(q(".s1 .intro"), { y: T(-60), autoAlpha: 0, duration: 0.6 }, 0)
          .to(q(".s2"), { autoAlpha: 1, duration: 0.4 }, 0.5)
          .fromTo(q(".s2 .marquee"), { xPercent: T(20) }, { xPercent: T(-35), duration: 2, ease: "none" }, 0.4)
          .from(q(".s2 .item"), { y: T(40), autoAlpha: 0, stagger: 0.12, duration: 0.5 }, 0.8);

        // Scene 2 -> 3 : blush background, bottle swings left, images parallax in
        tl.to(q(".bg-blush"), { autoAlpha: 1, duration: 0.8 }, 1.9)
          .to(q(".s2"), { autoAlpha: 0, duration: 0.5 }, 2)
          .to(q(".bottle"), { xPercent: T(-60 * m), yPercent: T(mobile ? -32 : 0), rotate: T(10), scale: mobile ? 0.55 : 0.8, duration: 1 }, 1.9)
          .to(q(".s3"), { autoAlpha: 1, duration: 0.4 }, 2.3)
          .from(q(".s3 .giant span"), { yPercent: T(110), stagger: 0.08, duration: 0.6 }, 2.3)
          .from(q(".s3 .enh"), { x: T(80), autoAlpha: 0, stagger: 0.15, duration: 0.5 }, 2.6)
          .fromTo(q(".s3 .float-a"), { y: T(300), rotate: T(-8) }, { y: T(-120), rotate: T(-3), duration: 1.6, ease: "none" }, 2.2)
          .fromTo(q(".s3 .float-b"), { y: T(420), rotate: T(6) }, { y: T(-60), rotate: T(2), duration: 1.6, ease: "none" }, 2.3);

        // Scene 3 -> 4 : wine background, bottle grows to hero, outline "ART"
        tl.to(q(".bg-wine"), { autoAlpha: 1, duration: 0.8 }, 3.7)
          .to(q(".s3"), { autoAlpha: 0, duration: 0.5 }, 3.7)
          // (on phones the bottle stays small on the right so the "Art" word stays readable)
          .to(q(".bottle"), { xPercent: T(mobile ? 45 : 0), yPercent: T(mobile ? -30 : 0), rotate: T(22), scale: desktop ? 1.25 : mobile ? 0.55 : 1.05, duration: 1.1 }, 3.7)
          .to(q(".s4"), { autoAlpha: 1, duration: 0.4 }, 4)
          .fromTo(q(".s4 .giant"), { scale: reduce ? 1 : 1.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1 }, 4)
          .from(q(".s4 .word"), { autoAlpha: 0, y: T(30), stagger: 0.08, duration: 0.4 }, 4.3)
          .fromTo(q(".s4 .float-c"), { y: T(260) }, { y: T(-200), duration: 1.6, ease: "none" }, 4);

        // Scene 4 -> 5 : back to cream, bottle settles upright and releases
        tl.to(q(".bg-wine, .bg-blush"), { autoAlpha: 0, duration: 0.8 }, 5.5)
          .to(q(".s4"), { autoAlpha: 0, duration: 0.5 }, 5.5)
          .to(q(".bottle"), { xPercent: 0, rotate: 0, scale: 0.62, yPercent: T(-18), duration: 1 }, 5.5)
          .to(q(".s5"), { autoAlpha: 1, duration: 0.4 }, 5.8)
          .from(q(".s5 .line"), { yPercent: T(100), stagger: 0.12, duration: 0.6 }, 5.8)
          .from(q(".s5 .cta"), { y: T(30), autoAlpha: 0, duration: 0.4 }, 6.3)
          .to(q(".bottle"), { yPercent: T(-80), autoAlpha: 0, duration: 0.7 }, 6.9)
          .to({}, { duration: 0.3 });

        // entrance (time-based, once)
        if (!reduce) gsap.from(q(".bottle-inner"), { y: 160, autoAlpha: 0, scale: 0.85, duration: 1.4, ease: "expo.out", delay: 0.2 });
        // subtle idle float independent of scroll timeline
        if (!reduce) gsap.to(q(".bottle-inner"), { y: -12, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.6 });
      },
    );

    // images finishing late can shift layout; keep trigger positions accurate
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} aria-label="The Akora story" className="relative h-[700vh] sm:h-[800vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* background layers (hidden until GSAP takes over, so nothing flashes on first paint) */}
        <div className="absolute inset-0 bg-background" />
        <div className="bg-blush invisible absolute inset-0 bg-blush opacity-0" />
        <div className="bg-wine invisible absolute inset-0 bg-wine opacity-0" />

        {/* Scene 1 */}
        <div className="scene s1 absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="giant text-giant select-none text-primary/90" aria-label="Akora Nails">Akora</h1>
          <div className="intro absolute bottom-[9vh] z-20 px-6 text-center">
            <p className="eyebrow text-muted-foreground">Nail Technician · Sri Lanka</p>
            <p className="mt-3 font-display text-xl italic sm:text-2xl">Hand-finished nails, one appointment at a time.</p>
            <p className="eyebrow mt-6 animate-pulse text-primary">Scroll to begin ↓</p>
          </div>
        </div>

        {/* Scene 2 – manicures */}
        <div className="scene s2 invisible absolute inset-0 opacity-0">
          <div className="marquee absolute top-[14vh] whitespace-nowrap text-giant text-primary/15">Care · Shape · Shine · Care</div>
          <div className="relative z-20 mx-auto flex h-full max-w-6xl items-end px-6 pb-[10vh] lg:items-center lg:pb-0">
            <div className="max-w-md rounded-2xl sm:bg-background/85 sm:p-6 sm:backdrop-blur-sm lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <p className="eyebrow text-primary">01 — Manicure</p>
              <h2 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">Clean, cared-for hands, <em>always.</em></h2>
              <ul className="mt-6 space-y-3">
                {mani.map((s) => (
                  <li key={s.id} className="item flex items-baseline gap-3">
                    <span className="font-medium">{s.name}</span>
                    <span className="dotted-leader" />
                    <span className="shrink-0 whitespace-nowrap font-display text-primary">{formatRs(s.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scene 3 – enhancements */}
        <div className="scene s3 invisible absolute inset-0 opacity-0">
          <Image src={chrome} alt="Pearl chrome short nails with tiny pearls" sizes="16vw"
            className="float-a absolute left-[4%] top-[12%] hidden h-auto w-[16vw] max-w-56 rounded-xl object-cover shadow-2xl lg:block" />
          <Image src={tips} alt="French tips and blooming gel floral nails" sizes="13vw"
            className="float-b absolute bottom-[8%] left-[22%] hidden h-auto w-[13vw] max-w-48 rounded-xl object-cover shadow-2xl lg:block" />
          <div className="relative z-20 mx-auto flex h-full max-w-6xl flex-col justify-end pb-[8vh] px-6 sm:justify-center sm:pb-0 sm:items-end">
            <h2 className="giant -mx-[0.1em] -mb-[0.2em] overflow-hidden px-[0.1em] pb-[0.2em] text-[clamp(3.5rem,11vw,10rem)] font-light leading-[0.85] tracking-tight text-wine sm:text-right">
              <span className="inline-block">Length,</span><br />
              <span className="inline-block italic">your way.</span>
            </h2>
            <div className="mt-8 grid w-full max-w-md gap-3">
              {enh.map((e) => (
                <div key={e.name} className="enh flex items-baseline justify-between border-b border-wine/20 pb-3">
                  <span className="text-lg">{e.name}</span>
                  <span className="font-display text-wine">from {formatRs(e.from)}</span>
                </div>
              ))}
              <p className="enh text-sm text-muted-foreground">Gel X refills within 2 weeks · refills available for every extension type.</p>
            </div>
          </div>
        </div>

        {/* Scene 4 – nail art */}
        <div className="scene s4 invisible absolute inset-0 text-wine-foreground opacity-0">
          <div className="absolute inset-0 flex items-center justify-start pl-6 sm:justify-center sm:pl-0">
            <span className="giant outline-text text-giant text-[clamp(8rem,34vw,34rem)] text-gold/70">Art</span>
          </div>
          <Image src={cateye} alt="Burgundy cat eye nails with a marble accent" sizes="15vw"
            className="float-c absolute right-[5%] top-[18%] hidden h-auto w-[15vw] max-w-52 rounded-xl object-cover shadow-2xl md:block" />
          <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-[8vh] sm:px-12">
            <p className="eyebrow text-gold">02 — Nail art, priced per nail</p>
            <div className="mt-4 flex max-w-3xl flex-wrap gap-x-5 gap-y-1 font-display text-2xl italic sm:text-4xl">
              {artWords.map((w) => <span key={w} className="word">{w}</span>)}
            </div>
            <p className="word mt-4 text-sm opacity-80">From Rs. 50 per nail · gems, pearls & charms complimentary.</p>
          </div>
        </div>

        {/* Scene 5 – conclusion */}
        <div className="scene s5 invisible absolute inset-0 flex flex-col items-center justify-end pb-[12vh] text-center opacity-0">
          <h2 className="relative z-20 px-6 text-[clamp(2.75rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight">
            <span className="-mx-[0.1em] -mb-[0.2em] block overflow-hidden px-[0.1em] pb-[0.2em]"><span className="line block">Your nails,</span></span>
            <span className="-mx-[0.1em] -mb-[0.2em] block overflow-hidden px-[0.1em] pb-[0.2em]"><span className="line block italic text-primary">your story.</span></span>
          </h2>
          <div className="cta relative z-20 mt-8 flex flex-wrap justify-center gap-3 px-6">
            <Button asChild className="h-auto rounded-full px-7 py-3.5 text-sm font-semibold shadow-none transition hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg">
              <a href="#book">Plan my appointment</a>
            </Button>
            <Button asChild variant="outline" className="h-auto rounded-full border-foreground/30 bg-transparent px-7 py-3.5 text-sm font-semibold shadow-none transition hover:bg-foreground hover:text-background">
              <a href="#menu">View the full menu</a>
            </Button>
          </div>
        </div>

        {/* pinned central visual */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="bottle will-change-transform">
            <Image src={bottle} alt="" aria-hidden priority sizes="(min-width: 640px) 40vw, 60vw"
              className="bottle-inner h-[40svh] w-auto drop-shadow-[0_40px_40px_rgba(60,10,20,0.35)] sm:h-[58svh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
