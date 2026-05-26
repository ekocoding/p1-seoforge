import type { Metadata } from "next"
import BeratungPageClient from "./BeratungPageClient"

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GEO Beratung | Strategie für KI-Sichtbarkeit | SeoForge",
  description:
    "GEO Beratung von SeoForge: Strategieworkshop, Maßnahmenplan und KPI-Framework für Ihre KI-Sichtbarkeit. Für B2B, E-Commerce und etablierte Marken. Kostenloses Erstgespräch.",
  alternates: { canonical: "/geo/beratung" },
}

export default function Page() {
  return <BeratungPageClient />
}
