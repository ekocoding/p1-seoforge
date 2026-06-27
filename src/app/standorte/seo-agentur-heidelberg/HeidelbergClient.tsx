import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";

/* ── data ── */
const industries = [
  { title: "Biotech & Life Sciences", desc: "Heidelberg ist eines der führenden deutschen Biotech-Hubs mit über 30 Firmen und dem BioRN-Cluster mit 200+ Partnern. Wir entwickeln SEO-Strategien, die Investoren, Fachkräfte und Partner international erreichen.", featured: true },
  { title: "Medizin & Gesundheitswesen", desc: "Das Uniklinikum mit 17.500 Mitarbeitern und zahlreiche Praxen und Medtech-Firmen brauchen SEO, das Vertrauen schafft und gleichzeitig E-A-T-Anforderungen erfüllt.", featured: false },
  { title: "Tourismus & Hotellerie", desc: "Heidelberg zählt zu den meistbesuchten Städten Deutschlands. Restaurants, Hotels und Tourismusanbieter profitieren enorm von lokalem SEO und Google Business Profile-Optimierung.", featured: false },
  { title: "Software & IT", desc: "Die junge Bevölkerung (40% unter 30) zieht Tech-Startups und IT-Dienstleister an. Wir positionieren sie für die richtigen B2B-Zielgruppen in der Rhein-Neckar-Region.", featured: false },
  { title: "Bildung & Wissenschaft", desc: "Hochschulen, Bildungsanbieter und akademische Spin-offs finden in Heidelberg ihre Zielgruppe — wir helfen ihnen, diese durch gezielte Content-Strategien zu erreichen.", featured: false },
  { title: "Immobilien & Wohnen", desc: "Die hohe Nachfrage treibt Heidelbergs Immobilienmarkt. Makler und Eigentümer profitieren von lokalem SEO mit präziser Stadtteils-Ausrichtung.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Heidelberger Markt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Strategie & Roadmap", desc: "Auf Basis der Analyse entwickeln wir eine maßgeschneiderte SEO-Strategie – technisch, inhaltlich und lokal. Keine Standardpakete, keine Copy-Paste-Konzepte." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Wir setzen um: technische Fixes, On-Page-Optimierung, Content-Erstellung und lokale Signale. Alles in enger Abstimmung mit Ihrem Team." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich, ohne Agentur-Blabla." },
];

const faqs = [
  { q: "Was macht Heidelberg als SEO-Standort einzigartig?", a: "Heidelberg vereint eine ungewöhnliche Mischung: 40% der Bevölkerung ist unter 30, 22% sind internationale Einwohner, 66% der Jobs liegen in wissensintensiven Diensten. Biotech-Cluster, Universität und globale Unternehmen schaffen eine Zielgruppe, die online sehr aktiv und informiert ist. Das erfordert eine andere SEO-Strategie als in anderen deutschen Städten." },
  { q: "Wie hilft SeoForge Heidelberger Biotech-Unternehmen?", a: "Biotech-SEO ist komplex: Fachterminologie muss korrekt sein, gleichzeitig muss Content für Investoren, Partner und Fachkräfte zugänglich sein. Wir entwickeln Content-Strategien, die wissenschaftliche Autorität aufbauen und gleichzeitig organischen Traffic generieren – auf Deutsch und Englisch." },
  { q: "Wie lange dauert es, bis SEO in Heidelberg Ergebnisse zeigt?", a: "Erste Verbesserungen bei technischer SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Begriffe entwickeln sich in der Regel innerhalb von 3–6 Monaten. Jede Strategie passen wir individuell an Ihre Branche und Ziele an." },
  { q: "Spielt die internationale Ausrichtung Heidelbergs eine Rolle für SEO?", a: "Absolut. Mit 22% internationalen Einwohnern und einer Universität, die weltweit Studierende anzieht, ist Englisch in Heidelberg Geschäftssprache. Wir empfehlen vielen Heidelberger Unternehmen eine zweisprachige SEO-Strategie (Deutsch + Englisch) für maximale Reichweite." },
  { q: "Was unterscheidet SeoForge von anderen SEO-Agenturen in Heidelberg?", a: "Wir arbeiten ohne Vertragszwang, erstellen transparente Berichte die Sie wirklich verstehen, und liefern Strategien die auf Ihrem Markt basieren – nicht auf Standardpaketen. Und wir kennen Heidelberg: den Biotech-Markt, die akademische Zielgruppe, die touristischen Besonderheiten." },
];

