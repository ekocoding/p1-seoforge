import type { Metadata } from "next";
import AppDesignClient from "./AppDesignClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "App Design — UI/UX für Web-Apps & SaaS",
  description:
    "UI/UX App Design von SeoForge: für Web-Apps, Dashboards und SaaS-Produkte. Nutzerzentriert, intuitiv und auf messbare Ergebnisse ausgerichtet.",
  alternates: { canonical: "https://seoforge.de/webdesign/app-design" },
};

export default function Page() {
  return <AppDesignClient />;
}
