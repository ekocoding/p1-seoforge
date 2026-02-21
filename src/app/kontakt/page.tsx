"use client";

import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import { useState } from "react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie schnell kann ich mit ersten Ergebnissen rechnen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen zeigen sich oft nach 4-6 Wochen. Signifikante Rankings und Traffic-Steigerungen sehen die meisten Kunden nach 3-6 Monaten.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet SEO bei SeoForge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unsere Preise richten sich nach Ihrem Bedarf und Ihrer Branche. Im kostenlosen Erstgespräch erstellen wir ein individuelles Angebot.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es eine Vertragsbindung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein, wir arbeiten ohne langfristige Vertragsbindung. Sie können monatlich kündigen.",
      },
    },
  ],
};

export default function KontaktPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-offwhite to-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Wir sind für Sie da
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-dark sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
                Kontakt <span className="text-primary">aufnehmen</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Lassen Sie uns gemeinsam Ihre SEO-Strategie entwickeln. Vereinbaren
                Sie jetzt ein kostenloses Erstgespräch und erfahren Sie, wie wir Ihr
                Unternehmen voranbringen können.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section - Two Column Layout */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-dark mb-2 font-[family-name:var(--font-heading)]">
                  Schreiben Sie uns
                </h2>
                <p className="text-sm text-muted mb-8">
                  Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        placeholder="Ihr Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        placeholder="ihre@email.de"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-dark mb-2">
                        Unternehmen
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        placeholder="Ihr Unternehmen"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-dark mb-2">
                        Website-URL
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        placeholder="https://ihre-website.de"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full resize-none rounded-lg border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                      placeholder="Wie können wir Ihnen helfen?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? "Wird gesendet..." : formStatus === "success" ? "Erfolgreich gesendet!" : "Nachricht senden"}
                  </button>

                  <p className="text-center text-xs text-muted">
                    * Pflichtfelder | Ihre Daten werden vertraulich behandelt.
                  </p>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-dark mb-2 font-[family-name:var(--font-heading)]">
                  Kontaktinformationen
                </h2>
                <p className="text-sm text-muted mb-8">
                  Erreichen Sie uns telefonisch, per E-Mail oder besuchen Sie uns vor Ort.
                </p>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08]">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-dark mb-1">E-Mail</h3>
                      <a href="mailto:info@seoforge.de" className="text-sm text-muted hover:text-primary transition-colors">
                        info@seoforge.de
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08]">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-dark mb-1">Telefon</h3>
                      <a href="tel:015203450695" className="text-sm text-muted hover:text-primary transition-colors">
                        0152 03450695
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08]">
                      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-dark mb-1">Adresse</h3>
                      <address className="text-sm text-muted not-italic">
                        Kurpfalzstraße 16<br />
                        68542 Heddesheim<br />
                        Deutschland
                      </address>
                    </div>
                  </div>
                </div>

                {/* Opening Hours Card */}
                <div className="mt-8 rounded-2xl border border-border bg-gradient-to-br from-offwhite/50 to-white p-6">
                  <h3 className="text-sm font-semibold text-dark mb-4">Öffnungszeiten</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Montag - Freitag</span>
                      <span className="font-medium text-dark">9:00 - 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Samstag - Sonntag</span>
                      <span className="font-medium text-dark">Geschlossen</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    24h Antwortzeit
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Kostenlose Erstberatung
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl font-[family-name:var(--font-heading)]">
                Häufig gestellte <span className="text-primary">Fragen</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Wie schnell kann ich mit ersten Ergebnissen rechnen?",
                  a: "Erste Verbesserungen zeigen sich oft nach 4-6 Wochen. Signifikante Rankings und Traffic-Steigerungen sehen die meisten Kunden nach 3-6 Monaten."
                },
                {
                  q: "Was kostet SEO bei SeoForge?",
                  a: "Unsere Preise richten sich nach Ihrem Bedarf und Ihrer Branche. Im kostenlosen Erstgespräch erstellen wir ein individuelles Angebot."
                },
                {
                  q: "Gibt es eine Vertragsbindung?",
                  a: "Nein, wir arbeiten ohne langfristige Vertragsbindung. Sie können monatlich kündigen."
                }
              ].map((item, index) => (
                <details key={index} className="group rounded-2xl border border-border bg-white p-6">
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-dark">
                    {item.q}
                    <svg className="h-5 w-5 text-primary transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
