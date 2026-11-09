"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatRs, nailArt, services } from "@/lib/akora-data";
import { SectionHead } from "./SectionHead";

export function Menu() {
  const groups = useMemo(() => [...new Set(services.map((s) => s.group))], []);
  return (
    <section id="menu" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 sm:py-32">
      <SectionHead n="01" eyebrow="Service menu" title={<>Every service, <em>clearly priced.</em></>} />
      <Tabs defaultValue={groups[0]} className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <TabsList aria-label="Service groups" className="h-auto w-full flex-row items-stretch justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 pb-2 lg:flex-col lg:overflow-visible">
          {groups.map((g, i) => (
            <TabsTrigger key={g} value={g}
              className="group shrink-0 items-baseline justify-start gap-4 rounded-full bg-muted px-5 py-3 text-left text-base font-normal shadow-none transition hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none lg:rounded-none lg:border-b lg:bg-transparent lg:px-0 lg:py-4 lg:data-[state=active]:bg-transparent lg:data-[state=active]:text-primary">
              <span className="hidden font-display text-sm lg:inline">0{i + 1}</span>
              <span className="font-display text-lg lg:text-3xl lg:font-light lg:transition-transform lg:group-hover:translate-x-2">{g}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((g) => (
          <TabsContent key={g} value={g} className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {services.filter((s) => s.group === g).map((s) => (
              <div key={s.id} className="border-b border-border py-6">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-xl font-normal sm:text-2xl">{s.name}</h3>
                  <span className="dotted-leader" />
                  <span className="shrink-0 whitespace-nowrap font-display text-xl text-primary sm:text-2xl">{formatRs(s.price)}</span>
                </div>
                {s.detail && <p className="mt-2 max-w-md text-muted-foreground">{s.detail}</p>}
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-24 rounded-[2rem] bg-wine p-8 text-wine-foreground sm:p-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-4xl font-light sm:text-5xl">Nail art <em className="text-gold">· per nail</em></h3>
          <p className="max-w-xs text-sm opacity-75">“Upwards” prices depend on detail. Detailed charm work may be charged.</p>
        </div>
        <ul className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {nailArt.map((a) => (
            <li key={a.id} className="group flex items-baseline gap-3 border-b border-wine-foreground/15 py-4">
              <span className="transition-transform group-hover:translate-x-1">{a.name}</span>
              <span className="flex-1" />
              <span className="shrink-0 whitespace-nowrap font-display text-gold">{a.price === 0 ? "Complimentary ♡" : `${formatRs(a.price)}${a.upwards ? "+" : ""}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
