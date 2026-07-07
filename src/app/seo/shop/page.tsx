import type { Metadata } from "next";
import ShopSeoClient from "./ShopSeoClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Shop SEO — E-Commerce Rankings & Umsatz",
  description:
    
    "Produktseiten, Kategorien, Duplicate Content: SeoForge optimiert Shopify, WooCommerce und Custom-Shops für mehr Sichtbarkeit und messbar höhere Conversion.",
  alternates: { canonical: "https://seoforge.de/seo/shop" },
};

export default function Page() {
  return <ShopSeoClient />;
}
