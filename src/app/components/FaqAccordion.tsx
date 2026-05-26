"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpen?: number | null;
}

export default function FaqAccordion({ items, defaultOpen = null }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-offwhite/50 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-dark">{item.q}</span>
            <svg
              className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-6" : "max-h-0"}`}>
            <p className="px-6 text-muted leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
