import type { Metadata } from "next";
import SeoBeratungClient from "./SeoBeratungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Beratung — Strategie & Roadmap | SeoForge",
  description:
    "SEO Beratung von SeoForge: Keyword-Strategie, Wettbewerbs-Analyse und priorisierte SEO-Roadmap. Beratung vor Umsetzung — für nachhaltigen SEO-Erfolg.",
  alternates: { canonical: "https://seoforge.de/seo/beratung" },
};

export default function Page() {
  return <SeoBeratungClient />;
}
