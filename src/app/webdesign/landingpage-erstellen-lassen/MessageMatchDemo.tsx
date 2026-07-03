"use client";

import { useState } from "react";

/* ─── Message-Match-Demo — Anzeige ↔ Landingpage im Side-by-Side ────────────
   Ein useState<number>. Links Startseite (statisch generisch), rechts
   Landingpage, deren Headline + CTA wortnah zur gewählten Anzeige wechseln.
   Keine Prozent-/Conversion-Zahlen — illustrative Demo.                     */

const ADS = [
  {
    badge: "Anzeige · Google",
    ad: "Zahnschmerzen? Heute noch ein Termin in deiner Nähe",
    headline: "Dein Zahnarzt-Termin — heute noch, online gebucht.",
    sub: "Freie Termine in Echtzeit, Bestätigung in Minuten.",
    cta: "Termin sichern",
  },
  {
    badge: "Anzeige · LinkedIn",
    ad: "Projektchaos? Sieh die Software in 15 Minuten live",
    headline: "Sieh die Software live — Demo in 15 Minuten.",
    sub: "Kein Verkaufsgespräch, nur dein Use Case.",
    cta: "Demo buchen",
  },
  {
    badge: "Anzeige · Meta",
    ad: "Bad sanieren zum Festpreis — Angebot in 48 h",
    headline: "Dein Badumbau zum Festpreis — Angebot in 48 Stunden.",
    sub: "Besichtigung, Planung und Preis aus einer Hand.",
    cta: "Festpreis anfragen",
  },
];

function BrowserChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-offwhite/60 px-3 py-2">
      <span className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="h-2 w-2 rounded-full" style={{ background: "#28C840" }} />
      </span>
      <span className="ml-1 flex-1 truncate rounded-md border border-border bg-white px-2 py-0.5 font-mono text-[10px] text-dark/45">
        {label}
      </span>
    </div>
  );
}

const GreyBar = ({ w, h = "h-2.5" }: { w: string; h?: string }) => (
  <div className={`${h} ${w} rounded-full`} style={{ background: "#dcd7d0" }} />
);

export default function MessageMatchDemo() {
  const [ad, setAd] = useState(0);
  const a = ADS[ad];

  return (
    <div className="p-5 lg:p-6">
      {/* Anzeigen-Auswahl */}
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/70">
        Wähle die Anzeige, aus der dein Besucher kommt
      </p>
      <div className="mb-5 grid gap-2 sm:grid-cols-3">
        {ADS.map((x, i) => {
          const on = ad === i;
          return (
            <button
              key={x.badge}
              type="button"
              onClick={() => setAd(i)}
              onMouseEnter={() => setAd(i)}
              className="rounded-xl border p-3 text-left transition-all duration-300 cursor-pointer"
              style={{
                background: on ? "#fff" : "transparent",
                borderColor: on ? "#d99a57" : "var(--color-border)",
                boxShadow: on ? "0 18px 44px -20px rgba(194,114,42,0.25)" : "none",
              }}
            >
              <span className="mb-1 inline-block rounded bg-dark/[0.05] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-dark/50">
                {x.badge}
              </span>
              <span className={`block text-[12px] leading-snug ${on ? "text-dark font-semibold" : "text-muted"}`}>{x.ad}</span>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side: Startseite vs. Landingpage */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Startseite — statisch generisch */}
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <BrowserChrome label="deine-website.de" />
          <div className="p-4">
            <div className="mb-3 flex gap-2">
              <GreyBar w="w-10" h="h-1.5" /><GreyBar w="w-10" h="h-1.5" /><GreyBar w="w-10" h="h-1.5" /><GreyBar w="w-10" h="h-1.5" />
            </div>
            <div className="space-y-2">
              <GreyBar w="w-11/12" h="h-3.5" />
              <GreyBar w="w-2/3" h="h-3.5" />
              <div className="pt-1 space-y-1.5">
                <GreyBar w="w-full" h="h-2" />
                <GreyBar w="w-5/6" h="h-2" />
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-dark/[0.06] px-2.5 py-1">
              <svg className="h-3 w-3 text-dark/35" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
              <span className="text-[11px] font-medium text-dark/55">Botschaft generisch</span>
            </div>
          </div>
        </div>

        {/* Landingpage — passt sich der Anzeige an */}
        <div className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: "#ecd3ba" }}>
          <BrowserChrome label="deine-kampagne.de/angebot" />
          <div key={ad} className="p-4">
            <span className="mm-in mb-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-primary" style={{ animationDelay: "120ms" }}>
              Landingpage
            </span>
            <h4 className="mm-in font-[family-name:var(--font-heading)] text-[15px] font-bold leading-snug text-dark" style={{ animationDelay: "200ms" }}>
              {a.headline}
            </h4>
            <p className="mm-in mt-1 text-[12px] leading-snug text-muted" style={{ animationDelay: "280ms" }}>{a.sub}</p>
            <div className="mm-in mt-3 inline-flex rounded-full px-4 py-1.5 text-[11px] font-semibold text-white" style={{ animationDelay: "360ms", background: "linear-gradient(90deg, #C2722A, #D4A853)" }}>
              {a.cta}
            </div>
            <div className="mm-in mt-3 flex" style={{ animationDelay: "440ms" }}>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "#E9F6EC" }}>
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="#1A7F37">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span className="text-[11px] font-medium" style={{ color: "#1A7F37" }}>Passt zur Anzeige</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mmIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .mm-in { animation: mmIn 0.35s ease both; }
        @media (prefers-reduced-motion: reduce), (scripting: none) { .mm-in { animation: none; opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
