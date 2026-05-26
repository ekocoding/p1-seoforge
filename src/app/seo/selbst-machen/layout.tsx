import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO selbst machen | Schritt-für-Schritt Anleitung",
  description:
    "SEO selbst machen mit dem SeoForge Guide: Schritt-für-Schritt von der Keyword-Recherche bis zur technischen Optimierung. Für Einsteiger und Fortgeschrittene.",
  alternates: { canonical: "https://seoforge.de/seo/selbst-machen" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
