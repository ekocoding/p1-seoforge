"use client";

import { useState } from "react";

/* ─── Anatomie-Explorer — 6 Conversion-Prinzipien an einer CSS-Skizze ───────
   Ein useState<number>, bidirektional: Prinzip-Buttons UND Hotspots auf den
   Wireframe-Zonen setzen denselben State. Das Wireframe wird nie re-mountet —
   Zonenwechsel nur über Farb-/Opacity-Transitions; nur der Erklärblock
   re-mountet mit key={active}. Keine Zahlen, keine Fake-Metriken.           */

const PRINZIPIEN = [
  {
    t: "Message Match",
    kurz: "Headline = Anzeigen-Versprechen",
    d: "Die Headline der Landing Page muss exakt das Versprechen der Anzeige aufgreifen, über die der Besucher gekommen ist. Weicht der Text spürbar ab, steigt die Absprungrate — Besucher prüfen in Sekunden, ob sie richtig sind.",
    wirkt: "Wer sich sofort wiederfindet, bleibt — und liest weiter.",
  },
  {
    t: "Ein Ziel, ein CTA",
    kurz: "Keine Navigation, keine Ablenkung",
    d: "Eine Landing Page verzichtet bewusst auf Hauptnavigation und weiterführende Links. Jeder Button und jeder Textblock führt zur selben Handlung — Kauf, Anfrage oder Termin — statt Besucher zwischen Optionen entscheiden zu lassen.",
    wirkt: "Eine Entscheidung ist leichter als fünf.",
  },
  {
    t: "Social Proof am Zweifelpunkt",
    kurz: "Vertrauen genau dort, wo Skepsis entsteht",
    d: "Bewertungen, Kundenlogos oder kurze Referenzen platzieren wir gezielt an den Stellen, an denen typischerweise Zweifel aufkommen — meist kurz vor dem Formular oder dem Kaufbutton.",
    wirkt: "Fremde Stimmen überzeugen dort, wo eigene Worte nicht mehr reichen.",
  },
  {
    t: "Formular so kurz wie möglich",
    kurz: "Nur abfragen, was wirklich nötig ist",
    d: "Jedes zusätzliche Formularfeld kostet Conversion. Wir fragen nur ab, was für den nächsten Schritt tatsächlich nötig ist — alles Weitere klärt das persönliche Gespräch.",
    wirkt: "Weniger Felder, weniger Hürden, mehr Anfragen.",
  },
  {
    t: "Ladezeit unter 2 Sekunden",
    kurz: "Custom Code statt Pagebuilder-Ballast",
    d: "Custom Code ohne Pagebuilder-Ballast macht eine Ladezeit unter 2 Sekunden erreichbar. Gerade bei mobilem Traffic aus Ads-Kampagnen wirkt sich jede Sekunde Verzögerung direkt auf die Conversion aus.",
    wirkt: "Schnelle Seiten halten Besucher, die Geld gekostet haben.",
  },
  {
    t: "Tracking ab Tag 1",
    kurz: "GA4, Ads-Conversion & Meta Pixel ab Klick eins",
    d: "Ohne sauberes Tracking lässt sich keine Landing Page seriös optimieren. Wir richten GA4, Google-Ads-Conversion-Tracking und Meta Pixel direkt beim Launch ein — belastbare Daten vom ersten Klick an.",
    wirkt: "Nur was gemessen wird, lässt sich gezielt verbessern.",
  },
];

function Hotspot({ n, active, onSelect }: { n: number; active: boolean; onSelect: (i: number) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(n)}
      aria-label={`Prinzip ${n + 1} anzeigen`}
      className="absolute -top-2.5 -right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white shadow-md transition-transform duration-300 hover:scale-110 cursor-pointer"
      style={{ background: active ? "linear-gradient(135deg, #C2722A, #D4A853)" : "#C2722A" }}
    >
      0{n + 1}
    </button>
  );
}

