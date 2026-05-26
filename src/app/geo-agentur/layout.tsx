import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GEO Agentur | KI-Sichtbarkeit für Ihre Marke",
  description:
    "SeoForge als GEO Agentur: Systematische Optimierung für KI-Sichtbarkeit in ChatGPT, Gemini & Perplexity. Wer in der KI-Suche fehlt, verliert Marktanteile.",
  alternates: { canonical: "https://seoforge.de/geo-agentur" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
