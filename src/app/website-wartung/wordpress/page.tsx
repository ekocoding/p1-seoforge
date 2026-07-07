import type { Metadata } from "next";
import WordpressWartungClient from "./WordpressWartungClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "WordPress-Wartung & Pflege — mit Staging-Test",
  description:
    "WordPress-Wartung mit System: Core-, Plugin- & Theme-Updates mit Staging-Test, tägliche externe Backups mit 1-Klick-Restore, Security-Hardening, Malware-Scan und Core-Web-Vitals-Monitoring. Pakete ab 49 €/Monat — monatlich kündbar, kein Jahresvertrag.",
  alternates: {
    canonical: "https://seoforge.de/website-wartung/wordpress",
  },
};

export default function Page() {
  return <WordpressWartungClient />;
}
