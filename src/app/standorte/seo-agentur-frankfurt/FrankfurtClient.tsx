import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";

function ToolLogo({ name }: { name: string }) {
  const wrap = "rounded-xl overflow-hidden w-9 h-9 flex items-center justify-center flex-shrink-0";
  switch (name) {
    case "Ahrefs":
      return (
        <div className={`${wrap} bg-white border border-border p-1`}>
          <svg viewBox="0 0 128 128" className="w-full h-full">
            <path d="m24 8v24h64v16l-26.104 0.456c-35.096 3.256-45.896 11.624-45.896 36.504v6.512c0 19.064 14.328 28.528 32 28.528 7.984 0 16.32-1.56 25.04-5.976l14.96-6.024v12h24v-112zm64 76-18.112 7.472c-6.296 3.488-12.832 5.344-17.92 5.344-6.288 0-11.968-1.136-11.968-8.816v-5.12c0.48-8.136 7.376-11.176 26.256-13.032l21.744-1.848z" fill="#FF8800"/>
          </svg>
        </div>
      );
    case "Semrush":
      return (
        <div className={`${wrap} bg-white border border-border p-1`}>
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M20.698 11.911c0 .444-.226.516-.79.516-.596 0-.706-.1-.77-.554-.118-1.152-.896-2.13-2.201-2.24-.418-.034-.518-.19-.518-.706 0-.48.074-.708.446-.708 2.265.01 3.833 1.832 3.833 3.69v.002zm3.3 0c0-3.456-2.338-7.11-7.74-7.11H5.52c-.218 0-.354.11-.354.31 0 .109.082.209.156.26.388.31.97.654 1.73 1.036.743.372 1.323.616 1.903.852.246.1.336.208.336.344 0 .19-.136.308-.4.308H.372c-.254 0-.372.164-.372.326 0 .136.044.254.162.372.69.726 1.796 1.596 3.4 2.604 1.466.91 2.98 1.74 4.533 2.492.236.11.308.236.308.372-.008.154-.126.28-.4.28H4.1c-.216 0-.344.12-.344.3 0 .1.08.226.19.326.888.808 2.311 1.688 4.207 2.494 2.53 1.08 5.094 1.721 7.98 1.721 5.465 0 7.867-4.087 7.867-7.289l-.002.002zm-7.133 5.104c-2.794 0-5.132-2.276-5.132-5.114 0-2.794 2.33-5.04 5.132-5.04 2.863 0 5.111 2.24 5.111 5.04a5.086 5.086 0 0 1-5.111 5.114z" fill="#FF642D"/>
          </svg>
        </div>
      );
    case "Google Search Console":
      return (
        <div className={`${wrap} bg-white border border-border p-1`}>
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z" fill="#458CF5"/>
          </svg>
        </div>
      );
    case "Screaming Frog":
      return (
        <div className={`${wrap} bg-[#53B71B]`}>
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
            <ellipse cx="18" cy="22" rx="9" ry="6.5" fill="white" fillOpacity="0.92"/>
            <circle cx="12" cy="15" r="4" fill="white" fillOpacity="0.95"/>
            <circle cx="24" cy="15" r="4" fill="white" fillOpacity="0.95"/>
            <circle cx="12" cy="15" r="1.8" fill="#3a9620"/>
            <circle cx="24" cy="15" r="1.8" fill="#3a9620"/>
            <path d="M15 23q3 2.5 6 0" stroke="#3a9620" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      );
    case "Google Looker Studio":
      return (
        <div className={`${wrap} bg-white border border-border p-0.5`}>
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <path d="M155.24 255.523c-11.135 0-21.995 1.79-32.254 5.226l-38.85-74.169c-4.096-7.817-13.754-10.834-21.568-6.741-7.817 4.095-10.835 13.752-6.741 21.568l38.865 74.199a102.757 102.757 0 0 0-11.037 9.569c-19.122 19.12-29.652 44.544-29.652 71.585s10.531 52.464 29.652 71.585c19.12 19.121 44.543 29.652 71.585 29.652s52.465-10.531 71.585-29.652c39.466-39.473 39.469-103.7 0-143.17-19.12-19.121-44.544-29.652-71.585-29.652zm48.989 150.226c-13.086 13.086-30.484 20.292-48.989 20.292s-35.903-7.206-48.989-20.292-20.292-30.484-20.292-48.989 7.206-35.903 20.292-48.989c5-5 10.633-9.133 16.713-12.342.039-.02.079-.037.119-.058l.025-.015c9.796-5.141 20.752-7.877 32.132-7.877 18.506 0 35.903 7.207 48.989 20.292 13.085 13.086 20.292 30.483 20.292 48.989s-7.207 35.903-20.292 48.989zM456.172 310.593l-38.865-74.198a102.665 102.665 0 0 0 11.038-9.57c19.122-19.12 29.652-44.544 29.652-71.585s-10.53-52.464-29.652-71.585c-19.12-19.12-44.545-29.652-71.585-29.652s-52.464 10.531-71.585 29.652c-39.472 39.472-39.472 103.698 0 143.17 19.12 19.121 44.544 29.652 71.585 29.652 11.136 0 21.995-1.79 32.255-5.226l38.85 74.169c2.854 5.45 8.413 8.567 14.167 8.567 2.499 0 5.034-.587 7.4-1.828 7.818-4.094 10.835-13.751 6.74-21.567zM307.771 204.229c-13.084-13.086-20.292-30.483-20.292-48.989s7.207-35.903 20.292-48.989c13.086-13.086 30.484-20.292 48.989-20.292s35.903 7.206 48.989 20.292 20.292 30.484 20.292 48.989-7.206 35.903-20.292 48.989a69.486 69.486 0 0 1-16.825 12.399l-.006.003-.003.002c-9.802 5.149-20.766 7.888-32.154 7.888-18.506 0-35.903-7.207-48.989-20.292h-.001z" fill="#9aa0a6"/>
            <path d="M356.76 54.003c-27.041 0-52.465 10.531-71.585 29.652-19.121 19.12-29.652 44.544-29.652 71.585 0 21.638 6.749 42.235 19.24 59.401l-83.135 83.135c5.337 3.522 6.499 4.277 12.601 9.995 27.879 26.118 27.012 70.965 0 97.978-13.086 13.086-30.484 20.292-48.989 20.292s-35.903-7.206-48.989-20.292l-22.596 22.596c19.12 19.121 44.544 29.652 71.585 29.652s52.465-10.531 71.585-29.652c19.121-19.12 29.652-44.544 29.652-71.585 0-21.638-6.749-42.235-19.24-59.401l83.134-83.134c-3.873-2.619-6.619-4.107-12.6-9.996-27.222-26.801-27.012-70.965 0-97.978 13.086-13.086 30.484-20.292 48.989-20.292s35.903 7.206 48.989 20.292l22.596-22.596c-19.12-19.121-44.544-29.652-71.585-29.652z" fill="#4285f4"/>
          </svg>
        </div>
      );
    case "ChatGPT & Perplexity":
      return (
        <div className={`${wrap} bg-dark p-1.5`}>
          <svg viewBox="0 0 256 260" className="w-full h-full">
            <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" fill="white"/>
          </svg>
        </div>
      );
    default:
      return null;
  }
}

