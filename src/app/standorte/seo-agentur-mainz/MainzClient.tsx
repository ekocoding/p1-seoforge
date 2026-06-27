import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";
import { KeywordVolumeApp, RankingProgressApp } from "./MainzWidgets";

/* ── data ── */
const cityStats = [
  { value: "218.000",  label: "Einwohner" },
  { value: "32.000+",  label: "Uni Studierende" },
  { value: "BioNTech", label: "Weltbekannter HQ" },
  { value: "ZDF",      label: "Medienstandort" },
];

const industries = [
  { title: "Life Sciences & BioNTech", desc: "BioNTech hat Mainz weltweit bekannt gemacht. Das entstehende Life-Sciences-Ökosystem braucht SEO, der Investoren, Fachkräfte und internationale Partner anspricht — E-E-A-T-konform und wissenschaftlich präzise.", featured: true },
  { title: "Medien & TV", desc: "ZDF und SWR setzen in Mainz den Content-Standard. Kreativagenturen und Medienfirmen profitieren von B2B-SEO-Strategien, die ihre Portfolios und Kompetenzen vor den richtigen Entscheidern sichtbar machen.", featured: false },
  { title: "Wein & Tourismus", desc: "Rheinhessen ist Deutschlands größtes Weinanbaugebiet. Weingüter, Weinhandlungen und Tourismus-Akteure gewinnen über lokales SEO und E-Commerce-Optimierung nationale und internationale Kunden.", featured: false },
  { title: "IT & Startups", desc: "Mainz wächst als Startup-Standort — getrieben vom BioNTech-Effekt und der Gutenberg-Universität. IT-Unternehmen und Tech-Startups profitieren von Nischen-SEO für ihre spezifischen Zielgruppen.", featured: false },
  { title: "Bildung & Wissenschaft", desc: "Die Johannes Gutenberg-Universität (gegründet 1477) und ihre Spin-offs brauchen SEO, der wissenschaftliche Autorität sichtbar macht — für Studierende, Forschungspartner und Fördergeber.", featured: false },
  { title: "E-Commerce & Handel", desc: "Die kaufkräftige Mainzer Bevölkerung und die Rhein-Main-Lage schaffen starke Online-Handelsnachfrage. Wir entwickeln E-Commerce-SEO für den Mainzer und Rheinhessen-Markt.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Mainzer Life-Sciences- und Medienmarkt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Branchen-Strategie", desc: "Ob BioNTech-Umfeld, Medienbranche oder Weinwirtschaft — wir entwickeln maßgeschneiderte Inhaltsstrategien, die die spezifischen Suchintentionen Ihrer Mainzer Zielgruppen treffen." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung und branchenspezifischer Content — E-E-A-T für Life Sciences, Corporate Content für Medienunternehmen, lokales SEO für Wein und Tourismus." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich — und immer auf dem Qualitätsstandard, den eine Medienstadt wie Mainz erwartet." },
];

