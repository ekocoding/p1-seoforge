import type { Metadata } from "next"
import ContentStrategiePageClient from "./ContentStrategiePageClient"

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GEO Content Strategie — KI-Content erstellen",
  description:
    "GEO Content Strategie von SeoForge: Inhalte entwickeln, die ChatGPT, Gemini & Perplexity zitieren. 4 Prinzipien, 5-Schritt-Prozess, Vorher/Nachher-Beispiele. Jetzt anfragen.",
  alternates: { canonical: "https://seoforge.de/geo/content-strategie" },
}

export default function Page() {
  return <ContentStrategiePageClient />
}
