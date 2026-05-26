import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Content Strategie | Topic Clusters & Keyword Mapping",
  description:
    "SEO Content Strategie von SeoForge: Topic Clusters, Keyword Mapping und Redaktionskalender. Content der systematisch Rankings aufbaut — keine Zufallsartikel.",
  alternates: { canonical: "https://seoforge.de/seo/content-strategie" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
