import type { Metadata } from "next";
import KontaktClient from "./KontaktClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Kontakt & kostenloses Erstgespräch | SeoForge",
  description:
    "Jetzt Anfrage stellen: kostenloses SEO-Erstgespräch, kein Vertrag, direkte Antwort. SeoForge — persönlich und ohne Umwege.",
  alternates: { canonical: "https://seoforge.de/kontakt" },
};

export default function Page() {
  return <KontaktClient />;
}
