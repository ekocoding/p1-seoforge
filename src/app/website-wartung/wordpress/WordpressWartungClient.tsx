"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

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
    document.querySelectorAll(".scroll-hidden, .m3d").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Scroll-Progress (fixed, rAF-gedrosselt) ─────────────────────────────── */
function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[80] h-[3px]" aria-hidden="true">
      <div
        ref={ref}
        className="h-full origin-left"
        style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
      />
    </div>
  );
}

/* ─── Editorial-Header ────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return (
    <div className="scroll-hidden rv-left grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
      <div>
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">{eyebrow}</span>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">{title}</h2>
      </div>
      <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">{copy}</p>
    </div>
  );
}

const grad: React.CSSProperties = {
  background: "linear-gradient(90deg, #C2722A, #D4A853)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* ═══════════════════════════════════════════════════════════════════════════
   WARTUNGS-LEITSTAND — Interaktions-Höhepunkt 1/2 (Hero)
   Ein nächtlicher Wartungslauf als Story: (1) Terminal tippt den Befehl,
   (2) vier Status-Kacheln flippen nacheinander von „ausstehend" auf grün,
   (3) grüne Diff-Zeilen laufen ins Log, (4) Statuszeile wechselt auf
   „Alle Systeme grün", „Alles OK"-Pill poppt. IO threshold 0.35, einmalig,
   kein Loop. SSR/No-JS/Reduced-Motion zeigen den kompletten Endzustand.
═══════════════════════════════════════════════════════════════════════════ */
const LEITSTAND_CMD = "wartungslauf --site ihre-website.de";
const LEITSTAND_KACHELN = [
  { label: "Backup", done: "Backup erstellt · 2,1 GB" },
  { label: "Updates", done: "Eingespielt · nach Staging-Test" },
  { label: "Malware-Scan", done: "Abgeschlossen · 0 Funde" },
  { label: "Core Web Vitals", done: "Gemessen · alles grün" },
] as const;
const LEITSTAND_DIFFS = ["+ backup verifiziert", "+ core & plugins aktuell", "+ staging-test bestanden"];

type LeitstandPhase = "static" | "armed" | "typing" | "run" | "done";

function WartungsLeitstand() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cmdRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<LeitstandPhase>("static");
  const [step, setStep] = useState(0); // Anzahl erledigter Kacheln 0..4

  /* Armieren + IO-Start (einmalig; Reduced-Motion behält den Endzustand) */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (cmdRef.current) cmdRef.current.textContent = "";
    setPhase("armed");
    setStep(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setPhase("typing");
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* (1) Befehl tippt — rAF, auf Zeichen quantisiert (~70 ms/Zeichen) */
  useEffect(() => {
    if (phase !== "typing") return;
    const span = cmdRef.current;
    if (!span) {
      setPhase("run");
      return;
    }
    const start = performance.now();
    let raf = 0;
    let last = -1;
    let t: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      const n = Math.min(LEITSTAND_CMD.length, Math.floor((now - start) / 70));
      if (n !== last) {
        last = n;
        span.textContent = LEITSTAND_CMD.slice(0, n);
      }
      if (n < LEITSTAND_CMD.length) raf = requestAnimationFrame(tick);
      else t = setTimeout(() => setPhase("run"), 420);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (t) clearTimeout(t);
    };
  }, [phase]);

  /* (2)+(3) Kacheln flippen nacheinander (~600 ms), danach Finale */
  useEffect(() => {
    if (phase !== "run") return;
    if (step >= LEITSTAND_KACHELN.length) {
      const t = setTimeout(() => setPhase("done"), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 600);
    return () => clearTimeout(t);
  }, [phase, step]);

  const isStatic = phase === "static";
  const fertig = isStatic || phase === "done";
  const doneCount = fertig ? LEITSTAND_KACHELN.length : phase === "run" ? step : 0;

  return (
    <div
      ref={wrapRef}
      className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_28px_70px_-26px_rgba(26,26,26,0.28)] text-left"
    >
      {/* Fake-App-Header */}
      <div className="flex items-center gap-2.5 px-5 sm:px-6 py-4 border-b border-border bg-offwhite/60">
        <span className="chip-dot w-2 h-2 rounded-full shrink-0" style={{ background: "#C2722A" }} />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Wartungs-Leitstand · Beispiel</span>
        <span className="ml-auto flex items-center gap-2.5">
          {fertig && (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold ${isStatic ? "" : "ok-pop"}`}
              style={{ background: "rgba(45,164,78,0.1)", color: "#2DA44E" }}
            >
              Alles OK
            </span>
          )}
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">Keine Live-Daten</span>
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Links — Terminal-Log */}
        <div className="p-5 font-mono text-[12px] leading-[1.7] bg-offwhite/40 flex flex-col">
          <div className="min-h-[126px]">
            <p className="text-dark">
              <span className="text-dark/40">$ </span>
              <span ref={cmdRef}>{LEITSTAND_CMD}</span>
              <span
                className={`ml-0.5 inline-block h-[13px] w-[7px] rounded-[1px] bg-dark/60 align-middle ${
                  phase === "typing" ? "serp-caret" : "opacity-0"
                }`}
                aria-hidden="true"
              />
            </p>
            <div className="mt-2 space-y-1.5">
              {LEITSTAND_DIFFS.map((d, i) =>
                doneCount > i ? (
                  <p
                    key={d}
                    className={`rounded px-2 py-0.5 w-fit ${isStatic ? "" : "cc-in"}`}
                    style={{ background: "#E9F6EC", color: "#1A7F37" }}
                  >
                    {d}
                  </p>
                ) : null
              )}
            </div>
          </div>
          {/* Footer-Statuszeile */}
          <p className="mt-4 pt-3 border-t border-border/70" style={{ color: fertig ? "#2DA44E" : "rgba(26,26,26,0.4)" }}>
            {fertig ? "● Alle Systeme grün — nächster Wartungslauf in 6 Tagen" : "○ Wartungslauf läuft …"}
          </p>
        </div>

        {/* Rechts — Status-Kacheln */}
        <div className="p-5 space-y-2.5">
          {LEITSTAND_KACHELN.map((k, i) => {
            const ok = doneCount > i;
            return (
              <div
                key={k.label}
                className={`rounded-xl border px-4 py-3 transition-colors duration-300 ${
                  ok ? "bg-white border-border" : "bg-offwhite border-transparent"
                }`}
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40 mb-1.5">{k.label}</span>
                {ok ? (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${isStatic ? "" : "cc-in"}`}
                    style={{ background: "rgba(45,164,78,0.1)", color: "#2DA44E" }}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {k.done}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] text-dark/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-dark/20 animate-pulse" />
                    ausstehend
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESTORE-DEMO — Interaktions-Höhepunkt 2/2 (Restore-Beweis)
   1-Klick-Wiederherstellung als Story: incident (Warn-Chip, Skeletons dimmen)
   → select (oberste Backup-Zeile wird solid hervorgehoben) → restore
   (Gradient-Fortschrittsbalken 0→100 % via rAF, quantisiert, % über
   ref.textContent) → done („Wieder online", Stempel „Wiederhergestellt").
   IO threshold 0.4, einmalig, kein Loop; statischer Endzustand für
   SSR/No-JS/Reduced-Motion.
═══════════════════════════════════════════════════════════════════════════ */
const RESTORE_BACKUPS = [
  { label: "Heute 03:00", size: "2,1 GB" },
  { label: "Gestern 03:00", size: "2,1 GB" },
  { label: "Vor 2 Tagen", size: "2,0 GB" },
  { label: "Vor 3 Tagen", size: "2,0 GB" },
];

type RestorePhase = "static" | "armed" | "incident" | "select" | "restore" | "done";

function RestoreDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<RestorePhase>("static");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setPhase("incident");
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Phasenkette incident → select → restore */
  useEffect(() => {
    if (phase === "incident") {
      const t = setTimeout(() => setPhase("select"), 750);
      return () => clearTimeout(t);
    }
    if (phase === "select") {
      const t = setTimeout(() => setPhase("restore"), 650);
      return () => clearTimeout(t);
    }
  }, [phase]);

  /* Fortschritt 0→100 % in ~1,8 s — rAF quantisiert, kein Re-Render */
  useEffect(() => {
    if (phase !== "restore") return;
    const start = performance.now();
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800);
      const v = Math.round((1 - Math.pow(1 - t, 2)) * 100);
      if (v !== last) {
        last = v;
        if (pctRef.current) pctRef.current.textContent = `${v} %`;
        if (barRef.current) barRef.current.style.width = `${v}%`;
      }
      if (t < 1) raf = requestAnimationFrame(tick);
      else setPhase("done");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const isStatic = phase === "static";
  const fertig = isStatic || phase === "done";
  const incident = phase === "incident" || phase === "select" || phase === "restore";
  const selected = phase === "select" || phase === "restore" || fertig;

  return (
    <div
      ref={wrapRef}
      className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_28px_70px_-26px_rgba(26,26,26,0.28)]"
    >
      <div className="flex items-center gap-2.5 px-5 sm:px-6 py-4 border-b border-border bg-offwhite/60">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#C2722A" }} />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Backup-Wiederherstellung · Beispiel</span>
      </div>

      <div className="p-5 lg:p-6">
        {/* Site-Karte */}
        <div className="relative rounded-xl border border-border px-4 py-3">
          {fertig && (
            <span
              className="serp-stamp pointer-events-none absolute -right-2 -top-3.5 z-10 rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-white"
              style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)", boxShadow: "0 10px 24px -8px rgba(194,114,42,0.6)" }}
            >
              Wiederhergestellt
            </span>
          )}
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }}
              aria-hidden="true"
            >
              W
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[12px] font-semibold text-dark">ihre-website.de</span>
              <span className="mt-1.5 block space-y-1" aria-hidden="true">
                <span
                  className="block h-1.5 rounded transition-opacity duration-400"
                  style={{ background: "#dcd7d0", width: "72%", opacity: incident ? 0.4 : 1 }}
                />
                <span
                  className="block h-1.5 rounded transition-opacity duration-400"
                  style={{ background: "#ece8e2", width: "48%", opacity: incident ? 0.4 : 1 }}
                />
              </span>
            </span>
            <span className="flex h-6 items-center">
              {incident && (
                <span
                  className="ae-in whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold"
                  style={{ background: "rgba(194,114,42,0.10)", color: "#C2722A" }}
                >
                  Fehler nach Plugin-Update
                </span>
              )}
              {fertig && (
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ${isStatic ? "" : "ae-in"}`}
                  style={{ background: "rgba(45,164,78,0.1)", color: "#2DA44E" }}
                >
                  ● Wieder online
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Backup-Liste */}
        <div className="mt-3 space-y-2">
          {RESTORE_BACKUPS.map((b, i) => {
            const hi = i === 0 && selected;
            return (
              <div
                key={b.label}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors duration-300"
                style={
                  hi
                    ? { border: "1px solid #d99a57", background: "#fbf4ea" }
                    : { border: "1px solid var(--color-border)", background: "var(--color-offwhite)" }
                }
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#2DA44E" }} />
                <span className="text-[13px] font-medium text-dark flex-1">{b.label}</span>
                {hi && (
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] ${isStatic ? "" : "ae-in"}`}
                    style={
                      fertig
                        ? { background: "rgba(45,164,78,0.1)", color: "#2DA44E" }
                        : { background: "rgba(194,114,42,0.10)", color: "#C2722A" }
                    }
                  >
                    {fertig ? "eingespielt" : "wird eingespielt"}
                  </span>
                )}
                <span className="font-mono text-[11px] text-dark/40">{b.size}</span>
                <span className="text-[10px] font-bold" style={{ color: "#2DA44E" }}>
                  OK
                </span>
              </div>
            );
          })}
        </div>

        {/* Fortschritts-Zeile */}
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between gap-4 mb-2 font-mono text-[11px]">
            <span
              className={phase === "restore" ? "animate-pulse" : ""}
              style={{ color: fertig ? "#2DA44E" : phase === "restore" ? "#C2722A" : "rgba(26,26,26,0.4)" }}
            >
              {fertig
                ? "● Wiederherstellung abgeschlossen"
                : phase === "restore"
                  ? "● Backup wird eingespielt …"
                  : "○ Letzter fehlerfreier Stand wird gewählt …"}
            </span>
            <span ref={pctRef} className="text-dark/50">
              {fertig ? "100 %" : "0 %"}
            </span>
          </div>
          <div className="h-3 rounded-full bg-dark/[0.06] overflow-hidden">
            <div
              ref={barRef}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", width: fertig ? "100%" : "0%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Wartungspakete — Preise & Leistungslisten FIX aus dem Bestand ────────── */
