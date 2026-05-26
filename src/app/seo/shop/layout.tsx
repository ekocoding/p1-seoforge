import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop SEO | E-Commerce SEO für mehr Umsatz",
  description:
    "Shop SEO von SeoForge: Produkt-Rankings, Kategorie-Seiten, Schema Markup und Duplicate-Content-Management für Shopify, WooCommerce und Custom-Shops.",
  alternates: { canonical: "https://seoforge.de/seo/shop" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
