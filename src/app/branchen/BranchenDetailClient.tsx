"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import { FOTO_BAND, KEYWORDS } from "./branchenData";
import type { Branche, FotoBand, KeywordPotenzial, KeywordRow, Signature } from "./branchenData";

/* ─── Scroll-Reveal (IntersectionObserver → .scroll-visible) ──────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.22, rootMargin: "0px 0px -16% 0px" }
    );
    document.querySelectorAll(".scroll-hidden").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const grad: React.CSSProperties = {
  background: "linear-gradient(90deg, #C2722A, #D4A853)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* Hero-Variante: hellerer Gold-Gradient für Kontrast auf dunklem Circuit-Bild */
const gradHero: React.CSSProperties = {
  background: "linear-gradient(92deg, #D98A3F, #D4A853)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const BEIGE = "#F8F5F1";
const TINT = "#fbf4ea";
const TINT_BORDER = "#ecd3ba";
/* Neutraler ✗-Warn-Tint auf Markenbasis (#C2722A mit 10 % Deckung) */
const WARN_BG = "rgba(194,114,42,0.10)";
const WARN_BORDER = "rgba(194,114,42,0.28)";

/* ─── Keyword-Potenzial: Formatierung & KD-Einstufung (Semrush-Daten) ─────── */
const fmtZahl = (n: number) => n.toLocaleString("de-DE");

type KdStufe = { label: string; text: string; bg: string; borderColor: string; bar: string };

/** KD-Farblogik: ≤14 leicht (grün) · 15–29 machbar (gold) · ≥30 umkämpft (primary) */
function kdStufe(kd: number): KdStufe {
  if (kd <= 14) return { label: "leicht", text: "#1A7F37", bg: "#E9F6EC", borderColor: "rgba(26,127,55,0.28)", bar: "#1A7F37" };
  if (kd <= 29) return { label: "machbar", text: "#A67C2E", bg: "#FAF3E3", borderColor: "#EAD9AE", bar: "#D4A853" };
  return { label: "umkämpft", text: "#C2722A", bg: TINT, borderColor: TINT_BORDER, bar: "#C2722A" };
}

/* Copy-Baustein: Anteil der Begriffe unter KD 30 als Satzfragment */
function kdAnteilSatz(rows: KeywordRow[]): string {
  const unter30 = rows.filter((r) => r.kd < 30).length;
  if (unter30 === rows.length) return "alle sechs Begriffe liegen mit Werten unter 30 im gut erreichbaren Bereich";
  if (unter30 === 0) return "keiner der sechs Begriffe liegt unter der 30er-Marke";
  if (unter30 === 1) return "einer der sechs Begriffe liegt mit einem Wert unter 30 im gut erreichbaren Bereich";
  const wort = ["", "", "zwei", "drei", "vier", "fünf"][unter30] ?? String(unter30);
  return `${wort} der sechs Begriffe liegen mit Werten unter 30 im gut erreichbaren Bereich`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Kleine Bausteine für die Mockup-Panels (Spielfeld-Panel-Stil)
═══════════════════════════════════════════════════════════════════════════ */

function Lupe({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function Sterne({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-[2px] text-secondary" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className={className} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.7l2.5 5.1 5.7.8-4.1 4 1 5.6L10 14.6l-5.1 2.6 1-5.6-4.1-4 5.7-.8L10 1.7z" />
        </svg>
      ))}
    </span>
  );
}

function SkeletonZeile({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-2 rounded-full bg-dark/10 ${className}`} style={{ width: w }} aria-hidden="true" />;
}

/* Panel-Rahmen: Mono-Header mit chip-dot links + „Beispiel“-Label rechts */
function PanelShell({ titel, label = "Beispiel", children }: { titel: string; label?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(26,26,26,0.18)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 lg:px-6">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/55">
          <span className="chip-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          {titel}
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/35">{label}</span>
      </div>
      {children}
    </div>
  );
}

/* Toggle-Pills für die Mini-Apps (Spielfeld-Chip-Stil, aria-pressed) */
function TogglePills({
  optionen,
  aktiv,
  onChange,
  className = "",
}: {
  optionen: string[];
  aktiv: number;
  onChange: (i: number) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`} role="group">
      {optionen.map((o, i) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(i)}
          aria-pressed={aktiv === i}
          className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
            aktiv === i
              ? "bg-primary text-white shadow-sm"
              : "border border-border bg-white text-dark/60 hover:border-[#ecd3ba] hover:text-dark"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ✗-Chip im Mono-Stil (fehlende/fehlerhafte Zustände in den Mockups) */
function XChip({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-primary"
      style={{ background: WARN_BG, borderColor: WARN_BORDER }}
    >
      <span aria-hidden="true">✗</span>
      {text}
    </span>
  );
}

/* ✗-Medaillon für die FEHLER-Section */
function FehlerX() {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[13px] font-bold text-primary"
      style={{ background: WARN_BG, borderColor: WARN_BORDER }}
      aria-hidden="true"
    >
      ✗
    </span>
  );
}

/* ─── 01 Ärzte · Lokale-SERP-App: „Ohne SEO / Mit SEO“ ────────────────────── */
function SigSerp({ sig }: { sig: Extract<Signature, { variant: "serp" }> }) {
  const [ansicht, setAnsicht] = useState(1); // 0 = Ohne SEO · 1 = Mit SEO
  const mit = ansicht === 1;

  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="px-5 py-5 lg:px-6">
        <TogglePills optionen={["Ohne SEO", "Mit SEO"]} aktiv={ansicht} onChange={setAnsicht} />

        <div className="mt-4 flex items-center gap-3 rounded-full border border-border bg-white px-4 py-2.5 shadow-sm">
          <Lupe className="h-4 w-4 shrink-0 text-dark/40" />
          <span className="truncate text-sm text-dark">{sig.query}</span>
        </div>

        <div key={ansicht} className="mt-4 overflow-hidden rounded-2xl border border-border">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5" style={{ background: "#FBF8F4" }}>
            <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M19.5 10.5c0 7.1-7.5 11.25-7.5 11.25S4.5 17.6 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/45">Maps-Ergebnisse</span>
          </div>
          <div className="divide-y divide-border">
            {mit
              ? sig.mapsRows.map((r, i) => (
                  <div
                    key={r.name}
                    className="ae-in flex items-center gap-3 px-4 py-3"
                    style={{ animationDelay: `${i * 90}ms`, ...(r.eigene ? { background: TINT } : {}) }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-[13px] font-semibold text-dark">{r.name}</span>
                        {r.eigene && (
                          <span className="rounded-full border bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-primary" style={{ borderColor: TINT_BORDER }}>
                            Ihre Praxis
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <Sterne />
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-dark/55">Website</span>
                  </div>
                ))
              : sig.fremdRows.map((name, i) => (
                  <div key={name} className="ae-in flex items-center gap-3 px-4 py-3" style={{ animationDelay: `${i * 90}ms` }}>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-dark">{name}</span>
                      <div className="mt-1">
                        <Sterne />
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-dark/55">Website</span>
                  </div>
                ))}
          </div>
          {!mit && (
            <div className="ae-in flex items-center gap-2.5 border-t border-border px-4 py-3" style={{ background: "#FBF8F4", animationDelay: "290ms" }}>
              <span className="shrink-0 font-mono text-[11px] text-dark/35" aria-hidden="true">
                ✗
              </span>
              <span className="truncate text-[13px] font-semibold text-dark/40">Ihre Praxis</span>
              <span className="shrink-0 text-[12px] text-dark/35">— nicht im Kartenausschnitt</span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-3">
          {["72%", "58%"].map((w, i) => (
            <div key={i} className="rounded-xl border border-border px-4 py-3">
              <SkeletonZeile w="34%" className="bg-dark/15" />
              <SkeletonZeile w={w} className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

/* ─── 02 Anwälte · Klickpreis-App: Rechtsgebiets-Chips ────────────────────── */
function BarFill({ breite, gedimmt }: { breite: number; gedimmt: boolean }) {
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setGrow(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      if (r2) cancelAnimationFrame(r2);
    };
  }, []);
  return (
    <span className="block h-2 overflow-hidden rounded-full" style={{ background: "#f1ece4" }} aria-hidden="true">
      <span
        className="bar-fill block h-full rounded-full"
        style={{
          width: grow ? `${breite}%` : "0%",
          opacity: gedimmt ? 0.3 : 1,
          background: "linear-gradient(90deg, #C2722A, #D4A853)",
        }}
      />
    </span>
  );
}

function SigKlickpreise({ sig }: { sig: Extract<Signature, { variant: "klickpreise" }> }) {
  const [aktiv, setAktiv] = useState(0);
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="px-5 pt-4 lg:px-6">
        <TogglePills optionen={sig.rows.map((r) => r.gebiet)} aktiv={aktiv} onChange={setAktiv} />
      </div>
      <div className="px-5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40 lg:px-6">{sig.hinweis}</div>
      <div key={aktiv} className="divide-y divide-border border-b border-border">
        {sig.rows.map((r, i) => {
          const istAktiv = i === aktiv;
          return (
            <div key={r.gebiet} className="ae-in" style={{ animationDelay: `${i * 70}ms` }}>
              <div
                className="grid grid-cols-[104px_1fr_auto] items-center gap-3 px-5 py-3.5 transition-colors duration-300 lg:grid-cols-[124px_1fr_auto] lg:px-6"
                style={istAktiv ? { background: TINT } : undefined}
              >
                <span className={`truncate text-[13px] font-semibold transition-colors duration-300 ${istAktiv ? "text-dark" : "text-dark/40"}`}>
                  {r.gebiet}
                </span>
                <BarFill breite={r.breite} gedimmt={!istAktiv} />
                <span className={`font-mono text-[11px] tracking-[0.08em] transition-colors duration-300 ${istAktiv ? "font-semibold text-primary" : "text-dark/35"}`}>
                  {r.wert}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2.5 px-5 py-4 lg:px-6" style={{ background: TINT }}>
        <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <span className="text-[13px] font-semibold text-dark">{sig.fazit}</span>
        <span className="ml-auto font-mono text-[11px] font-semibold text-primary">{sig.fazitWert}</span>
      </div>
    </PanelShell>
  );
}

/* ─── 03 Online-Shops · Struktur-App: „Vorher / Nach der Bereinigung“ ─────── */
const STATUS_CHIP: Record<string, string> = {
  INDEX: "border-emerald-200 bg-emerald-50 text-emerald-700",
  NOINDEX: "border-border bg-[#F8F5F1] text-dark/45",
  CANONICAL: "border-[#ecd3ba] bg-[#fbf4ea] text-primary",
};
const STATUS_TEXT: Record<string, string> = { INDEX: "Index", NOINDEX: "Noindex", CANONICAL: "Canonical →" };

function SigStrukturbaum({ sig }: { sig: Extract<Signature, { variant: "strukturbaum" }> }) {
  const [phase, setPhase] = useState(1); // 0 = Vorher · 1 = Nach der Bereinigung
  const nachher = phase === 1;
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="border-b border-border px-5 py-4 lg:px-6">
        <TogglePills optionen={["Vorher", "Nach der Bereinigung"]} aktiv={phase} onChange={setPhase} />
      </div>
      <div key={phase} className="divide-y divide-border">
        {(nachher ? sig.rows : sig.rowsVorher).map((r, i) => (
          <div key={`${r.pfad}-${i}`} className="ae-in flex items-center gap-3 px-5 py-3 lg:px-6" style={{ animationDelay: `${i * 55}ms` }}>
            <span className="flex min-w-0 items-center font-mono text-xs text-dark" style={{ paddingLeft: r.tiefe * 18 }}>
              {r.tiefe > 0 && (
                <span className="mr-1.5 shrink-0 text-dark/30" aria-hidden="true">
                  └
                </span>
              )}
              <span className="truncate">{r.pfad}</span>
            </span>
            {"status" in r ? (
              <span className={`ml-auto shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${STATUS_CHIP[r.status]}`}>
                {STATUS_TEXT[r.status]}
              </span>
            ) : r.ok ? (
              <span className={`ml-auto shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${STATUS_CHIP.INDEX}`}>
                Index
              </span>
            ) : (
              <span className="ml-auto shrink-0">
                <XChip text="Index" />
              </span>
            )}
          </div>
        ))}
        <div key={`fussnote-${phase}`} className="ae-in px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/40 lg:px-6" style={{ animationDelay: "330ms" }}>
          {nachher ? sig.fussnote : sig.fussnoteVorher}
        </div>
      </div>
    </PanelShell>
  );
}

/* ─── 04 Handwerker · Profil-App: „Unvollständig / Gepflegt“ ──────────────── */
function SigBusinessprofil({ sig }: { sig: Extract<Signature, { variant: "businessprofil" }> }) {
  const [tab, setTab] = useState(1); // 0 = Unvollständiges Profil · 1 = Gepflegtes Profil
  const gepflegt = tab === 1;
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="px-5 pt-4 lg:px-6">
        <TogglePills optionen={["Unvollständiges Profil", "Gepflegtes Profil"]} aktiv={tab} onChange={setTab} />
      </div>
      <div key={tab} className="grid gap-4 px-5 py-5 sm:grid-cols-[1.35fr_1fr] lg:px-6">
        {gepflegt ? (
          <>
            <div className="ae-in rounded-2xl border border-border bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-dark">{sig.betrieb}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-dark">{sig.bewertung}</span>
                    <Sterne />
                    <span className="text-[11px] text-dark/45">({sig.anzahl})</span>
                  </div>
                  <p className="mt-1 text-[11px] text-dark/50">
                    {sig.kategorie} · {sig.ort}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {sig.status}
                </span>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {sig.chips.map((c) => (
                  <span key={c} className="rounded-full border px-3 py-1 text-[11px] font-semibold text-primary" style={{ background: TINT, borderColor: TINT_BORDER }}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2.5 border-t border-border pt-3.5">
                {["78%", "56%", "66%"].map((w, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Sterne className="h-2.5 w-2.5" />
                    <SkeletonZeile w={w} />
                  </div>
                ))}
              </div>
            </div>

            <div className="ae-in relative min-h-[190px] overflow-hidden rounded-2xl border border-border" style={{ background: "#FBF8F4", animationDelay: "110ms" }}>
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(26,26,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.05) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: "radial-gradient(circle at 50% 44%, rgba(194,114,42,0.14), transparent 42%)" }}
              />
              <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                <svg className="h-8 w-8 text-primary drop-shadow-[0_6px_10px_rgba(194,114,42,0.35)]" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.35a.75.75 0 0 0 .92 0C17.57 18.35 20.25 14.44 20.25 10.5a8.25 8.25 0 1 0-16.5 0c0 3.94 2.68 7.85 7.79 11.85ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-white px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-dark/45">
                Einsatzgebiet
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="ae-in rounded-2xl border border-border bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-dark/45">{sig.betrieb}</p>
                  <div className="mt-2.5">
                    <SkeletonZeile w="42%" />
                  </div>
                  <div className="mt-2">
                    <SkeletonZeile w="28%" />
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-[#F8F5F1] px-2 py-0.5 text-[10px] font-semibold text-dark/40">
                  Unvollständig
                </span>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                <XChip text="Kategorie fehlt" />
                <XChip text="Öffnungszeiten fehlen" />
              </div>
              <div className="mt-4 space-y-2.5 border-t border-border pt-3.5">
                <SkeletonZeile w="68%" />
                <SkeletonZeile w="46%" />
                <SkeletonZeile w="58%" />
              </div>
            </div>

            <div className="ae-in flex min-h-[190px] flex-col rounded-2xl border border-border p-4" style={{ background: "#FBF8F4", animationDelay: "110ms" }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dark/40">Fotos</span>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-dark/10">
                  <svg className="h-5 w-5 text-dark/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Z" />
                  </svg>
                </div>
                <div className="aspect-[4/3] rounded-lg border border-border bg-white/60" />
                <div className="aspect-[4/3] rounded-lg border border-border bg-white/60" />
                <div className="aspect-[4/3] rounded-lg border border-border bg-white/60" />
              </div>
              <div className="mt-3 self-center">
                <XChip text="Nur 1 Foto" />
              </div>
            </div>
          </>
        )}
      </div>
    </PanelShell>
  );
}

/* ─── 05 Immobilienmakler · Funnel-App: klickbare Zeilen mit Detail ───────── */
function SigFunnel({ sig }: { sig: Extract<Signature, { variant: "funnel" }> }) {
  const initial = Math.max(
    sig.stufen.findIndex((s) => s.highlight),
    0
  );
  const [aktiv, setAktiv] = useState<number>(initial);

  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="divide-y divide-border">
        {sig.stufen.map((s, i) => {
          const open = aktiv === i;
          return (
            <button
              key={s.query}
              type="button"
              onClick={() => setAktiv(open ? -1 : i)}
              aria-expanded={open}
              className={`grid w-full cursor-pointer grid-cols-[52px_1fr_auto] items-start gap-3 px-5 py-5 text-left transition-colors duration-300 lg:px-6 ${
                open ? "" : "hover:bg-[#FBF8F4]"
              }`}
              style={open ? { background: TINT } : undefined}
            >
              <span
                className="select-none font-[family-name:var(--font-heading)] text-[40px] font-black leading-none text-primary/15"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 font-mono text-[11px] text-dark/70">
                  <Lupe className="h-3 w-3 shrink-0 text-dark/35" />
                  <span className="truncate">{s.query}</span>
                </span>
                <p className={`mt-2 text-[13px] leading-relaxed ${open ? "font-semibold text-dark" : "text-muted"}`}>{s.satz}</p>
                <div className="exp-rows grid" style={{ gridTemplateRows: open ? "1fr" : "0fr" }} aria-hidden={!open}>
                  <div className="overflow-hidden">
                    <p
                      key={String(open)}
                      className="ae-in mt-2.5 border-t pt-2.5 text-[13px] leading-relaxed text-muted"
                      style={{ borderColor: open ? TINT_BORDER : "transparent" }}
                    >
                      {s.detail}
                    </p>
                  </div>
                </div>
              </div>
              <svg
                className={`mt-1.5 h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          );
        })}
      </div>
    </PanelShell>
  );
}

/* ─── 06 SaaS · KI-Chat-App: Frage-Chips ──────────────────────────────────── */
const KI_ZEILEN: [string, string, string][] = [
  ["92%", "74%", "60%"],
  ["86%", "70%", "64%"],
  ["94%", "66%", "58%"],
];

function SigKiChat({ sig }: { sig: Extract<Signature, { variant: "kichat" }> }) {
  const [frageIdx, setFrageIdx] = useState(0);
  const frage = sig.fragen[frageIdx] ?? sig.fragen[0];
  const zeilen = KI_ZEILEN[frageIdx % KI_ZEILEN.length];

  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="space-y-4 px-5 py-5 lg:px-6">
        <TogglePills optionen={sig.fragen.map((f) => f.chip)} aktiv={frageIdx} onChange={setFrageIdx} />

        <div key={frageIdx} className="space-y-4">
          <div className="ae-in flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-br-md bg-dark px-4 py-3 text-[13px] leading-relaxed text-white">{frage.frage}</div>
          </div>

          <div className="ae-in rounded-2xl rounded-bl-md border border-border px-4 py-3.5" style={{ background: "#FBF8F4", animationDelay: "140ms" }}>
            <div className="mb-2.5 flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9.813 15.904 9.374 17.5l-.44-1.596a3.375 3.375 0 0 0-2.328-2.328L5.01 13.137l1.596-.44a3.375 3.375 0 0 0 2.328-2.328l.44-1.595.438 1.595a3.375 3.375 0 0 0 2.329 2.329l1.595.438-1.595.44a3.375 3.375 0 0 0-2.329 2.328Z" />
                <path d="M18.259 8.715 18 9.75l-.259-1.035a2.625 2.625 0 0 0-1.91-1.91L14.796 6.55l1.035-.259a2.625 2.625 0 0 0 1.91-1.91L18 3.346l.259 1.035a2.625 2.625 0 0 0 1.91 1.91l1.034.259-1.034.259a2.625 2.625 0 0 0-1.91 1.91Z" />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/45">KI-Antwort</span>
            </div>
            <SkeletonZeile w={zeilen[0]} />
            <SkeletonZeile w={zeilen[1]} className="mt-2" />
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: TINT, borderColor: TINT_BORDER }}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold text-primary">{sig.marke}</span>
            </div>
            <SkeletonZeile w={zeilen[2]} className="mt-3" />
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2.5">
              <span className="font-mono text-[10px] text-dark/45">{sig.quellen}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dark/30">Schematische Darstellung</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-border bg-white px-4 py-2.5">
          <SkeletonZeile w="38%" />
          <svg className="ml-auto h-4 w-4 shrink-0 text-dark/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </div>
      </div>
    </PanelShell>
  );
}

function SignatureModul({ sig }: { sig: Signature }) {
  switch (sig.variant) {
    case "serp":
      return <SigSerp sig={sig} />;
    case "klickpreise":
      return <SigKlickpreise sig={sig} />;
    case "strukturbaum":
      return <SigStrukturbaum sig={sig} />;
    case "businessprofil":
      return <SigBusinessprofil sig={sig} />;
    case "funnel":
      return <SigFunnel sig={sig} />;
    case "kichat":
      return <SigKiChat sig={sig} />;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   VORGEHEN-PLAYER — interaktives Story-Progress-Panel: 4 Segment-Balken mit
   Auto-Advance (4,5 s je Schritt, Loop), Pause bei Hover, 12 s nach Klick und
   bei verstecktem Tab; IO-gated (startet früh beim Reinscrollen); bei
   prefers-reduced-motion kein Auto-Advance — Segmente statisch, nur Klick.
═══════════════════════════════════════════════════════════════════════════ */
const SCHRITT_DAUER_MS = 4500;
const KLICK_PAUSE_MS = 12000;
const TICK_MS = 50;

function VorgehenPlayer({ schritte }: { schritte: { titel: string; text: string }[] }) {
  const [aktiv, setAktiv] = useState(0);
  const [fortschritt, setFortschritt] = useState(0); // 0–1 des aktiven Segments
  const [imViewport, setImViewport] = useState(false);
  const [gehovert, setGehovert] = useState(false);
  const [reduzierteBewegung, setReduzierteBewegung] = useState(false);
  const fortschrittRef = useRef(0);
  const pauseBisRef = useRef(0);
  const panelRef = useRef<HTMLDivElement | null>(null);

  /* prefers-reduced-motion beobachten */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzierteBewegung(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduzierteBewegung(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* IO-Gate: Auto-Advance läuft erst, wenn das Panel im Viewport steht */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setImViewport(e.isIntersecting)),
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Ticker: füllt das aktive Segment über 4,5 s, danach nächster Schritt (Loop);
     sofortiger Erst-Tick — Schritt 1 zeigt ohne Anlaufverzögerung Fortschritt */
  useEffect(() => {
    if (reduzierteBewegung || !imViewport || gehovert) return;
    const tick = () => {
      if (document.hidden || Date.now() < pauseBisRef.current) return;
      const naechster = fortschrittRef.current + TICK_MS / SCHRITT_DAUER_MS;
      if (naechster >= 1) {
        fortschrittRef.current = 0;
        setFortschritt(0);
        setAktiv((a) => (a + 1) % schritte.length);
      } else {
        fortschrittRef.current = naechster;
        setFortschritt(naechster);
      }
    };
    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduzierteBewegung, imViewport, gehovert, schritte.length]);

  /* Manuelle Wahl: Schritt setzen + Auto-Advance für 12 s pausieren */
  const waehleSchritt = (i: number) => {
    pauseBisRef.current = Date.now() + KLICK_PAUSE_MS;
    fortschrittRef.current = 0;
    setFortschritt(0);
    setAktiv(i);
  };

  const schritt = schritte[aktiv] ?? schritte[0];

  return (
    <div
      ref={panelRef}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setGehovert(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setGehovert(false);
      }}
      className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(26,26,26,0.18)]"
    >
      {/* Mono-Header mit Live-Schrittanzeige */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 lg:px-6">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/55">
          <span className="chip-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          So arbeiten wir
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/35">
          Schritt {String(aktiv + 1).padStart(2, "0")} / {String(schritte.length).padStart(2, "0")}
        </span>
      </div>

      <div className="px-5 pb-6 pt-1.5 lg:px-6 lg:pb-7">
        {/* Segment-Balken: erledigt = voll · aktiv = füllt sich · kommend = leer */}
        <div className="flex gap-1.5">
          {schritte.map((s, i) => {
            const istAktiv = i === aktiv;
            const breite = i < aktiv || (istAktiv && reduzierteBewegung) ? 100 : istAktiv ? fortschritt * 100 : 0;
            return (
              <button
                key={s.titel}
                type="button"
                onClick={() => waehleSchritt(i)}
                aria-pressed={istAktiv}
                aria-label={`Schritt ${i + 1}: ${s.titel}`}
                className="flex-1 cursor-pointer py-3"
              >
                <span className="block h-1.5 overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${breite}%`, transition: reduzierteBewegung ? "none" : "width 80ms linear" }}
                    aria-hidden="true"
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail-Bereich: Ghost-Serif-Ziffer + Titel/Text, Remount je Schritt */}
        <div key={aktiv} className="mt-4 grid min-h-[200px] gap-2 lg:mt-5 lg:min-h-[130px] lg:grid-cols-[auto_1fr] lg:gap-8">
          <span
            className="ae-in select-none font-[family-name:var(--font-heading)] text-6xl font-black leading-[0.85] text-primary/10 lg:text-[96px]"
            aria-hidden="true"
          >
            {String(aktiv + 1).padStart(2, "0")}
          </span>
          <div>
            <h3
              className="ae-in font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark"
              style={{ animationDelay: "70ms" }}
            >
              {schritt.titel}
            </h3>
            <p className="ae-in mt-2.5 max-w-3xl text-sm lg:text-[15px] text-muted leading-relaxed" style={{ animationDelay: "150ms" }}>
              {schritt.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Icon-Chips für die „stack“-Hebel-Variante (Stroke-SVGs inline)
═══════════════════════════════════════════════════════════════════════════ */
const stackIconSvg = (paths: ReactNode) => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const STACK_ICONS: Record<string, ReactNode[]> = {
  /* Kategorien · Duplicate Content · Produktdaten · Positionierung */
  "seo-fuer-online-shops": [
    stackIconSvg(
      <path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    ),
    stackIconSvg(
      <path d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
    ),
    stackIconSvg(
      <>
        <path d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path d="M6 6h.008v.008H6V6Z" />
      </>
    ),
    stackIconSvg(
      <>
        <circle cx="12" cy="12" r="7.25" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.5v2.25M12 19.25v2.25M2.5 12h2.25M19.25 12h2.25" />
      </>
    ),
  ],
  /* Eigentümer-Content · lokale Autorität · Objektseiten-Pflege · Profil/Bewertungen */
  "seo-fuer-immobilienmakler": [
    stackIconSvg(
      <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    ),
    stackIconSvg(
      <>
        <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </>
    ),
    stackIconSvg(
      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    ),
    stackIconSvg(
      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    ),
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   EIN Design-System je Branche: Golden-Circuit-Hero (dunkles Leiterbahn-Bild,
   dunkler Fade links) → WARUM → SIGNATURE-App → SPLIT (Bild) → VORGEHEN →
   KEYWORD-POTENZIAL → HEBEL → FEHLER → FOTO-BAND → FAQ → CTA.
   Hintergrund-Rhythmus weiß/beige sauber alternierend, dunkel nur das CTA-Band.
═══════════════════════════════════════════════════════════════════════════ */
export default function BranchenDetailClient({ branche }: { branche: Branche }) {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Bild-Key je Branche: /images/branchen-photo/<key>.jpg (FOTO-BAND) */
  const bildKey = branche.slug === "saas-seo" ? "saas" : branche.slug.replace("seo-fuer-", "");
  /* Signature-Modul links, wenn das SPLIT-Bild danach rechts sitzt — Medien-Seiten alternieren */
  const modulLinks =
    branche.slug === "seo-fuer-online-shops" ||
    branche.slug === "seo-fuer-immobilienmakler" ||
    branche.slug === "seo-fuer-anwaelte" ||
    branche.slug === "saas-seo";
  const stackIcons = STACK_ICONS[branche.slug] ?? STACK_ICONS["seo-fuer-online-shops"];
  /* KEYWORD-POTENZIAL + FOTO-BAND: Daten je Branche (Semrush bzw. Statement) */
  const kwSet: KeywordPotenzial | undefined = KEYWORDS[branche.slug];
  const kwSumme = kwSet ? kwSet.rows.reduce((s, r) => s + r.vol, 0) : 0;
  const kwGerundet = Math.round(kwSumme / 100) * 100;
  const fotoBand: FotoBand | undefined = FOTO_BAND[branche.slug];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: branche.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://seoforge.de" },
      { "@type": "ListItem", position: 2, name: "Branchen", item: "https://seoforge.de/branchen" },
      { "@type": "ListItem", position: 3, name: branche.name, item: `https://seoforge.de/branchen/${branche.slug}` },
    ],
  };

  const ctaButtons = (
    <div className="hero-cta mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <a
        href="#kontakt"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-all hover:bg-primary-dark hover:shadow-[0_18px_36px_-12px_rgba(0,0,0,0.65)]"
      >
        {branche.ctaLabel}
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </a>
      <Link
        href="/branchen"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 border-b border-white/30 pb-0.5 hover:border-white hover:text-white transition-colors"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Alle Branchen
      </Link>
    </div>
  );

  /* Sichtbarer Breadcrumb im Eyebrow-Bereich: Branchen → Branche */
  const heroBadge = (
    <nav aria-label="Breadcrumb" className="hero-badge mb-5 inline-flex items-center gap-2.5">
      <span className="h-px w-8 bg-secondary" aria-hidden="true" />
      <Link
        href="/branchen"
        className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-white"
      >
        Branchen
      </Link>
      <svg className="h-3 w-3 shrink-0 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary" aria-current="page">
        {branche.kurzName}
      </span>
    </nav>
  );

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <style>{`
        .scroll-hidden.rv-left { transform: translateX(-56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-right { transform: translateX(56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-scale { transform: translateY(28px) scale(0.93); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-blur { filter: blur(12px); transform: translateY(26px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-left.scroll-visible, .scroll-hidden.rv-right.scroll-visible, .scroll-hidden.rv-scale.scroll-visible, .scroll-hidden.rv-blur.scroll-visible { transform: none; filter: none; }
        @keyframes aeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .ae-in { opacity: 0; animation: aeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes chipPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .chip-dot { animation: chipPulse 2.2s ease-in-out infinite; }
        .bar-fill { transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease; }
        .kd-bar { width: 0%; transition: width 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.25s; }
        .scroll-visible .kd-bar { width: var(--kd, 0%); }
        .exp-rows { transition: grid-template-rows 0.4s ease-out; }
        @keyframes cueBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
        .cue-bob { animation: cueBob 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .scroll-hidden.rv-left, .scroll-hidden.rv-right, .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
          .ae-in { animation: none; opacity: 1; }
          .chip-dot { animation: none; }
          .bar-fill { transition: none; }
          .kd-bar { width: var(--kd, 0%); transition: none; }
          .exp-rows { transition: none; }
          .cue-bob { animation: none; }
        }
      `}</style>

      {/* ══ 01 HERO — Golden Circuit: dunkles Leiterbahn-Bild full-bleed, harte Unterkante ══ */}
      <section
        className="relative flex min-h-[560px] overflow-hidden lg:min-h-[640px]"
        style={{ background: "#161311" }}
      >
        <Image
          src="/images/hero-bg-circuit.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay — sehr dezenter dunkler Lesbarkeits-Verlauf von links */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(95deg, rgba(15,12,9,0.55) 0%, rgba(15,12,9,0.25) 45%, rgba(15,12,9,0) 75%)",
          }}
        />

        {/* Content — linke Spalte, vertikal zentriert */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 lg:px-8">
          <div className="max-w-[620px] py-16 lg:py-20">
            {heroBadge}
            <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.3rem] sm:text-[2.8rem] lg:text-[3.1rem] font-medium leading-[1.05] tracking-tight text-white">
              {branche.h1.pre}
              <span style={gradHero}>{branche.h1.grad}</span>
              {branche.h1.post}
            </h1>
            <p className="hero-description mt-5 text-lg leading-relaxed text-white/75">{branche.subline}</p>
            {branche.heroQuery && (
              <div className="hero-cta mt-6 flex w-full max-w-md items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur">
                <Lupe className="h-4 w-4 shrink-0 text-white/50" />
                <span className="truncate text-sm text-white/85">{branche.heroQuery}</span>
                <span className="ml-auto hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 sm:block">
                  So sucht Ihr Kunde
                </span>
              </div>
            )}
            {ctaButtons}
          </div>
        </div>

        {/* Scroll-Cue — unten mittig, nur Desktop */}
        <div
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/50">Mehr erfahren</span>
          <svg
            className="cue-bob h-4 w-4 text-white/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ══ 02 WARUM — weiß, editorial ══ */}
      <section className="border-t border-border bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">
                01 — Die Ausgangslage
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
                {branche.warumTitle.pre}
                <span style={grad}>{branche.warumTitle.grad}</span>
              </h2>
            </div>

            <div className="space-y-6">
              {branche.warumAbsaetze.map((absatz, i) => (
                <p
                  key={i}
                  className="scroll-hidden rv-blur text-[15px] lg:text-base text-muted leading-relaxed"
                  style={{ transitionDelay: `${i * 110}ms` }}
                >
                  {absatz}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 02b SIGNATURE-APP — beige, eigene Section direkt nach WARUM ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
            <div className={`scroll-hidden ${modulLinks ? "rv-right lg:order-2" : "rv-left"}`}>
              <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-dark/45">02 — Am Beispiel</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[36px] font-bold text-dark leading-[1.14]">
                {branche.signatureTitle.pre}
                <span style={grad}>{branche.signatureTitle.grad}</span>
              </h2>
              <div className="mt-5 space-y-4">
                {branche.signatureCopy.map((satz, i) => (
                  <p key={i} className="text-[15px] lg:text-base text-muted leading-relaxed">
                    {satz}
                  </p>
                ))}
              </div>
            </div>
            <div className={`scroll-hidden ${modulLinks ? "rv-left lg:order-1" : "rv-right"}`} style={{ transitionDelay: "120ms" }}>
              <SignatureModul sig={branche.signature} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 SPLIT — Bild + Vertiefung, Bildseite je Branche abwechselnd ══ */}
      <section className="bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <figure className={`scroll-hidden ${branche.split.bildLinks ? "rv-left" : "rv-right lg:order-2"}`}>
              {/* Äußerer Wrapper ohne overflow-hidden, damit das Stat-Badge überlappen kann */}
              <div className="relative">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-[0_28px_60px_-30px_rgba(26,26,26,0.3)]">
                  <Image
                    src={branche.split.bild}
                    alt={branche.split.bildAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {/* Floating Stat-Badge: echte Semrush-Summe der Branche, zur Textseite hin überlappend */}
                {kwSet && (
                  <div
                    className={`scroll-hidden rv-scale absolute bottom-5 rotate-[-1deg] rounded-2xl border bg-white px-5 py-3.5 shadow-lg ${
                      branche.split.bildLinks ? "-right-3 sm:-right-5" : "-left-3 sm:-left-5"
                    }`}
                    style={{ borderColor: TINT_BORDER, transitionDelay: "260ms" }}
                  >
                    <span className="block font-[family-name:var(--font-heading)] text-2xl font-black leading-none" style={grad}>
                      {fmtZahl(kwSumme)}
                    </span>
                    <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-dark/45">
                      Suchanfragen/Monat · Semrush
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                {branche.split.caption}
              </figcaption>
              {/* Effizienz-Karte: gleicht die Bildspalte an die längere Textspalte an */}
              <div
                className="scroll-hidden rv-blur mt-5 rounded-2xl border p-6"
                style={{ background: TINT, borderColor: TINT_BORDER, transitionDelay: "220ms" }}
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-primary/70">
                  Warum wir günstiger sind
                </span>
                <h3 className="mt-2.5 font-[family-name:var(--font-heading)] text-lg font-bold text-dark">
                  Effizienz, die Sie im Preis merken.
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  KI-gestützte Routinen und CI/CD-Deployments senken unseren Aufwand pro Maßnahme deutlich — das
                  macht uns günstiger als klassische Agenturstrukturen. Und weil Änderungen in Minuten live gehen
                  statt in Wochen, werden Ergebnisse früher messbar.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["KI-Workflows", "Live in Minuten"].map((c) => (
                    <span
                      key={c}
                      className="rounded-full border bg-white px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-primary"
                      style={{ borderColor: TINT_BORDER }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </figure>

            <div
              className={`scroll-hidden ${branche.split.bildLinks ? "rv-right" : "rv-left lg:order-1"}`}
              style={{ transitionDelay: "110ms" }}
            >
              <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-dark/45">03 — Im Detail</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[36px] font-bold text-dark leading-[1.14]">
                {branche.split.titel.pre}
                <span style={grad}>{branche.split.titel.grad}</span>
              </h2>
              <div className="mt-5 space-y-4">
                {branche.split.absaetze.map((absatz, i) => (
                  <p key={i} className="text-[15px] lg:text-base text-muted leading-relaxed">
                    {absatz}
                  </p>
                ))}
              </div>
              {/* Kompakte Check-Zeilen: die ersten drei Hebel der Branche */}
              <ul className="mt-6 space-y-3">
                {branche.hebel.slice(0, 3).map((h, i) => (
                  <li
                    key={h.titel}
                    className="scroll-hidden rv-blur flex items-center gap-3"
                    style={{ transitionDelay: `${180 + i * 90}ms` }}
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#E9F6EC", color: "#1A7F37" }}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                        <path d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-[15px] font-semibold text-dark">{h.titel}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className="scroll-hidden rv-blur mt-7 inline-flex items-center gap-2 border-b border-primary/40 pb-1 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary"
                style={{ transitionDelay: "450ms" }}
              >
                Kostenlose Erstanalyse anfordern
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 VORGEHEN — interaktiver Vorgehen-Player (Story-Progress) ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10 max-w-3xl lg:mb-14">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-dark/45">
              04 — Unser Vorgehen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              {branche.vorgehenTitle.pre}
              <span style={grad}>{branche.vorgehenTitle.grad}</span>
            </h2>
          </div>

          <div className="scroll-hidden rv-scale">
            <VorgehenPlayer schritte={branche.vorgehen} />
          </div>
        </div>
      </section>

      {/* ══ 04b KEYWORD-POTENZIAL — echte Semrush-Daten als Tabellen-Panel ══ */}
      {kwSet && (
        <section className="bg-white py-20 lg:py-28 overflow-x-clip">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-16">
              <div className="scroll-hidden rv-left lg:sticky lg:top-28">
                <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-dark/45">
                  05 — Das Potenzial in Zahlen
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
                  So viel Nachfrage wartet <span style={grad}>in Ihrer Branche.</span>
                </h2>
                <div className="mt-5 space-y-4">
                  <p className="text-[15px] lg:text-base text-muted leading-relaxed">
                    Allein die sechs wichtigsten Suchbegriffe rund um {kwSet.thema} bündeln zusammen rund
                    ~{fmtZahl(kwGerundet)} Suchanfragen pro Monat in Deutschland.
                  </p>
                  <p className="text-[15px] lg:text-base text-muted leading-relaxed">
                    Die Keyword Difficulty zeigt auf einer Skala von 0–100, wie schwer ein Begriff umkämpft
                    ist — {kdAnteilSatz(kwSet.rows)}.
                  </p>
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                  Quelle: Semrush · Datenbank Deutschland · Stand Juli 2026
                </p>
              </div>

              <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
                <PanelShell titel={`Keyword-Potenzial · ${branche.kurzName}`} label="Semrush · DE">
                  {/* Kopfzeile */}
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 border-b border-border px-5 py-2.5 sm:grid-cols-[minmax(0,1fr)_104px_156px] sm:gap-x-4 lg:px-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark/40">Suchbegriff</span>
                    <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-dark/40">Volumen/Monat</span>
                    <span className="hidden text-right font-mono text-[10px] uppercase tracking-[0.14em] text-dark/40 sm:block">
                      Schwierigkeit
                    </span>
                  </div>
                  {/* Keyword-Zeilen */}
                  <div className="divide-y divide-border">
                    {kwSet.rows.map((r, i) => {
                      const s = kdStufe(r.kd);
                      return (
                        <div
                          key={r.kw}
                          className="scroll-hidden rv-scale grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-5 py-3.5 sm:grid-cols-[minmax(0,1fr)_104px_156px] sm:gap-x-4 lg:px-6"
                          style={{ transitionDelay: `${i * 70}ms` }}
                        >
                          <span className="truncate text-[15px] text-dark">{r.kw}</span>
                          <span className="text-right font-mono text-[13px] text-dark">{fmtZahl(r.vol)}</span>
                          <span className="col-span-2 flex items-center gap-2 sm:col-span-1 sm:justify-end">
                            <span
                              className="inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold"
                              style={{ color: s.text, background: s.bg, borderColor: s.borderColor }}
                            >
                              {r.kd} · {s.label}
                            </span>
                            <span className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-border" aria-hidden="true">
                              <span
                                className="kd-bar block h-full rounded-full"
                                style={{ "--kd": `${r.kd}%`, background: s.bar } as React.CSSProperties}
                              />
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Summen-Fußzeile */}
                  <div
                    className="scroll-hidden rv-scale flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border px-5 py-4 lg:px-6"
                    style={{ background: "#FBF8F4", transitionDelay: "420ms" }}
                  >
                    <span className="text-[13px] font-semibold text-dark">Gesamt</span>
                    <span className="font-mono text-sm font-semibold text-dark">
                      {fmtZahl(kwSumme)}{" "}
                      <span className="font-sans text-[12px] font-normal text-muted">Suchanfragen/Monat</span>
                    </span>
                  </div>
                </PanelShell>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ 05 HEBEL — Fact-Sheet-Tafel / Editorial / Stack ══ */}
      <section className="py-20 lg:py-28" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Konkrete Hebel</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">
                Die vier Hebel <span style={grad}>für Ihre Sichtbarkeit.</span>
              </h2>
            </div>
            <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">
              Kein Standardpaket: An diesen vier Punkten setzen wir an, weil sie in Ihrer Branche über
              organische Sichtbarkeit entscheiden.
            </p>
          </div>

          {/* Variante A: tafel — Fact-Sheet-Panel mit divide-y-Zeilen */}
          {branche.hebelVariant === "tafel" && (
            <div className="scroll-hidden rv-scale overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(26,26,26,0.18)]">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 lg:px-6">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/55">
                  <span className="chip-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  Fact-Sheet — Vier Hebel
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/35">{branche.kurzName}</span>
              </div>
              <div className="divide-y divide-border">
                {branche.hebel.map((h, i) => (
                  <div
                    key={h.titel}
                    className="grid gap-2 px-5 py-5 transition-colors duration-300 hover:bg-[#FBF8F4] sm:grid-cols-[250px_1fr] sm:gap-8 lg:px-6 lg:py-6"
                  >
                    <div className="flex items-start gap-3">
                      <span className="pt-0.5 font-mono text-[11px] font-semibold text-primary/60" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-base lg:text-lg font-bold text-dark leading-snug">
                        {h.titel}
                      </h3>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Variante B: editorial — untereinander, große Ghost-Serif-Ziffern links */}
          {branche.hebelVariant === "editorial" && (
            <div className="divide-y divide-border border-y border-border">
              {branche.hebel.map((h, i) => (
                <div
                  key={h.titel}
                  className="scroll-hidden rv-blur grid items-start gap-3 py-8 sm:grid-cols-[110px_1fr] sm:gap-6 lg:grid-cols-[150px_1fr] lg:gap-10 lg:py-10"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span
                    className="select-none font-[family-name:var(--font-heading)] text-6xl font-black leading-[0.85] text-primary/10 lg:text-[84px]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark mb-2.5">{h.titel}</h3>
                    <p className="max-w-3xl text-sm lg:text-[15px] text-muted leading-relaxed">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Variante C: stack — vertikale Karten mit Icon-Chips links */}
          {branche.hebelVariant === "stack" && (
            <div className="space-y-4 lg:space-y-5">
              {branche.hebel.map((h, i) => (
                <div
                  key={h.titel}
                  className="scroll-hidden rv-scale flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-[0_18px_44px_-32px_rgba(26,26,26,0.25)] sm:flex-row sm:gap-6 lg:p-7"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-primary"
                    style={{ background: TINT, borderColor: TINT_BORDER }}
                    aria-hidden="true"
                  >
                    {stackIcons[i]}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg lg:text-xl font-bold text-dark mb-2">{h.titel}</h3>
                    <p className="text-sm text-muted leading-relaxed">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ 06 FEHLER — „Typische Fehler“-Tafel bzw. 2-spaltige Editorial-Liste ══ */}
      <section className="bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10 max-w-3xl lg:mb-14">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Typische Fehler</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              Vier Fehler, <span style={grad}>die Sichtbarkeit kosten.</span>
            </h2>
          </div>

          {branche.fehlerVariant === "tafel" ? (
            <div className="scroll-hidden rv-scale overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(26,26,26,0.18)]">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 lg:px-6">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/55">
                  <span className="chip-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  Aus der Praxis — 4 Fehler
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/35">Vermeidbar</span>
              </div>
              <div className="divide-y divide-border">
                {branche.fehler.map((f) => (
                  <div
                    key={f.titel}
                    className="grid grid-cols-[40px_1fr] items-start gap-4 px-5 py-5 transition-colors duration-300 hover:bg-[#FBF8F4] lg:px-6 lg:py-6"
                  >
                    <FehlerX />
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-heading)] text-base lg:text-lg font-bold text-dark">{f.titel}</h3>
                      <p className="mt-1.5 text-sm text-muted leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid border-t border-border sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
              {branche.fehler.map((f, i) => (
                <div key={f.titel} className="scroll-hidden rv-blur border-b border-border py-7 lg:py-8" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="flex items-center gap-3">
                    <FehlerX />
                    <h3 className="font-[family-name:var(--font-heading)] text-base lg:text-lg font-bold text-dark">{f.titel}</h3>
                  </div>
                  <p className="mt-2.5 text-sm text-muted leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ 06b FOTO-THEMEN-BAND — fotorealistische Atmosphäre, volle Breite ══ */}
      {fotoBand && (
        <section className="relative h-[340px] overflow-hidden lg:h-[420px]">
          <Image
            src={`/images/branchen-photo/${bildKey}.jpg`}
            alt={fotoBand.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(100deg, rgba(26,26,26,0.72) 0%, rgba(26,26,26,0.35) 55%, rgba(26,26,26,0.15) 100%)",
            }}
          />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-8">
            <div className="scroll-hidden rv-blur max-w-xl">
              <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                Branchen · {branche.kurzName}
              </span>
              <p className="mt-4 font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] text-white leading-[1.15]">
                {fotoBand.statement}
              </p>
              <a
                href="#kontakt"
                className="mt-6 inline-block border-b border-white/40 pb-0.5 text-sm font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
              >
                Kostenlose Erstanalyse anfordern
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ══ 07 FAQ — 6 Accordions, beige vor dem dunklen CTA-Band ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Häufige Fragen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Sechs Fragen — <span style={grad}>ehrlich beantwortet.</span>
              </h2>
              <p className="text-muted leading-relaxed">
                Die Fragen, die {branche.kurzName === "SaaS" ? "SaaS-Teams" : branche.kurzName} uns im
                Erstgespräch am häufigsten stellen — ohne Kleingedrucktes.
              </p>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
                {branche.faq.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={faq.q}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer transition-colors hover:bg-offwhite"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                        <svg
                          className={`w-4 h-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-400 ease-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 08 CTA-BAND — dunkel, kompakt ══ */}
      <section id="kontakt" className="scroll-mt-20 bg-dark py-20 lg:py-28">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] text-white leading-[1.15]">
              {branche.ctaSatz.pre}
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                {branche.ctaSatz.grad}
              </span>
            </h2>
            <p className="scroll-hidden rv-blur mt-5 text-white/60 leading-relaxed" style={{ transitionDelay: "100ms" }}>
              Kostenlose Erstanalyse, Antwort innerhalb von 24 Stunden — von einem festen Ansprechpartner.
            </p>
            <p
              className="scroll-hidden rv-blur mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55"
              style={{ transitionDelay: "140ms" }}
            >
              Effiziente Strukturen · faire Preise · Ergebnisse früher messbar
            </p>
            <div className="scroll-hidden rv-blur mt-8" style={{ transitionDelay: "180ms" }}>
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light"
              >
                {branche.ctaButtonLabel}
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