const faqs = [
  { q: "Was macht Mainz als SEO-Standort besonders?", a: "Mainz vereint außergewöhnliche Faktoren: BioNTech als global bekannter mRNA-Pionier hat hier seinen Hauptsitz und hat Mainz international bekannt gemacht. ZDF und SWR setzen Content-Standards. Die Gutenberg-Universität (gegründet 1477) bringt 32.000 Studierende. Rheinhessen ist Deutschlands größtes Weinanbaugebiet. Diese Diversität schafft vielfältige SEO-Chancen." },
  { q: "Wie hilft SeoForge Mainzer Life-Sciences-Unternehmen?", a: "Life-Sciences-SEO erfordert E-E-A-T-konformen Content, der wissenschaftliche Autorität aufbaut ohne regulatorische Grenzen zu verletzen. Wir entwickeln Strategien für das BioNTech-Umfeld, Pharma-Unternehmen und Biotech-Startups — mit präzisen Fachbegriffen, die Investoren, Fachkräfte und internationale Partner ansprechen." },
  { q: "Wie lange dauert SEO in Mainz?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Life-Sciences- und Medien-Keywords entwickeln sich in der Regel in 3–6 Monaten. Die starke Rhein-Main-Suchnachfrage erleichtert schnelle Gewinne bei lokalen Keywords." },
  { q: "Betreut SeoForge auch Unternehmen in der Rhein-Main-Region?", a: "Ja. Mainz ist Teil der 5,8-Millionen-Metropolregion Rhein-Main. Wir entwickeln regionale SEO-Strategien, die Mainz, Frankfurt und das gesamte Rhein-Main-Gebiet erschließen — ideal für Unternehmen, die regional wachsen wollen." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen in Mainz?", a: "Wir arbeiten ohne Vertragszwang und kennen Mainz: den BioNTech-Effekt, die Medienbranche am ZDF-Standort, Rheinhessens Weinwirtschaft. Keine Standardpakete, sondern Strategien für Mainzs einzigartige Branchen-Kombination. Transparente Berichte inklusive." },
];

/* ── main component ── */
export default function MainzClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/mainz-hero.jpg"
            alt="SEO Agentur Mainz – Landeshauptstadt Rheinland-Pfalz"
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
              <span className="text-dark/70">Mainz</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Mainz · Landeshauptstadt Rheinland-Pfalz
            </div>
            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR MAINZ</p>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Mainz</span>
            </h1>
            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Mainz hat durch BioNTech internationale Bekanntheit erlangt: Der mRNA-Pionier hat hier
                sein Hauptquartier und zieht Life-Sciences-Investoren und Fachkräfte aus aller Welt in
                die Landeshauptstadt Rheinland-Pfalz. ZDF und SWR setzen als etablierte Medienhäuser
                Content-Qualitätsstandards, die auch SEO-Inhalte in dieser Stadt prägen. Die Johannes
                Gutenberg-Universität, 1477 gegründet, bringt über 32.000 Studierende nach Mainz und
                bildet die akademische Basis für Spin-offs und Forschungstransfer. Rheinhessen als
                Deutschlands größtes Weinanbaugebiet ergänzt das Profil mit regionalem E-Commerce-
                und Tourismusvolumen — ein Markt, der Tiefe und regionale Verankerung verlangt.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge entwickelt E-E-A-T-konformen Content für das BioNTech-Umfeld: wissenschaftlich
                präzise, regulatorisch korrekt und investorenseitig überzeugend. Für Medienunternehmen
                setzen wir auf redaktionelle Inhaltstiefe, die ZDF-Qualitätsniveau ernst nimmt.
                Regionale Verbindungen nach Frankfurt und ins Rheinhessen-Gebiet erschließen wir
                durch integrierte Rhein-Main-Strategien.
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Mainzer Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Mainz: Wo BioNTech, Medien und Geschichte aufeinandertreffen
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                BioNTech hat Mainz global auf die Landkarte gesetzt. Der mRNA-Pionier mit
                weltweitem Hauptquartier in Mainz zieht Life-Sciences-Investoren, Fachkräfte
                und Partner aus aller Welt in die Landeshauptstadt Rheinland-Pfalz.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                ZDF und SWR machen Mainz zum bedeutenden Medienstandort des deutschen
                Südwestens. Die Johannes Gutenberg-Universität, 1477 gegründet, bringt
                über 32.000 Studierende in die Stadt. Diese Content-Kompetenz setzt hohe
                Standards — auch für SEO-Inhalte, die in Mainz Wirkung erzielen sollen.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Rheinhessens Weinwirtschaft — Deutschlands größtes Weinanbaugebiet — ergänzt
                das Bild: Mainz ist ein Markt, der Tiefe, Qualität und regionale Verankerung
                gleichermaßen verlangt.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cities/mainz-city.jpg"
                  alt="Mainz Landeshauptstadt – Rhein-Main-Region"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Mainz</p>
                  <p className="text-white/60 text-xs">218.000 Einwohner · Landeshauptstadt Rheinland-Pfalz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt">
        <CityContactForm city="Mainz" />
      </div>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              SEO für jede Branche in Mainz
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
                  alt="SeoForge Team – SEO Agentur Mainz"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Life Sciences <span className="gradient-text">& Medien-SEO</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Mainz verlangt Präzision: E-E-A-T-konformer Content für das BioNTech-Umfeld,
                redaktionelle Qualität auf ZDF-Niveau und regionale Verankerung in
                Rheinhessen. Kein Baukastensystem — sondern Strategie für Ihren Markt.
              </p>
              <ul className="space-y-3">
                {[
                  "Life-Sciences-Content mit E-E-A-T-Expertise für BioNTech-Umfeld und Pharma",
                  "Medien-SEO für ZDF/SWR-Umfeld: Content-Qualität auf Broadcast-Standard",
                  "Johannes Gutenberg-Kontext: wissenschaftliche Autorität sichtbar machen",
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
              Ihr Vorteil mit SeoForge Mainz
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Life-Sciences-Expertise", desc: "E-E-A-T Content für Biotech und Pharma, der Investoren-Kommunikation standhält und gleichzeitig Fachkräfte und Partner anzieht — im BioNTech-Umfeld unverzichtbar." },
              { title: "Medien & PR-Synergien", desc: "SEO ergänzt die starke Medienpräsenz am ZDF-Standort. Content-Qualität auf Medienstandard — weil Mainzer Zielgruppen das gewohnt sind und erwarten." },
              { title: "Regionale Reichweite", desc: "Die Rhein-Main-Metropolregion mit 5,8 Millionen Menschen strategisch erschließen — über Mainz hinaus bis Frankfurt und ins gesamte Rhein-Nahe-Gebiet." },
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
