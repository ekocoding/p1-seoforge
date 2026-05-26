import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";

/* ── data ── */
const industries = [
  { title: "IT & Cyber Security", desc: "Karlsruhe ist Deutschlands IT-Hochburg: tausende Software- und Security-Unternehmen konkurrieren um Sichtbarkeit. Wir entwickeln Nischen-SEO-Strategien, die technische Kompetenz sichtbar machen — bei Entscheidern, Talenten und Investoren.", featured: true },
  { title: "KI & Machine Learning", desc: "Das Cyber Valley macht Karlsruhe zum führenden KI-Forschungszentrum Europas. KI-Startups und Forschungs-Spin-offs profitieren von Content-Strategien, die wissenschaftliche Autorität und Geschäftsnähe vereinen.", featured: false },
  { title: "Recht & Compliance", desc: "Als juristische Hauptstadt Deutschlands — Bundesverfassungsgericht, BGH, Bundesanwaltschaft — sitzt hier auch ein starker Rechts- und Compliance-Sektor. Wir positionieren Kanzleien und Legal-Tech-Firmen präzise.", featured: false },
  { title: "Energie & Infrastruktur", desc: "EnBW (30.391 Mitarbeiter) und ein starkes Energie-Ökosystem machen Karlsruhe zum Zentrum der Energiewende. Wir entwickeln SEO für Energieunternehmen, die technische Kompetenz und Nachhaltigkeit kommunizieren.", featured: false },
  { title: "Maschinenbau & Hardware", desc: "Präzisionstechnik und Embedded Systems aus Karlsruhe beliefern Weltmärkte. Wir entwickeln mehrsprachige SEO-Strategien für Hersteller, die global sichtbar sein wollen.", featured: false },
  { title: "E-Commerce & Retail", desc: "Die wachsende Kaufkraft in der TechnologieRegion schafft starken Online-Handel. Lokale und regionale E-Commerce-Unternehmen profitieren von gezieltem SEO für die Karlsruher Zielgruppe.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Karlsruher IT-Markt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Nischen-Strategie", desc: "In Karlsruhe gewinnt Tiefe über Breite. Wir identifizieren die profitabelsten Nischen-Keywords für Ihre Branche und entwickeln Topical Authority, die Sie von generischen Wettbewerbern abhebt." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung, Content-Erstellung und lokale Signale — alles in enger Abstimmung mit Ihrem Team. Besonders für JavaScript-lastige Apps und APIs ein Muss." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich — und ohne Agentur-Blabla. Wir sprechen Ihre Tech-Sprache." },
];

const faqs = [
  { q: "Was macht Karlsruhe als SEO-Standort einzigartig?", a: "Karlsruhe vereint außergewöhnliche Faktoren: Das KIT als eine der führenden Forschungsuniversitäten Deutschlands, 7 Weltmarktführer, tausende IT-Unternehmen und Cyber Valley als europäisches KI-Zentrum. Diese Tech-Dichte schafft gleichzeitig intense Konkurrenz um digitale Sichtbarkeit — generisches SEO funktioniert hier nicht. Gefragt sind Nischen-Autorität und technisch präziser Content." },
  { q: "Wie hilft SeoForge IT-Unternehmen in Karlsruhe?", a: "IT-SEO in Karlsruhe erfordert mehr als Keyword-Targeting. Wir entwickeln Topical Authority für Ihre spezifische Nische — ob Cyber Security, KI-Software oder Embedded Systems. Das bedeutet: technisch korrekte Texte, strukturierte Daten für komplexe Produkte und eine Strategie, die Fachkräfte, Partner und Entscheider gleichzeitig anspricht." },
  { q: "Wie lange dauert es, bis SEO in Karlsruhe Ergebnisse zeigt?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive IT-Keywords entwickeln sich in der Regel in 3–6 Monaten. Die Karlsruher IT-Landschaft ist umkämpft — aber mit der richtigen Nischen-Strategie sind schnelle Gewinne bei Long-Tail-Keywords möglich." },
  { q: "Spielt das Thema Talent-Recruiting eine Rolle für SEO in Karlsruhe?", a: "Absolut. Viele Karlsruher IT-Unternehmen nutzen ihre Website primär als Recruiting-Kanal. SEO für Karriereseiten, Arbeitgeberbranding und technische Inhalte, die Talente vom KIT ansprechen, ist eine Kernstrategie, die wir gezielt entwickeln." },
  { q: "Was unterscheidet SeoForge von anderen SEO-Agenturen in Karlsruhe?", a: "Wir arbeiten ohne Vertragszwang und erstellen Berichte, die Sie wirklich verstehen. Entscheidend: Wir kennen den Karlsruher Tech-Markt — die IT-Dichte, die KI-Forschungskultur, die spezifischen B2B-Zielgruppen. Keine Standardpakete, sondern Strategien für Ihren konkreten Marktplatz." },
];

