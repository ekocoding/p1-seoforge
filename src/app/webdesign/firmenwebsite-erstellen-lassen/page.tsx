import type { Metadata } from "next";
import WebsiteMittelstandClient from "./WebsiteMittelstandClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Firmenwebsite erstellen lassen für KMU",
  description:
    "Firmenwebsite erstellen lassen — custom coded, SEO- & GEO-optimiert, in Rekordzeit deployt. KI-Workflows senken die Kosten spürbar — ideal für Mittelstand und kleine Unternehmen. Festpreis nach kostenlosem Erstgespräch.",
  alternates: {
    canonical: "https://seoforge.de/webdesign/firmenwebsite-erstellen-lassen",
  },
};

export default function Page() {
  return <WebsiteMittelstandClient />;
}
