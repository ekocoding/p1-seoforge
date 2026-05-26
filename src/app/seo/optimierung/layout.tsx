import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Optimierung | Systematische Verbesserung",
  description:
    "SEO Optimierung von SeoForge: Technische Fixes, Content-Verbesserungen und Strukturoptimierung für messbar bessere Rankings und mehr organischen Traffic.",
  alternates: { canonical: "https://seoforge.de/seo/optimierung" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