/* ── main component ── */
export default function KarlsruheClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/karlsruhe-hero.jpg"
            alt="SEO Agentur Karlsruhe – Blick auf Karlsruhe Fächerstadt"
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
            <nav className="flex items-center gap-2 text-xs text-muted/60 font-mono mb-8">
              <Link href="/" className="hover:text-muted transition-colors">SeoForge</Link>
              <span>/</span>
              <Link href="/standorte" className="hover:text-muted transition-colors">Standorte</Link>
              <span>/</span>
              <span className="text-muted/80">Karlsruhe</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Karlsruhe · TechnologieRegion Baden-Württemberg
            </div>

            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              / SEO AGENTUR KARLSRUHE
            </p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Karlsruhe</span>
            </h1>

            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Karlsruhe ist Deutschlands dichtester Tech-Standort: Das Karlsruher Institut für
                Technologie (KIT) bildet mit über 22.200 Studierenden jährlich Spitzentalente aus, die
                häufig in der Stadt bleiben und gründen. Als Teil des Cyber Valley — dem führenden
                KI-Forschungszentrum Europas — zieht Karlsruhe internationale Spitzenforscher und
                Investoren an. Sieben Weltmarktführer haben hier ihren Sitz, das regionale BIP liegt
                bei rund 24,6 Milliarden Euro. Hinzu kommen das Bundesverfassungsgericht und der BGH,
                die Karlsruhe zur juristischen Hauptstadt Deutschlands machen. Diese Tech-Dichte schafft
                einen SEO-Markt, in dem generische Ansätze scheitern — Nischen-Autorität ist entscheidend.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge setzt auf Topical Authority für IT-Nischen: Cyber Security, KI-Software,
                SaaS und Embedded Systems. Für JavaScript-lastige Applikationen und API-Dokumentationen
                beherrschen wir technisches SEO auf Entwicklerniveau. Unser Keyword-Ansatz erschließt
                Long-Tail-Suchräume, die große Wettbewerber ignorieren — und baut damit systematisch
                organische Sichtbarkeit im härtesten Techmarkt Deutschlands auf.
              </p>
            </div>

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

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/70">
              {["< 24h Reaktionszeit", "Kein Vertrag", "KI-gestützt", "Vollständig transparent"].map((item) => (
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
              / Der Karlsruher Markt
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Karlsruhe: Wo Technologie auf digitalen Wettbewerb trifft
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Das Karlsruher Institut für Technologie (KIT) produziert jährlich
                Spitzentalente in Informatik, Ingenieurswissenschaften und Physik —
                im Wintersemester 2024/25 waren über 22.200 Studierende eingeschrieben.
                Viele bleiben — und gründen. Die Technologiefabrik betreut seit 1983
                über 400 Unternehmen, aktuell 80+ aktive Unternehmen mit 500+ Jobs.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Als Teil des Cyber Valley ist Karlsruhe das führende KI-Forschungszentrum
                Europas. Sieben Weltmarktführer und acht Hidden Champions haben hier
                ihren Sitz; das regionale Bruttoinlandsprodukt liegt bei rund 24,6 Milliarden
                Euro. EnBW mit 30.391 Mitarbeitern ist der größte Arbeitgeber. Zugleich ist
                Karlsruhe mit dem Bundesverfassungsgericht und dem BGH die juristische
                Hauptstadt Deutschlands — ein Mix aus Industrie, Innovation und Rechtsstaatlichkeit.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Diese IT-Dichte schafft jedoch ein SEO-Paradox: technisch brillante
                Unternehmen sind digital oft unsichtbar. Wir ändern das — mit
                Nischen-Strategien, die im härtesten Techmarkt Deutschlands funktionieren.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cities/karlsruhe-city.jpg"
                  alt="Karlsruhe Fächerstadt mit KIT-Campus – Technologiestandort"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Karlsruhe</p>
                  <p className="text-white/60 text-xs">309.050 Einwohner · IT-Hauptstadt Deutschlands</p>
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              / Branchen-SEO
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              SEO für jede Branche in Karlsruhe
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <div className="reveal" key={ind.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className={`rounded-xl border p-6 h-full ${ind.featured ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border bg-white"}`}>
                  {ind.featured && (
                    <span className="inline-flex items-center gap-1.5 mb-3 text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Schwerpunkt
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              / Unser Prozess
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              So bringen wir Sie auf Seite&nbsp;1
            </h2>
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
                <Image
                  src="/images/cities/karlsruhe-tech.jpg"
                  alt="SeoForge Team – SEO Agentur Karlsruhe"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Tiefe schlägt <span className="gradient-text">Breite</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Karlsruhes IT-Markt ist zu dicht für generische SEO-Pakete. Wir fokussieren
                auf Topical Authority in Ihrer spezifischen Nische — damit Google und
                Ihre Zielgruppe Sie als die Experten wahrnehmen, die Sie sind.
              </p>
              <ul className="space-y-3">
                {[
                  "IT-Nischen-Targeting: Cyber Security, KI, SaaS, Embedded Systems",
                  "JavaScript-SEO für tech-lastige Apps und APIs",
                  "KIT-Kontext und Cyber Valley Autorität als Content-Hebel",
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
              Ihr Vorteil mit SeoForge Karlsruhe
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Tech-Content-Expertise", desc: "Wir schreiben Content, den IT-Entscheider ernst nehmen — technisch präzise, keine Marketing-Floskeln. Für Cyber Security, KI und SaaS." },
              { title: "Nischen-Strategie", desc: "In Karlsruhe gewinnt Tiefe über Breite. Wir identifizieren die profitabelsten Nischen-Keywords für Ihre spezifische Branche." },
              { title: "Technisches SEO", desc: "Core Web Vitals, JavaScript-SEO, API-Indexierung: Wir sprechen Ihre Tech-Sprache. Kein Outsourcing an SEO-Generalisten." },
              { title: "Keine Verträge", desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Unsere Leistung überzeugt — nicht der Vertrag. Transparente Berichte inklusive." },
            ].map((b, i) => (
              <div className="reveal" key={b.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className="rounded-xl border border-border bg-white p-6 h-full">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <StandortFaq items={faqs} defaultOpen={0} />

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt">
        <CityContactForm city="Karlsruhe" />
      </div>

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

