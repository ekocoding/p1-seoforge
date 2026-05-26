import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";

/* ── data ── */
const industries = [
  { title: "Schmuck & Uhren E-Commerce", desc: "Pforzheims 700+ Schmuck- und Uhrenbetriebe verkaufen zunehmend online. Wir entwickeln E-Commerce-SEO-Strategien, die gegen Amazon und Zalando bestehen — durch Produktoptimierung, Rich Snippets und 'Made in Pforzheim' als Qualitätsmerkmal.", featured: true },
  { title: "Maschinenbau & Metallverarbeitung", desc: "Die Präzisionsindustrie rund um Schmuck und Uhren hat starke Zulieferbetriebe hervorgebracht. Wir entwickeln B2B-SEO für Maschinenbauer und Metallverarbeiter, die internationale Abnehmer ansprechen wollen.", featured: false },
  { title: "Design & Kreativwirtschaft", desc: "Die Hochschule Pforzheim ist für Design und Wirtschaft europaweit renommiert. Kreativbetriebe und Designstudios aus dem HS-Umfeld profitieren von Portfolio-SEO, der Auftraggeber und Talente gleichermaßen anspricht.", featured: false },
  { title: "Tourismus & Schwarzwald", desc: "Pforzheims Lage am Nordschwarzwald macht Tourismus und Ausflugsgastronomie zu relevanten SEO-Segmenten. Lokales SEO und saisonale Keyword-Strategien bringen Gäste aus der Region.", featured: false },
  { title: "Handwerk & Gewerbe", desc: "Goldschmiedemeister, Uhrmacher und spezialisiertes Handwerk prägen Pforzheims Wirtschaft. Lokales SEO mit Handwerksschwerpunkt bringt Anfragen von Privat- und Geschäftskunden.", featured: false },
  { title: "IT & Dienstleistungen", desc: "Der wachsende Dienstleistungssektor rund um die Hochschule Pforzheim schafft Nachfrage nach IT-SEO. Wir positionieren Dienstleister für die spezifischen Suchbegriffe der Goldstadt.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Pforzheimer Schmuck- und Mittelstandsmarkt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "E-Commerce-Strategie", desc: "Für Schmuck und Uhren: Produktseiten-Optimierung, Rich Snippets, Google Shopping-Integration und 'Made in Pforzheim' als Qualitätssignal — eine Strategie, die Kaufentscheidungen beeinflusst." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung und Mittelstand-spezifischer Content — mit Fokus auf Pforzheims Alleinstellungsmerkmal in der internationalen Schmuck- und Uhrenindustrie." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Shop-Conversions. Transparent, verständlich — skalierbar für Pforzheimer Mittelständler jeder Größe." },
];

const faqs = [
  { q: "Was macht Pforzheim als SEO-Standort einzigartig?", a: "Pforzheim ist weltweit als Goldstadt bekannt: 700+ Schmuck- und Uhrenbetriebe, internationale Exportnachfrage und eine Mittelstandskultur, die seit 1767 auf Handwerksexzellenz setzt. Diese Kombination schafft einzigartige SEO-Chancen — besonders für E-Commerce, B2B-Export und lokales Handwerk." },
  { q: "Wie hilft SeoForge Pforzheimer Schmuckhändlern?", a: "Wir entwickeln E-Commerce-SEO-Strategien speziell für Schmuck und Uhren: Produktseiten-Optimierung für kaufbereite Suchanfragen, Rich Snippets für Bewertungen und Preise, Google Shopping-Integration und 'Made in Pforzheim' als Vertrauenssignal gegen asiatische Konkurrenz." },
  { q: "Wie lange dauert SEO in Pforzheim?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für E-Commerce-Keywords entwickeln sich in der Regel in 3–6 Monaten. Mit gezielten Nischen-Keywords für Schmuck und Uhren sind schnelle Gewinne möglich." },
  { q: "Betreut SeoForge Unternehmen in der TechnologieRegion Karlsruhe?", a: "Ja. Pforzheims Nähe zu Karlsruhe und die TechnologieRegion schaffen gemeinsame Märkte. Wir entwickeln regionale Strategien, die sowohl Pforzheim als auch den Großraum Karlsruhe erschließen — ideal für Betriebe mit regionaler Reichweite." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen in Pforzheim?", a: "Wir arbeiten ohne Vertragszwang und verstehen den Mittelstand. Keine übergroßen Agentur-Pakete, sondern skalierbare Strategien für Pforzheimer Betriebe — von der Ein-Mann-Goldschmiede bis zum exportierenden Schmuckhersteller. Transparente Berichte inklusive." },
];

/* ── main component ── */
export default function PforzheimClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/pforzheim-hero.jpg"
            alt="SEO Agentur Pforzheim – Goldstadt Nordschwarzwald"
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
              <Link href="/" className="hover:text-muted transition-colors">SeoForge</Link>
              <span>/</span>
              <Link href="/standorte" className="hover:text-muted transition-colors">Standorte</Link>
              <span>/</span>
              <span className="text-muted/80">Pforzheim</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Pforzheim · Goldstadt Nordschwarzwald
            </div>

            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR PFORZHEIM</p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Pforzheim</span>
            </h1>

            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Pforzheim ist international als Goldstadt bekannt: Seit 1767 exportieren über 700
                Schmuck- und Uhrenbetriebe in alle Welt und halten damit einen einzigartigen
                Markennamen aufrecht, der in keiner anderen deutschen Stadt replizierbar ist. Die
                Hochschule Pforzheim — europaweit renommiert für Design und Wirtschaft — versorgt
                die Branche mit kreativem Nachwuchs. Im E-Commerce konkurrieren Pforzheimer Betriebe
                mit internationalen Plattformen und asiatischen Massenanbietern um dieselben Käufer:
                ein Markt, in dem &ldquo;Made in Pforzheim&rdquo; als Qualitätssignal den entscheidenden
                Unterschied machen kann — wenn es digital sichtbar gemacht wird.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge optimiert Produktseiten für kaufbereite Suchanfragen: Rich Snippets,
                Google Shopping-Integration und internationale Keywords für Schmuck- und
                Uhren-E-Commerce. Wir positionieren das Goldstadt-Image als authentisches
                Vertrauenssignal gegen Billiganbieter und erschließen mit gezielten
                englischsprachigen Long-tail-Keywords internationale Käufer direkt.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#kontakt" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link href="/seo-agentur" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">
                Unsere Leistungen
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/70">
              {["< 24h Reaktionszeit", "Kein Vertrag", "KI-gestützt", "Vollständig transparent"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />{item}
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Pforzheimer Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Pforzheim: Goldstadt trifft digitalen Wettbewerb
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Seit 1767, als Markgraf Karl Friedrich die erste Schmuckmanufaktur gründete,
                ist Pforzheim untrennbar mit Schmuck und Uhren verbunden. Heute exportieren
                über 700 Betriebe in alle Welt — doch viele kämpfen online gegen internationale
                Konkurrenz, die massiv in digitale Sichtbarkeit investiert.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Die Hochschule Pforzheim mit rund 6.000 Studierenden zählt zu den
                renommiertesten Design- und Wirtschaftshochschulen Deutschlands. Diese
                Kombination aus handwerklicher Tradition seit 1767 und akademischem
                Design-Know-how schafft einzigartige SEO-Positionierungsmöglichkeiten —
                ergänzt durch die Tourismusregion Nordschwarzwald vor der Haustür.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Die Herausforderung: Pforzheims Goldstadt-Image wird zu selten digital
                genutzt. Wir entwickeln SEO-Strategien, die &ldquo;Made in Pforzheim&rdquo;
                als Vertrauenssignal und Qualitätsmerkmal online sichtbar machen.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/cities/pforzheim-city.jpg" alt="Pforzheim Goldstadt – Stadtbild und Schmuckindustrie" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Pforzheim</p>
                  <p className="text-white/60 text-xs">125.000 Einwohner · Goldstadt am Nordschwarzwald</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">SEO für jede Branche in Pforzheim</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <div className="reveal" key={ind.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className={`rounded-xl border p-6 h-full ${ind.featured ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border bg-white"}`}>
                  {ind.featured && (
                    <span className="inline-flex items-center gap-1.5 mb-3 text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />Schwerpunkt
                    </span>
                  )}
                  <h3 className="font-semibold text-dark mb-2">{ind.title}</h3>
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unser Prozess</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">So bringen wir Sie auf Seite&nbsp;1</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div className="reveal" key={p.step} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="relative bg-white rounded-xl border border-border p-6 h-full">
                  <div className="font-mono text-3xl font-bold text-primary/20 mb-4">{p.step}</div>
                  <h3 className="font-semibold text-dark mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <svg className="w-6 h-6 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM IMAGE + METHODE ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "16/10" }}>
                <Image src="/images/cities/karlsruhe-tech.jpg" alt="SeoForge Team – SEO Agentur Pforzheim" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Made in Pforzheim <span className="gradient-text">weltweit sichtbar</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Pforzheims Goldstadt-Image ist das stärkste SEO-Asset, das die wenigsten
                nutzen. Wir machen &ldquo;Made in Pforzheim&rdquo; zum Vertrauenssignal,
                optimieren E-Commerce für internationale Käufer und positionieren
                Pforzheimer Betriebe gegen Massenware und Billigkonkurrenz.
              </p>
              <ul className="space-y-3">
                {[
                  "E-Commerce-SEO für Schmuck und Uhren: Rich Snippets, Google Shopping",
                  "Internationale Keywords für Export und globale Käufer",
                  "'Made in Pforzheim' als Differenzierungsmerkmal gegen asiatische Konkurrenz",
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
          <div className="reveal"><p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ SEO Wissen</p></div>
          <div className="reveal" style={{ animationDelay: "80ms" }}><div className="seo-content" dangerouslySetInnerHTML={{ __html: articleHtml }} /></div>
        </div>
      </section>

      {/* ═══ WHY SEOFORGE ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Warum SeoForge</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">Ihr Vorteil mit SeoForge Pforzheim</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "E-Commerce-Expertise", desc: "Produktseiten-Optimierung, Rich Snippets und Google Shopping für Schmuck und Uhren — damit Pforzheimer Betriebe online gegen internationale Konkurrenz bestehen." },
              { title: "Mittelstand-Fokus", desc: "Skalierbare Pakete ohne Agentur-Overhead. Wir kennen die Budgets und Anforderungen des Pforzheimer Mittelstands — keine Standardlösungen, sondern passende Strategien." },
              { title: "Made in Pforzheim", desc: "Lokale Herkunft als SEO-Signal und Vertrauensfaktor: Wir nutzen Pforzheims Goldstadt-Image systematisch für Ihre digitale Positionierung gegen Billiganbieter." },
              { title: "Keine Verträge", desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Unsere Leistung überzeugt — nicht der Vertrag. Transparente Berichte inklusive." },
            ].map((b, i) => (
              <div className="reveal" key={b.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className="rounded-xl border border-border bg-white p-6 h-full">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><div className="h-3 w-3 rounded-full bg-primary" /></div>
                  <h3 className="font-semibold text-dark mb-2">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StandortFaq items={faqs} defaultOpen={0} />

      <div id="kontakt"><CityContactForm city="Pforzheim" /></div>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/standorte" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">← Alle Standorte</Link>
            <Link href="/seo-agentur" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">Unsere Leistungen</Link>
          </div>
        </div>
      </section>

    </main>
  );
}

