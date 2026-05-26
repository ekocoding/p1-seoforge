import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Leistungen | Alle SEO Services im Überblick",
  description:
    "Alle SEO-Leistungen von SeoForge: Beratung, Optimierung, Audit, Content-Strategie, On-Page SEO, Shop SEO und laufende Betreuung. Nachhaltig und messbar.",
  alternates: { canonical: "https://seoforge.de/seo" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