function Zone({
  n, active, onSelect, label, className, children,
}: {
  n: number; active: number; onSelect: (i: number) => void; label: string; className?: string; children: React.ReactNode;
}) {
  const on = active === n;
  const dimmed = !on;
  return (
    <div
      className={`relative rounded-xl border p-3 transition-[background,opacity,border-color] duration-300 ${className ?? ""}`}
      style={{
        background: on ? "#fbf4ea" : "#F8F5F1",
        borderColor: on ? "#ecd3ba" : "var(--color-border)",
        opacity: dimmed ? 0.45 : 1,
      }}
    >
      {on && (
        <span className="absolute top-0 left-3 right-3 h-[2.5px] rounded-b" style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }} aria-hidden="true" />
      )}
      <Hotspot n={n} active={on} onSelect={onSelect} />
      {on && (
        <span className="absolute -bottom-2 left-3 rounded-full bg-white border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-dark/60">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

const Bar = ({ w, h = "h-2" }: { w: string; h?: string }) => (
  <div className={`${h} ${w} rounded-full`} style={{ background: "#dcd7d0" }} />
);

export default function AnatomieExplorer() {
  const [active, setActive] = useState(0);
  const p = PRINZIPIEN[active];

  return (
    <div className="grid lg:grid-cols-[minmax(0,400px)_1fr] gap-6 lg:gap-10 items-stretch">
      {/* Prinzip-Buttons — Desktop vertikal */}
      <div className="hidden lg:flex flex-col gap-3">
        {PRINZIPIEN.map((pr, i) => {
          const on = active === i;
          return (
            <button
              key={pr.t}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="flex-1 w-full text-left rounded-2xl border p-5 transition-all duration-300 cursor-pointer"
              style={{
                background: on ? "#fff" : "transparent",
                borderColor: on ? "#d99a57" : "var(--color-border)",
                boxShadow: on ? "0 18px 44px -20px rgba(194,114,42,0.25)" : "none",
              }}
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[11px] font-bold pt-1" style={{ color: on ? "#C2722A" : "rgba(26,26,26,0.3)" }}>
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-dark leading-snug">{pr.t}</div>
                  <div className="text-[13px] text-muted mt-0.5">{pr.kurz}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Prinzip-Pills — Mobil horizontal scrollbar */}
      <div className="lg:hidden -mx-1 flex gap-2 overflow-x-auto pb-1 px-1">
        {PRINZIPIEN.map((pr, i) => {
          const on = active === i;
          return (
            <button
              key={pr.t}
              type="button"
              onClick={() => setActive(i)}
              className="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all cursor-pointer"
              style={{
                background: on ? "#fff" : "transparent",
                borderColor: on ? "#d99a57" : "var(--color-border)",
                color: on ? "#C2722A" : "rgba(26,26,26,0.6)",
              }}
            >
              0{i + 1} · {pr.t}
            </button>
          );
        })}
      </div>

      {/* App-Panel: CSS-Wireframe + Erklärblock */}
      <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
          <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
          <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45">Anatomie — Landingpage-Schema</span>
        </div>

        <div className="grid md:grid-cols-[minmax(0,300px)_1fr] gap-6 p-6 lg:p-8">
          {/* Wireframe (wird nie re-mountet) */}
          <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-border bg-white p-3 space-y-3">
            {/* 05 — Speed: schlanke Chrome-Leiste */}
            <Zone n={4} active={active} onSelect={setActive} label="Schlanker Code">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: "#dcd7d0" }} />
                <span className="h-2 w-2 rounded-full" style={{ background: "#dcd7d0" }} />
                <span className="h-2 w-2 rounded-full" style={{ background: "#dcd7d0" }} />
                <div className="ml-2 h-2 flex-1 rounded-full" style={{ background: "#dcd7d0" }} />
              </div>
            </Zone>
            {/* 01 — Headline */}
            <Zone n={0} active={active} onSelect={setActive} label="Headline">
              <div className="space-y-1.5">
                <Bar w="w-4/5" h="h-3" />
                <Bar w="w-3/5" h="h-3" />
              </div>
            </Zone>
            {/* 02 — CTA */}
            <Zone n={1} active={active} onSelect={setActive} label="Der eine CTA">
              <div className="h-7 w-2/3 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }} />
            </Zone>
            {/* Benefit-Trio (neutral, kein Hotspot) */}
            <div className="rounded-xl border border-border p-3 transition-opacity duration-300" style={{ background: "#F8F5F1", opacity: 0.45 }}>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1"><Bar w="w-full" /><Bar w="w-2/3" /></div>
                <div className="space-y-1"><Bar w="w-full" /><Bar w="w-2/3" /></div>
                <div className="space-y-1"><Bar w="w-full" /><Bar w="w-2/3" /></div>
              </div>
            </div>
            {/* 03 — Social Proof */}
            <Zone n={2} active={active} onSelect={setActive} label="Social Proof">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full shrink-0" style={{ background: "#dcd7d0" }} />
                <div className="flex-1 space-y-1"><Bar w="w-full" /><Bar w="w-1/2" /></div>
              </div>
            </Zone>
            {/* 04 — Formular */}
            <Zone n={3} active={active} onSelect={setActive} label="Kurzes Formular">
              <div className="space-y-1.5">
                <div className="h-5 w-full rounded-md border border-border bg-white" />
                <div className="h-5 w-full rounded-md border border-border bg-white" />
                <div className="h-6 w-full rounded-full" style={{ background: "#C2722A" }} />
              </div>
            </Zone>
            {/* 06 — Tracking */}
            <Zone n={5} active={active} onSelect={setActive} label="Tracking">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full" style={{ background: "#C2722A", opacity: 0.35 + d * 0.2 }} />
                  ))}
                </div>
                <Bar w="w-1/3" h="h-1.5" />
              </div>
            </Zone>
          </div>

          {/* Erklärblock (re-mountet mit key) */}
          <div key={active} className="min-w-0 self-center">
            <div className="ae-in flex items-center gap-3 mb-3" style={{ animationDelay: "120ms" }}>
              <span className="font-[family-name:var(--font-heading)] font-black leading-none text-4xl" style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                0{active + 1}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark leading-tight">{p.t}</h3>
            </div>
            <p className="ae-in text-sm lg:text-[15px] text-muted leading-relaxed mb-4" style={{ animationDelay: "210ms" }}>{p.d}</p>
            <p className="ae-in flex items-start gap-2.5 text-sm text-dark font-medium" style={{ animationDelay: "300ms" }}>
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </span>
              {p.wirkt}
            </p>
          </div>
        </div>

        <style>{`
          @keyframes aeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ae-in { animation: aeIn 0.4s ease both; }
          @media (prefers-reduced-motion: reduce), (scripting: none) { .ae-in { animation: none; opacity: 1; transform: none; } }
        `}</style>
      </div>
    </div>
  );
}
