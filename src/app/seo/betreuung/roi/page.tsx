import type { Metadata } from "next";
import SeoBetreuungROIClient from "./SeoBetreuungROIClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO-ROI berechnen | Transparenter Szenariorechner",
  description:
    "SEO-ROI mit eigenen Annahmen berechnen: Investition, zusätzliche Sessions, Conversion-Rate, Deckungsbeitrag und Attribution transparent modellieren.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/roi" },
};

export default function Page() {
  return <SeoBetreuungROIClient />;
}
