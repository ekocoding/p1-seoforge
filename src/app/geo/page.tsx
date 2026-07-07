import type { Metadata } from "next";
import GeoHubClient from "./GeoHubClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GEO Leistungen — Sichtbar in ChatGPT & KI-Suche",
  description:
    "GEO-Leistungen von SeoForge: Audit, Beratung, Optimierung, Content-Strategie und Monitoring für KI-Sichtbarkeit in ChatGPT, Gemini & Perplexity.",
  alternates: { canonical: "https://seoforge.de/geo" },
};

export default function Page() {
  return <GeoHubClient />;
}
