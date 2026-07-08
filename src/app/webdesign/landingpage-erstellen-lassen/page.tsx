import type { Metadata } from "next";
import LandingPagesClient from "./LandingPagesClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Landingpage erstellen lassen — conversion-stark",
  description:
    "Landingpage oder Onepager erstellen lassen: conversion-optimiert, blitzschnell und SEO-freundlich — custom-coded für Kampagnen und Produkt-Launches.",
  alternates: { canonical: "https://seoforge.de/webdesign/landingpage-erstellen-lassen" },
};

export default function Page() {
  return <LandingPagesClient />;
}
