"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

/* ─── Scroll reveal ───────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-hidden, .m3d").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Globaler Scroll-Fortschritt ─────────────────────────────────────────── */
function ScrollProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[80] h-[3px] pointer-events-none" aria-hidden="true">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${p})`,
          background: "linear-gradient(90deg, #C2722A, #D4A853)",
          boxShadow: "0 0 10px rgba(194,114,42,0.5)",
        }}
      />
    </div>
  );
}

/* ─── Hero: interaktives Strömungsfeld (Flow Field) ─────────────────────────
   Identisch mit WebsiteMittelstandClient — warm-weißer Canvas mit Partikel-
   strömung; Cursor verwirbelt die Strömung.                                  */
function HeroFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ["rgba(194,114,42,0.42)", "rgba(210,138,68,0.34)", "rgba(212,168,83,0.40)"];
    type P = { x: number; y: number; px: number; py: number; life: number; max: number; c: number };
    let w = 0, h = 0;
    let ps: P[] = [];
    const mouse = { x: -9999, y: -9999, has: false };

    const hash = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const noise = (x: number, y: number) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };

    const spawn = (p: P, seed = false) => {
      p.x = Math.random() * w; p.y = Math.random() * h;
      p.px = p.x; p.py = p.y;
      p.max = 90 + Math.random() * 170;
      p.life = seed ? Math.random() * p.max : 0;
      p.c = (Math.random() * 3) | 0;
    };
    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(2000, Math.max(700, Math.round((w * h) / 820)));
      ps = [];
      for (let i = 0; i < count; i++) {
        const p: P = { x: 0, y: 0, px: 0, py: 0, life: 0, max: 0, c: 0 };
        spawn(p, true);
        ps.push(p);
      }
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.has = true;
    };
    const onLeave = () => { mouse.has = false; mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    const SCALE = 0.0016, SPEED = reduce ? 0 : 1.4, CR = 185, SWIRL = 3.4, PUSH = 0.85;
    let raf = 0, t = 0, vis = true;

    const step = () => {
      t += reduce ? 0 : 0.0016;
      ctx.fillStyle = reduce ? "#FAF6F1" : "rgba(250,246,241,0.075)";
      ctx.fillRect(0, 0, w, h);

      for (const p of ps) {
        p.px = p.x; p.py = p.y;
        const ang = noise(p.x * SCALE + t, p.y * SCALE - t) * Math.PI * 4;
        let vx = Math.cos(ang) * SPEED;
        let vy = Math.sin(ang) * SPEED;
        if (mouse.has && !reduce) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < CR) {
            const f = 1 - dist / CR;
            vx += (-dy / dist) * f * SWIRL + (dx / dist) * f * PUSH;
            vy += (dx / dist) * f * SWIRL + (dy / dist) * f * PUSH;
          }
        }
        p.x += vx; p.y += vy; p.life += reduce ? 0 : 1;
        if (p.life > p.max || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) spawn(p);
      }

      for (let c = 0; c < 3; c++) {
        ctx.beginPath();
        ctx.strokeStyle = COLORS[c];
        ctx.lineWidth = 1.25;
        ctx.lineCap = "round";
        for (const p of ps) {
          if (p.c !== c) continue;
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      if (mouse.has && !reduce) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, CR);
        g.addColorStop(0, "rgba(212,168,83,0.10)");
        g.addColorStop(1, "rgba(212,168,83,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, CR, 0, 6.2832); ctx.fill();
      }

      raf = vis && !reduce ? requestAnimationFrame(step) : 0;
    };

    const io = new IntersectionObserver(([en]) => {
      vis = en.isIntersecting;
      if (vis && !raf && !reduce) raf = requestAnimationFrame(step);
      else if (!vis && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    io.observe(canvas);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

/* ─── WordPress-Security-Visual (animierter Shield-Status) ──────────────────  */
function SecurityStatusVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.3, rootMargin: "0px 0px -15% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const checks = [
    { label: "Core aktuell", ok: true },
    { label: "Plugins geprüft", ok: true },
    { label: "Backup erstellt", ok: true },
    { label: "Malware-Scan", ok: true },
    { label: "SSL gültig", ok: true },
  ];

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-white p-6 lg:p-8 shadow-[0_28px_70px_-30px_rgba(26,26,26,0.20)]" aria-hidden="true">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-dark">WordPress Security Check</div>
          <div className="text-[11px] text-dark/40 font-mono">Heute, automatisch</div>
        </div>
        <div
          className="ml-auto text-[11px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(45,164,78,0.1)", color: "#2DA44E" }}
        >
          Alles OK
        </div>
      </div>

      <div className="space-y-2.5">
        {checks.map((c, i) => (
          <div
            key={c.label}
            className="flex items-center gap-3 rounded-xl bg-offwhite px-4 py-2.5"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "none" : "translateY(6px)",
              transition: `opacity 0.35s ease ${i * 120}ms, transform 0.35s ease ${i * 120}ms`,
            }}
          >
            <span className="w-5 h-5 rounded-full bg-[#2DA44E]/10 flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-[#2DA44E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-sm font-medium text-dark flex-1">{c.label}</span>
            <span className="text-[10px] font-mono text-dark/30">✓</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-offwhite border border-border px-4 py-2.5 font-mono text-[11px]">
        <span style={{ color: on ? "#C2722A" : "rgba(26,26,26,0.4)" }}>
          {on ? "● Ihr WordPress läuft sicher — nächstes Update in 6 Tagen" : "○ Prüfe …"}
        </span>
      </div>
    </div>
  );
}

