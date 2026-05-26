import type { Metadata } from "next";
import SeoBetreuungROIClient from "./SeoBetreuungROIClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO ROI — Was Ihr Investment wirklich einbringt | SeoForge",
  description:
    "Wie viel bringt SEO wirklich? SeoForge zeigt den messbaren ROI: Traffic-Wert, Lead-Kosten, Conversionsteigerung — konkret, transparent und datenbasiert.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/roi" },
};

export default function Page() {
  return <SeoBetreuungROIClient />;
}
