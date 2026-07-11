import type { Metadata } from "next";
import OhneVertragClient from "./OhneVertragClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO-Betreuung ohne Vertrag | Monatlich kündbar",
  description:
    "SEO-Betreuung ohne Vertrag: Was monatlich kündbar konkret bedeutet, welche Übergaberegeln wichtig sind und wann Audit oder Projekt besser passen.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/ohne-vertrag" },
};

export default function Page() {
  return <OhneVertragClient />;
}
