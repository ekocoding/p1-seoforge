import type { Metadata } from "next"
import OptimierungPageClient from "./OptimierungPageClient"

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GEO Optimierung | Für KI optimieren | SeoForge",
  description:
    "GEO Optimierung von SeoForge: Schema.org, Entity-Coverage, E-E-A-T und Citation Bait – damit ChatGPT, Gemini & Perplexity Ihre Marke zitieren. Erste Effekte in 4–8 Wochen.",
  alternates: { canonical: "/geo/optimierung" },
}

export default function Page() {
  return <OptimierungPageClient />
}