const industries = [
  {
    title: "Finanz & FinTech",
    desc: "EZB, Deutsche Bank, Commerzbank und 200+ weitere Banken machen Frankfurt zum Finanzzentrum Europas. FinTech-Startups konkurrieren um dieselben Keywords. Wir entwickeln compliance-konformen SEO-Content, der BaFin-regulierte Produkte korrekt und überzeugend darstellt.",
    tags: ["EZB", "Deutsche Bank", "200+ Banken", "BaFin-konform"],
    featured: true,
  },
  {
    title: "IT & Consulting",
    desc: "Big-4-Kanzleien und internationale IT-Konzerne haben Deutschlandsitze in Frankfurt. B2B-SEO für Beratungsleistungen erfordert Thought-Leadership-Inhalte, die Entscheider auf C-Level ansprechen.",
    tags: ["Big 4", "B2B", "C-Level"],
    featured: false,
  },
  {
    title: "Immobilien & Investment",
    desc: "Frankfurts Skyline wächst weiter — internationales Immobilienkapital fließt in den Markt. Makler, Projektentwickler und Investmentfirmen profitieren von SEO, das globale Investoren und lokale Käufer gleichermaßen erreicht.",
    tags: ["Skyline", "Investment", "International"],
    featured: false,
  },
  {
    title: "Pharma & Chemie",
    desc: "Der Industriepark Höchst ist einer der größten Chemieparks Europas. Pharma- und Chemieunternehmen brauchen technisch präzisen Content, der Fachkräfte, Einkäufer und Regulatoren anspricht.",
    tags: ["Industriepark Höchst", "B2B", "Reguliert"],
    featured: false,
  },
  {
    title: "Logistik & Aviation",
    desc: "Fraport (22.000 MA), Lufthansa-Drehkreuz und einer der größten Frachthäfen Europas: Logistikunternehmen im Umfeld des Frankfurter Airports profitieren von gezieltem B2B-SEO.",
    tags: ["Fraport", "Lufthansa", "Frachthub"],
    featured: false,
  },
  {
    title: "Messe & Events",
    desc: "Die Messe Frankfurt ist eine der größten Messegesellschaften der Welt. Aussteller, Veranstalter und Dienstleister im Messumfeld finden über präzises Event-SEO ihre Zielgruppen.",
    tags: ["Messe Frankfurt", "B2B", "Global"],
    featured: false,
  },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse, Keyword-Recherche für den Frankfurter Finanz- und B2B-Markt und Wettbewerberanalyse. Mit besonderem Augenmerk auf Compliance-Anforderungen für regulierte Branchen." },
  { step: "02", title: "Strategie & Roadmap", desc: "Frankfurt erfordert zwei Strategien parallel: Deutsche Suchintentionen und internationale Zielgruppen (30% der Bevölkerung). Wir entwickeln mehrsprachige Ansätze, die beide Märkte bedienen." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, compliance-konformer Content, lokale Signale und internationale hreflang-Implementierungen — alles aus einer Hand, ohne Outsourcing." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings auf DE und EN, organischer Traffic, Conversion-Rates. Transparent und verständlich — auch für international aufgestellte Teams." },
];

