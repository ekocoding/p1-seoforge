import type { Metadata } from "next";
import WordpressWartungClient from "./WordpressWartungClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "WordPress-Wartung & Pflege — Updates, Backups, Security | SeoForge",
  description:
    "WordPress Wartung & Pflege von SeoForge: Core-, Plugin- & Theme-Updates, tägliche Backups, Security-Hardening, Malware-Scan und Performance — WordPress Wartungsvertrag ab 49 €/Monat, monatlich kündbar.",
  alternates: {
    canonical: "https://seoforge.de/website-wartung/wordpress",
  },
};

export default function Page() {
  return <WordpressWartungClient />;
}
