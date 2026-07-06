"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import type { Branche, Signature } from "./branchenData";

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

const BEIGE = "#F8F5F1";
const TINT = "#fbf4ea";
const TINT_BORDER = "#ecd3ba";

/* ═══════════════════════════════════════════════════════════════════════════
   Kleine Bausteine für die statischen Mockup-Panels (Spielfeld-Panel-Stil)
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

/* ─── 01 Ärzte · Lokale-SERP-Mockup ───────────────────────────────────────── */
function SigSerp({ sig }: { sig: Extract<Signature, { variant: "serp" }> }) {
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="px-5 py-5 lg:px-6">
        <div className="flex items-center gap-3 rounded-full border border-border bg-white px-4 py-2.5 shadow-sm">
          <Lupe className="h-4 w-4 shrink-0 text-dark/40" />
          <span className="truncate text-sm text-dark">{sig.query}</span>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5" style={{ background: "#FBF8F4" }}>
            <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M19.5 10.5c0 7.1-7.5 11.25-7.5 11.25S4.5 17.6 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/45">Maps-Ergebnisse</span>
          </div>
          <div className="divide-y divide-border">
            {sig.mapsRows.map((r) => (
              <div key={r.name} className="flex items-center gap-3 px-4 py-3" style={r.eigene ? { background: TINT } : undefined}>
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
            ))}
          </div>
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

/* ─── 02 Anwälte · Klickpreis-Tafel ───────────────────────────────────────── */
function SigKlickpreise({ sig }: { sig: Extract<Signature, { variant: "klickpreise" }> }) {
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="px-5 pb-1 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40 lg:px-6">{sig.hinweis}</div>
      <div className="divide-y divide-border">
        {sig.rows.map((r) => (
          <div key={r.gebiet} className="grid grid-cols-[104px_1fr_auto] items-center gap-3 px-5 py-3.5 lg:grid-cols-[124px_1fr_auto] lg:px-6">
            <span className="truncate text-[13px] font-semibold text-dark">{r.gebiet}</span>
            <span className="block h-2 overflow-hidden rounded-full" style={{ background: "#f1ece4" }} aria-hidden="true">
              <span
                className="block h-full rounded-full"
                style={{ width: `${r.breite}%`, background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
              />
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] text-dark/55">{r.wert}</span>
          </div>
        ))}
        <div className="flex items-center gap-2.5 px-5 py-4 lg:px-6" style={{ background: TINT }}>
          <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          <span className="text-[13px] font-semibold text-dark">{sig.fazit}</span>
          <span className="ml-auto font-mono text-[11px] font-semibold text-primary">{sig.fazitWert}</span>
        </div>
      </div>
    </PanelShell>
  );
}

/* ─── 03 Online-Shops · Struktur-Baum ─────────────────────────────────────── */
const STATUS_CHIP: Record<string, string> = {
  INDEX: "border-emerald-200 bg-emerald-50 text-emerald-700",
  NOINDEX: "border-border bg-[#F8F5F1] text-dark/45",
  CANONICAL: "border-[#ecd3ba] bg-[#fbf4ea] text-primary",
};
const STATUS_TEXT: Record<string, string> = { INDEX: "Index", NOINDEX: "Noindex", CANONICAL: "Canonical →" };

function SigStrukturbaum({ sig }: { sig: Extract<Signature, { variant: "strukturbaum" }> }) {
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="divide-y divide-border">
        {sig.rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3 lg:px-6">
            <span className="flex min-w-0 items-center font-mono text-xs text-dark" style={{ paddingLeft: r.tiefe * 18 }}>
              {r.tiefe > 0 && (
                <span className="mr-1.5 shrink-0 text-dark/30" aria-hidden="true">
                  └
                </span>
              )}
              <span className="truncate">{r.pfad}</span>
            </span>
            <span className={`ml-auto shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${STATUS_CHIP[r.status]}`}>
              {STATUS_TEXT[r.status]}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/40 lg:px-6">
        {sig.fussnote}
      </div>
    </PanelShell>
  );
}

/* ─── 04 Handwerker · Google-Business-Mockup ──────────────────────────────── */
function SigBusinessprofil({ sig }: { sig: Extract<Signature, { variant: "businessprofil" }> }) {
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="grid gap-4 px-5 py-5 sm:grid-cols-[1.35fr_1fr] lg:px-6">
        <div className="rounded-2xl border border-border bg-white p-4">
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

        <div className="relative min-h-[190px] overflow-hidden rounded-2xl border border-border" style={{ background: "#FBF8F4" }}>
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
      </div>
    </PanelShell>
  );
}

