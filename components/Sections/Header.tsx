"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [["Menu", "#menu"], ["Gallery", "#gallery"], ["Shop", "#shop"], ["Policies", "#policies"]];

// The background layer and the logo are revealed by the StoryScroll timeline once the
// giant hero "Akora" has flown into the logo's position (see StoryScroll.tsx).
export function Header() {
  return (
    <header id="site-header" className="fixed inset-x-0 top-0 z-50">
      <div id="site-header-bg" aria-hidden className="absolute inset-0 bg-background/90 shadow-sm backdrop-blur" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Main">
        <a id="nav-logo" href="#top" className="font-display text-2xl italic tracking-tight">Akora<span className="text-primary">.</span></a>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map(([l, h]) => (
            <li key={h}><a href={h} className="group relative py-1">{l}<span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100" /></a></li>
          ))}
          <li>
            <Button asChild className="h-auto rounded-full px-5 py-2.5 font-semibold shadow-none hover:bg-primary hover:opacity-90">
              <a href="#book">Book</a>
            </Button>
          </li>
        </ul>
        <Sheet>
          <SheetTrigger className="eyebrow md:hidden">Menu</SheetTrigger>
          <SheetContent side="top" className="border-b px-6 pb-6 pt-16 md:hidden">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Jump to a section of the page</SheetDescription>
            <ul>
              {[...links, ["Book", "#book"]].map(([l, h]) => (
                <li key={h}>
                  <SheetClose asChild>
                    <a href={h} className="block py-3 font-display text-2xl">{l}</a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
