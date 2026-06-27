"use client";

import { useState } from "react";

interface CityContactFormProps {
  city: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CITY CONTACT FORM — hell, zweispaltig, schnell auszufüllen
   Links: Nutzenversprechen + Trust · Rechts: Formular-Karte
═══════════════════════════════════════════════════════════════════════════ */
export default function CityContactForm({ city }: CityContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      city,
    };

    try {
      const res = await fetch("/api/city-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
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

  return (
    <section style={{ background: "#F8F5F1" }} className="border-y border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-center">

          {/* ── Links: Pitch ───────────────────────────────────────────── */}
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              / Kontakt
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-dark mb-4 leading-tight">
              Kostenlose SEO-Analyse<br />für {city}.
            </h2>
            <p className="text-muted leading-relaxed mb-8 max-w-md">
              Schreiben Sie uns kurz, worum es geht — Sie bekommen innerhalb von
              24 Stunden eine erste, ehrliche Einschätzung Ihrer SEO-Situation
              in {city}. Kein Callcenter, kein Verkaufsskript.
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                "Antwort garantiert in unter 24 Stunden",
                "Persönlicher Ansprechpartner — direkt vom ersten Kontakt an",
                "Keine Vertragsbindung, monatlich kündbar",
                "Datenbasierte Einschätzung mit Semrush & Ahrefs",
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

            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Aktuell freie Beratungstermine
            </div>
          </div>

          {/* ── Rechts: Formular-Karte ─────────────────────────────────── */}
          <div className="rounded-3xl border border-border bg-white p-7 sm:p-9 shadow-[0_24px_60px_-24px_rgba(26,26,26,0.12)]">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/25">
                  <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark font-[family-name:var(--font-heading)]">Anfrage gesendet</h3>
                <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
                  Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="block text-sm font-medium text-dark mb-1.5">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Max Mustermann"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-company" className="block text-sm font-medium text-dark mb-1.5">
                      Unternehmen
                    </label>
                    <input
                      id="cf-company"
                      name="company"
                      type="text"
                      placeholder="Musterfirma GmbH"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="block text-sm font-medium text-dark mb-1.5">
                      E-Mail <span className="text-primary">*</span>
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="max@musterfirma.de"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-phone" className="block text-sm font-medium text-dark mb-1.5">
                      Telefon
                    </label>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      placeholder="+49 621 000 000"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-message" className="block text-sm font-medium text-dark mb-1.5">
                    Nachricht <span className="text-dark/35 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    placeholder="Kurze Beschreibung Ihres Projekts oder Ihrer Fragen…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
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
                    "Kostenlose Analyse anfragen →"
                  )}
                </button>
                <p className="text-[11px] text-dark/35 text-center pt-1">
                  Kostenlos & unverbindlich · Antwort in unter 24 h
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
