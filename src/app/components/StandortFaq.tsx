"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface StandortFaqProps {
  items: FaqItem[];
  defaultOpen?: number | null;
}

export default function StandortFaq({ items, defaultOpen = 0 }: StandortFaqProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <section className="bg-white border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="reveal">
          <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 text-center">
            / FAQ
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-10">
            Häufig gestellte Fragen
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((faq, i) => (
            <div className="reveal" key={i} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="rounded-xl border border-border bg-white overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-offwhite transition-colors"
                >
                  <span className="font-semibold text-dark pr-4">{faq.q}</span>
                  <span className={`shrink-0 h-6 w-6 rounded-full border border-border flex items-center justify-center transition-transform duration-200 ${open === i ? "rotate-45 bg-primary border-primary" : ""}`}>
                    <svg className={`w-3 h-3 ${open === i ? "text-white" : "text-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
