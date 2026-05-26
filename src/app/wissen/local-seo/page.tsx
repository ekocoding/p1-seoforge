import type { Metadata } from "next";
import WissenPillarPage from "../WissenPillarPage";
import type { PillarCluster } from "../WissenPillarPage";

export const metadata: Metadata = {
  title: "Local SEO: Google Business Profile & lokale Rankings | Wissen — SeoForge",
  description:
    "Alles über Local SEO: Google Business Profile optimieren, lokale Rankingfaktoren, NAP-Konsistenz, Bewertungsmanagement und lokale Keywords.",
};

const cluster: PillarCluster = {
  key: "local-seo",
  label: "Local SEO",
  h1: "Local SEO: Mehr Kunden aus der Region gewinnen",
  color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  dotColor: "bg-emerald-500",
  leistungHref: "/seo",
  description:
    "Google Business Profile, lokale Rankings und regionale Sichtbarkeit für Unternehmen vor Ort. So erscheinen Sie genau dann, wenn Kunden in Ihrer Nähe suchen.",
  topics: ["Google Business Profile", "Lokale Rankingfaktoren", "NAP & Citations", "Bewertungsmanagement", "Lokale Keywords"],
  articles: [
    {
      title: "Google Business Profile optimieren: Der komplette Guide",
      excerpt:
        "Schritt für Schritt zum optimalen GBP — von der Einrichtung bis zu Posts.",
      readTime: "14 Min.",
      slug: "google-business-profile",
    },
    {
      title: "Lokale Rankingfaktoren: Was wirklich zählt",
      excerpt:
        "Proximity, Relevanz, Autorität — wie Google lokale Ergebnisse bewertet.",
      readTime: "9 Min.",
      slug: "lokale-rankingfaktoren",
    },
    {
      title: "NAP-Konsistenz: Citations richtig aufbauen",
      excerpt:
        "Name, Adresse, Telefon konsistent halten — welche Verzeichnisse wirklich zählen.",
      readTime: "7 Min.",
      slug: "nap-citations",
    },
    {
      title: "Bewertungsmanagement für lokale Sichtbarkeit",
      excerpt:
        "Mehr Google-Bewertungen bekommen und richtig auf Kritik reagieren.",
      readTime: "8 Min.",
      slug: "bewertungsmanagement",
    },
    {
      title: "Lokale Keywords finden und einsetzen",
      excerpt:
        "Wie lokale Suchintention funktioniert und wie man Keywords mit Ortsbezug recherchiert.",
      readTime: "6 Min.",
      slug: "lokale-keywords",
    },
  ],
};

export default function LocalSEOPillarPage() {
  return <WissenPillarPage cluster={cluster} />;
}
