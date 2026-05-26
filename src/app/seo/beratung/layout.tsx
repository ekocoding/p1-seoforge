import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Beratung | Strategie für nachhaltige Rankings",
  description:
    "SEO Beratung von SeoForge: Keyword-Strategie, Wettbewerbsanalyse und SEO-Roadmap. Klare Prioritäten für messbare Ergebnisse — ohne Agentur-Phrasen.",
  alternates: { canonical: "https://seoforge.de/seo/beratung" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
