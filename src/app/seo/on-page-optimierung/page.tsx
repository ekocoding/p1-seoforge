import type { Metadata } from "next";
import OnPageOptClient from "./OnPageOptClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "On-Page Optimierung — 200+ Prüfpunkte pro Seite | SeoForge",
  description:
    "Systematische On-Page Optimierung von SeoForge: Meta-Tags, Headings, Core Web Vitals, interne Verlinkung — direkte Umsetzung im CMS, messbare Ergebnisse.",
  alternates: { canonical: "https://seoforge.de/seo/on-page-optimierung" },
};

export default function Page() {
  return <OnPageOptClient />;
}
