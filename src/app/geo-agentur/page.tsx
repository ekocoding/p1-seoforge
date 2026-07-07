import type { Metadata } from "next";
import GeoAgenturClient from "./GeoAgenturClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GEO Agentur — KI-Sichtbarkeit für Ihre Marke",
  description:
    "SeoForge ist Ihre spezialisierte GEO Agentur für Sichtbarkeit in ChatGPT, Gemini, Perplexity und Claude. Strategie, Optimierung und Monitoring aus einer Hand.",
  alternates: { canonical: "https://seoforge.de/geo-agentur" },
};

export default function Page() {
  return <GeoAgenturClient />;
}
