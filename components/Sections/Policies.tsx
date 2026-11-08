"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { policies } from "@/lib/akora-data";

export function Policies() {
  return (
    <section id="policies" className="scroll-mt-20 bg-blush py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow text-primary">Before you book</p>
          <h2 className="mt-3 text-4xl font-light leading-tight sm:text-6xl">A few <em>gentle</em> policies.</h2>
          <p className="mt-6 max-w-sm text-muted-foreground">So every appointment feels relaxed — for you and for the next client.</p>
        </div>
        <Accordion type="single" collapsible defaultValue={policies[0].title}>
          {policies.map((p) => (
            <AccordionItem key={p.title} value={p.title} className="border-wine/20">
              <AccordionTrigger className="group py-6 text-base font-normal hover:no-underline [&>svg]:hidden">
                <span className="font-display text-2xl sm:text-3xl">{p.title}</span>
                <span aria-hidden className="text-2xl text-primary transition-transform duration-300 group-data-[state=open]:rotate-45">+</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0 text-lg text-muted-foreground">{p.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
