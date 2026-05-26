"use client";

import { useState, useEffect } from "react";

/* ── Phone state types ── */
type PhoneState = 0 | 1 | 2 | 3;

/* ── Icon components ── */
function GaugeIcon() {
  return (
    <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12 16.5 7.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ── Phone content states ── */

function StateVorher() {
  return (
    <div className="flex flex-col h-full">
      {/* Bad header */}
      <div className="bg-red-600 px-3 py-2">
        <div className="h-2 w-28 bg-red-400 rounded mb-1" />
        <div className="flex gap-1">
          {[20, 16, 24, 18].map((w, i) => (
            <div key={i} className="h-1.5 rounded" style={{ width: `${w}px`, backgroundColor: "rgba(255,255,255,0.4)" }} />
          ))}
        </div>
      </div>
      {/* Cluttered body */}
      <div className="flex-1 bg-white p-2 space-y-1.5 overflow-hidden">
        <div className="text-[7px] font-bold text-gray-800 leading-tight">WILLKOMMEN AUF UNSERER WEBSITE! HIER FINDEN SIE ALLE UNSERE PRODUKTE UND DIENSTLEISTUNGEN</div>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="flex-1 h-8 rounded bg-gray-100 border border-gray-300" />
          ))}
        </div>
        <div className="space-y-0.5">
          {[100, 85, 90, 70, 95].map((w, i) => (
            <div key={i} className="h-1 bg-gray-200 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex gap-1">
          <div className="h-5 flex-1 rounded bg-gray-300 text-[5px] flex items-center justify-center text-gray-500">Mehr Info</div>
          <div className="h-5 flex-1 rounded bg-gray-200 text-[5px] flex items-center justify-center text-gray-500">Weiter</div>
          <div className="h-5 flex-1 rounded border border-gray-300 text-[5px] flex items-center justify-center text-gray-500">Kontakt</div>
        </div>
        <div className="h-12 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center">
          <span className="text-[6px] text-gray-400">Banner 728x90</span>
        </div>
        <div className="text-[5px] text-gray-400 leading-loose">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.
        </div>
      </div>
      {/* Label overlay */}
      <div className="bg-red-50 border-t border-red-200 px-2 py-1 text-center">
        <span className="text-[8px] font-bold text-red-600 uppercase tracking-wide">Schlechte UX — Vorher</span>
      </div>
    </div>
  );
}

function StateCoreWebVitals() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-[#1A1A1A] px-3 py-2 text-center">
        <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Core Web Vitals</span>
      </div>
      <div className="flex-1 p-3 space-y-3">
        {/* Score card */}
        <div className="rounded-lg border border-border bg-offwhite p-2 text-center">
          <div className="text-[7px] text-muted uppercase tracking-widest mb-1">Performance Score</div>
          <div className="relative h-12 w-12 mx-auto">
            <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
              <circle cx="22" cy="22" r="18" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="#22c55e" strokeWidth="4"
                strokeDasharray={`${0.94 * 113} 113`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] font-bold text-green-600">94</span>
            </div>
          </div>
        </div>

        {/* Metric rows */}
        {[
          { name: "LCP", prev: "4.8s", next: "1.9s", color: "text-green-600", barColor: "bg-green-500", pct: 90 },
          { name: "FID", prev: "180ms", next: "12ms", color: "text-green-600", barColor: "bg-green-500", pct: 95 },
          { name: "CLS", prev: "0.42", next: "0.04", color: "text-green-600", barColor: "bg-green-500", pct: 88 },
          { name: "TTFB", prev: "1.2s", next: "0.3s", color: "text-blue-600", barColor: "bg-blue-400", pct: 80 },
        ].map(metric => (
          <div key={metric.name} className="flex items-center gap-2">
            <div className="w-7 text-[7px] font-bold text-dark shrink-0">{metric.name}</div>
            <div className="flex-1 relative h-1.5 bg-gray-100 rounded-full">
              <div
                className={`absolute left-0 h-full rounded-full ${metric.barColor}`}
                style={{ width: `${metric.pct}%`, transition: "width 1s ease" }}
              />
            </div>
            <div className="text-[6px] text-gray-400 line-through shrink-0">{metric.prev}</div>
            <div className={`text-[7px] font-bold shrink-0 ${metric.color}`}>{metric.next}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StateNachher() {
  return (
    <div className="flex flex-col h-full">
      {/* Clean header */}
      <div className="bg-[#1A1A1A] px-3 py-2.5 flex items-center justify-between">
        <div className="h-2 w-16 bg-white/80 rounded" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-1.5 w-8 rounded bg-white/30" />
          ))}
        </div>
      </div>
      {/* Clean hero */}
      <div className="bg-gradient-to-br from-primary/10 to-orange-50 px-3 py-4 text-center">
        <div className="text-[10px] font-bold text-dark leading-tight mb-1">SEO Agentur<br />Mannheim</div>
        <div className="h-1 w-24 bg-gray-200 rounded mx-auto mb-2" />
        <div className="h-1 w-20 bg-gray-200 rounded mx-auto mb-3" />
        {/* CTA button */}
        <div className="inline-flex items-center bg-[#C2722A] rounded-full px-3 py-1 gap-1">
          <span className="text-[7px] font-bold text-white">Kostenlos beraten lassen</span>
        </div>
      </div>
      {/* Clean cards */}
      <div className="flex-1 bg-white px-2 py-2 space-y-1.5">
        <div className="flex gap-1.5">
          {[
            { label: "+187%", sub: "Traffic", bg: "bg-green-50", text: "text-green-700" },
            { label: "342", sub: "Keywords", bg: "bg-blue-50", text: "text-blue-700" },
            { label: "4.9★", sub: "Rating", bg: "bg-amber-50", text: "text-amber-700" },
          ].map(card => (
            <div key={card.label} className={`flex-1 rounded-lg ${card.bg} p-1.5 text-center`}>
              <div className={`text-[9px] font-bold ${card.text}`}>{card.label}</div>
              <div className="text-[6px] text-gray-500">{card.sub}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {[80, 65, 75].map((w, i) => (
            <div key={i} className="h-1 bg-gray-100 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex gap-1 pt-1">
          <div className="flex-1 h-6 rounded-full bg-[#C2722A] flex items-center justify-center">
            <span className="text-[6px] font-bold text-white">Jetzt Kontakt aufnehmen</span>
          </div>
        </div>
      </div>
      {/* Label */}
      <div className="bg-green-50 border-t border-green-200 px-2 py-1 text-center">
        <span className="text-[8px] font-bold text-green-700 uppercase tracking-wide">Nach Redesign</span>
      </div>
    </div>
  );
}

function StateErgebnis() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-[#1A1A1A] px-3 py-2 text-center">
        <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Ergebnis</span>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3">
        {/* Big result */}
        <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-3 text-center">
          <div className="text-[8px] text-green-600 font-semibold uppercase tracking-wider mb-0.5">Conversion Rate</div>
          <div className="text-2xl font-bold text-green-700">+68%</div>
          <div className="text-[7px] text-green-600/70">nach 90 Tagen</div>
        </div>

        {/* Bar chart */}
        <div className="flex-1">
          <div className="text-[7px] text-muted uppercase tracking-widest mb-2">Monatliche Conversions</div>
          <div className="flex items-end gap-1 h-16">
            {[
              { h: 35, label: "Vor", color: "bg-gray-300" },
              { h: 38, label: "", color: "bg-gray-300" },
              { h: 42, label: "", color: "bg-gray-300" },
              { h: 48, label: "Redesign", color: "bg-orange-200" },
              { h: 56, label: "", color: "bg-orange-300" },
              { h: 65, label: "", color: "bg-orange-400" },
              { h: 75, label: "", color: "bg-primary/70" },
              { h: 88, label: "Heute", color: "bg-primary" },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
                <div
                  className={`w-full rounded-t-sm ${bar.color}`}
                  style={{ height: `${bar.h}%`, transition: `height 0.8s ease ${i * 0.08}s` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mini stats row */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Absprungrate", val: "-42%", color: "text-green-600" },
            { label: "Verweildauer", val: "+2.4×", color: "text-green-600" },
          ].map(s => (
            <div key={s.label} className="rounded-lg bg-gray-50 border border-gray-100 p-1.5 text-center">
              <div className={`text-[9px] font-bold ${s.color}`}>{s.val}</div>
              <div className="text-[6px] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const STATES: { label: string; content: React.FC }[] = [
  { label: "Vorher: Schlechte UX", content: StateVorher },
  { label: "Core Web Vitals", content: StateCoreWebVitals },
  { label: "Nach Redesign", content: StateNachher },
  { label: "Ergebnis: +68% Conversions", content: StateErgebnis },
];

/* ── Main component ── */
export default function UXUISection() {
  const [activeState, setActiveState] = useState<PhoneState>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveState(prev => ((prev + 1) % 4) as PhoneState);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const ActiveContent = STATES[activeState].content;

  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* ── Left text side ── */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              UX · UI · Performance
            </p>
            <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] mb-4 leading-[1.08]">
              Design, das rankt<br />und konvertiert
            </h2>
            <p className="text-base leading-relaxed text-muted mb-8 max-w-lg">
              Google bewertet Nutzererfahrung direkt als Ranking-Faktor. Core Web Vitals, Ladezeit, mobile
              Nutzbarkeit — was gut aussieht, wird auch besser gefunden. Wir optimieren Interface und
              Performance gleichzeitig.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {[
                { Icon: GaugeIcon, label: "Core Web Vitals Optimierung" },
                { Icon: SmartphoneIcon, label: "Mobile-First Design" },
                { Icon: CursorIcon, label: "Conversion-optimierte Layouts" },
                { Icon: EyeIcon, label: "UX/UI Audit & Redesign" },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08]">
                    <Icon />
                  </div>
                  <span className="text-sm font-medium text-dark">{label}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/webdesign/app-design"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Zum App Design
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* ── Right animated side ── */}
          <div className="flex flex-col items-center gap-8">
            {/* State indicator tabs */}
            <div className="flex gap-2 flex-wrap justify-center">
              {STATES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveState(i as PhoneState)}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    activeState === i
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-muted border-border hover:border-primary/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Phone mockup */}
            <div className="relative">
              {/* Phone frame */}
              <div className="relative mx-auto w-[200px]">
                {/* Outer shell */}
                <div className="relative rounded-[28px] bg-[#1A1A1A] p-[3px] shadow-2xl shadow-dark/20">
                  {/* Side buttons */}
                  <div className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-l-sm bg-[#333]" />
                  <div className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l-sm bg-[#333]" />
                  <div className="absolute -right-[3px] top-20 h-14 w-[3px] rounded-r-sm bg-[#333]" />

                  <div className="rounded-[25px] bg-white overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between bg-[#1A1A1A] px-4 py-1.5">
                      <span className="text-[8px] font-semibold text-white/80">9:41</span>
                      <div className="flex items-center gap-1">
                        {/* Signal bars */}
                        <div className="flex items-end gap-[2px]">
                          {[3, 5, 7].map((h, i) => (
                            <div key={i} className="w-[2px] bg-white/80 rounded-sm" style={{ height: `${h}px` }} />
                          ))}
                        </div>
                        {/* Battery */}
                        <div className="flex items-center gap-0.5">
                          <div className="h-[7px] w-[11px] rounded-[2px] border border-white/70 relative">
                            <div className="absolute inset-[1px] right-[2px] rounded-[1px] bg-white/70" style={{ right: "2px" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Screen content */}
                    <div
                      className="relative overflow-hidden bg-white"
                      style={{ height: "340px" }}
                    >
                      <div
                        key={activeState}
                        className="absolute inset-0"
                        style={{
                          opacity: 1,
                          transform: "translateY(0)",
                          animation: "uxui-fadein 0.4s ease forwards"
                        }}
                      >
                        <ActiveContent />
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="flex justify-center bg-white py-2">
                      <div className="h-1 w-16 rounded-full bg-dark/20" />
                    </div>
                  </div>
                </div>

                {/* Reflection highlight */}
                <div
                  className="absolute inset-x-3 top-3 h-1/3 rounded-t-[22px] pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)" }}
                />
              </div>
            </div>

            {/* Metric chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "LCP < 2.5s ✓",
                "CLS < 0.1 ✓",
                "Conversion +68% ✓",
              ].map(chip => (
                <span
                  key={chip}
                  className="bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* CSS animation keyframes */}
      <style jsx>{`
        @keyframes uxui-fadein {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
