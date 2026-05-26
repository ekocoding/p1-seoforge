import type { Metadata } from "next";
import SeoBetreuungROIClient from "./SeoBetreuungROIClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO ROI: Lohnt sich SEO für Ihr Unternehmen? — SeoForge",
  description:
    
    "Interaktiver ROI-Rechner von SeoForge: Berechnen Sie Traffic-Wert, Break-Even und Lead-Kosten. Ehrliche Zahlen — bevor Sie sich für SEO entscheiden.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/roi" },
};

export default function Page() {
  return <SeoBetreuungROIClient />;
}
