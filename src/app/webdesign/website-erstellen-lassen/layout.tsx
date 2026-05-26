import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website erstellen lassen | Professionell & SEO-ready",
  description:
    "Website erstellen lassen mit SeoForge: Professionelle Websites mit SEO-Fundament, schnellen Ladezeiten und modernem Design. Von der Konzeption bis zum Launch.",
  alternates: { canonical: "https://seoforge.de/webdesign/website-erstellen-lassen" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
