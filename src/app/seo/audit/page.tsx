import type { Metadata } from "next";
import SeoAuditClient from "./SeoAuditClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Audit von SeoForge — Vollbild Ihrer Website",
  description:
    
    "Wissen, wo Sie stehen: Der SeoForge-Audit analysiert Technik, Content, Backlinks und Struktur — mit priorisiertem Maßnahmenplan statt Daten-Friedhof.",
  alternates: { canonical: "https://seoforge.de/seo/audit" },
};

export default function Page() {
  return <SeoAuditClient />;
}
