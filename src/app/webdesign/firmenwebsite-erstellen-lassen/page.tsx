import type { Metadata } from "next";
import WebsiteMittelstandClient from "./WebsiteMittelstandClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Firmenwebsite erstellen lassen für KMU",
  description:
    "Firmenwebsite erstellen lassen: custom coded, SEO- & GEO-optimiert, in Rekordzeit live. Faire Preise durch KI-Workflows — Festpreis nach Erstgespräch.",
  alternates: {
    canonical: "https://seoforge.de/webdesign/firmenwebsite-erstellen-lassen",
  },
};

export default function Page() {
  return <WebsiteMittelstandClient />;
}
