import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";

/* ── data ── */
const industries = [
  { title: "Cleantech & Solar", desc: "Freiburg ist Europas Solarhauptstadt. Fraunhofer ISE und ein dichtes Cleantech-Ökosystem brauchen SEO, der technische Kompetenz mit Marktreach verbindet — für Investoren, Partner und Fachkräfte weltweit.", featured: true },
  { title: "Tourismus & Schwarzwald", desc: "Als Tor zum Schwarzwald zieht Freiburg jährlich Millionen Gäste an. Hotels, Pensionen, Restaurants und Ausflugsanbieter profitieren von gezieltem Tourismus-SEO und Google-Maps-Optimierung.", featured: false },
  { title: "Gesundheit & Uniklinikum", desc: "Das Universitätsklinikum Freiburg ist einer der größten Arbeitgeber der Region. Praxen, Pflegedienste und Medizintechnikunternehmen gewinnen Patienten und Fachkräfte über lokales SEO.", featured: false },
  { title: "IT & Startups", desc: "Freiburgs Uni und das Cleantech-Ökosystem treiben Tech-Gründungen an. IT-Startups und Software-Unternehmen profitieren von Nischen-SEO-Strategien für ihre spezifischen Zielgruppen.", featured: false },
  { title: "Gastronomie & Kulinarik", desc: "Freiburgs mediterrane Atmosphäre und lebendige Gastronomie schaffen starke lokale Suchnachfrage. Restaurants und Cafés gewinnen Gäste über lokales SEO und Google Business.", featured: false },
  { title: "Bildung & Forschung", desc: "Die Albert-Ludwigs-Universität (gegründet 1457) und zahlreiche Forschungsinstitute prägen Freiburgs akademisches Umfeld. Spin-offs und Bildungseinrichtungen profitieren von E-E-A-T-starkem SEO.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Freiburger Cleantech- und Tourismusmarkt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Nachhaltigkeits-Strategie", desc: "Content, der Freiburgs Green-City-Image als SEO-Signal nutzt: technisch präzise für Cleantech, erlebnisorientiert für Tourismus — immer auf die spezifische Suchintention der Zielgruppe zugeschnitten." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung und branchenspezifischer Content — für Solar-Unternehmen, Tourismus-Akteure und Forschungseinrichtungen gleichermassen. Lokale Signale inklusive." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich — und ohne Agentur-Blabla. Wir messen, was für Ihr Freiburger Unternehmen zählt." },
];

