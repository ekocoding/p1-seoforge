import type { Metadata } from "next";
import SeoBeratungClient from "./SeoBeratungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Beratung: Strategie, Roadmap & Klarheit",
  description:
    
    "Klarheit statt Phrasen: SeoForge entwickelt Ihre SEO-Strategie, analysiert Wettbewerber und liefert eine priorisierte Roadmap — direkt, ohne Jargon.",
  alternates: { canonical: "https://seoforge.de/seo/beratung" },
};

export default function Page() {
  return <SeoBeratungClient />;
}
