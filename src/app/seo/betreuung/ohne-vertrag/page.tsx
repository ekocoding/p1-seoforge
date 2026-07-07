import type { Metadata } from "next";
import OhneVertragClient from "./OhneVertragClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO ohne Vertrag — Monatlich kündbar",
  description:
    
    "Keine Mindestlaufzeit, kein Kleingedrucktes: SeoForge bietet SEO-Betreuung die monatlich kündbar ist. Weil gute Arbeit keine Vertragsfesseln braucht.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/ohne-vertrag" },
};

export default function Page() {
  return <OhneVertragClient />;
}
