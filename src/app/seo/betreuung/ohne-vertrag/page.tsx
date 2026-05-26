import type { Metadata } from "next";
import OhneVertragClient from "./OhneVertragClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Betreuung ohne Vertrag — Monatlich kündbar | SeoForge",
  description:
    "SEO-Betreuung ohne Mindestlaufzeit von SeoForge. Monatlich kündbar, datenbasiert und direkt umsetzend. Kein Kleingedrucktes — nur Ergebnisse.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/ohne-vertrag" },
};

export default function Page() {
  return <OhneVertragClient />;
}
