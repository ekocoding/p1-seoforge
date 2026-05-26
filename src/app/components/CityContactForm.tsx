"use client";

import { useState } from "react";

interface CityContactFormProps {
  city: string;
}

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

  return (
    <section className="bg-dark border-t border-white/10">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white">
            Kostenlose SEO-Analyse anfragen
          </h2>
          <p className="mt-3 text-base text-white/60 max-w-2xl mx-auto">
            Schreiben Sie uns – wir melden uns innerhalb von 24 Stunden mit einer
            ersten Einschätzung Ihrer SEO-Situation in {city}.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Anfrage gesendet</h3>
            <p className="mt-2 text-sm text-white/60">
              Vielen Dank! Wir melden uns so bald wie möglich bei Ihnen.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="block text-sm font-medium text-white/80 mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Max Mustermann"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="cf-company" className="block text-sm font-medium text-white/80 mb-1.5">
                  Unternehmen
                </label>
                <input
                  id="cf-company"
                  name="company"
                  type="text"
                  placeholder="Musterfirma GmbH"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="cf-email" className="block text-sm font-medium text-white/80 mb-1.5">
                  E-Mail <span className="text-red-400">*</span>
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  required
                  placeholder="max@musterfirma.de"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="cf-phone" className="block text-sm font-medium text-white/80 mb-1.5">
                  Telefon
                </label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  placeholder="+49 621 000 000"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="cf-message" className="block text-sm font-medium text-white/80 mb-1.5">
                Nachricht <span className="text-white/40 font-normal">(optional)</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                placeholder="Kurze Beschreibung Ihres Projekts oder Ihrer Fragen..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
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
                  "Kostenlose Analyse anfragen"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