/* ── main component ── */
export default function HeidelbergClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        {/* City image panel — right side, desktop only */}
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/heidelberg-hero.jpg"
            alt="SEO Agentur Heidelberg – Blick auf Heidelberg und den Neckar"
            fill
            className="object-cover object-center"
            priority
            sizes="42vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.3) 40%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-24 lg:py-32">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-muted/60 font-mono mb-8">
              <Link href="/" className="hover:text-primary transition-colors">SeoForge</Link>
              <span className="text-muted/30">/</span>
              <Link href="/standorte" className="hover:text-primary transition-colors">Standorte</Link>
              <span className="text-muted/30">/</span>
              <span className="text-muted">Heidelberg</span>
            </nav>

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Heidelberg · Baden-Württemberg
            </div>

            {/* Eyebrow */}
            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              / SEO AGENTUR HEIDELBERG
            </p>

            {/* H1 */}
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br />
              <span className="gradient-text">Heidelberg</span>
            </h1>

            {/* Description */}
            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Heidelberg ist eine der wissensintensivsten Städte Deutschlands: 66&nbsp;% aller Jobs
                entfallen auf wissensbasierte Berufe, 40&nbsp;% der Einwohner sind unter 30, und 22&nbsp;%
                kommen aus dem Ausland. Der BioRN-Cluster verbindet über 200 Partner aus Life Sciences,
                Forschung und Wirtschaft. Das Uniklinikum beschäftigt allein 17.500 Menschen. Dazu kommen
                rund 1,5 Millionen Übernachtungen pro Jahr — Heidelberg ist touristisches Schwergewicht
                und Forschungsstandort zugleich. Dieses Nebeneinander erzeugt eine SEO-Landschaft, in der
                B2B-Keyword-Tiefe und lokale Sichtbarkeit gleichzeitig gefragt sind.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge versteht die akademische Zielgruppenstruktur Heidelbergs: wissenschaftlich
                gebildete Nutzer, internationale Stakeholder, Investoren im Biotech-Umfeld. Wir bauen
                Content-Autorität auf, die Google und diese Zielgruppen gleichzeitig überzeugt —
                zweisprachig auf Deutsch und Englisch, E-A-T-konform für Life-Sciences-Themen,
                mit präzisen Long-Tail-Keywords für Spin-offs und Kliniken.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/seo-agentur"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite"
              >
                Unsere Leistungen
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/70">
              {[
                "< 24h Reaktionszeit",
                "Kein Vertrag",
                "KI-gestützt",
                "Vollständig transparent",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CITY INTRO ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
              / Der Heidelberger Markt
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Heidelberg: Wo Wissenschaft auf digitalen Wettbewerb trifft
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Heidelberg ist jung (40&nbsp;% unter 30), international (22&nbsp;% nicht
                deutsch) und extrem gebildet. Die 1386 gegründete Universität Heidelberg
                und das Universitätsklinikum beschäftigen zusammen 17.500 Menschen —
                fast 10&nbsp;% der gesamten Stadtbevölkerung.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Der BioRN-Cluster verbindet über 200 Partner aus Wirtschaft, Forschung und
                Verwaltung im Bereich Life Sciences. Heidelberger Druck ist weltweiter
                Marktführer im Printmaschinenbereich. Mit rund 1,5 Millionen
                Übernachtungen pro Jahr gehört Heidelberg zu den meistbesuchten Städten
                Deutschlands.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Doch trotz globaler Strahlkraft kämpfen viele Heidelberger Unternehmen
                online um Sichtbarkeit. Genau da setzen wir an.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cities/heidelberg-altstadt.jpg"
                  alt="Heidelberg Altstadt mit Schloss und Neckar – Wirtschaftsstandort"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Heidelberg</p>
                  <p className="text-white/60 text-xs">155.000 Einwohner · Meistbesuchte Universitätsstadt Deutschlands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt">
        <CityContactForm city="Heidelberg" />
      </div>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              / Branchen-SEO
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              SEO für jede Branche in Heidelberg
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {industries.map((ind, i) => (
              <div className="reveal" key={ind.title} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="group grid md:grid-cols-[56px_260px_1fr] gap-2 md:gap-8 py-7 px-4 -mx-4 items-baseline hover:bg-white rounded-xl transition-colors duration-300">
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

      {/* ═══ PROCESS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              / Unser Prozess
            </p>
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
                  src="/images/cities/heidelberg-team.jpg"
                  alt="SeoForge Team – SEO Agentur Heidelberg"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
                / Unsere Methode
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Wissenschaft trifft <span className="gradient-text">SEO-Strategie</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Heidelbergs wissensintensiver Markt verlangt SEO-Strategien, die akademische Zielgruppen ebenso ansprechen wie internationale Investoren und Touristen. Generische Ansätze scheitern hier — wir entwickeln präzise Konzepte für Ihren Markt.
              </p>
              <ul className="space-y-3">
                {[
                  "Biotech-Content mit wissenschaftlicher Autorität (DE + EN)",
                  "E-A-T-Strategien für Medizin, Forschung und Life Sciences",
                  "Akademische Zielgruppen: Uni-Umfeld, BioRN-Cluster, Spin-offs",
                  "Monatliches Reporting ohne Agentur-Blabla",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              / SEO Wissen
            </p>
          </div>
          <div className="reveal" style={{ animationDelay: "80ms" }}>
            <div
              className="seo-content"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          </div>
        </div>
      </section>

      {/* ═══ WHY SEOFORGE ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              / Warum SeoForge
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              Ihr Vorteil mit SeoForge Heidelberg
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Wissenschaftlicher Content", desc: "Wir schreiben Content, der fachlich korrekt und für Laien verständlich ist — ideal für Biotech, Medizin und Forschungseinrichtungen." },
              { title: "Zweisprachig DE/EN", desc: "Für Heidelbergs internationale Zielgruppen aus Wissenschaft, Tourismus und Wirtschaft bieten wir SEO auf Deutsch und Englisch." },
              { title: "E-A-T Expertise", desc: "Google bewertet medizinischen und wissenschaftlichen Content kritisch. Wir bauen echte Autorität auf — nachhaltig und regelkonform." },
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
