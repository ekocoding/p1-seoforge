import type { Metadata } from "next";
import StandorteClient from "./StandorteClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur für Ihre Region | SeoForge — Lokales SEO in 11 Städten",
  description:
    "SeoForge bietet lokale SEO-Betreuung für Unternehmen in Stuttgart, Frankfurt, Heidelberg, Karlsruhe, Freiburg, Mainz und weiteren Städten — mit eigener Strategie für jeden Markt.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/standorte" },
};

export default function StandortePage() {
  return <StandorteClient />;
}
