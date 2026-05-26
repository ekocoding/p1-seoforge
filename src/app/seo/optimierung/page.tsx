import type { Metadata } from "next";
import SeoOptimierungClient from "./SeoOptimierungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Optimierung — Technisch & Inhaltlich | SeoForge",
  description:
    "Ganzheitliche SEO Optimierung von SeoForge: On-Page, Core Web Vitals, Backlinks und Content. Systematisch und datenbasiert für Top-Platzierungen.",
  alternates: { canonical: "https://seoforge.de/seo/optimierung" },
};

export default function Page() {
  return <SeoOptimierungClient />;
}
