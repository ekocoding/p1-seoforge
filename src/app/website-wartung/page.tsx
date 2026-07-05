import type { Metadata } from "next";
import WebsiteWartungClient from "./WebsiteWartungClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Website-Wartung, die arbeitet, bevor etwas ausfällt — ab 49 €/Monat | SeoForge",
  description:
    "Website-Wartung mit festem Ansprechpartner: getestete Updates, tägliche verschlüsselte Backups, Security- & Uptime-Monitoring, Performance-Checks — Festpreis ab 49 €/Monat, Antwort in unter 24 h, monatlich kündbar.",
  alternates: { canonical: "https://seoforge.de/website-wartung" },
};

export default function Page() {
  return <WebsiteWartungClient />;
}
