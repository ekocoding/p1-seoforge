import type { Metadata } from "next";
import WissenPillarPage from "../WissenPillarPage";
import type { PillarCluster } from "../WissenPillarPage";

export const metadata: Metadata = {
  title: "Webdesign-Wissen: Aufbau, Conversion & Design-Grundlagen | SeoForge",
  description:
    "Praxisnahe Webdesign-Ratgeber: One-Pager, Landingpages, Call-to-Action, Website-Aufbau und Conversion. Verständlich erklärt von der SeoForge-Agentur.",
  alternates: { canonical: "https://seoforge.de/wissen/webdesign" },
};

const cluster: PillarCluster = {
  key: "webdesign",
  label: "Webdesign",
  h1: "Webdesign-Wissen: Was eine Website wirklich erfolgreich macht",
  color: "bg-amber-50 text-amber-700 border-amber-200",
  dotColor: "bg-amber-500",
  leistungHref: "/webdesign",
  description:
    "Von der Struktur über Conversion bis zum Design: die Grundlagen, die über Nutzererlebnis und Anfragen entscheiden — ohne Baukasten-Floskeln, mit der Tiefe einer Agentur.",
  topics: ["One-Pager & Landingpages", "Call-to-Action & Conversion", "Website-Aufbau", "UX/UI", "Design-Grundlagen"],
  articles: [
    {
      title: "Onepager: Was ist eine One-Page-Website, wann lohnt sie sich + Beispiele",
      excerpt:
        "Wann eine einzelne Scroll-Seite stärker ist als eine Multipage-Website — und wo ihre Grenzen liegen.",
      readTime: "9 Min.",
      slug: "one-pager-website",
    },
    {
      title: "Landingpage-Beispiele: Vorlagen, die wirklich konvertieren",
      excerpt:
        "Die Anatomie konversionsstarker Landingpages anhand konkreter Beispiel-Pattern.",
      readTime: "10 Min.",
      slug: "landingpage-beispiele",
    },
    {
      title: "Call-to-Action: Beispiele + Best Practices für mehr Conversions",
      excerpt:
        "Wie Text, Farbe und Platzierung des wichtigsten Buttons über Anfragen entscheiden.",
      readTime: "9 Min.",
      slug: "call-to-action-website",
    },
    {
      title: "Was kostet eine Website? Preise & Kostenfaktoren",
      excerpt:
        "Realistische Preisrahmen, Kostentreiber und eine Beispielrechnung für dein Webprojekt.",
      readTime: "11 Min.",
      slug: "was-kostet-eine-website",
    },
    {
      title: "Die häufigsten Webdesign-Fehler — und wann ein Relaunch fällig ist",
      excerpt:
        "Welche Design- und Strukturfehler Besucher vertreiben und einen Relaunch auslösen.",
      readTime: "9 Min.",
      slug: "webdesign-fehler",
    },
    {
      title: "Website-Aufbau: Header, Body, Footer — die perfekte Struktur",
      excerpt:
        "Wie eine Website logisch aufgebaut ist und Nutzer Schritt für Schritt zum Ziel führt.",
      readTime: "10 Min.",
      slug: "website-aufbau",
    },
  ],
};

export default function WebdesignPillarPage() {
  return <WissenPillarPage cluster={cluster} />;
}
