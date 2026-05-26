import type { Metadata } from "next";
import WissenPillarPage from "../WissenPillarPage";
import type { PillarCluster } from "../WissenPillarPage";

export const metadata: Metadata = {
  title: "Technisches SEO: Core Web Vitals, Crawling & Schema | Wissen — SeoForge",
  description:
    "Core Web Vitals, Crawling, Indexierung, Schema Markup und JavaScript SEO. Technisches SEO verständlich erklärt von Experten.",
};

const cluster: PillarCluster = {
  key: "technical-seo",
  label: "Technisches SEO",
  h1: "Technisches SEO: Was im Hintergrund über Rankings entscheidet",
  color: "bg-blue-50 text-blue-700 border-blue-200",
  dotColor: "bg-blue-500",
  leistungHref: "/seo/audit",
  description:
    "Core Web Vitals, Crawling, strukturierte Daten und alles was im Hintergrund über Rankings entscheidet. Das technische Fundament für nachhaltige Sichtbarkeit.",
  topics: ["Core Web Vitals", "Crawling & Indexierung", "Schema Markup", "Canonical Tags", "JavaScript SEO"],
  articles: [
    {
      title: "Core Web Vitals: LCP, INP und CLS optimieren",
      excerpt: "Googles Performance-Metriken verstehen und verbessern.",
      readTime: "12 Min.",
      slug: "core-web-vitals",
    },
    {
      title: "Crawling & Indexierung: Wie Google Ihre Seite liest",
      excerpt:
        "robots.txt, Sitemaps und Crawl-Budget richtig konfigurieren.",
      readTime: "10 Min.",
      slug: "crawling-indexierung",
    },
    {
      title: "Schema Markup: Strukturierte Daten implementieren",
      excerpt:
        "JSON-LD, Rich Snippets und wie strukturierte Daten Rankings beeinflussen.",
      readTime: "13 Min.",
      slug: "schema-markup",
    },
    {
      title: "Canonical Tags richtig einsetzen",
      excerpt: "Duplicate-Content-Probleme mit Canonicals lösen.",
      readTime: "7 Min.",
      slug: "canonical-tags",
    },
    {
      title: "JavaScript SEO: Herausforderungen und Lösungen",
      excerpt:
        "Warum JavaScript-Rendering für SEO riskant ist und wie man es richtig handhabt.",
      readTime: "11 Min.",
      slug: "javascript-seo",
    },
  ],
};

export default function TechnicalSEOPillarPage() {
  return <WissenPillarPage cluster={cluster} />;
}
