import type { Metadata } from "next";
import ShopSeoClient from "./ShopSeoClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Shop SEO — E-Commerce Rankings & mehr Umsatz | SeoForge",
  description:
    "Shop SEO von SeoForge: Produktseiten, Kategorien und E-Commerce-Strukturen für Shopify, WooCommerce & Co. optimiert. Mehr Sichtbarkeit, mehr Conversion.",
  alternates: { canonical: "https://seoforge.de/seo/shop" },
};

export default function Page() {
  return <ShopSeoClient />;
}
