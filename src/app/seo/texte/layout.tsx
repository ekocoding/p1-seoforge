import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Texte | Keyword-optimierte Inhalte die ranken",
  description:
    "SEO Texte von SeoForge: Keyword-optimierte Inhalte für Websites, Blogs und Produktseiten. Geschrieben für Suchmaschinen und Menschen — mit Rankingwirkung.",
  alternates: { canonical: "https://seoforge.de/seo/texte" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
