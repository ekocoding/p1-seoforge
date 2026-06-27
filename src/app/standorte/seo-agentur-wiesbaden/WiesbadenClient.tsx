import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";
import { KeywordVolumeApp, RankingProgressApp } from "./WiesbadenWidgets";

/* ── data ── */
const cityStats = [
  { value: "285.000",  label: "Einwohner" },
  { value: "14.000+",  label: "HS RheinMain Stud." },
  { value: "Destatis", label: "Statistik-Bundesamt" },
  { value: "Rheingau", label: "Weinregion" },
];

const industries = [
  { title: "Versicherung & Finanz", desc: "Wiesbadens Nähe zu Frankfurt und der gehobene Dienstleistungssektor ziehen Versicherungen und Finanzberatungen an. B2B-SEO mit E-E-A-T-konformem Content für YMYL-Bereiche ist hier entscheidend.", featured: true },
  { title: "IT & Consulting", desc: "Wiesbaden wächst als IT- und Beratungsstandort. AOE, Seibert und weitere IT-Unternehmen zeigen, dass die Kurstadt Tech-Talent anzieht. Wir positionieren IT-Dienstleister für ihre spezifischen B2B-Zielgruppen.", featured: false },
  { title: "Immobilien & Luxury", desc: "Wiesbadens Kurstadt-Image und hohe Kaufkraft machen Immobilien und Luxusgüter zu attraktiven SEO-Segmenten. Makler und Premium-Brands profitieren von zielgruppengenauem Content.", featured: false },
  { title: "Tourismus & Kur", desc: "Kurhaus, Spielbank und Thermalbäder ziehen Touristen und Wellness-Urlauber an. Hotels, Kuranlagen und Gastronomiebetriebe gewinnen Gäste über lokales SEO und Google Business.", featured: false },
  { title: "Weinregion Rheingau", desc: "Der Rheingau ist eine der bekanntesten Weinregionen Deutschlands. Weingüter, Vinotheken und Weinhandlungen profitieren von SEO, der Weinliebhaber national und international anspricht.", featured: false },
  { title: "Gesundheit & Wellness", desc: "Wiesbadens Kurtradition schafft starke Nachfrage nach Gesundheit und Wellness. Praxen, Wellnesshotels und Gesundheitsdienstleister gewinnen über lokales SEO neue Kunden.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Wiesbadener Finanz- und Dienstleistungsmarkt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Premium-Strategie", desc: "Wiesbadens Kurstadt-Image als SEO-Signal nutzen: YMYL-konformer Content für Versicherungen, Premium-Positionierung für Luxury und Wellness, regionale Strategie für die Rhein-Main-Metropolregion." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung und branchenspezifischer Content — E-E-A-T für Finanzdienstleistungen, lokales SEO für Tourismus, Premium-Content für Immobilien und Luxury." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich — auf dem Standard, den eine Landeshauptstadt wie Wiesbaden erwartet." },
];

