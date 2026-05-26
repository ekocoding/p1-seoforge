import type { Metadata } from "next";
import LandingPagesClient from "./LandingPagesClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Landing Pages erstellen lassen — Conversion-optimiert | SeoForge",
  description:
    "Professionelle Landing Pages von SeoForge: conversion-optimiert, schnell und SEO-freundlich. Für Kampagnen, Produkteinführungen und Lead-Generierung.",
  alternates: { canonical: "https://seoforge.de/webdesign/landing-pages" },
};

export default function Page() {
  return <LandingPagesClient />;
}
