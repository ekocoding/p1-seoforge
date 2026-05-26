import type { Metadata } from "next";
import SeoAuditClient from "./SeoAuditClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Audit — Vollständige Website-Analyse | SeoForge",
  description:
    "Professioneller SEO Audit von SeoForge: 200+ Prüfpunkte, Keyword-Gap-Analyse und priorisierter Maßnahmenplan. Volle Klarheit über Ihre SEO-Situation.",
  alternates: { canonical: "https://seoforge.de/seo/audit" },
};

export default function Page() {
  return <SeoAuditClient />;
}
