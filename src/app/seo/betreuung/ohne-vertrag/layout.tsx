import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Betreuung ohne Vertrag | Monatlich kündbar",
  description:
    "SEO Betreuung ohne Mindestlaufzeit: Monatlich kündbar, keine versteckten Klauseln. Was das bedeutet und wie es funktioniert — alle Infos hier.",
  alternates: { canonical: "https://seoforge.de/seo/betreuung/ohne-vertrag" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
