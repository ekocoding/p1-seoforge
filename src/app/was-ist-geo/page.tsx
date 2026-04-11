import type { Metadata } from "next";
import WasIstGeoClient from "./WasIstGeoClient";

export const metadata: Metadata = {
  title: "Was ist GEO? Generative Engine Optimization erklärt | Seoforge",
  description:
    "GEO (Generative Engine Optimization) ist die Disziplin, Marken in KI-Antworten sichtbar zu machen. Erfahren Sie, wie GEO funktioniert und warum es jetzt wichtig ist.",
  keywords: [
    "Was ist GEO",
    "Generative Engine Optimization",
    "GEO SEO Unterschied",
    "KI Sichtbarkeit",
    "AI Overviews optimieren",
    "ChatGPT Sichtbarkeit",
    "Perplexity Ranking",
    "LLMO",
  ],
  openGraph: {
    title: "Was ist GEO? Generative Engine Optimization erklärt",
    description:
      "GEO optimiert Ihre Marke für KI-Antworten in ChatGPT, Perplexity und Google AI Overviews. Alles was Sie wissen müssen.",
    url: "https://seoforge.de/was-ist-geo",
    siteName: "SeoForge",
    locale: "de_DE",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WasIstGeoPage() {
  return <WasIstGeoClient />;
}
