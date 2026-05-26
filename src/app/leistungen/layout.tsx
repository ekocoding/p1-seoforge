import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leistungen | SEO, GEO & Webdesign",
  description:
    "Alle Leistungen von SeoForge: SEO Beratung, Optimierung, Audit, Content-Strategie, Shop SEO, GEO und Webdesign. Alles aus einer Hand, messbar und nachhaltig.",
  alternates: { canonical: "https://seoforge.de/leistungen" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
