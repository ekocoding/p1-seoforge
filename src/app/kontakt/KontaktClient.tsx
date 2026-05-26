"use client";

import SubpageLayout from "../components/SubpageLayout";
import { useState } from "react";

const SERVICES = [
  "SEO Audit",
  "SEO Beratung",
  "SEO Optimierung",
  "SEO Texte",
  "Content-Strategie",
  "On Page SEO",
  "Shop SEO",
  "SEO Betreuung",
  "GEO Optimierung",
  "Web Design",
];

const faqItems = [
  {
    q: "Wie schnell kann ich mit ersten Ergebnissen rechnen?",
    a: "Erste Verbesserungen zeigen sich oft nach 4-6 Wochen. Signifikante Rankings und Traffic-Steigerungen sehen die meisten Kunden nach 3-6 Monaten.",
  },
  {
    q: "Was kostet SEO bei SeoForge?",
    a: "Unsere Preise richten sich nach Ihrem Bedarf und Ihrer Branche. Im kostenlosen Erstgespräch erstellen wir ein individuelles Angebot.",
  },
  {
    q: "Gibt es eine Vertragsbindung?",
    a: "Nein, wir arbeiten ohne langfristige Vertragsbindung. Sie können monatlich kündigen.",
  },
];

export default function KontaktClient() {
  const [formData, setFormData] = useState({
    name: "",
    firmenname: "",
    website: "",
    email: "",
    phone: "",
    selectedServices: [] as string[],
    message: "",
    acceptPrivacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function clearError(field: string) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    clearError(name);
  }

  function toggleService(service: string) {
    setFormData((prev) => {
      const has = prev.selectedServices.includes(service);
      return {
        ...prev,
        selectedServices: has
          ? prev.selectedServices.filter((s) => s !== service)
          : [...prev.selectedServices, service],
      };
    });
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name ist erforderlich.";
    if (!formData.firmenname.trim()) errs.firmenname = "Firmenname ist erforderlich.";
    if (!formData.email.trim()) {
      errs.email = "E-Mail ist erforderlich.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
    }
    if (formData.website.trim() && !/^https?:\/\/.+/.test(formData.website.trim())) {
      errs.website = "Bitte eine gültige URL eingeben (z.B. https://...).";
    }
    if (!formData.acceptPrivacy) errs.acceptPrivacy = "Bitte akzeptieren Sie die Datenschutzerklärung.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (field: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:ring-2 ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100 bg-white"
        : "border-border bg-white focus:border-primary/50 focus:ring-primary/10"
    }`;

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-offwhite border-b border-border py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Wir sind für Sie da
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-dark font-[family-name:var(--font-heading)]">
              Kontakt <span className="text-primary">aufnehmen</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Kostenloses Erstgespräch, ehrliche Beratung, kein Verkaufsgespräch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href="tel:015203450695"
                className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-5 py-2.5 text-sm text-dark hover:border-primary/50 hover:text-primary transition-all"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0152 03450695
              </a>

              <a
                href="https://wa.me/4915203450695"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-5 py-2.5 text-sm text-green-700 hover:bg-green-100 transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>

              <span className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-5 py-2.5 text-sm text-muted">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mo–Fr 9:00–18:00
              </span>
            </div>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">

              {/* Form */}
              <div>
                <h2 className="text-3xl text-dark font-[family-name:var(--font-heading)]">
                  SEO Anfrage starten
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Analysieren Sie Ihr Potenzial. Antwort innerhalb 24h.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3.5 py-1.5 text-xs font-medium text-green-700">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    100% kostenlos & unverbindlich
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/[0.06] border border-primary/20 px-3.5 py-1.5 text-xs font-medium text-primary">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Antwort innerhalb 24h
                  </span>
                </div>

                {submitted && (
                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-800">
                    <svg className="h-5 w-5 shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Vielen Dank! Wir melden uns innerhalb von 24 Stunden.
                  </div>
                )}

                {submitError && (
                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                    <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                  {/* Name + Firmenname */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ihr Name"
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="firmenname" className="block text-sm font-medium text-dark mb-1.5">
                        Firmenname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firmenname"
                        name="firmenname"
                        value={formData.firmenname}
                        onChange={handleChange}
                        placeholder="Ihr Unternehmen"
                        className={inputClass("firmenname")}
                      />
                      {errors.firmenname && <p className="mt-1 text-xs text-red-500">{errors.firmenname}</p>}
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-dark mb-1.5">
                      Website <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://ihre-website.de"
                      className={inputClass("website")}
                    />
                    {errors.website && <p className="mt-1 text-xs text-red-500">{errors.website}</p>}
                  </div>

                  {/* Email + Telefon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark mb-1.5">
                        E-Mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ihre@email.de"
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-dark mb-1.5">
                        Telefon <span className="text-muted font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+49 ..."
                        className={inputClass("phone")}
                      />
                    </div>
                  </div>

                  {/* Service chips */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-3">
                      Was interessiert Sie? <span className="text-muted font-normal">(Mehrfachauswahl möglich)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((service) => {
                        const selected = formData.selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm border transition-all ${
                              selected
                                ? "bg-primary/10 border-primary/40 text-primary font-semibold"
                                : "bg-offwhite border-border text-muted hover:border-primary/30 hover:text-dark"
                            }`}
                          >
                            {selected && (
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nachricht */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark mb-1.5">
                      Nachricht <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Wie können wir Ihnen helfen?"
                      className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  {/* Privacy + Submit */}
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="acceptPrivacy"
                          checked={formData.acceptPrivacy}
                          onChange={handleChange}
                          className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary"
                        />
                        <span className="text-sm text-muted leading-relaxed">
                          Ich habe die{" "}
                          <a href="/datenschutz" className="text-primary underline underline-offset-2 hover:text-primary/80">
                            Datenschutzerklärung
                          </a>{" "}
                          gelesen und akzeptiere sie. <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.acceptPrivacy && (
                        <p className="mt-1 text-xs text-red-500">{errors.acceptPrivacy}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || submitted}
                      className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Wird gesendet…
                        </>
                      ) : submitted ? (
                        <>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Gesendet
                        </>
                      ) : (
                        "Anfrage senden"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Sidebar */}
              <div>
                {/* Card 1: Kontaktinformationen */}
                <div className="rounded-2xl border border-border bg-offwhite p-8">
                  <h3 className="text-lg font-semibold text-dark font-[family-name:var(--font-heading)] mb-6">
                    Kontaktinformationen
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                        <svg className="h-4.5 w-4.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">E-Mail</p>
                        <a href="mailto:info@seoforge.de" className="text-sm text-dark hover:text-primary transition-colors">
                          info@seoforge.de
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                        <svg className="h-4.5 w-4.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">Telefon</p>
                        <a href="tel:015203450695" className="text-sm text-dark hover:text-primary transition-colors">
                          0152 03450695
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                        <svg className="h-4.5 w-4.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">Adresse</p>
                        <address className="text-sm text-dark not-italic">
                          Kurpfalzstraße 16, 68542 Heddesheim
                        </address>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted mb-1">Öffnungszeiten</p>
                      <p className="text-sm text-dark">Mo–Fr 9:00–18:00 Uhr</p>
                      <p className="text-sm text-muted">Sa–So Geschlossen</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Trust signals */}
                <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/[0.03] p-6">
                  <h3 className="text-base font-semibold text-dark mb-4">
                    Warum SeoForge?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Keine Vertragsbindung",
                      "Direkte Ansprechpartner",
                      "100% White-Hat Methoden",
                      "Monatliche Transparenz-Reports",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-dark">
                        <svg className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-offwhite border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)]">
                Häufig gestellte <span className="text-primary">Fragen</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details key={index} className="group rounded-2xl border border-border bg-white p-6">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-dark">
                    {item.q}
                    <svg className="h-5 w-5 text-primary transition-transform group-open:rotate-180 shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