const PAKETE = [
  {
    id: "basis",
    name: "Basis",
    price: "ab 49 €",
    period: "/Monat",
    note: "Monatlich kündbar",
    highlight: false,
    features: [
      "WordPress Core-Updates",
      "Plugin- & Theme-Updates",
      "Wöchentliche Backups",
      "Uptime-Monitoring",
      "Security-Grundcheck",
      "E-Mail-Support",
    ],
    einordnung:
      "Basis passt für Websites mit überschaubarem Umfang und geringem Risiko – Broschüren-Seiten, Blogs oder kleine Portfolios, bei denen ein wöchentlicher Backup-Rhythmus ausreicht.",
  },
  {
    id: "plus",
    name: "Plus",
    price: "ab 99 €",
    period: "/Monat",
    note: "Monatlich kündbar",
    highlight: true,
    features: [
      "Alles aus Basis",
      "Tägliche Backups & 1-Klick-Restore",
      "Update-Test auf Staging vor Live",
      "Malware-Scan & Security-Hardening",
      "Performance-Monitoring",
      "Core Web Vitals Check",
      "Bugfixes & kleiner Support (1 h/Monat)",
    ],
    einordnung:
      "Unsere Empfehlung für geschäftskritische Websites, bei denen ein gebrochenes Layout oder ein Tagesausfall echten Umsatz kostet – und ein Staging-Test vor jedem Update deshalb Pflicht ist.",
  },
  {
    id: "premium",
    name: "Premium",
    price: "ab 199 €",
    period: "/Monat",
    note: "Monatlich kündbar",
    highlight: false,
    features: [
      "Alles aus Plus",
      "Priorisierter Support (< 4 h Reaktion)",
      "Erweiterte Bugfixes & Support (3 h/Monat)",
      "Monatlicher Wartungsbericht",
      "WooCommerce-Pflege inklusive",
      "Performance-Optimierung aktiv",
      "Persönlicher Ansprechpartner",
    ],
    einordnung:
      "Für WooCommerce-Shops und Websites mit hohem Traffic, bei denen Ausfälle direkt Bestellungen kosten und ein fester Ansprechpartner mit priorisierter Reaktionszeit den Unterschied macht.",
  },
];

/* ─── Kontaktformular (dunkel) — Logik 1:1 aus dem Bestand ─────────────────── */
type PaketId = "basis" | "plus" | "premium" | "";

function WordpressContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [paket, setPaket] = useState<PaketId>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const paketLabel = PAKETE.find((p) => p.id === paket)?.name ?? "keine Angabe";
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: `Paket: ${paketLabel}\nWordPress-URL: ${(form.elements.namedItem("wpurl") as HTMLInputElement).value}\n\n${(form.elements.namedItem("message") as HTMLTextAreaElement).value}`,
      city: "WordPress-Wartung",
    };
    try {
      const res = await fetch("/api/city-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        setPaket("");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error || "Unbekannter Fehler");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Netzwerkfehler – bitte versuchen Sie es erneut.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm text-center py-14">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(45,164,78,0.15)" }}>
          <svg className="h-7 w-7" style={{ color: "#2DA44E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">Anfrage gesendet</h3>
        <p className="mt-2 text-sm text-white/60 max-w-xs mx-auto">Vielen Dank! Sie hören innerhalb von 24 Stunden von uns.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="wp-name" className="block text-sm font-medium text-white/80 mb-1.5">
            Name <span className="text-primary-light">*</span>
          </label>
          <input id="wp-name" name="name" type="text" required placeholder="Max Mustermann" className={inputClass} />
        </div>
        <div>
          <label htmlFor="wp-company" className="block text-sm font-medium text-white/80 mb-1.5">
            Unternehmen
          </label>
          <input id="wp-company" name="company" type="text" placeholder="Musterfirma GmbH" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="wp-email" className="block text-sm font-medium text-white/80 mb-1.5">
            E-Mail <span className="text-primary-light">*</span>
          </label>
          <input id="wp-email" name="email" type="email" required placeholder="max@musterfirma.de" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="wp-url" className="block text-sm font-medium text-white/80 mb-1.5">
            WordPress-URL <span className="text-white/35 font-normal">(optional)</span>
          </label>
          <input id="wp-url" name="wpurl" type="url" placeholder="https://ihre-website.de" className={inputClass} />
        </div>
      </div>

      {/* Paket-Vorauswahl — 3 kompakte Kacheln, FIX-Preise aus dem Bestand */}
      <div className="mt-5">
        <span className="block text-sm font-medium text-white/80 mb-2">
          Welches Paket interessiert Sie? <span className="text-white/35 font-normal">(optional)</span>
        </span>
        <div className="grid grid-cols-3 gap-2">
          {PAKETE.map((pk) => {
            const active = paket === pk.id;
            return (
              <label
                key={pk.id}
                className="relative flex cursor-pointer flex-col gap-1 rounded-xl px-3 py-2.5 transition-all duration-200"
                style={{
                  border: active ? "1px solid rgba(194,114,42,0.6)" : "1px solid rgba(255,255,255,0.1)",
                  background: active ? "rgba(194,114,42,0.10)" : "rgba(255,255,255,0.06)",
                }}
              >
                <input
                  type="radio"
                  name="paket"
                  value={pk.id}
                  checked={active}
                  onChange={() => setPaket(pk.id as PaketId)}
                  className="sr-only"
                />
                {pk.highlight && (
                  <span
                    className="absolute -top-2 right-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white"
                    style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                  >
                    Empfohlen
                  </span>
                )}
                <span className="text-[13px] font-bold text-white">{pk.name}</span>
                <span className="text-right font-mono text-[12px] font-semibold text-primary-light">{pk.price}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="wp-message" className="block text-sm font-medium text-white/80 mb-1.5">
          Ihre Nachricht <span className="text-white/35 font-normal">(optional)</span>
        </label>
        <textarea
          id="wp-message"
          name="message"
          rows={4}
          placeholder="Wie wird Ihre Website aktuell betreut? Gab es zuletzt Probleme?"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && <p className="mt-4 text-sm text-red-400">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Wird gesendet …
          </>
        ) : (
          "WordPress-Wartung anfragen"
        )}
      </button>
      <p className="mt-3 text-center text-xs text-white/30">Kostenlos &amp; unverbindlich · Antwort in unter 24 h · Monatlich kündbar</p>
    </form>
  );
}

/* ─── Intro-Dossier — drei System-Blöcke ───────────────────────────────────── */
const INTRO_BLOCKS: { kicker: string; chips: string[]; text: React.ReactNode }[] = [
  {
    kicker: "01 — Updates ohne Risiko",
    chips: ["Staging"],
    text: (
      <>
        Ein Update ist bei uns nie ein Klick auf der Live-Website. Jede Aktualisierung von Core, Plugins und
        Theme durchläuft zuerst eine <strong className="text-dark font-semibold">identische Staging-Kopie</strong>{" "}
        Ihrer Website, auf der Darstellung, Funktionen und Formulare geprüft werden — live geht nur, was diesen
        Test bestanden hat. So bleibt Ihr Layout intakt, auch wenn mehrere Plugins ineinandergreifen.
      </>
    ),
  },
  {
    kicker: "02 — Sicherung & Absicherung",
    chips: ["Externe Backups", "WAF"],
    text: (
      <>
        Ihre komplette Installation wird{" "}
        <strong className="text-dark font-semibold">extern gesichert — unabhängig vom Server</strong>, auf dem
        Ihre Website läuft: im Basis-Paket wöchentlich, ab Plus jede Nacht. Dazu kommen Login-Schutz, eine{" "}
        <strong className="text-dark font-semibold">Web Application Firewall</strong>, laufende Malware-Scans und
        die Härtung von Dateiberechtigungen und Konfiguration, damit Auffälligkeiten erkannt werden, bevor daraus
        ein sichtbarer Vorfall wird.
      </>
    ),
  },
  {
    kicker: "03 — Betrieb & Verantwortung",
    chips: ["< 24 h"],
    text: (
      <>
        Ihre Website wird <strong className="text-dark font-semibold">rund um die Uhr auf Erreichbarkeit
        überwacht</strong>; kleinere Fehler beheben wir je nach Paket direkt im monatlichen Bugfix-Budget. Sie
        haben einen <strong className="text-dark font-semibold">festen Ansprechpartner</strong>, erhalten
        Antworten in unter 24 Stunden — und bleiben dabei{" "}
        <strong className="text-dark font-semibold">monatlich kündbar</strong>, ohne Jahresvertrag.
      </>
    ),
  },
];

/* ─── Risiko-Register — 4 Zellen mit Anker auf den Protokoll-Eintrag ───────── */
const RISIKEN = [
  {
    nr: "01",
    titel: "Sicherheitslücken & Malware",
    text: "Veraltete Plugins und Themes sind der häufigste Einstiegspunkt für automatisierte Angriffe — Scanner durchsuchen oft schon innerhalb weniger Stunden das gesamte Web nach einer bekannt gewordenen Lücke. Eingeschleuste Schadsoftware versendet Phishing-Mails, injiziert Spam-Code und führt zu Warnhinweisen in Google und Chrome.",
    anker: "#leistung-03",
    ankerLabel: "Protokoll 03 · Security-Hardening",
  },
  {
    nr: "02",
    titel: "Update bricht das Layout",
    text: "Ein Plugin- oder Theme-Update ohne vorherigen Test kann Formulare, Checkout-Prozesse oder ganze Seitenbereiche lahmlegen. Wird es direkt live eingespielt, bemerken meist zuerst die Besucher den Fehler — etwa wenn eine Bestellung nicht mehr durchläuft — und nicht der Betreiber selbst.",
    anker: "#leistung-01",
    ankerLabel: "Protokoll 01 · Staging-Test",
  },
  {
    nr: "03",
    titel: "Datenverlust ohne externes Backup",
    text: "Ohne aktuelle, extern gespeicherte Backups sind ein fehlgeschlagenes Update, ein Hack oder ein Server-Ausfall im Zweifel nicht mehr rückgängig zu machen. Lokale Backups auf demselben Server helfen bei einem Totalausfall ohnehin nicht weiter.",
    anker: "#leistung-02",
    ankerLabel: "Protokoll 02 · Externe Backups",
  },
  {
    nr: "04",
    titel: "Schleichender Performance-Verfall",
    text: "Ungepflegte Datenbanken, aufgeblähter Plugin-Code und veraltete PHP-Versionen bremsen jede Seite spürbar aus — Ladezeiten steigen über Monate statt schlagartig. Schwache Core Web Vitals und Serverfehler während des Crawls kosten zusätzlich Sichtbarkeit bei Google.",
    anker: "#leistung-04",
    ankerLabel: "Protokoll 04 · Performance",
  },
];

/* ─── Wartungsprotokoll — 5 Leistungen, indexierbarer Volltext ─────────────── */
const PROTOKOLL: {
  nr: string;
  id: string;
  titel: string;
  text: string;
  rhythmus: string;
  chips: { label: string; solid: boolean }[];
}[] = [
  {
    nr: "01",
    id: "leistung-01",
    titel: "Core-, Plugin- & Theme-Updates mit Staging-Test",
    text: "Wir spielen WordPress-Core-Updates sowie Aktualisierungen für Plugins und Theme regelmäßig und kontrolliert ein, statt Update-Benachrichtigungen im Backend einfach zu ignorieren. Ab dem Plus-Paket testen wir jedes Update zuerst auf einer identischen Staging-Umgebung — inklusive Formularen, Checkout und individuellen Templates —, damit Ihr Layout auf der Live-Website garantiert nicht bricht. Nach jedem größeren Update prüfen wir zusätzlich gängige Page-Builder wie Elementor, Divi oder den WordPress-eigenen Gutenberg-Editor gezielt auf korrekte Darstellung und Funktion.",
    rhythmus: "kontrolliert je Release",
    chips: [
      { label: "ab Basis", solid: false },
      { label: "Staging ab Plus", solid: true },
    ],
  },
  {
    nr: "02",
    id: "leistung-02",
    titel: "Tägliche externe Backups & 1-Klick-Restore",
    text: "Je nach Paket sichern wir Ihre komplette Installation — Datenbank, Dateien und Medien — wöchentlich oder täglich extern, unabhängig vom Hosting-Server, auf dem Ihre Website eigentlich läuft. Bei einem Problem stellen wir den letzten funktionierenden Stand innerhalb von Minuten wieder her, statt tagelang nach der Fehlerursache zu suchen.",
    rhythmus: "Basis wöchentlich, ab Plus täglich",
    chips: [
      { label: "ab Basis", solid: false },
      { label: "täglich ab Plus", solid: true },
    ],
  },
  {
    nr: "03",
    id: "leistung-03",
    titel: "Security-Hardening, WAF & Malware-Scan",
    text: "Wir härten Login-Bereich, Dateiberechtigungen und WordPress-Konfiguration ab, deaktivieren nicht benötigte Funktionen und setzen eine Web Application Firewall ein. Regelmäßige Malware-Scans erkennen Auffälligkeiten meist, bevor daraus ein sichtbarer Vorfall mit Blacklisting oder Datenverlust wird.",
    rhythmus: "laufend",
    chips: [
      { label: "Grundcheck ab Basis", solid: false },
      { label: "ab Plus", solid: true },
    ],
  },
  {
    nr: "04",
    id: "leistung-04",
    titel: "Performance & Core Web Vitals",
    text: "Wir behalten Ladezeiten, Serverantwortzeiten und die Core Web Vitals Ihrer Website laufend im Blick und optimieren Caching, Bildgrößen und unnötig ladende Skripte. Das schützt gleichermaßen die Nutzererfahrung auf dem Smartphone und Ihr Ranking bei Google, das mobile Performance direkt bewertet.",
    rhythmus: "laufend gemessen",
    chips: [{ label: "ab Plus", solid: true }],
  },
  {
    nr: "05",
    id: "leistung-05",
    titel: "Uptime-Monitoring & Bugfix-Budget",
    text: "Ihre Website wird laufend auf Erreichbarkeit geprüft — fällt sie aus, bemerken wir das in der Regel, bevor die meisten Besucher es überhaupt merken. Ab dem Plus-Paket beheben wir kleinere Fehler und Anpassungen direkt im monatlichen Support-Kontingent von einer Stunde, im Premium-Paket von drei Stunden, ohne dass dafür eine separate Rechnung entsteht. Im Premium-Paket erhalten Sie außerdem monatlich einen Wartungsbericht über durchgeführte Updates, erkannte Probleme und den technischen Zustand Ihrer Website.",
    rhythmus: "rund um die Uhr",
    chips: [
      { label: "ab Basis", solid: false },
      { label: "Bugfixes ab Plus", solid: true },
    ],
  },
];

/* ─── Zusicherungs-Band — Pill-Sequenz (Leistung + Akzent im Wechsel) ──────── */
const BAND_LEISTUNG = [
  { label: "Core-Updates", d: "M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-14.3-3.7L4 8M4 14a8 8 0 0 0 14.3 3.7L20 16" },
  { label: "Staging-Tests", d: "M8 8h12v12H8ZM4 16V4h12" },
  { label: "Tägliche Backups", d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" },
  { label: "Malware-Scan", d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" },
  { label: "WAF & Hardening", d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { label: "Core Web Vitals", d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" },
  { label: "Uptime-Monitoring", d: "M3 12h4l2-7 4 14 2-7h6" },
  {
    label: "WooCommerce-Pflege",
    d: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z",
  },
];
const BAND_AKZENT = ["Monatlich kündbar", "Kein Lock-in", "Antwort < 24 h", "ab 49 €/Monat"];
/* Reihenfolge: nach je zwei Leistungs-Pills eine Akzent-Pill */
const BAND_SEQ: ({ typ: "l"; label: string; d: string } | { typ: "a"; label: string })[] = [];
BAND_LEISTUNG.forEach((l, i) => {
  BAND_SEQ.push({ typ: "l", ...l });
  if (i % 2 === 1) BAND_SEQ.push({ typ: "a", label: BAND_AKZENT[(i - 1) / 2] });
});

/* ─── Übernahme-Protokoll — 4 Arbeitspakete (bewusst keine Timeline) ───────── */
const UEBERNAHME = [
  {
    nr: "01",
    titel: "Zugänge & Bestandsaufnahme",
    text: "Wir übernehmen WP-Admin- und Hosting-Zugang und prüfen Ihre bestehende Installation im Detail: Core-Version, installierte Plugins und Themes, aktuelle Backup-Situation und bereits bekannte Schwachstellen in eingesetzten Komponenten. Daraus ergibt sich, welches Paket wirklich zu Ihrer Website und Ihrem Risiko passt — nicht andersherum.",
    erhalten: "Bestandsübersicht Ihrer Installation",
  },
  {
    nr: "02",
    titel: "Erstsicherung",
    text: "Noch vor dem ersten Eingriff erstellen wir ein vollständiges externes Baseline-Backup — Datenbank, Dateien und Medien, unabhängig von Ihrem Server. Ab diesem Punkt läuft Ihre Website unter unserer laufenden Beobachtung, nicht mehr unbemerkt und ungeprüft vor sich hin wie zuvor.",
    erhalten: "Wiederherstellungspunkt",
  },
  {
    nr: "03",
    titel: "Härtung & Rückstau abbauen",
    text: "Wir richten Login-Schutz, Dateiberechtigungen und Web Application Firewall ein und schließen offensichtliche Sicherheitslücken sofort, statt sie erst im nächsten regulären Wartungslauf zu beheben. Aufgelaufene Updates spielen wir zuerst auf der Staging-Kopie ein und prüfen dort Darstellung, Formulare und zentrale Funktionen — dank eigener CI/CD-Pipeline dauert das Ausspielen bereits getesteter Updates meist nur wenige Minuten statt Stunden.",
    erhalten: "aktueller, gehärteter Stand",
  },
  {
    nr: "04",
    titel: "Regelbetrieb",
    text: "Ab dann läuft die Wartung im vereinbarten Rhythmus: Updates, Backups, Monitoring und — je nach Paket — zusätzlich Reporting und ein festes Support-Kontingent für kleinere Anpassungen. Fragen oder Probleme melden Sie einfach direkt Ihrem Ansprechpartner, die Antwort erhalten Sie in unter 24 Stunden, im Premium-Paket priorisiert noch schneller.",
    erhalten: "laufender Schutz",
  },
];

/* ─── Vergleich — Selbst warten vs. Wartungsvertrag ────────────────────────── */
const VERGLEICH_SELBST = [
  "Updates, Tests und Fehlersuche kosten laufend Zeit, die im Tagesgeschäft neben Kundenprojekten oder dem eigenen Kerngeschäft meist fehlt",
  "Ohne eigene Staging-Umgebung geht ein fehlerhaftes Update direkt live — oft zuerst bemerkt durch Besucher, nicht durch den Betreiber selbst",
  "Bei einem Hack oder Datenverlust fehlt häufig das Fachwissen für eine schnelle, vollständige Wiederherstellung ohne bleibenden Datenverlust",
  "Reaktionszeit hängt von der eigenen Verfügbarkeit ab — am Wochenende, im Urlaub oder bei Krankheit bleibt ein Problem liegen",
];
const VERGLEICH_VERTRAG = [
  "Feste Routine nach Plan — Updates und Backups werden nicht vergessen, aufgeschoben oder aus Zeitmangel übersprungen",
  "Updates laufen zuerst auf einer Staging-Kopie, bevor sie auf der Live-Website landen",
  "Backups liegen extern gesichert und lassen sich per Knopfdruck zurückspielen, unabhängig vom Zustand des Servers",
  "Reaktionszeit ist vertraglich klar geregelt — Antwort in unter 24 Stunden, im Premium-Paket priorisiert unter 4 Stunden",
  "Fester Monatspreis ab 49 € — monatlich kündbar, ohne Jahresvertrag",
];

/* ─── FAQ — 8 Betreiberfragen ──────────────────────────────────────────────── */
const faqs = [
  {
    q: "Was kostet WordPress-Wartung bei SeoForge?",
    a: "Unsere Pakete starten bei 49 € im Monat für WordPress Core-, Plugin- und Theme-Updates, wöchentliche Backups und einen Security-Grundcheck. Das Plus-Paket liegt bei 99 € im Monat und ergänzt tägliche Backups, Staging-Tests vor jedem Update und Performance-Monitoring inklusive Core Web Vitals. Premium ab 199 € im Monat richtet sich an Shops und stark frequentierte Websites mit priorisiertem Support und persönlichem Ansprechpartner. Alle Preise verstehen sich zzgl. MwSt., welches Paket wirklich zu Ihrer Website passt, klären wir unverbindlich im kostenlosen Erstgespräch.",
  },
  {
    q: "Kann ich den Wartungsvertrag jederzeit kündigen?",
    a: "Ja. Alle drei Pakete sind monatlich kündbar, es gibt weder einen Jahresvertrag noch eine Mindestlaufzeit oder eine automatische Verlängerung mit langer Kündigungsfrist. Sie zahlen ausschließlich für die Monate, in denen Sie den Service tatsächlich nutzen. Eine Kündigung reicht formlos per E-Mail zum Monatsende – ohne Rückfragen, ohne Kleingedrucktes. Auch ein Wechsel zwischen den Paketen ist zum nächsten Monat jederzeit möglich, wenn sich Ihr Bedarf ändert.",
  },
  {
    q: "Was passiert bei einem Hack oder einem Ausfall?",
    a: "Wir spielen zunächst das letzte funktionierende Backup zurück, um Ihre Website schnellstmöglich wieder online zu bringen, statt zuerst lange nach der genauen Ursache zu suchen. Anschließend analysieren wir, was den Ausfall oder Hack ausgelöst hat – meist eine veraltete Komponente oder eine bekannte Schwachstelle – und schließen diese, bevor der Fehler erneut auftreten kann. Bei Verdacht auf Malware führen wir zusätzlich einen vollständigen Scan durch, entfernen Schadcode und informieren Sie transparent über Ursache und Ergebnis.",
  },
  {
    q: "Wie schnell reagieren Sie bei einem Problem?",
    a: "Grundsätzlich beantworten wir Anfragen in unter 24 Stunden – das gilt für alle drei Pakete ohne Ausnahme. Im Premium-Paket reagieren wir bei dringenden Problemen priorisiert und melden uns in der Regel in unter 4 Stunden, weil hier ein persönlicher Ansprechpartner direkt für Sie zuständig ist und Ihre Website kennt. Kritische Sicherheitsvorfälle wie ein akuter Hack behandeln wir unabhängig vom gebuchten Paket immer vorrangig, weil in solchen Fällen jede Stunde zählt.",
  },
  {
    q: "Worin unterscheidet sich WordPress-Wartung von Hosting-Wartung?",
    a: "Hosting-Wartung betrifft die Serverebene: Betriebssystem, PHP-Version, Datenbank-Server, Netzwerk und die grundlegende Infrastruktur, auf der Ihre Website läuft. Unsere WordPress-Wartung setzt eine Ebene darüber an – bei Core, Plugins, Themes, Inhalten und der Konfiguration innerhalb von WordPress selbst. Beides ergänzt sich, ersetzt sich aber nicht: Ein perfekt gewartetes Hosting schützt nicht vor einer veralteten Plugin-Lücke, und umgekehrt bewahrt die beste WordPress-Pflege nicht vor einem schlecht konfigurierten oder veralteten Server.",
  },
  {
    q: "Wie gehen Sie mit Plugin-Updates und Kompatibilitätsproblemen um?",
    a: "Vor jedem Update prüfen wir, ob für Ihre konkrete Plugin- und Theme-Kombination bereits bekannte Konflikte gemeldet sind, und werfen dazu auch einen Blick in Changelogs und Support-Foren der Hersteller. Ab dem Plus-Paket testen wir zusätzlich auf einer Staging-Kopie Ihrer Website, ob nach dem Update alles wie gewohnt funktioniert – Formulare, Checkout, Darstellung und individuelle Anpassungen. Erst wenn das bestätigt ist, spielen wir das Update auf die Live-Website. Bricht dennoch etwas, spielen wir den vorherigen Stand innerhalb von Minuten zurück.",
  },
  {
    q: "Betreuen Sie auch Websites mit Page-Buildern wie Elementor oder Divi?",
    a: "Ja, wir warten auch Websites, die mit Elementor, Divi, Beaver Builder oder dem WordPress-eigenen Block-Editor Gutenberg gebaut sind. Page-Builder reagieren bei Updates besonders empfindlich, weil sie tief in Layout, Rendering und teils auch in die Datenbankstruktur eingreifen. Deshalb prüfen wir nach jedem Update gezielt, ob Module, gespeicherte Templates und individuelle Anpassungen weiterhin korrekt dargestellt werden, statt uns nur auf den WordPress-Core selbst zu verlassen.",
  },
  {
    q: "Übernehmen Sie auch WooCommerce-Shops?",
    a: "Ja. Im Premium-Paket ist die WooCommerce-Pflege inklusive: Wir pflegen WooCommerce sowie die verknüpften Zahlungs- und Versand-Plugins mit – Bereiche, die bei allgemeinen WordPress-Updates besonders leicht brechen. Ein Ausfall im Checkout kostet an einem einzigen Tag oft mehr, als die gesamte Wartung im Monat kostet. Große Shops und Multi-Sites kalkulieren wir individuell, da der Aufwand hier stark vom Umfang des Shops abhängt.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WordpressWartungClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Navbar />
      <ScrollProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        .m3d { opacity: 0; transform: translateY(60px) rotateX(-14deg) scale(0.97); transform-origin: 50% 18%; transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); will-change: transform; backface-visibility: hidden; }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @keyframes chipPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .chip-dot { animation: chipPulse 2.4s ease-in-out infinite; }
        .scroll-hidden.rv-left { transform: translateX(-56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-right { transform: translateX(56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-scale { transform: translateY(28px) scale(0.93); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-blur { filter: blur(12px); transform: translateY(26px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-left.scroll-visible, .scroll-hidden.rv-right.scroll-visible, .scroll-hidden.rv-scale.scroll-visible, .scroll-hidden.rv-blur.scroll-visible { transform: none; filter: none; }
        @keyframes stampIn { 0% { opacity: 0; transform: rotate(-10deg) scale(2); } 65% { opacity: 1; transform: rotate(-10deg) scale(0.92); } 100% { opacity: 1; transform: rotate(-10deg) scale(1); } }
        .serp-stamp { opacity: 0; animation: stampIn 0.55s cubic-bezier(0.2, 1.4, 0.4, 1) 0.15s both; }
        @keyframes serpCaret { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }
        .serp-caret { animation: serpCaret 0.9s step-end infinite; }
        @keyframes aeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ae-in { animation: aeIn 0.4s ease both; }
        @keyframes ccIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
        .cc-in { animation: ccIn 0.45s ease both; }
        @keyframes chipPop { 0% { opacity: 0; transform: scale(0.4); } 65% { opacity: 1; transform: scale(1.12); } 100% { opacity: 1; transform: scale(1); } }
        .ok-pop { animation: chipPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes marquee-rtl { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .m3d { opacity: 1; transform: none; transition: none; }
          .chip-dot { animation: none; }
          .scroll-hidden.rv-left, .scroll-hidden.rv-right, .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
          .serp-stamp { opacity: 1; animation: none; transform: rotate(-10deg); }
          .serp-caret { animation: none; opacity: 0; }
          .ae-in { animation: none; opacity: 1; transform: none; }
          .cc-in { animation: none; opacity: 1; transform: none; }
          .ok-pop { animation: none; opacity: 1; transform: none; }
          .marquee-track { animation: none !important; }
        }
      `}</style>

      {/* ══ 01 HERO — Zentrierter Leitstand-Hero ══ */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-1/2 top-[-16%] h-[560px] w-[900px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(212,168,83,0.16), transparent 60%)" }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.045) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 60% 45% at 50% 80%, #000 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 45% at 50% 80%, #000 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8 pt-28 lg:pt-36 pb-20 lg:pb-24 text-center">
          <div className="hero-badge mb-5 inline-flex items-center gap-2.5">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">WordPress-Wartung &amp; Pflege</span>
            <span className="h-px w-8 bg-primary" />
          </div>

          <h1
            className="hero-title font-[family-name:var(--font-heading)] font-medium leading-[1.02] tracking-tight text-dark"
            style={{ fontSize: "clamp(38px, 4.6vw, 64px)" }}
          >
            WordPress-Wartung, die nachts arbeitet —
            <br />
            <span style={grad}>geprüft, gesichert, wiederherstellbar.</span>
          </h1>

          <p className="hero-description mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Wir übernehmen Core-, Plugin- und Theme-Updates, regelmäßige Backups, Security-Hardening und
            Performance-Monitoring für Ihre WordPress-Seite — jedes Update testen wir zuerst auf einer
            Staging-Kopie, bevor es live geht, damit Layout und Formulare intakt bleiben. Die Betreuung startet
            ab 49 € im Monat, ist monatlich kündbar und läuft ohne Jahresvertrag oder versteckte
            Mindestlaufzeit.
          </p>

          <div className="hero-cta mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
            >
              WordPress-Wartung anfragen
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#pakete"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-dark transition-all hover:border-primary/40"
            >
              Pakete &amp; Preise vergleichen
            </a>
          </div>

          <p className="hero-cta mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-dark/50">
            Monatlich kündbar · Staging-Test vor jedem Update · Antwort &lt; 24 h
          </p>

          {/* Wartungs-Leitstand — Interaktions-Höhepunkt 1/2 */}
          <div className="relative mx-auto mt-12 lg:mt-14 max-w-5xl">
            <div className="m3d">
              <WartungsLeitstand />
            </div>
            <p className="mt-3 text-xs italic text-muted">Beispielansicht — keine Live-Daten.</p>
          </div>
        </div>
      </section>

      {/* ══ 02 INTRO — Dossier: Wartung als System ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Links — Dossier */}
            <div>
              <div className="scroll-hidden rv-left">
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was WordPress-Wartung umfasst</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight">
                  Wartung ist kein Update-Klick —<br />
                  <span style={grad}>es ist ein System.</span>
                </h2>
                <p className="mt-5 text-[15px] text-muted leading-relaxed">
                  Unsere WordPress-Wartung ist der CMS-spezifische Teil unserer{" "}
                  <Link href="/website-wartung" className="text-primary font-semibold hover:underline">
                    Website-Wartung allgemein
                  </Link>{" "}
                  — hier die konkreten Leistungen, die Monat für Monat für Sie laufen.
                </p>
              </div>
              <div className="mt-2 divide-y divide-border">
                {INTRO_BLOCKS.map((b, i) => (
                  <div key={b.kicker} className="scroll-hidden rv-blur py-7 lg:py-8" style={{ transitionDelay: `${i * 90}ms` }}>
                    <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-3">{b.kicker}</span>
                    <p className="text-[15px] text-muted leading-relaxed">{b.text}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {b.chips.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/50"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rechts — 3D-Bild, wandert beim Lesen mit */}
            <div className="scroll-hidden rv-right lg:sticky lg:top-28" style={{ transitionDelay: "120ms" }}>
              <div className="group relative rounded-2xl overflow-hidden border border-border shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/wpwartung-3d-werkstatt.png"
                  alt="3D-Illustration einer Werkstatt: WordPress-Kugel auf einer Hebebühne, umgeben von Zahnrädern und Schraubenschlüssel als Symbol für systematische Wartung"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Updates, Backups, Härtung — ein Werkstatt-Rhythmus statt Einzelaktionen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 RISIKEN — Ghost-Watermark + Risiko-Register ══ */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <span
          className="pointer-events-none select-none absolute -top-6 right-0 font-[family-name:var(--font-heading)] font-black leading-none text-dark opacity-[0.04]"
          style={{ fontSize: "clamp(120px, 18vw, 280px)" }}
          aria-hidden="true"
        >
          43&thinsp;%
        </span>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Bild links */}
            <div className="scroll-hidden rv-left lg:order-first">
              <div className="group relative rounded-2xl overflow-hidden border border-border shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/wpwartung-3d-risiko.png"
                  alt="3D-Illustration einer angeschlagenen WordPress-Kugel mit Rissen, die von einem Wagenheber gestützt wird — Sinnbild für eine ungewartete Website"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Eine ungewartete Website altert nicht sichtbar — bis sie ausfällt.</p>
            </div>

            {/* Copy rechts */}
            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Warum Wartung Pflicht ist</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-6">
                Ungewartet ist<br />
                <span style={grad}>das teuerste WordPress.</span>
              </h2>
              <div className="space-y-4 text-[15px] text-muted leading-relaxed">
                <p>
                  WordPress betreibt nach gängigen Marktstatistiken rund{" "}
                  <strong className="text-dark font-semibold">43 % aller Websites weltweit</strong> — und ist damit
                  ein bevorzugtes Ziel für automatisierte Angriffe. Sicherheitslücken in Plugins oder im Core werden
                  häufig <strong className="text-dark font-semibold">innerhalb weniger Stunden</strong> nach ihrer
                  Veröffentlichung aktiv ausgenutzt, meist durch Bots, die das gesamte Netz systematisch nach
                  ungepatchten Versionsnummern durchsuchen — nicht durch einen gezielten Angriff auf Ihr Unternehmen,
                  sondern durch den reinen Zufall der eingesetzten Software-Version. Wer Updates aufschiebt, riskiert
                  eine gehackte Website und gestohlene Kundendaten. Bei personenbezogenen Daten in Kontaktformularen,
                  Newsletter-Anmeldungen oder einem Shop-Backend kommt zum technischen Schaden schnell eine{" "}
                  <strong className="text-dark font-semibold">meldepflichtige Datenschutzverletzung</strong> hinzu,
                  die zusätzlichen Aufwand und im ungünstigsten Fall ein Bußgeld nach sich zieht.
                </p>
                <p>
                  Neben der Sicherheit leidet mit der Zeit auch die Performance. Nicht aktualisierte Plugins sammeln
                  über Monate Datenbank-Reste, verwaiste Tabellen und ungenutzten Code an, der bei jedem Seitenaufruf
                  mitgeladen wird, ohne einen erkennbaren Nutzen zu bringen. Caches werden nicht neu konfiguriert,
                  Bildformate bleiben unoptimiert, und die eingesetzte PHP-Version hinkt oft Jahre hinter dem
                  zurück, was Hosting und aktuelle Plugins eigentlich unterstützen würden. Das Ergebnis:{" "}
                  <strong className="text-dark font-semibold">längere Ladezeiten, höhere Absprungraten</strong>{" "}
                  gerade auf mobilen Geräten und ein technischer Rückstand, der sich selten in einem einzigen
                  Wartungslauf aufholen lässt — meist braucht es mehrere Zyklen, bis eine vernachlässigte Website
                  wieder auf einem sauberen Stand läuft.
                </p>
              </div>
            </div>
          </div>

          {/* Risiko-Register — Hairline-Grid, jede Angst verlinkt auf den Protokoll-Eintrag */}
          <div className="mt-12 lg:mt-16 grid gap-px bg-border border border-border rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            {RISIKEN.map((r, i) => (
              <div key={r.nr} className="scroll-hidden rv-scale bg-white" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="group relative h-full flex flex-col p-6 lg:p-7 transition-colors duration-300 hover:bg-[#FBF8F4]">
                  <span
                    className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] tracking-[0.18em] text-dark/45 mb-3">RISIKO {r.nr}</span>
                  <span className="font-bold text-dark mb-2">{r.titel}</span>
                  <p className="text-sm text-muted leading-relaxed flex-1">{r.text}</p>
                  <div className="mt-4 border-t border-border pt-3">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-1">Abgesichert durch:</span>
                    <a href={r.anker} className="font-mono text-xs text-primary hover:underline">
                      {r.ankerLabel} ↓
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sichtbarkeits-Absatz — schließt das Risiko-Kapitel */}
          <div className="scroll-hidden rv-blur mt-10 max-w-3xl">
            <p className="text-[15px] text-muted leading-relaxed">
              Diese Vernachlässigung wirkt sich direkt auf Ihre Sichtbarkeit aus.{" "}
              <strong className="text-dark font-semibold">Core Web Vitals sind ein bestätigter Rankingfaktor</strong>,
              und eine Website, die während des Googlebot-Crawls down ist oder Serverfehler ausliefert, verliert
              Indexierungsvertrauen — das baut sich nur langsam wieder auf, oft über mehrere Wochen. Auch für
              Besucher wirkt eine langsame oder fehlerhafte Seite unseriös, was sich in Absprungrate und Conversion
              niederschlägt, lange bevor der Effekt überhaupt in den Rankings sichtbar wird. Bei{" "}
              <Link href="/" className="text-primary font-semibold hover:underline">
                SeoForge
              </Link>{" "}
              sehen wir diesen Zusammenhang aus zwei Richtungen: als technischer Wartungsdienstleister und als SEO-
              und GEO-Agentur, die genau weiß, wie stark technische Signale die Sichtbarkeit in Google und in
              KI-gestützten Suchergebnissen wie der Google AI Overview beeinflussen.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 04 LEISTUNGEN — Das Wartungsprotokoll (Dokument-Metapher) ══ */}
      <section id="leistungen" className="scroll-mt-20 py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Leistungen"
            title={
              <>
                Das Wartungsprotokoll: fünf Leistungen,{" "}
                <span style={grad}>ein Rhythmus.</span>
              </>
            }
            copy="Kein Leistungskatalog-Theater — die konkreten Aufgaben, Monat für Monat, voll einsehbar."
          />

          <div className="m3d rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
              <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">SeoForge · Leistungsverzeichnis WordPress-Wartung</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">01–05</span>
            </div>

            {PROTOKOLL.map((l) => (
              <div
                key={l.nr}
                id={l.id}
                className="scroll-hidden rv-right group relative border-b border-border last:border-b-0 transition-colors hover:bg-[#FBF8F4] scroll-mt-28"
                style={{ transitionDelay: `${(parseInt(l.nr, 10) - 1) * 50}ms` }}
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(180deg, #C2722A, #D4A853)" }}
                  aria-hidden="true"
                />
                <div className="grid md:grid-cols-[90px_1fr_auto] gap-4 lg:gap-6 p-6 lg:p-8 items-start">
                  <span
                    className="font-[family-name:var(--font-heading)] text-5xl font-black text-primary/15 leading-none transition-colors duration-300 group-hover:text-primary/40"
                    aria-hidden="true"
                  >
                    {l.nr}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark group-hover:text-primary transition-colors mb-2">
                      {l.titel}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{l.text}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark/40">
                        Rhythmus: <span className="text-dark/70">{l.rhythmus}</span>
                      </span>
                      <span className="flex flex-wrap gap-1.5">
                        {l.chips.map((c) =>
                          c.solid ? (
                            <span
                              key={c.label}
                              className="inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary"
                              style={{ background: "#fbf4ea", border: "1px solid #ecd3ba" }}
                            >
                              {c.label}
                            </span>
                          ) : (
                            <span
                              key={c.label}
                              className="inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/60"
                            >
                              {c.label}
                            </span>
                          )
                        )}
                      </span>
                    </div>
                  </div>
                  <span
                    className="hidden md:flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-border text-dark/40 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 05 RESTORE-BEWEIS — Der Ernstfall, durchgespielt ══ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden rv-left">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Backups &amp; Wiederherstellung</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-5">
                Der Ernstfall,<br />
                <span style={grad}>durchgespielt.</span>
              </h2>
              <p className="text-muted leading-relaxed mb-7 max-w-lg">
                Jede Nacht wird Ihr komplettes WordPress extern gesichert — Datenbank, Dateien, Medien. Sollte nach
                einem Update, einem Hack oder einem menschlichen Fehler etwas schiefgehen, stellen wir Ihre Website
                innerhalb von Minuten auf den letzten fehlerfreien Stand zurück.
              </p>
              <ul className="space-y-3.5 mb-8">
                {[
                  "Externe Speicherung — unabhängig vom Server",
                  "Vollständige Wiederherstellung auf Knopfdruck",
                  "Kein Datenverlust, kein Ausfall-Drama",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-dark">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#pakete"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors"
              >
                Ab dem Plus-Paket täglich gesichert
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* RestoreDemo — Interaktions-Höhepunkt 2/2 */}
            <div>
              <div className="m3d">
                <RestoreDemo />
              </div>
              <p className="mt-3 text-xs italic text-muted">Illustrative Darstellung — so läuft eine 1-Klick-Wiederherstellung ab.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 06 ZUSICHERUNGS-BAND — einziges dunkles Akzentband (RTL-Marquee) ══ */}
      <section
        className="py-9 overflow-hidden"
        style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="marquee-wrap relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111111, transparent)" }} />
          <div className="marquee-track flex" style={{ width: "max-content", animation: "marquee-rtl 32s linear infinite", willChange: "transform" }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-3 px-1.5 flex-shrink-0" aria-hidden={copy === 1}>
                {BAND_SEQ.map((item, i) =>
                  item.typ === "l" ? (
                    <div
                      key={`${copy}-${i}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.10] bg-white/[0.03] flex-shrink-0 whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
                      </svg>
                      <span className="text-[13px] font-semibold text-white/65">{item.label}</span>
                    </div>
                  ) : (
                    <div
                      key={`${copy}-${i}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/40 bg-primary/10 flex-shrink-0 whitespace-nowrap"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-[13px] font-semibold text-primary">{item.label}</span>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 07 PAKETE — Drei Pakete, ein fester Monatspreis ══ */}
      <section id="pakete" className="scroll-mt-20 py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden rv-blur text-center mb-12 lg:mb-14">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Wartungspakete</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-4">
              Drei Pakete, <span style={grad}>ein fester Monatspreis.</span>
            </h2>
            <p className="text-muted leading-relaxed max-w-xl mx-auto">
              Alle Pakete monatlich kündbar. Kein Jahresvertrag, kein Lock-in. Welches Paket passt, hängt weniger
              von der Unternehmensgröße ab als vom tatsächlichen Risiko: Wie viel Traffic hat die Seite,
              verarbeitet sie Zahlungen, und wie teuer wäre ein Tag Ausfall für Sie? Den passenden Umfang klären
              wir im kostenlosen Erstgespräch.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {PAKETE.map((pk, i) => (
              <div key={pk.id} className="scroll-hidden rv-scale h-full" style={{ transitionDelay: `${i * 80}ms` }}>
                <div
                  className={`relative h-full rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
                    pk.highlight
                      ? "shadow-[0_28px_60px_-30px_rgba(194,114,42,0.35)]"
                      : "bg-white border border-border hover:-translate-y-1 hover:border-primary/30"
                  }`}
                  style={pk.highlight ? { background: "#fbf4ea", border: "1px solid #ecd3ba" } : undefined}
                >
                  {pk.highlight && (
                    <div
                      className="text-center py-2 text-[11px] font-bold tracking-[0.18em] uppercase text-white"
                      style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                    >
                      Empfohlen
                    </div>
                  )}
                  <div className="p-7 lg:p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <div className="text-sm font-bold text-dark/40 uppercase tracking-wider mb-1">{pk.name}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-[family-name:var(--font-heading)] font-bold text-4xl" style={grad}>
                          {pk.price}
                        </span>
                        <span className="text-sm text-muted">{pk.period}</span>
                      </div>
                      <div className="text-[11px] text-dark/40 mt-1">{pk.note}</div>
                    </div>

                    <ul className="space-y-3 flex-1">
                      {pk.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-dark">
                          <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p
                      className="mt-5 pt-4 text-[13px] text-muted leading-relaxed border-t"
                      style={{ borderColor: pk.highlight ? "#ecd3ba" : "var(--color-border)" }}
                    >
                      {pk.einordnung}
                    </p>

                    <a
                      href="#kontakt"
                      className="mt-6 block text-center rounded-full py-3.5 text-sm font-semibold transition-all"
                      style={
                        pk.highlight
                          ? { background: "var(--color-primary)", color: "#fff", boxShadow: "0 8px 24px -10px rgba(194,114,42,0.5)" }
                          : { border: "1.5px solid rgba(194,114,42,0.35)", color: "#C2722A" }
                      }
                    >
                      {pk.name} anfragen
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center font-mono text-xs text-dark/40">
            Alle Preise zzgl. MwSt. · WooCommerce-Shops und große Multi-Sites auf Anfrage.
          </p>
        </div>
      </section>

      {/* ══ 08 ÜBERNAHME — Protokoll-Tafel (bewusst keine Timeline) ══ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Ablauf & Übernahme"
            title={
              <>
                Übernahme in vier Arbeitspaketen —{" "}
                <span style={grad}>ohne Stillstand.</span>
              </>
            }
            copy="Vom ersten Zugang bis zum Regelbetrieb: vier definierte Arbeitspakete, jedes mit einem konkreten Ergebnis — Ihre Website bleibt dabei durchgehend online."
          />

          <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-center">
            {/* Tafel */}
            <div className="m3d rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Übernahme-Protokoll · Neue Wartungsmandate</span>
              </div>
              <div className="divide-y divide-border">
                {UEBERNAHME.map((s, i) => (
                  <div
                    key={s.nr}
                    className="scroll-hidden rv-left grid sm:grid-cols-[80px_1fr] gap-4 p-6 lg:p-7 transition-colors duration-300 hover:bg-[#FBF8F4]"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span
                      className="font-[family-name:var(--font-heading)] text-5xl font-black leading-none"
                      style={{
                        background: "linear-gradient(135deg, #C2722A, #D4A853)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      aria-hidden="true"
                    >
                      {s.nr}
                    </span>
                    <div>
                      <div className="font-bold text-dark mb-1.5">{s.titel}</div>
                      <p className="text-sm text-muted leading-relaxed">{s.text}</p>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/40">
                        Sie erhalten: <span className="text-primary normal-case">{s.erhalten}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bild rechts — Hochformat als Format-Variation */}
            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="group relative rounded-2xl overflow-hidden border border-border shadow-[0_24px_60px_-28px_rgba(26,26,26,0.22)] aspect-[4/5] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/wpwartung-3d-uebernahme.png"
                  alt="3D-Illustration: Figur legt einen goldenen Schutzring um eine WordPress-Kugel — Sinnbild für die Übernahme in die laufende Wartung"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Erst sichern, dann härten — Ihre Website bleibt während der Übernahme online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 09 VERGLEICH — Selbst warten oder warten lassen? ══ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Die ehrliche Gegenüberstellung"
            title={
              <>
                Selbst warten oder{" "}
                <span style={grad}>warten lassen?</span>
              </>
            }
            copy="Technisch ist es möglich, WordPress komplett in Eigenregie zu pflegen — die Frage ist, ob sich das im Alltag neben dem eigentlichen Geschäft durchhalten lässt."
          />

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            {/* Selbst warten */}
            <div className="scroll-hidden rv-left h-full">
              <div className="h-full rounded-3xl border border-border bg-white/60 p-7 lg:p-9">
                <span className="inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-dark/45 mb-6">
                  Selbst warten
                </span>
                <ul className="space-y-4">
                  {VERGLEICH_SELBST.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dark/[0.06]">
                        <svg className="h-3 w-3 text-dark/35" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </span>
                      <span className="text-sm text-dark/55 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mit Wartungsvertrag */}
            <div className="scroll-hidden rv-right h-full" style={{ transitionDelay: "120ms" }}>
              <div
                className="h-full rounded-3xl p-7 lg:p-9 shadow-[0_28px_60px_-30px_rgba(194,114,42,0.35)]"
                style={{ background: "#fbf4ea", border: "1px solid #ecd3ba" }}
              >
                <span
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-white mb-6"
                  style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                >
                  Mit Wartungsvertrag
                </span>
                <ul className="space-y-4">
                  {VERGLEICH_VERTRAG.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-dark font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Einordnung + Fairness-Fußnote */}
          <div className="scroll-hidden rv-blur mt-8 max-w-3xl space-y-5">
            <p className="text-[15px] text-muted leading-relaxed">
              Die meisten Betreiber unterschätzen den laufenden Zeitaufwand und merken erst bei einem konkreten
              Vorfall, wie viel Fachwissen für eine saubere und schnelle Wiederherstellung tatsächlich nötig ist.
              Ein Wartungsvertrag verschiebt diese Verantwortung auf jemanden, der genau diese Routine bereits
              täglich für viele unterschiedliche Websites durchläuft und dadurch auch seltene Fehlerbilder kennt.
              Am Ende geht es weniger um die reinen Kosten als um die Frage, wer im Ernstfall schnell und richtig
              reagiert.
            </p>
            <div className="flex items-start gap-3 text-sm text-muted">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="leading-relaxed">
                <span className="font-semibold text-dark">Wann Sie keinen Wartungsvertrag brauchen:</span> bei einer
                rein statischen Website ohne CMS und Plugins. Ein WordPress mit Plugins, Formularen oder Shop dagegen
                schon — dort altert Software jeden Monat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10 FAQ — Sticky-Sidebar + Verwandte Leistungen ══ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-5">
                Häufige Fragen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Was Betreiber vor dem Wartungsvertrag{" "}
                <span style={grad}>wissen wollen.</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Kosten, Kündigung, Ernstfall, Reaktionszeiten — die Fragen, die vor einem Wartungsvertrag am
                häufigsten fallen, beantwortet ohne Kleingedrucktes.
              </p>
              <a
                href="#kontakt"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors"
              >
                Ihre Frage ist nicht dabei? Sprechen Sie uns an
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
                {faqs.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={i}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer transition-colors hover:bg-offwhite"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                        <svg
                          className={`w-4 h-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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

          {/* Verwandte Leistungen */}
          <div className="mt-16 pt-12 border-t border-border">
            <span className="scroll-hidden rv-left block text-xs font-bold tracking-[0.22em] uppercase text-primary mb-6">
              Verwandte Leistungen
            </span>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Website-Wartung", href: "/website-wartung", desc: "Alle Wartungsleistungen im Überblick — die Pillar-Seite zu dieser Leistung." },
                { title: "SEO-Betreuung", href: "/seo/betreuung", desc: "Rankings aufbauen und halten — auf einer technisch gepflegten Basis." },
                { title: "Kontakt", href: "/kontakt", desc: "Direkter Draht zu uns — Anfrage, Beratung oder kurze Frage." },
              ].map((link, i) => (
                <div key={link.href} className="scroll-hidden rv-scale h-full" style={{ transitionDelay: `${i * 70}ms` }}>
                  <Link
                    href={link.href}
                    className="block h-full rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <h3 className="font-bold text-dark text-base mb-2 group-hover:text-primary transition-colors">{link.title} →</h3>
                    <p className="text-muted text-sm leading-relaxed">{link.desc}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11 CTA-FINALE — dunkel, mit funktionalem Formular ══ */}
      <section id="kontakt" className="scroll-mt-20 relative py-24 lg:py-32 overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
          <div className="absolute -bottom-10 left-0 h-[300px] w-[300px] rounded-full bg-secondary/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="scroll-hidden rv-left">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl lg:text-5xl text-white leading-tight">
              Ihr WordPress{" "}
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                in zuverlässigen Händen.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              Sie schreiben uns kurz, wie Ihre Website aktuell betreut wird und ob es zuletzt Probleme gab — wir
              melden uns mit einer ehrlichen Einschätzung und einem passenden Paketvorschlag zurück, nicht mit
              einem Standardangebot von der Stange. Keine Vertragsbindung, kein Kleingedrucktes, jederzeit kündbar
              zum Monatsende.
            </p>
            <div className="mt-8 space-y-4">
              {["Monatlich kündbar, kein Lock-in", "Antwort in unter 24 Stunden", "Persönlicher Ansprechpartner"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <svg className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
            <WordpressContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