/* ─── 05 Immobilienmakler · Eigentümer-Funnel-Tafel (Editorial-Zeilen) ────── */
function SigFunnel({ sig }: { sig: Extract<Signature, { variant: "funnel" }> }) {
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="divide-y divide-border">
        {sig.stufen.map((s, i) => (
          <div
            key={s.query}
            className="grid grid-cols-[52px_1fr] items-start gap-3 px-5 py-5 lg:px-6"
            style={s.highlight ? { background: TINT } : undefined}
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
              <p className={`mt-2 text-[13px] leading-relaxed ${s.highlight ? "font-semibold text-dark" : "text-muted"}`}>{s.satz}</p>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

/* ─── 06 SaaS · KI-Chat-Mockup ────────────────────────────────────────────── */
function SigKiChat({ sig }: { sig: Extract<Signature, { variant: "kichat" }> }) {
  return (
    <PanelShell titel={sig.panelTitle}>
      <div className="space-y-4 px-5 py-5 lg:px-6">
        <div className="flex justify-end">
          <div className="max-w-[88%] rounded-2xl rounded-br-md bg-dark px-4 py-3 text-[13px] leading-relaxed text-white">{sig.frage}</div>
        </div>

        <div className="rounded-2xl rounded-bl-md border border-border px-4 py-3.5" style={{ background: "#FBF8F4" }}>
          <div className="mb-2.5 flex items-center gap-2">
            <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9.813 15.904 9.374 17.5l-.44-1.596a3.375 3.375 0 0 0-2.328-2.328L5.01 13.137l1.596-.44a3.375 3.375 0 0 0 2.328-2.328l.44-1.595.438 1.595a3.375 3.375 0 0 0 2.329 2.329l1.595.438-1.595.44a3.375 3.375 0 0 0-2.329 2.328Z" />
              <path d="M18.259 8.715 18 9.75l-.259-1.035a2.625 2.625 0 0 0-1.91-1.91L14.796 6.55l1.035-.259a2.625 2.625 0 0 0 1.91-1.91L18 3.346l.259 1.035a2.625 2.625 0 0 0 1.91 1.91l1.034.259-1.034.259a2.625 2.625 0 0 0-1.91 1.91Z" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/45">KI-Antwort</span>
          </div>
          <SkeletonZeile w="92%" />
          <SkeletonZeile w="74%" className="mt-2" />
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: TINT, borderColor: TINT_BORDER }}>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold text-primary">{sig.marke}</span>
          </div>
          <SkeletonZeile w="60%" className="mt-3" />
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2.5">
            <span className="font-mono text-[10px] text-dark/45">{sig.quellen}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dark/30">Schematische Darstellung</span>
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
   EIN Design-System, drei Hero- und drei Hebel-Varianten + Signature-Modul
   je Branche. Rhythmus: split → W/W/B/W/dark · sonst → W/W/B/W/B/dark.
═══════════════════════════════════════════════════════════════════════════ */
export default function BranchenDetailClient({ branche }: { branche: Branche }) {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isSplit = branche.heroVariant === "split";
  const iconImg = branche.slug === "saas-seo" ? "saas" : branche.slug.replace("seo-fuer-", "");
  const modulLinks = branche.slug === "seo-fuer-online-shops" || branche.slug === "seo-fuer-immobilienmakler";
  const stackIcons = STACK_ICONS[branche.slug] ?? STACK_ICONS["seo-fuer-online-shops"];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: branche.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const ctaButtons = (zentriert: boolean) => (
    <div className={`hero-cta mt-8 flex flex-col gap-5 sm:flex-row sm:items-center ${zentriert ? "items-center justify-center" : "items-start"}`}>
      <a
        href="#kontakt"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
      >
        {branche.ctaLabel}
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </a>
      <Link
        href="/branchen"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Alle Branchen
      </Link>
    </div>
  );

  const heroBadge = (
    <div className="hero-badge mb-5 inline-flex items-center gap-2.5">
      <span className="h-px w-8 bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Branchen · {branche.kurzName}</span>
      {branche.heroVariant === "zentriert" && <span className="h-px w-8 bg-primary" />}
    </div>
  );

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .scroll-hidden.rv-left, .scroll-hidden.rv-right, .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
          .ae-in { animation: none; opacity: 1; }
          .chip-dot { animation: none; }
        }
      `}</style>

      {/* ══ 01 HERO — hell, drei Varianten ══ */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className={`absolute top-[-18%] h-[620px] w-[950px] rounded-full ${
              branche.heroVariant === "zentriert" ? "left-1/2 -translate-x-1/2" : "left-[10%]"
            }`}
            style={{ background: "radial-gradient(ellipse, rgba(212,168,83,0.18), transparent 60%)" }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.045) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage:
                branche.heroVariant === "zentriert"
                  ? "radial-gradient(ellipse 55% 60% at 50% 35%, #000 30%, transparent 75%)"
                  : "radial-gradient(ellipse 55% 60% at 25% 35%, #000 30%, transparent 75%)",
              WebkitMaskImage:
                branche.heroVariant === "zentriert"
                  ? "radial-gradient(ellipse 55% 60% at 50% 35%, #000 30%, transparent 75%)"
                  : "radial-gradient(ellipse 55% 60% at 25% 35%, #000 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 pt-16 lg:pt-24 pb-14 lg:pb-20">
          {/* Variante A: split — Text links, Signature-Modul rechts */}
          {branche.heroVariant === "split" && (
            <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
              <div>
                {heroBadge}
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.3rem] sm:text-[2.8rem] lg:text-[3.1rem] font-medium leading-[1.05] tracking-tight text-dark">
                  {branche.h1.pre}
                  <span style={grad}>{branche.h1.grad}</span>
                  {branche.h1.post}
                </h1>
                <p className="hero-description mt-5 max-w-2xl text-lg leading-relaxed text-muted">{branche.subline}</p>
                {ctaButtons(false)}
              </div>
              <div className="hero-dashboard w-full lg:max-w-xl lg:justify-self-end">
                <SignatureModul sig={branche.signature} />
              </div>
            </div>
          )}

          {/* Variante B: zentriert — Icon-Medaillon über der H1 */}
          {branche.heroVariant === "zentriert" && (
            <div className="mx-auto max-w-3xl text-center">
              <span className="hero-badge relative mx-auto mb-7 block h-24 w-24 overflow-hidden rounded-full ring-1 ring-border shadow-[0_14px_34px_-20px_rgba(194,114,42,0.35)]">
                <Image
                  src={`/images/branchen-icons/${iconImg}.png`}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </span>
              {heroBadge}
              <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem] font-medium leading-[1.05] tracking-tight text-dark">
                {branche.h1.pre}
                <span style={grad}>{branche.h1.grad}</span>
                {branche.h1.post}
              </h1>
              <p className="hero-description mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{branche.subline}</p>
              {ctaButtons(true)}
            </div>
          )}

          {/* Variante C: suchfeld — linksbündig mit Suchfeld-Mockup-Zeile */}
          {branche.heroVariant === "suchfeld" && (
            <div className="max-w-4xl">
              {heroBadge}
              <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-medium leading-[1.05] tracking-tight text-dark">
                {branche.h1.pre}
                <span style={grad}>{branche.h1.grad}</span>
                {branche.h1.post}
              </h1>
              <p className="hero-description mt-5 max-w-2xl text-lg leading-relaxed text-muted">{branche.subline}</p>
              <div
                className="ae-in mt-7 flex w-full max-w-xl items-center gap-3 rounded-full border border-border bg-white px-5 py-3.5 shadow-[0_18px_40px_-26px_rgba(194,114,42,0.5)]"
                style={{ animationDelay: "0.35s" }}
              >
                <Lupe className="h-4 w-4 shrink-0 text-dark/40" />
                <span className="truncate text-[15px] text-dark">{branche.heroQuery}</span>
                <span className="ml-auto hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35 sm:block">
                  So sucht Ihr Kunde
                </span>
              </div>
              {ctaButtons(false)}
            </div>
          )}
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

      {/* ══ 02b SIGNATURE — beige, nur wenn das Modul nicht im Hero sitzt ══ */}
      {!isSplit && branche.signatureTitle && branche.signatureCopy && (
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
      )}

      {/* ══ 03 HEBEL — drei Varianten, Hintergrund je Rhythmus ══ */}
      <section className="py-20 lg:py-28" style={{ background: isSplit ? BEIGE : "#ffffff" }}>
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

          {/* Variante A: grid — Hairline-Grid 2×2 mit Ghost-Ziffern */}
          {branche.hebelVariant === "grid" && (
            <div className="grid gap-px bg-border border border-border rounded-2xl overflow-hidden sm:grid-cols-2">
              {branche.hebel.map((h, i) => (
                <div key={h.titel} className="scroll-hidden rv-scale bg-white" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="group relative h-full p-6 lg:p-8 transition-colors duration-300 hover:bg-[#FBF8F4]">
                    <span
                      className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                      aria-hidden="true"
                    />
                    <span
                      className="block font-[family-name:var(--font-heading)] text-5xl font-black text-primary/10 leading-none mb-4 transition-colors duration-300 group-hover:text-primary/25"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-2.5 group-hover:text-primary transition-colors">
                      {h.titel}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{h.text}</p>
                  </div>
                </div>
              ))}
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

      {/* ══ 04 FAQ — 3 Accordions, Hintergrund je Rhythmus ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: isSplit ? "#ffffff" : BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Häufige Fragen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Drei Fragen — <span style={grad}>ehrlich beantwortet.</span>
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

      {/* ══ 05 CTA-BAND — dunkel, kompakt ══ */}
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
