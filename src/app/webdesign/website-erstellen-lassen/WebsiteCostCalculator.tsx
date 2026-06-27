"use client";
import { useState } from "react";

const types = [
  {
    id: "business",
    label: "Unternehmenswebsite",
    price: "ab 2.500 €",
    timeline: "4–6 Wochen",
    features: ["Custom UI/UX Design", "SEO-Setup inklusive", "CMS für eigenständige Pflege", "Core Web Vitals optimiert"],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    price: "ab 5.500 €",
    timeline: "8–12 Wochen",
    features: ["WooCommerce oder Shopify", "Produktimport & Kategorien", "Zahlungsanbindung", "Shop-SEO & Strukturdaten"],
  },
  {
    id: "landing",
    label: "Landing Page",
    price: "ab 1.500 €",
    timeline: "2–3 Wochen",
    features: ["Conversion-fokussiertes Design", "A/B-Test-ready", "Tracking-Setup (GA4, Ads)", "CRO-Optimierung"],
  },
  {
    id: "portfolio",
    label: "Portfolio / Agentur",
    price: "ab 3.200 €",
    timeline: "4–6 Wochen",
    features: ["Scroll-Animationen", "Case Study Seiten", "Kontaktformular", "SEO-optimierte Texte"],
  },
];

export default function WebsiteCostCalculator() {
  const [selected, setSelected] = useState("business");
  const active = types.find((t) => t.id === selected)!;

  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden h-full">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Kostenrechner</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          Was kostet deine Website?
        </h3>
      </div>

      {/* Type tabs */}
      <div className="px-7 pt-5 grid grid-cols-2 gap-2">
        {types.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`rounded-xl px-3 py-2.5 text-sm font-medium text-left transition-all duration-200 border ${
              selected === t.id
                ? "border-primary bg-primary/8 text-primary"
                : "border-border text-muted hover:border-primary/30 hover:text-dark"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="px-7 py-5">
        <div className="rounded-xl bg-offwhite border border-border p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted mb-1">Investition</p>
              <p className="text-3xl font-bold text-dark">{active.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted mb-1">Timeline</p>
              <p className="text-lg font-semibold text-dark">{active.timeline}</p>
            </div>
          </div>
        </div>

        <ul className="space-y-2.5">
          {active.features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-dark">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer note */}
      <div className="px-7 pb-6">
        <p className="text-xs text-muted border-t border-border pt-4">
          Festpreis — transparent, keine versteckten Kosten. SEO-Setup immer inklusive.
        </p>
      </div>
    </div>
  );
}
