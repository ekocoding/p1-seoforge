import type { Metadata } from "next";
import SeoBeratungClient from "./SeoBeratungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Beratung: Prioritäten, die Wirkung zeigen",
  description:
    "SEO Beratung auf echten Daten: Semrush, Ahrefs & Search Console statt Bauchgefühl. Ehrliche Priorisierung, keine Ranking-Versprechen. Gespräch kostenlos.",
  alternates: { canonical: "https://seoforge.de/seo/beratung" },
};

export default function Page() {
  return <SeoBeratungClient />;
}
