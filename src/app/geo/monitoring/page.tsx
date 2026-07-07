import type { Metadata } from "next"
import MonitoringPageClient from "./MonitoringPageClient"

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GEO Monitoring — KI-Sichtbarkeit messen",
  description:
    "GEO Monitoring von SeoForge: Monatlich messen, wie oft Ihre Marke in ChatGPT, Gemini & Perplexity erscheint. Wettbewerber-Benchmark, Sentiment-Analyse, Handlungsempfehlungen. Ab 490 €/Monat.",
  alternates: { canonical: "https://seoforge.de/geo/monitoring" },
}

export default function Page() {
  return <MonitoringPageClient />
}
