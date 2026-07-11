import type { Metadata } from "next";
import SeoBetreuungClient from "./SeoBetreuungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Betreuung: laufend & transparent",
  description:
    "Monatliche SEO Betreuung mit klarer Priorität: Analyse, Umsetzung, Monitoring und verständliches Reporting. Feste Ansprechperson, transparente Arbeit.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung" },
};

export default function Page() {
  return <SeoBetreuungClient />;
}