/* ─── Backup-Timeline-Visual ─────────────────────────────────────────────── */
function BackupTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.3, rootMargin: "0px 0px -15% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const backups = [
    { label: "Heute 03:00", size: "2,1 GB", status: "OK" },
    { label: "Gestern 03:00", size: "2,1 GB", status: "OK" },
    { label: "Vor 2 Tagen", size: "2,0 GB", status: "OK" },
    { label: "Vor 3 Tagen", size: "2,0 GB", status: "OK" },
  ];

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-white p-6 lg:p-8 shadow-[0_28px_70px_-30px_rgba(26,26,26,0.20)]" aria-hidden="true">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
          <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" />
        </svg>
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45">Tägliche Backups</span>
      </div>
      <div className="space-y-2">
        {backups.map((b, i) => (
          <div
            key={b.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-offwhite px-4 py-2.5"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "none" : "translateX(-8px)",
              transition: `opacity 0.4s ease ${i * 110}ms, transform 0.4s ease ${i * 110}ms`,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#2DA44E] shrink-0" />
            <span className="text-sm font-medium text-dark flex-1">{b.label}</span>
            <span className="text-[11px] font-mono text-dark/40">{b.size}</span>
            <span className="text-[10px] font-bold text-[#2DA44E]">{b.status}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-dark/35">1-Klick-Wiederherstellung auf Knopfdruck — kein Datenverlust.</p>
    </div>
  );
}

/* ─── Wartungspakete ─────────────────────────────────────────────────────── */
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
  },
  {
    id: "plus",
    name: "Plus",
    price: "ab 99 €",
    period: "/Monat",
    note: "Monatlich kündbar · Empfohlen",
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
  },
];