const faqs = [
  { q: "Was macht Wiesbaden als SEO-Standort besonders?", a: "Wiesbaden vereint außergewöhnliche Faktoren: Destatis und BKA als Bundesbehörden, R+V Versicherung mit 4.800 Mitarbeitern vor Ort, das elegante Kurstadt-Image mit Kurhaus und Thermalbädern, die Nähe zu Frankfurt (20 km) und der Rheingau als Premiumweinregion. Diese Kombination schafft einen anspruchsvollen, aber ertragreichen SEO-Markt." },
  { q: "Wie hilft SeoForge Wiesbadener Finanz- und Versicherungsunternehmen?", a: "Finanz- und Versicherungs-SEO erfordert YMYL-konformen Content, der E-E-A-T-Standards erfüllt und gleichzeitig Entscheider und Privatkunden anspricht. Wir entwickeln Strategien für Versicherungsmakler, Finanzberater und FinTechs im Wiesbadener Markt — Compliance-konform und suchmaschinenoptimiert." },
  { q: "Wie lange dauert SEO in Wiesbaden?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Finanz- und Immobilien-Keywords entwickeln sich in der Regel in 3–6 Monaten. Die starke Rhein-Main-Suchnachfrage erleichtert schnelle Gewinne bei lokalen Keywords." },
  { q: "Betreut SeoForge auch Unternehmen in der Rhein-Main-Region?", a: "Ja. Wiesbadens Nähe zu Frankfurt (20 km) und die Rhein-Main-Metropolregion mit 5,8 Millionen Menschen sind strategisch wichtige Märkte. Wir entwickeln regionale Strategien, die Wiesbaden als Premium-Standort positionieren und gleichzeitig die gesamte Metropolregion erschließen." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen in Wiesbaden?", a: "Wir arbeiten ohne Vertragszwang und kennen Wiesbadens Märkte: YMYL-konforme Finanz-Inhalte, Premium-Positionierung für die Kurstadt, Rheingau-SEO für Weinregion. Keine Standardpakete, sondern Strategien für Wiesbadens einzigartigen Premium-Markt. Transparente Berichte inklusive." },
];

/* ── main component ── */
export default function WiesbadenClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/wiesbaden-hero.jpg"
            alt="SEO Agentur Wiesbaden – Landeshauptstadt Hessen Kurstadt"
            fill
            className="object-cover object-center"
            priority
            sizes="42vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.3) 40%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-24 lg:py-32">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-xs text-muted/60 font-mono mb-8">
              <Link href="/" className="hover:text-dark transition-colors">SeoForge</Link>
              <span>/</span>
              <Link href="/standorte" className="hover:text-dark transition-colors">Standorte</Link>
              <span>/</span>
              <span className="text-dark/70">Wiesbaden</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Wiesbaden · Landeshauptstadt Hessen · Kurstadt
            </div>
            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR WIESBADEN</p>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Wiesbaden</span>
            </h1>
            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Wiesbaden ist Landeshauptstadt Hessens und Dienstleistungsstadt mit institutionellem
                Gewicht: Das Statistische Bundesamt (Destatis) und das Bundeskriminalamt (BKA) verleihen
                der Kurstadt Behördenautorität, die das Geschäftsumfeld nachhaltig prägt. R+V Versicherung
                mit über 4.800 Mitarbeitern ist der größte private Arbeitgeber — Finanz- und Versicherungs-
                dienstleistungen dominieren den B2B-Markt. Nur 20 Kilometer von Frankfurt entfernt, aber
                mit eigenem Premium-Kurstadt-Image — Kurhaus, Spielbank, Thermalquellen — positioniert
                sich Wiesbaden im YMYL-sensiblen Finanzbereich mit hohem Vertrauensanspruch.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge entwickelt Authority-Signal-SEO für Unternehmen im behördennahen Umfeld:
                YMYL-konformer Content für Versicherungen und Finanzberatung, der E-E-A-T-Standards
                erfüllt und gleichzeitig Entscheider anzieht. Das Kurstadt-Image nutzen wir als
                Premium-Positionierungssignal für Tourismus, Wellness und Luxury. Über integrierte
                Rhein-Main-Strategien erschließen wir die gesamte Metropolregion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link
                href="/seo-agentur"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite"
              >
                Unsere Leistungen
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/70">
              {["< 24h Reaktionszeit", "Kein Vertrag", "KI-gestützt", "Vollständig transparent"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary/50" />{item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {cityStats.map(({ value, label }, i) => (
              <div className="reveal" key={label} style={{ animationDelay: `${i * 80}ms` }}>
                <div>
                  <div className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CITY INTRO ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Wiesbadener Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Wiesbaden: Eleganz, Verwaltung und Rhein-Main-Power
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Wiesbaden ist durch und durch eine Dienstleistungsstadt mit Premium-Anspruch.
                Das Statistische Bundesamt (Destatis) und das Bundeskriminalamt (BKA) verleihen
                der Kurstadt institutionelle Bedeutung. R+V Versicherung mit über 4.800
                Mitarbeitern vor Ort ist der größte private Arbeitgeber.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Nur 20 Kilometer von Frankfurt entfernt profitiert Wiesbaden von der Rhein-Main-
                Metropolregion mit 5,8 Millionen Menschen — und bietet gleichzeitig das
                elegante Kurstadt-Flair mit Kurhaus (seit 1810) und Thermalquellen, das
                Premium-Positionierungen ermöglicht.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Der Rheingau als Premium-Weinregion vor der Haustür und die Hochschule RheinMain
                mit über 14.000 Studierenden ergänzen das Bild: Wiesbaden ist ein Markt, der
                Qualität, Seriosität und regionale Verankerung gleichermaßen verlangt.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cities/wiesbaden-city.jpg"
                  alt="Wiesbaden Kurstadt – Landeshauptstadt Hessen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Wiesbaden</p>
                  <p className="text-white/60 text-xs">285.000 Einwohner · Elegante Kurstadt am Rhein</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt">
        <CityContactForm city="Wiesbaden" />
      </div>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              SEO für jede Branche in Wiesbaden
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {industries.map((ind, i) => (
              <div className="reveal" key={ind.title} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="group grid md:grid-cols-[56px_260px_1fr] gap-2 md:gap-8 py-7 px-4 -mx-4 items-baseline hover:bg-offwhite rounded-xl transition-colors duration-300">
                  <span className="font-mono text-xs font-bold text-primary/40 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark leading-snug">{ind.title}</h3>
                    {ind.featured && (
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-primary uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Schwerpunkt
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEYWORD VOLUME APP ═══ */}
      <KeywordVolumeApp />

      {/* ═══ PROCESS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unser Prozess</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              So bringen wir Sie auf Seite&nbsp;1
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[25px] top-4 bottom-4 w-px bg-primary/15" aria-hidden="true" />
            <div className="space-y-5">
              {process.map((p, i) => (
                <div className="reveal relative flex gap-6 items-start" key={p.step} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="relative z-10 shrink-0 w-[52px] h-[52px] rounded-2xl bg-white border border-primary/25 shadow-sm flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-primary">{p.step}</span>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-border p-6 hover:border-primary/25 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-dark mb-1.5">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM IMAGE + METHODE ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "16/10" }}>
                <Image
                  src="/images/cities/karlsruhe-tech.jpg"
                  alt="SeoForge Team – SEO Agentur Wiesbaden"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Präzision für den <span className="gradient-text">Premiummarkt</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Wiesbaden ist kein Massenmarkt — sondern ein Premiumstandort mit hohen Standards.
                YMYL-konformer Content für Versicherungen, elegante Positionierung für die Kurstadt
                und Rhein-Main-Reichweite: SEO, das dem Wiesbadener Anspruch gerecht wird.
              </p>
              <ul className="space-y-3">
                {[
                  "YMYL E-E-A-T für Versicherungen, Finanzberatung und Gesundheitsdienstleister",
                  "Hessischer Behördenmarkt: Content für Destatis-, BKA- und R+V-Umfeld",
                  "Premium-Positionierung für Kurstadt-Image: Tourismus, Wellness, Luxury",
                  "Monatliches Reporting ohne Agentur-Blabla",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEO CONTENT ARTICLE ═══ */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ SEO Wissen</p>
          </div>
          <div className="reveal" style={{ animationDelay: "80ms" }}>
            <div className="seo-content" dangerouslySetInnerHTML={{ __html: articleHtml }} />
          </div>
        </div>
      </section>

      {/* ═══ WHY SEOFORGE ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Warum SeoForge</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              Ihr Vorteil mit SeoForge Wiesbaden
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Finanz-SEO-Expertise", desc: "YMYL, E-E-A-T für Versicherungen und Finanzdienstleister — im Wiesbaden-Frankfurt-Korridor unverzichtbar. Wir kennen die Compliance-Anforderungen und entwickeln rechtssichere Inhalte." },
              { title: "Premium-Positionierung", desc: "Wiesbadens Kurstadt-Image als SEO-Signal für Luxury, Wellness und Premium-Services nutzen. Wir entwickeln Content, der den gehobenen Wiesbadener Markt anspricht." },
              { title: "Rhein-Main-Reichweite", desc: "Die 5,8-Millionen-Metropolregion Rhein-Main strategisch erschließen — über Wiesbaden hinaus bis Frankfurt, Mainz und in die gesamte Region." },
              { title: "Keine Verträge", desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Unsere Leistung überzeugt — nicht der Vertrag. Transparente Berichte inklusive." },
            ].map((b, i) => (
              <div className="reveal" key={b.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className="rounded-2xl border border-border bg-white p-7 h-full flex gap-5 items-start hover:border-primary/25 hover:shadow-md transition-all duration-300">
                  <div className="shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <div className="h-3.5 w-3.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1.5">{b.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <StandortFaq items={faqs} defaultOpen={0} />

      {/* ═══ BOTTOM NAV ═══ */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/standorte" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">
              ← Alle Standorte
            </Link>
            <Link href="/seo-agentur" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
