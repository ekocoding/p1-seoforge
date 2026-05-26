import type { Metadata } from "next";
import SeoHubClient from "./SeoHubClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Leistungen von SeoForge — Audit bis Betreuung",
  description:
    
    "Von der Keyword-Strategie bis zur laufenden Optimierung — SeoForge bietet alle SEO-Leistungen aus einer Hand. Ohne Vertragsbindung, mit klaren Ergebnissen.",
  alternates: { canonical: "https://seoforge.de/seo" },
};

export default function Page() {
  return <SeoHubClient />;
}