/* ─── Kontaktformular ────────────────────────────────────────────────────── */
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
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-dark/30 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-white p-9 shadow-[0_24px_60px_-24px_rgba(26,26,26,0.12)] text-center py-14">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/25">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-dark font-[family-name:var(--font-heading)]">Anfrage gesendet</h3>
        <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
          Vielen Dank! Sie hören innerhalb von 24 Stunden von uns.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-[0_24px_60px_-24px_rgba(26,26,26,0.12)]"
    >
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

        {/* Spalte links: Kontaktdaten + WordPress-URL + Nachricht */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="wp-name" className="block text-sm font-medium text-dark mb-1.5">
                Name <span className="text-primary">*</span>
              </label>
              <input id="wp-name" name="name" type="text" required placeholder="Max Mustermann" className={inputClass} />
            </div>
            <div>
              <label htmlFor="wp-company" className="block text-sm font-medium text-dark mb-1.5">Unternehmen</label>
              <input id="wp-company" name="company" type="text" placeholder="Musterfirma GmbH" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="wp-email" className="block text-sm font-medium text-dark mb-1.5">
                E-Mail <span className="text-primary">*</span>
              </label>
              <input id="wp-email" name="email" type="email" required placeholder="max@musterfirma.de" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="wp-url" className="block text-sm font-medium text-dark mb-1.5">
                Aktuelle WordPress-URL <span className="text-dark/35 font-normal">(optional)</span>
              </label>
              <input id="wp-url" name="wpurl" type="url" placeholder="https://ihre-website.de" className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="wp-message" className="block text-sm font-medium text-dark mb-1.5">
              Ihre Fragen oder Anmerkungen <span className="text-dark/35 font-normal">(optional)</span>
            </label>
            <textarea
              id="wp-message"
              name="message"
              rows={6}
              placeholder="Gibt es aktuelle Probleme, spezielle Anforderungen oder Plugins, die wir kennen sollten&#x202F;?"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Spalte rechts: Paket-Auswahl */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Welches Paket interessiert Sie? <span className="text-dark/35 font-normal">(optional)</span>
            </label>
            <div className="space-y-2.5">
              {PAKETE.map((pk) => {
                const active = paket === pk.id;
                return (
                  <label
                    key={pk.id}
                    className="relative flex items-start gap-3 rounded-xl border px-4 py-3.5 cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: active ? "rgba(194,114,42,0.55)" : pk.highlight ? "rgba(194,114,42,0.25)" : "var(--color-border)",
                      background: active ? "rgba(194,114,42,0.05)" : pk.highlight ? "rgba(194,114,42,0.02)" : "#fff",
                      boxShadow: active ? "0 8px 24px -14px rgba(194,114,42,0.45)" : "none",
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
                    <span
                      className="mt-0.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200"
                      style={{ borderColor: active ? "#C2722A" : "rgba(26,26,26,0.2)", background: active ? "#C2722A" : "transparent" }}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-dark">{pk.name}</span>
                        {pk.highlight && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(194,114,42,0.12)", color: "#C2722A" }}
                          >
                            Empfohlen
                          </span>
                        )}
                      </span>
                      <span className="block text-[11px] text-muted mt-0.5">{pk.note}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-bold text-primary">{pk.price}</span>
                      <span className="block text-[10px] text-dark/35">{pk.period}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-dark/40">
              Noch unsicher welches Paket? Kein Problem — wir beraten Sie kostenlos und empfehlen das passende Paket nach einem kurzen Erstgespräch.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-offwhite p-5">
            <p className="text-[12px] font-semibold text-dark mb-2">Inbegriffen in allen Paketen</p>
            <ul className="space-y-1.5">
              {["Monatlich kündbar", "Kein Vertrag, kein Lock-in", "Antwort in unter 24 h"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[12px] text-dark/60">
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {status === "error" && <p className="mt-5 text-sm text-red-600">{errorMsg}</p>}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0 shrink-0"
        >
          {status === "submitting" ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet…
            </>
          ) : (
            "WordPress-Wartung anfragen →"
          )}
        </button>
        <p className="text-[11px] text-dark/40 sm:flex-1">
          Kostenlos &amp; unverbindlich · Antwort in unter 24 h · Monatlich kündbar
        </p>
      </div>
    </form>
  );
}

/* ─── FAQ-Daten ──────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Warum muss WordPress überhaupt gewartet werden?",
    a: "WordPress ist das weltweit meistgenutzte CMS — und damit Angriffsziel Nummer eins. Veraltete Plugins, Themes oder der Core selbst sind die häufigste Einfallsroute für Hacker und Malware. Regelmäßige Updates schließen diese Lücken. Dazu kommen Performance-Verbesserungen und neue Features, von denen Ihre Website profitiert.",
  },
  {
    q: "Was passiert, wenn ein Update mein Layout oder Plugin zerstört?",
    a: "Genau das ist der Kern unseres Wartungsservices: Wir spielen Updates zuerst auf einer Staging-Umgebung ein und prüfen dabei Darstellung, Funktionen und Formulare. Erst wenn alles korrekt läuft, geht das Update live. Sollte trotzdem etwas schiefgehen, stellen wir Ihre Website per Backup in Minuten wieder her.",
  },
  {
    q: "Wie oft werden Backups erstellt?",
    a: "Im Basis-Paket wöchentlich, ab Plus täglich. Alle Backups werden extern gespeichert, nicht nur lokal auf dem Server — so sind Ihre Daten auch bei einem kompletten Server-Ausfall sicher. Die Wiederherstellung erfolgt auf Knopfdruck.",
  },
  {
    q: "Was ist im Security-Hardening enthalten?",
    a: "Wir sichern WordPress auf mehreren Ebenen ab: Schutz der Login-Seite, Deaktivierung nicht benötigter Funktionen, Härtung der Datei-Berechtigungen, Einsatz eines Web Application Firewall-Plugins und regelmäßige Malware-Scans. Bei einem Verdachtsbefund werden Sie sofort informiert und wir leiten Gegenmaßnahmen ein.",
  },
  {
    q: "Kann ich den Wartungsvertrag jederzeit kündigen?",
    a: "Ja, alle Pakete sind monatlich kündbar — kein Jahresvertrag, kein Lock-in. Sie zahlen nur für die Monate, in denen Sie den Service nutzen. Eine Kündigung ist per E-Mail jederzeit zum Monatsende möglich.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEISTUNGEN / WAS ENTHALTEN IST
═══════════════════════════════════════════════════════════════════════════ */
const LEISTUNGEN = [
  {
    key: "updates",
    label: "Updates",
    title: "Core-, Plugin- & Theme-Updates",
    desc: "Wir aktualisieren WordPress-Core, alle Plugins und Themes regelmäßig und kontrolliert. Im Plus- und Premium-Paket testen wir jedes Update auf einer Staging-Umgebung, bevor es live geht — so bleibt Ihr Layout intakt.",
  },
  {
    key: "backup",
    label: "Sicherheit",
    title: "Tägliche Backups & 1-Klick-Wiederherstellung",
    desc: "Täglich wird ein vollständiges Backup Ihrer WordPress-Installation extern gesichert. Bei einem Problem — egal ob Update-Fehler, Hack oder menschlicher Irrtum — stellen wir Ihre Website per Knopfdruck wieder her.",
  },
  {
    key: "security",
    label: "Security",
    title: "Security-Hardening & Malware-Scan",
    desc: "WordPress-Absicherung auf mehreren Ebenen: Login-Schutz, Web Application Firewall, Deaktivierung nicht benötigter Features, Dateiberechtigungen und regelmäßige Malware-Scans. Verdachtsbefunde werden sofort kommuniziert.",
  },
  {
    key: "performance",
    label: "Performance",
    title: "Performance & Core Web Vitals",
    desc: "Langsame Websites verlieren Besucher und Rankings. Wir monitoren die Ladezeiten und Core Web Vitals, optimieren Caches und Bildgrößen und sorgen dafür, dass Google Ihre WordPress-Seite als schnell einstuft.",
  },
  {
    key: "uptime",
    label: "Monitoring",
    title: "Uptime-Monitoring & Bugfixes",
    desc: "Wir überwachen Ihre Website rund um die Uhr. Fällt sie aus, werden wir sofort benachrichtigt und handeln. Im Plus- und Premium-Paket sind außerdem monatliche Budgets für kleine Bugfixes und Anpassungen enthalten.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Seitenweite 3D-Reveal-Animation */}
      <style>{`
        .m3d {
          opacity: 0;
          transform: translateY(70px) rotateX(-16deg) scale(0.97);
          transform-origin: 50% 20%;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
          backface-visibility: hidden;
        }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .m3d { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — interaktives Strömungsfeld (Canvas Flow Field)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FDFBF8 0%, #F6F1EA 100%)" }}
      >
        {/* Interaktives Strömungsfeld */}
        <HeroFlow />

        {/* Atmosphäre */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-48 right-[-10%] w-[640px] h-[640px] rounded-full blur-[150px]" style={{ background: "rgba(212,168,83,0.16)" }} />
          <div className="absolute bottom-[-10%] -left-40 w-[520px] h-[520px] rounded-full blur-[140px]" style={{ background: "rgba(194,114,42,0.10)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 54% 48% at 50% 44%, rgba(253,251,248,0.72), rgba(253,251,248,0) 64%)" }} />
        </div>

        {/* Farbverlauf ins Weiß */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />

        {/* Copy */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 lg:px-8 pt-36 lg:pt-40 pb-24 text-center">
          <h1
            className="font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.08] mb-6"
            style={{ fontSize: "clamp(28px, 4.0vw, 52px)", letterSpacing: "-0.025em" }}
          >
            <span className="block overflow-hidden pb-1">
              <span className="msReveal block sm:whitespace-nowrap">WordPress-Wartung & Pflege —</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="msReveal block sm:whitespace-nowrap" style={{ animationDelay: "0.28s" }}>
                <span
                  style={{
                    background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  sicher, aktuell, sorgenfrei.
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-description text-muted leading-[1.8] mb-9 max-w-2xl mx-auto" style={{ fontSize: "clamp(15px, 1.05vw, 17px)" }}>
            Core-, Plugin- & Theme-Updates, tägliche Backups, Security-Hardening und
            Performance-Monitoring — Ihr WordPress läuft sicher und schnell,
            während Sie sich auf Ihr Geschäft konzentrieren.
            Monatlich kündbar, ab 49 €.
          </p>

          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              WordPress-Wartung anfragen
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white/70 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-dark/65 transition-all hover:border-dark/30 hover:bg-white/90 hover:text-dark"
            >
              Was enthalten ist
              <span className="text-primary text-xs">&#8595;</span>
            </a>
          </div>

          {/* USP-Row */}
          <div className="hero-cta mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
            {["Monatlich kündbar", "Updates mit Vorab-Test", "Antwort < 24 h"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-[12px] font-semibold text-dark/45">
                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>

          {/* Interaktions-Hinweis */}
          <div className="hero-cta mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium text-dark/35">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Cursor bewegen — verwirbeln Sie die Strömung
            </span>
          </div>
        </div>

        {/* Scroll-Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] text-dark/50 font-mono tracking-[0.28em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-dark/30 to-transparent" />
        </div>

        <style>{`
          @keyframes msReveal { from { transform: translateY(108%); } to { transform: translateY(0); } }
          .msReveal { animation: msReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both; }
          @media (prefers-reduced-motion: reduce) { .msReveal { animation: none; } }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WARUM WORDPRESS-WARTUNG — Editorial-Text
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="scroll-hidden">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Warum WordPress-Wartung</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-6">
              Ungepflegt ist<br />das größte Risiko.
            </h2>
            <div className="space-y-5 text-muted leading-relaxed max-w-xl">
              <p>
                WordPress betreibt rund 43 % aller Websites weltweit — und ist deshalb das
                Angriffsziel Nr. 1 für Hacker. Veraltete Plugins und Themes sind die häufigste
                Einfallsroute: Eine bekannte Sicherheitslücke wird oft binnen Stunden nach
                Veröffentlichung aktiv ausgenutzt. Wer Aktualisierungen auf die lange Bank schiebt,
                riskiert Datenverlust, Blacklistings und einen kaputten Shop.
              </p>
              <p>
                Das zweite Problem: Updates können Layouts brechen. Wir lösen das, indem
                wir jedes Update zuerst auf einer identischen Staging-Umgebung testen —
                erst wenn alles funktioniert, geht es live. Kein Schrecken am Montagmorgen,
                keine notfall-Anrufe. Teil unserer{" "}
                <Link href="/website-wartung" className="text-primary font-semibold hover:underline">
                  Website-Wartung
                </Link>{" "}
                — speziell für WordPress optimiert.
              </p>
            </div>
          </div>

          <div className="m3d" style={{ transitionDelay: "100ms" }}>
            <SecurityStatusVisual />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WAS ENTHALTEN IST — Leistungs-Sektionen
      ══════════════════════════════════════════════════════════════════ */}
      <section id="leistungen" className="py-24 lg:py-32 overflow-hidden scroll-mt-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="scroll-hidden grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-16 items-end mb-12 lg:mb-14">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was enthalten ist</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">
                Alles, was Ihr WordPress<br />braucht.
              </h2>
            </div>
            <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">
              Kein Leistungskatalog-Theater: Das sind die konkreten Aufgaben,
              die wir für Ihr WordPress übernehmen — Monat für Monat.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {LEISTUNGEN.map((v, i) => (
              <div
                key={v.key}
                className="m3d grid lg:grid-cols-[110px_1fr] gap-6 lg:gap-10 items-start py-10 lg:py-12"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div
                  className="font-[family-name:var(--font-heading)] font-black leading-none select-none"
                  style={{
                    fontSize: "clamp(56px, 6vw, 84px)",
                    background: "linear-gradient(135deg, #C2722A, #D4A853)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="pt-1 lg:pt-3">
                  <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-dark/35 block mb-2">{v.label}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark mb-3">{v.title}</h3>
                  <p className="text-muted text-sm lg:text-[15px] leading-relaxed max-w-2xl">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BACKUP-VISUAL — Editorial-Sektion
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="m3d order-last lg:order-first" style={{ transitionDelay: "100ms" }}>
            <BackupTimeline />
          </div>

          <div className="scroll-hidden">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Backups & Wiederherstellung</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-5">
              Tägliches Backup.<br />1-Klick-Restore.
            </h2>
            <p className="text-muted leading-relaxed mb-7 max-w-lg">
              Jede Nacht wird Ihr komplettes WordPress extern gesichert — Datenbank,
              Dateien, Medien. Sollte nach einem Update, einem Hack oder einem menschlichen
              Fehler etwas schiefgehen, stellen wir Ihre Website innerhalb von Minuten
              auf den letzten fehlerfreien Stand zurück.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                "Externe Speicherung — unabhängig vom Server",
                "Vollständige Wiederherstellung auf Knopfdruck",
                "Keine Datenverluste, kein Ausfall-Drama",
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
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WARTUNGSPAKETE — 3 Tarife
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden text-center mb-12 lg:mb-14">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Wartungspakete</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-4">
              Ihr WordPress-Wartungspaket.
            </h2>
            <p className="text-muted leading-relaxed max-w-xl mx-auto">
              Alle Pakete monatlich kündbar. Kein Jahresvertrag, kein Lock-in.
              Den passenden Umfang besprechen wir im kostenlosen Erstgespräch.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PAKETE.map((pk, i) => (
              <div
                key={pk.id}
                className="m3d rounded-3xl border bg-white overflow-hidden flex flex-col"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  borderColor: pk.highlight ? "rgba(194,114,42,0.4)" : "var(--color-border)",
                  boxShadow: pk.highlight ? "0 28px 70px -28px rgba(194,114,42,0.30)" : "0 4px 24px -8px rgba(26,26,26,0.08)",
                }}
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
                      <span
                        className="font-[family-name:var(--font-heading)] font-bold text-4xl"
                        style={{
                          background: "linear-gradient(135deg, #C2722A, #D4A853)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {pk.price}
                      </span>
                      <span className="text-sm text-muted">{pk.period}</span>
                    </div>
                    <div className="text-[11px] text-dark/40 mt-1">{pk.note}</div>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {pk.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-dark">
                        <span className="mt-0.5 shrink-0 w-4.5 h-4.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#kontakt"
                    className="mt-8 block text-center rounded-full py-3.5 text-sm font-semibold transition-all"
                    style={pk.highlight
                      ? { background: "linear-gradient(90deg, #C2722A, #D4A853)", color: "#fff", boxShadow: "0 8px 24px -10px rgba(194,114,42,0.5)" }
                      : { border: "1.5px solid rgba(194,114,42,0.35)", color: "#C2722A" }
                    }
                  >
                    {pk.name} anfragen
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-dark/40">
            Alle Preise zzgl. MwSt. · WooCommerce-Shops und große Multi-Sites auf Anfrage.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          KONTAKT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="kontakt" className="scroll-mt-20 border-y border-border" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 lg:py-20">

          <div className="scroll-hidden flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 lg:mb-10">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ So einfach ist das</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-dark leading-tight">
                WordPress-Wartung anfragen.<br />In 2 Minuten erledigt.
              </h2>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end shrink-0">
              {["Antwort < 24 h", "Monatlich kündbar", "Persönlicher Ansprechpartner"].map((item) => (
                <li key={item} className="inline-flex items-center gap-2 text-[13px] font-medium text-dark/55">
                  <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="m3d">
            <WordpressContactForm />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="scroll-hidden mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              WordPress-Wartung &amp; Pflege
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="scroll-hidden" style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className={`rounded-2xl border bg-white overflow-hidden transition-colors duration-300 ${open ? "border-primary/30" : "border-border"}`}>
                    <button
                      className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                    >
                      <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-primary text-white rotate-180" : "bg-primary/[0.08] text-primary"}`}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-400 ease-out"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VERWANDTE LEISTUNGEN
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Das könnte auch interessant sein
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Website-Wartung übersicht",
                href: "/website-wartung",
                desc: "Teil unserer Website-Wartung — alle Wartungsleistungen im Überblick.",
              },
              {
                title: "SEO-Betreuung",
                href: "/seo/betreuung",
                desc: "Laufende SEO-Optimierung: Rankings aufbauen und halten.",
              },
              {
                title: "Kontakt",
                href: "/kontakt",
                desc: "Direkter Weg zu uns — Anfrage, Beratung oder Frage.",
              },
            ].map((link, i) => (
              <div key={link.href} className="scroll-hidden h-full" style={{ transitionDelay: `${i * 70}ms` }}>
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
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DARK CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="scroll-hidden">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">
              Ihr WordPress in sicheren Händen.
            </h2>
            <p className="text-white/55 text-lg mb-3 leading-relaxed">
              Zwei Zeilen genügen. Wir melden uns mit einem passenden Paketvorschlag
              und einer ehrlichen Einschätzung.
            </p>
            <p className="text-white/35 text-sm mb-9">
              Persönlicher Ansprechpartner · Antwort garantiert in unter 24 Stunden · Monatlich kündbar
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              WordPress-Wartung anfragen →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
