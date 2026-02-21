/* ------------------------------------------------------------------ */
/*  SERVICE DATA                                                       */
/* ------------------------------------------------------------------ */
export const services = [
  {
    title: "SEO Beratung",
    href: "/seo-beratung",
    description:
      "Individuelle Strategieentwicklung und kompetente Beratung, die Ihre Online-Praesenz auf das naechste Level hebt.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "SEO Optimierung",
    href: "/seo-optimierung",
    description:
      "Technische und inhaltliche Optimierung Ihrer Website fuer Top-Platzierungen in den Suchergebnissen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "SEO Texte",
    href: "/seo-texte-kaufen",
    description:
      "Suchmaschinenoptimierte Inhalte, die sowohl Google als auch Ihre Zielgruppe ueberzeugen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "SEO Audit",
    href: "/seo-audit",
    description:
      "Umfassende Analyse Ihrer Website mit konkreten Handlungsempfehlungen fuer sofortige Verbesserungen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "On Page Optimierung",
    href: "/on-page-optimierung",
    description:
      "Optimierung aller On-Page-Faktoren wie Meta-Tags, Struktur, interne Verlinkung und Ladezeiten.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: "On Page SEO",
    href: "/on-page-seo",
    description:
      "Ganzheitliche On-Page-SEO-Strategie fuer bessere Rankings, mehr Traffic und hoehere Conversions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "SEO Content Strategie",
    href: "/seo-content-strategie",
    description:
      "Datengetriebene Content-Planung, die Ihre Zielgruppe erreicht und nachhaltig organischen Traffic aufbaut.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Shop SEO",
    href: "/shop-seo",
    description:
      "Spezialisierte E-Commerce-SEO fuer Online-Shops. Mehr Sichtbarkeit, mehr Kunden, mehr Umsatz.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    title: "SEO Betreuung",
    href: "/seo-betreuung",
    description:
      "Monatliche SEO-Betreuung mit kontinuierlicher Optimierung, transparentem Reporting und messbaren Ergebnissen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  SERVICE CATEGORIES (for mega dropdown)                            */
/* ------------------------------------------------------------------ */
export const serviceCategories = [
  {
    id: "seo",
    label: "SEO",
    description: "9 Leistungen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path d="M9 9h.01M15 15h.01" />
      </svg>
    ),
    services: services,
  },
  // Future categories can be added here
];
