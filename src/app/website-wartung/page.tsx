import type { Metadata } from "next";
import WebsiteWartungClient from "./WebsiteWartungClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Website-Wartung & Betreuung — Updates, Backups, Security | SeoForge",
  description:
    "Professionelle Website-Wartung von SeoForge: Updates, tägliche Backups, Security-Monitoring, Performance & Uptime — Wartungsvertrag ab 49 €/Monat, monatlich kündbar.",
  alternates: { canonical: "https://seoforge.de/website-wartung" },
};

export default function Page() {
  return <WebsiteWartungClient />;
}
