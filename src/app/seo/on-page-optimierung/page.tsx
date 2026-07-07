import type { Metadata } from "next";
import OnPageOptClient from "./OnPageOptClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "On-Page Optimierung: direkt & messbar",
  description:
    
    "200+ Prüfpunkte, direkte CMS-Umsetzung: SeoForge optimiert Meta-Tags, Headings, Core Web Vitals und interne Verlinkung — Schritt für Schritt messbar.",
  alternates: { canonical: "https://seoforge.de/seo/on-page-optimierung" },
};

export default function Page() {
  return <OnPageOptClient />;
}