const faqs = [
  { q: "Was macht Freiburg als SEO-Standort einzigartig?", a: "Freiburg vereint außergewöhnliche Faktoren: Europas Solarhauptstadt mit Fraunhofer ISE als weltgrößtem Solarforschungsinstitut, die Albert-Ludwigs-Universität mit 25.000 Studierenden (gegründet 1457), Schwarzwald-Tourismus mit 6+ Millionen Übernachtungen jährlich und das Green-City-Image als authentisches Nachhaltigkeitsmerkmal. Diese Vielfalt schafft ein einzigartiges SEO-Potential." },
  { q: "Wie hilft SeoForge Freiburger Cleantech-Unternehmen?", a: "Cleantech-SEO in Freiburg erfordert international ausgerichteten technischen Content, der Investoren, Partner und Fachkräfte weltweit anspricht. Wir entwickeln B2B-SEO-Strategien mit präzisen Fachbegriffen, strukturierten Daten für komplexe Technologien und E-E-A-T-Signalen, die Freiburgs Solarhauptstadt-Status als Autorität nutzen." },
  { q: "Wie lange dauert SEO in Freiburg?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Cleantech- und Tourismus-Keywords entwickeln sich in der Regel in 3–6 Monaten. Freiburgs starkes regionales Suchvolumen erleichtert schnelle Gewinne bei lokalen Keywords." },
  { q: "Betreut SeoForge auch Tourismus in der Schwarzwaldregion?", a: "Ja. Schwarzwald-Tourismus ist ein starkes regionales SEO-Thema. Wir entwickeln Local-SEO-Strategien für Hotels, Pensionen und Ausflugsziele in Freiburg und dem gesamten Schwarzwald — inklusive Tourismus-Keywords, Google Business-Optimierung und saisonaler Content-Planung." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen in Freiburg?", a: "Wir arbeiten ohne Vertragszwang und verstehen Freiburgs besondere Märkte: Cleantech, Wissenschaft, Tourismus. Keine generischen Pakete, sondern Strategien, die Freiburgs Green-City-DNA und akademische Kultur als Wettbewerbsvorteil nutzen. Transparente Berichte inklusive." },
];

/* ── main component ── */
export default function FreiburgClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/freiburg-hero.jpg"
            alt="SEO Agentur Freiburg – Solarhauptstadt und Green City"
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
              <span className="text-muted/80">Freiburg</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Freiburg im Breisgau · Solarhauptstadt &amp; Green City
            </div>

            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR FREIBURG</p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Freiburg</span>
            </h1>

            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Freiburg ist Europas Solarhauptstadt: Das Fraunhofer ISE — das größte Solarforschungs-
                zentrum der Welt — hat hier seinen Sitz und prägt Freiburgs globalen Ruf als Green-Economy-
                Vorreiter. Die Albert-Ludwigs-Universität, 1457 gegründet, bringt 25.000 Studierende in
                die Stadt und erzeugt ein akademisches Umfeld, das Startups, Forschungstransfer und eine
                kritische digitale Zielgruppe hervorbringt. Dazu kommen über 6 Millionen Schwarzwald-
                Übernachtungen pro Jahr — Tourismus als Wirtschaftskraft mit enormem lokalem SEO-Potenzial
                für Hotels, Restaurants und Erlebnisanbieter. Diese drei Säulen — Cleantech, Wissenschaft,
                Tourismus — ergeben eine einzigartige, vielschichtige SEO-Landschaft.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge nutzt Freiburgs Green-City-DNA als authentisches Differenzierungsmerkmal.
                Für Cleantech-Unternehmen bauen wir technische Inhaltsautorität auf, die Fraunhofer-
                ISE-Kompetenz als Kontext nutzt. Für Tourismus entwickeln wir saisonale Keyword-
                Strategien für Schwarzwald, Münster und Weinregion. Mehrsprachiger Content erschließt
                internationale Zielgruppen in beiden Sektoren gleichzeitig.
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Freiburger Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Freiburg: Wo Nachhaltigkeit auf digitale Chancen trifft
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Das Fraunhofer Institut für Solare Energiesysteme ISE ist das größte
                Solarforschungszentrum Europas — und als Nachhaltigkeits-Vorreiter
                (Green City) ist Freiburg damit international bekannt. Diese Tatsache
                definiert Freiburgs globale Markenidentität: Nachhaltigkeit ist hier
                keine Marketingphrase, sondern wirtschaftliche Realität.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Die 1457 gegründete Albert-Ludwigs-Universität bringt 25.000 Studierende
                nach Freiburg und schafft ein akademisches Umfeld, das Startups,
                Forschungstransfer und eine kritische digitale Zielgruppe hervorbringt.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Dazu kommen über 6 Millionen Schwarzwald-Übernachtungen pro Jahr — Tourismus
                als Wirtschaftskraft mit enormem lokalem SEO-Potenzial für Hotels,
                Restaurants und Erlebnisanbieter.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/cities/freiburg-city.jpg" alt="Freiburg im Breisgau – Green City und Schwarzwald-Tor" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Freiburg im Breisgau</p>
                  <p className="text-white/60 text-xs">235.000 Einwohner · Deutschlands Solarhauptstadt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt"><CityContactForm city="Freiburg" /></div>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">SEO für jede Branche in Freiburg</h2>
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

      {/* ═══ PROCESS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unser Prozess</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">So bringen wir Sie auf Seite&nbsp;1</h2>
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
                <Image src="/images/cities/karlsruhe-tech.jpg" alt="SeoForge Team – SEO Agentur Freiburg" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Nachhaltig SEO <span className="gradient-text">ohne Kompromisse</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Freiburgs Green-City-DNA ist kein Marketingbegriff — sie ist Freiburgs
                stärkstes SEO-Asset. Wir entwickeln Strategien, die Nachhaltigkeit als
                authentisches Differenzierungsmerkmal nutzen und technische Cleantech-Autorität
                mit Tourismus- und akademischer Reichweite verbinden.
              </p>
              <ul className="space-y-3">
                {[
                  "Green-Content und Cleantech-SEO mit Fraunhofer-ISE-Autorität",
                  "Tourismus-Keywords für Schwarzwald, Münster und Biergärten",
                  "Mehrsprachiger Content für internationale Zielgruppen",
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
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">Ihr Vorteil mit SeoForge Freiburg</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Cleantech-Content-Expertise", desc: "Technisch präzise SEO-Inhalte für Solar, Energietechnik und Umwelttechnologie — keine Marketing-Floskeln, sondern Inhalte, die Forscher und Entscheider überzeugen." },
              { title: "Tourismus-SEO", desc: "Schwarzwald-Keywords, Google Business-Optimierung und Booking-Signale für Gastgewerbe und Tourismusanbieter in Freiburg und dem Schwarzwald." },
              { title: "Wissenschaftliche Autorität", desc: "E-E-A-T Strategien für Forschungseinrichtungen und Uni-Spin-offs — damit Ihre Expertise online so sichtbar ist wie in der Wissenschaftsgemeinschaft." },
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

      <StandortFaq items={faqs} defaultOpen={0} />

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

