import type { Metadata } from "next"
import AuditPageClient from "./AuditPageClient"

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GEO Audit | KI-Sichtbarkeit Ihrer Marke analysieren | SeoForge",
  description:
    "GEO Audit von SeoForge: Systematische Analyse Ihrer Marke in ChatGPT, Gemini, Perplexity & Claude. Wettbewerber-Benchmark + Aktionsplan. Lieferung in 10 Werktagen.",
  alternates: { canonical: "https://seoforge.de/geo/audit" },
}

export default function Page() {
  return <AuditPageClient />
}
