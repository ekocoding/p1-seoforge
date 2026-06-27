import type { Metadata } from "next";
import LandingPagesClient from "./LandingPagesClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Landingpage erstellen lassen — Onepager & conversion-optimiert | SeoForge",
  description:
    "Landingpage oder Onepager erstellen lassen: conversion-optimiert, blitzschnell und SEO-freundlich. Custom-coded von SeoForge — für Kampagnen, Produkt-Launches und Lead-Generierung.",
  alternates: { canonical: "https://seoforge.de/webdesign/landingpage-erstellen-lassen" },
};

export default function Page() {
  return <LandingPagesClient />;
}
