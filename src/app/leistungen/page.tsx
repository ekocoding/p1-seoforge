import type { Metadata } from "next";
import LeistungenClient from "./LeistungenClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO, GEO & Webdesign Leistungen im Überblick | SeoForge",
  description:
    "Alle Leistungen von SeoForge auf einen Blick: SEO Audit, Beratung, Betreuung, GEO-Optimierung und Webdesign. Individuell kombinierbar, ohne Standardpakete.",
  alternates: { canonical: "https://seoforge.de/leistungen" },
};

export default function Page() {
  return <LeistungenClient />;
}
