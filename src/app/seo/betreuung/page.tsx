import type { Metadata } from "next";
import SeoBetreuungClient from "./SeoBetreuungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Betreuung — Monatlich & ohne Vertrag | SeoForge",
  description:
    "Laufende SEO Betreuung von SeoForge: monatliche Optimierung, Monitoring und Reporting — ohne Mindestlaufzeit. Flexibel, transparent, ergebnisorientiert.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung" },
};

export default function Page() {
  return <SeoBetreuungClient />;
}
