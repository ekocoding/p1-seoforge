import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Audit | Vollständige Website-Analyse",
  description:
    "SEO Audit von SeoForge: Systematische Analyse aller Ranking-Faktoren — Technik, Content, Backlinks und Speed. Detaillierter Report mit konkretem Aktionsplan.",
  alternates: { canonical: "https://seoforge.de/seo/audit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