const faqs = [
  { q: "Was macht Frankfurt als SEO-Markt einzigartig?", a: "Frankfurt vereint Extremes: EZB, 200+ Banken und die Deutsche Börse machen es zur Finanzmetropole Europas — gleichzeitig ist es mit 30% internationaler Bevölkerung eine der kosmopolitischsten Städte Deutschlands. SEO in Frankfurt muss deutsche und internationale Suchintentionen gleichzeitig bedienen, Compliance-Anforderungen für regulierte Branchen berücksichtigen und in einem der teuersten B2B-Märkte Europas Ergebnisse liefern." },
  { q: "Wie hilft SeoForge Frankfurter Finanzunternehmen bei SEO?", a: "Finanz-SEO ist ein Hochrisikobereich bei Google: YMYL (Your Money Your Life) und E-E-A-T sind entscheidend. Wir entwickeln Content-Strategien, die BaFin-Regularien korrekt abbilden, echte Expertise demonstrieren und dabei suchmaschinenoptimiert sind. Das schließt technische Inhalte über Finanzprodukte, Investmentstrategien und Compliance-Themen ein." },
  { q: "Was ist GEO und warum ist es für Frankfurt relevant?", a: "GEO (Generative Engine Optimization) bezeichnet die Optimierung für KI-gestützte Suchsysteme wie ChatGPT, Perplexity und Google SGE. Für Frankfurter Unternehmen — besonders im Finanz- und B2B-Sektor — wird GEO zunehmend relevant, da Entscheider KI-Tools für Recherchen nutzen. SeoForge kombiniert klassisches SEO mit GEO-Optimierung, damit Ihre Inhalte in beiden Kanälen sichtbar sind." },
  { q: "Wie wichtig ist zweisprachiges SEO in Frankfurt?", a: "Sehr wichtig. Mit 30% internationaler Bevölkerung, der EZB als Arbeitgeber und hunderten internationalen Konzernen ist Englisch in Frankfurt Geschäftssprache. Wir empfehlen den meisten Frankfurter Unternehmen eine hreflang-Strategie mit deutschem und englischem Content — für maximale Reichweite in beiden Zielgruppen." },
  { q: "Wie lange dauert es, bis SEO in Frankfurt Ergebnisse zeigt?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind nach 4–8 Wochen messbar. In den hochkompetitiven Frankfurter Finanzkeywords entstehen nachhaltige Rankings in 6–12 Monaten. FinTech-Startups und Nischenanbieter sehen durch Long-Tail-Strategien oft frühere Resultate." },
];

