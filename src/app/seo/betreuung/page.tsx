import type { Metadata } from "next";
import SeoBetreuungClient from "./SeoBetreuungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Laufende SEO Betreuung ohne Vertrag",
  description:
    
    "SeoForge betreut Ihre SEO monatlich: Optimierung, Monitoring und Reporting — ohne Mindestlaufzeit. Sie kündigen, wann Sie möchten. Transparenz inklusive.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung" },
};

export default function Page() {
  return <SeoBetreuungClient />;
}