function DashboardPreview() {
  const keywords = [
    { kw: "SEO Agentur Frankfurt", vol: "2.400", kd: 68, pos: 2, trend: +3 },
    { kw: "FinTech SEO Frankfurt", vol: "1.900", kd: 72, pos: 1, trend: +5 },
    { kw: "B2B SEO Agentur FFM", vol: "1.200", kd: 54, pos: 3, trend: 0 },
    { kw: "Immobilien SEO Frankfurt", vol: "880", kd: 61, pos: 4, trend: +2 },
    { kw: "SEO Finanzberatung", vol: "720", kd: 45, pos: 1, trend: +8 },
  ];

  return (
    <section className="bg-offwhite border-b border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
        <div className="reveal mb-8">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-2">/ SEO Dashboard</p>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">Frankfurt-Keywords unter Kontrolle</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 flex-shrink-0">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-700 font-semibold">LIVE</span>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ animationDelay: "120ms" }}>
          <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">

            {/* Browser chrome */}
            <div className="bg-dark px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5 flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-red-400/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 flex justify-center min-w-0">
                <div className="bg-white/8 rounded px-5 py-1 text-[11px] text-white/40 font-mono truncate max-w-xs">
                  seoforge.de/dashboard · Frankfurt am Main
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-white/40 font-mono">live</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="bg-white">

              {/* KPI strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border-b border-border">
                {[
                  { label: "Keywords Top 3", value: "23", sub: "+5 diesen Monat" },
                  { label: "Ø Position", value: "2.8", sub: "↑ verbessert von 5.2" },
                  { label: "Organischer Traffic", value: "+42%", sub: "vs. letztes Quartal" },
                  { label: "Keyword-Reichweite", value: "18.4K", sub: "/ Monat erschlossen" },
                ].map((m) => (
                  <div key={m.label} className="bg-white px-5 py-4">
                    <p className="text-[10px] text-muted font-mono uppercase tracking-wider mb-1.5">{m.label}</p>
                    <p className="text-2xl font-bold text-dark">{m.value}</p>
                    <p className="text-[11px] text-primary mt-0.5 font-medium">{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Table header */}
              <div className="grid grid-cols-[1fr_72px_52px_52px_76px] px-4 py-2 border-b border-border bg-offwhite">
                {[
                  { h: "Keyword", left: true },
                  { h: "Volumen", left: false },
                  { h: "KD", left: false },
                  { h: "Pos.", left: false },
                  { h: "Trend", left: false },
                ].map(({ h, left }) => (
                  <span key={h} className={`text-[10px] font-mono text-muted/55 uppercase tracking-wider ${left ? "text-left" : "text-center"}`}>{h}</span>
                ))}
              </div>

              {/* Keyword rows */}
              {keywords.map((kw) => (
                <div
                  key={kw.kw}
                  className="grid grid-cols-[1fr_72px_52px_52px_76px] items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-offwhite transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${kw.pos === 1 ? "bg-primary" : kw.pos <= 3 ? "bg-primary/40" : "bg-border"}`} />
                    <span className="text-sm text-dark font-medium truncate">{kw.kw}</span>
                  </div>
                  <span className="text-xs text-muted font-mono text-center">{kw.vol}</span>
                  <div className="flex justify-center">
                    <div className="relative h-1.5 w-9 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40 rounded-full" style={{ width: `${kw.kd}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-mono ${kw.pos === 1 ? "bg-primary text-white" : kw.pos <= 3 ? "bg-primary/10 text-primary" : "bg-offwhite text-dark"}`}>
                      #{kw.pos}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <span className={`text-xs font-mono font-semibold ${kw.trend > 0 ? "text-green-600" : kw.trend < 0 ? "text-red-500" : "text-muted/50"}`}>
                      {kw.trend > 0 ? `↑ +${kw.trend}` : kw.trend < 0 ? `↓ ${kw.trend}` : "→ ±0"}
                    </span>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div className="px-4 py-3 bg-offwhite border-t border-border flex items-center justify-between gap-4">
                <span className="text-[10px] text-muted/50 font-mono">Demo-Dashboard · Echte Werte variieren je nach Ausgangslage</span>
                <a href="#kontakt" className="text-[11px] text-primary font-semibold font-mono hover:underline whitespace-nowrap">→ Echte Analyse anfragen</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FrankfurtClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/frankfurt-hero.jpg"
            alt="SEO Agentur Frankfurt – Skyline mit Finanzviertel und Main"
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
              <span className="text-muted/80">Frankfurt</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Frankfurt am Main · Finanzmetropole Europas
            </div>

            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR FRANKFURT</p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Frankfurt</span>
            </h1>

            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Frankfurt ist der mächtigste Finanzplatz Kontinentaleuropas: Die Europäische Zentralbank,
                die Deutsche Börse und über 200 Banken beschäftigen allein rund 80.000 Menschen im
                Bankensektor. Gleichzeitig wächst ein dynamisches FinTech-Ökosystem, das dieselben
                hochkompetitiven SEO-Keywords bespielt. Mit 30&nbsp;% internationaler Bevölkerung und
                Fraport als einem der größten Flughäfen Europas ist Frankfurt zutiefst international —
                was YMYL-Content-Anforderungen, Google-E-E-A-T-Standards für Finanzprodukte und
                bilingualen Suchintentionen zu einem zentralen SEO-Thema macht.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge entwickelt compliance-bewusste Inhalte, die BaFin-Regularien korrekt
                abbilden und gleichzeitig rankfähig sind. Unsere hreflang-Strategie erschließt
                deutsche und englische Suchintentionen parallel. Für FinTechs setzen wir auf
                Long-tail-Keywords mit hoher Conversion-Wahrscheinlichkeit — abseits der Keywords,
                um die Großbanken mit Millionenbudgets kämpfen.
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
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DashboardPreview />

      {/* ═══ CITY INTRO ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Frankfurter Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Frankfurt: Mainhattan und digitale Weltbühne
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Die Europäische Zentralbank, die Deutsche Börse und über 200 Banken mit
                rund 80.000 Bankbeschäftigten machen Frankfurt zum mächtigsten Finanzplatz
                Kontinentaleuropas. Mit 30&nbsp;% internationaler Bevölkerung und dem Fraport-
                Drehkreuz mit rund 48 Millionen Passagieren jährlich ist Frankfurt echter Global-Player.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Gleichzeitig wächst ein dynamisches FinTech-Ökosystem: Startups im
                digitalen Zahlungsverkehr, in der Kreditvergabe und im Wertpapierhandel
                konkurrieren mit etablierten Instituten — und kämpfen um dieselben
                SEO-Keywords.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Die Messe Frankfurt bringt jährlich Millionen Fachbesucher aus aller
                Welt. Für Dienstleister bedeutet das: Sichtbarkeit zu Messezeiten ist
                bares Geld — und SEO der effizienteste Weg dorthin.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/cities/frankfurt-city.jpg" alt="Frankfurt Römerberg mit Skyline – Finanzstandort und Wirtschaftszentrum" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Frankfurt am Main</p>
                  <p className="text-white/60 text-xs">773.000 Einwohner · Finanzmetropole Europas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt"><CityContactForm city="Frankfurt" /></div>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
                SEO für Frankfurts <span className="gradient-text">führende Branchen</span>
              </h2>
              <p className="text-sm text-muted max-w-xs lg:text-right">Jede Branche, eigene Anforderungen — Compliance, Wettbewerb, Zielgruppe.</p>
            </div>
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

      {/* ═══ METHODIK & TOOLS ═══ */}
      <section className="bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal mb-10">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary">/ Methodik & Tools</p>
          </div>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-6">
                Mehr als SEO —<br /><span className="gradient-text">datengetrieben</span> und zukunftssicher
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Klassisches SEO ist der Grundstein. Mit{" "}
                <Link href="/geo" className="text-primary hover:underline underline-offset-2">GEO (Generative Engine Optimization)</Link>{" "}
                gehen wir weiter: Ihre Inhalte werden auch für KI-gestützte Suchen wie ChatGPT, Perplexity und Google SGE optimiert — der Kanal, den Entscheider zunehmend für Recherchen nutzen. SEO und GEO kombiniert erschließen damit beide Kanäle gleichzeitig.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Alle Entscheidungen basieren auf Enterprise-Daten statt Vermutungen: Ahrefs, Semrush und Google Search Console bilden die Grundlage jeder Strategie. Top-3-Rankings für Keywords mit über 100.000 monatlichen Suchanfragen belegen, dass dieser Ansatz in hochkompetitiven Märkten wie Frankfurt funktioniert.
              </p>
            </div>

            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Ahrefs", desc: "Backlink-Analyse & Keyword-Research" },
                  { name: "Semrush", desc: "Wettbewerber & Rank-Tracking" },
                  { name: "Google Search Console", desc: "Offizielle Performance-Daten" },
                  { name: "Screaming Frog", desc: "Technisches SEO-Crawling" },
                  { name: "Google Looker Studio", desc: "Live-Reporting-Dashboards" },
                  { name: "ChatGPT & Perplexity", desc: "GEO-Visibility-Analyse" },
                ].map((tool) => (
                  <div key={tool.name} className="rounded-xl border border-border bg-offwhite p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2.5">
                      <ToolLogo name={tool.name} />
                      <p className="font-semibold text-dark text-sm leading-tight">{tool.name}</p>
                    </div>
                    <p className="text-xs text-muted">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
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

      {/* ═══ KOMMUNIKATION & PARTNERSCHAFT ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "16/10" }}>
                <Image src="/images/cities/karlsruhe-tech.jpg" alt="SeoForge Team – direkte Kommunikation und transparente Zusammenarbeit" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Zusammenarbeit</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Direkter Draht —<br /><span className="gradient-text">kein Ping-Pong</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Kein Account-Manager, der Nachrichten weiterleitet. Bei SeoForge haben Sie vom ersten Tag an einen festen Ansprechpartner, der Ihre Branche kennt und Ergebnisse verantwortet. Schnelle, offene Kommunikation ist keine Servicefloskel — sie ist die Grundlage jeder erfolgreichen SEO-Zusammenarbeit.
              </p>
              <ul className="space-y-3">
                {[
                  "Fester Ansprechpartner vom ersten Tag an",
                  "Antworten innerhalb von 24 Stunden, auch bei dringenden Fragen",
                  "Monatliche Strategie-Calls mit transparentem Reporting",
                  "Kein Outsourcing — alle Leistungen werden intern erbracht",
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
          <div className="reveal"><p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ SEO Wissen</p></div>
          <div className="reveal" style={{ animationDelay: "80ms" }}><div className="seo-content" dangerouslySetInnerHTML={{ __html: articleHtml }} /></div>
        </div>
      </section>

      {/* ═══ WHY SEOFORGE ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Warum SeoForge</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">Ihr Vorteil mit SeoForge Frankfurt</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                title: "Direkter Kundenkontakt",
                desc: "Kein Agentur-Ping-Pong: Ein fester Ansprechpartner, Antworten in unter 24 Stunden und monatliche Strategie-Calls — weil offene Kommunikation SEO-Erfolg erst möglich macht.",
              },
              {
                title: "SEO & GEO aus einer Hand",
                desc: "Klassisches Suchmaschinenranking kombiniert mit Generative Engine Optimization — damit Sie auch in ChatGPT, Perplexity und Google SGE sichtbar sind.",
              },
              {
                title: "Enterprise-Daten, keine Vermutungen",
                desc: "Ahrefs, Semrush und Google Search Console bilden die Entscheidungsgrundlage — belegbare Ergebnisse in kompetitiven Märkten statt Bauchgefühl-Strategien.",
              },
              {
                title: "Keine Verträge",
                desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Transparente Berichte, klare KPIs. Unsere Leistung überzeugt — nicht der Vertrag.",
              },
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
