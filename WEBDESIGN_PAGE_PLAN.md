# Webdesign Subpage — Planungsdokument
**Route:** `/webdesign`
**Ziel-Keyword:** "Webdesign Agentur"
**Design-Referenzen:** Single Grain (Rhythmus, Warm-Gradient, Pain-First), Directive (Dunkles Hero, Weight-Kontrast-Headline, Stats-Bar), NoGood (Editorial-Liste, Full-Width-Type)

---

## Meta / SEO

```
title: "Webdesign Agentur | SEO-optimierte Websites – SeoForge"
description: "Professionelles Webdesign mit eingebautem SEO. Websites die ranken, laden und konvertieren. Next.js, React, Figma – alles aus einer Hand."
keywords: Webdesign Agentur, professionelles Webdesign, SEO Webdesign, Website erstellen lassen
```

---

## Section-Übersicht

```
1. HERO              → dunkel, ~100vh, split layout
2. PAIN POINTS       → weiß, editorial Liste (Single Grain-Style)
3. LEISTUNGEN        → offwhite, 3-col cards
4. WARUM SEO+WEB     → DUNKLE SECTION, typografischer Eyecatcher (Directive-Style)
5. PORTFOLIO         → weiß, 3-col Grid mit Hover + generierten Bildern
6. PROZESS           → offwhite, 4 Schritte (wie andere Subpages)
7. TECHNOLOGIEN      → weiß, Logo-/Techstack-Grid
8. ERGEBNISSE        → dunkel, große Zahlen-Callouts (NP Digital / Single Grain Style)
9. FAQ               → weiß, Accordion (bestehendes Muster)
10. CTA              → primary-gradient, starker Abschluss
```

---

## Section 1 — HERO

**Hintergrund:** Dunkles Charcoal (`#1A1A1A`) mit warmem Bronze/Kupfer-Gradient-Texture rechts oben (CSS, kein Bild) — direkt von Single Grain adaptiert, aber mit p1-Palette.

**Layout:** 2-Spalten-Grid (lg:grid-cols-2), Text links, Mockup rechts

**Links (Text-Spalte):**
- Status-Badge oben: `● Webdesign & SEO aus einer Hand` (primary-colored dot, dark badge — wie Scarcity-Signal bei Single Grain)
- H1 (Playfair Display, 5xl–6xl, weiß):
  `"Websites, die ranken.`
  `Designs, die konvertieren."`
  → Zweite Zeile mit primary-colored Unterline (single thick rule, wie Single Grain's orange underline)
- Subtext (DM Sans, lg, white/60):
  `"Als SEO-Agentur bauen wir Websites anders: Core Web Vitals, technisches SEO und Conversion-Optimierung sind keine Extras — sie sind das Fundament."`
- Bullet-Punkte (3x, primary checkmarks):
  `✓ SEO-optimiert ab Tag 1`
  `✓ 96+ PageSpeed Score garantiert`
  `✓ Fertig in 4–6 Wochen`
- CTA-Buttons:
  Primary: `"Kostenloses Webdesign-Gespräch"` → /kontakt
  Ghost: `"Portfolio ansehen"` → #portfolio
- Floating Trust-Signal (kein Avatar-Stack!):
  Kleine Karte: `"⚡ Ø 97/100 PageSpeed"` als schwebende Badge unten links

**Rechts (Mockup-Spalte):**
→ `WebdesignMockup.tsx` (React-Komponente, kein generiertes Bild)
**Mockup-Inhalt:** Browser-Chrome-Rahmen (dunkel), darin eine animierte Preview einer Website:
- Fake-Browser-URL-Bar: `seoforge-client.de`
- Header mit Logo + Nav
- Hero-Bereich mit großem Headline-Text + CTA-Button
- 3 kleine Karten darunter
- Animiert: typing-cursor im Header-Text, dann "pageload"-Simulation

**Background-Texture:** CSS `radial-gradient` von primary/20 → transparent, rechts oben positioniert (warm Kupfer-Aura, kein Bild nötig)

---

## Section 2 — PAIN POINTS (Single Grain "Erkennst du das?")

**Hintergrund:** Weiß
**Layout:** Intro-Headline links, dann single-column Liste mit Trennlinien

**Headline (Playfair, 3xl, dark):**
`"Kennst du das?"`

**Subtext (muted):**
`"Die meisten Websites scheitern an denselben drei Problemen — bevor der erste Besucher überhaupt konvertieren kann."`

**Liste (editorial, horizontal rules zwischen Items, NoGood-Style):**
Jede Zeile: primary Icon links — Pain Point rechts (semibold + kurze Erklärung)

1. 🔴 `Langsame Ladezeit` — Google bestraft Sites unter 90 PageSpeed mit schlechteren Rankings. Deine potentiellen Kunden springen ab.
2. 🔴 `Kein organischer Traffic` — Eine schöne Website bringt nichts, wenn sie niemand findet. SEO wird beim Bau ignoriert.
3. 🔴 `Null Conversions` — Besucher kommen und gehen, ohne Kontakt aufzunehmen. CTA-Struktur und UX fehlen.
4. 🔴 `Veraltetes Design` — Deine Website signalisiert 2015. Das Vertrauen der Besucher ist weg, bevor sie scrollen.

**Abschluss der Section:**
Kleiner Bridge-Text: `"SeoForge löst alle vier — weil wir SEO-Agentur und Webdesign-Studio in einem sind."`
→ Subtle arrow down oder Section-break

---

## Section 3 — LEISTUNGEN (3-col Cards, Directive-Style)

**Hintergrund:** Offwhite (`#F8F7F5`)
**Layout:** Section-Header + 3-col Card-Grid (2-col mobile)

**Section-Badge:** `● Leistungsumfang`
**H2:** `"Alles. Aus einer Hand."`
**Subtext:** `"Von der ersten Wireframe-Skizze bis zum Launch-fertigen, SEO-optimierten Produkt."`

**Cards (4 Cards, 2+2 Grid oder 4-col lg):**
Jede Card: Icon (SVG), H3, Kurzbeschreibung, kleiner "mehr erfahren →" Link
Border-top: `border-t-[3px] border-t-primary` (bestehende Pattern!)

1. **UI/UX Design**
   Icon: Design-Tool SVG
   `"Figma-Prototypen, Wireframes und responsive Layouts. Design das funktioniert, bevor eine Zeile Code geschrieben wird."`

2. **Next.js Entwicklung**
   Icon: Code SVG
   `"Blazing-fast Websites mit Next.js und React. Server-Side Rendering, statische Generierung, maximale Performance."`

3. **SEO-optimiertes Webdesign**
   Icon: Lupe/Chart SVG
   `"Technisches SEO, Core Web Vitals und Structured Data sind keine nachträglichen Fixes — sie werden eingebaut."`

4. **Conversion-Optimierung**
   Icon: Arrow-up SVG
   `"CTA-Struktur, A/B-Testing und heatmap-basierte UX-Anpassungen für maximal mehr Anfragen."`

---

## Section 4 — WARUM SEO + WEBDESIGN ZUSAMMEN (Dark Section, Directive-Style)

**Hintergrund:** Dunkel (`#1A1A1A`)
**Layout:** Volle Breite, zentrierter Text dann 3-col Cards

**Eyecatcher-Headline (Playfair, 4xl–5xl, weiß):**
```
"Webdesign ohne SEO ist
wie ein Schaufenster
im Keller."
```
→ Letzte Zeile/Wort in primary (#C2722A) Farbe
→ Weight-Kontrast: erste Zeilen regular, letzte Zeile bold/italic (Directive-Move)

**Subtext (weiß/60, lg):**
`"Wer eine Agentur für die Website und eine andere für SEO beauftragt, zahlt doppelt und verliert trotzdem. Wir denken beides zusammen — von Anfang an."`

**3 "THE SHIFT"-Cards (wie Single Grain, auf dunklem Background):**
Card-Style: dunkles Panel (#2a2a2a), border border-primary/20, rounded-2xl

| | | |
|---|---|---|
| **Andere Agenturen** | **→** | **SeoForge** |
| Website zuerst, SEO später | | SEO-Architektur von Tag 1 |
| Schönes Design, langsam | | PageSpeed 96+ by default |
| Getrennte Ansprechpartner | | Ein Team, eine Strategie |

Format: Kleines Label `"DAS ALTE MODELL"` → Pfeil → `"UNSER ANSATZ"` in primary

---

## Section 5 — PORTFOLIO (3-col Grid, Directive Case-Study-Style)

**Hintergrund:** Weiß
**Layout:** Section-Header + 3-col Card-Grid
**ID:** `id="portfolio"`

**Section-Badge:** `● Referenzen`
**H2:** `"Websites, die wir gebaut haben."`
**Subtext:** `"Ausgewählte Projekte — mit messbaren Ergebnissen."`

**3 Portfolio-Cards (hover: -translate-y-2 shadow-xl):**
Jede Card: Bild (16:9 oder 4:3), darunter Kategorie-Tag, Projektname, 1 Key-Metric

| Card | Kategorie | Projekt | Key Metric |
|------|-----------|---------|------------|
| Bild 1 | E-Commerce | Online-Shop Relaunch | `+143% Conversions` |
| Bild 2 | B2B | Unternehmenswebsite | `PageSpeed 98/100` |
| Bild 3 | Local Business | Praxiswebsite | `#1 Google in 8 Wochen` |

**→ BILDER: Nano Banana** (3 hochwertige Website-Mockup-Renders)

### Bild-Briefings für Nano Banana:

**Bild 1 — E-Commerce (portfolio-ecommerce.jpg):**
```
Premium laptop mockup showing a modern e-commerce website. The website has a dark
charcoal header with white typography, product grid with clean product cards,
warm bronze/copper accent colors for buttons and highlights. Professional studio
lighting on the laptop. The website shown is for a premium fashion or lifestyle
brand. Photorealistic, editorial style, shot on dark grey surface. 16:9 ratio.
```

**Bild 2 — B2B Website (portfolio-b2b.jpg):**
```
MacBook Pro mockup displaying a clean, minimal B2B corporate website. The website
features a white background with dark typography, geometric abstract hero section,
warm gold/bronze accent color. The site looks like a high-end consulting or
technology company. Clean editorial photography style, soft natural light from
left. 16:9 ratio.
```

**Bild 3 — Local Business (portfolio-local.jpg):**
```
iPhone and iPad mockup side by side showing a modern local business website —
a medical practice or professional services firm. Clean white design, trust-
building elements, warm bronze CTA buttons visible. Both devices show the same
responsive website. White background, minimal shadows. 16:9 ratio.
```

---

## Section 6 — PROZESS (Offwhite, bestehendes Muster)

**Hintergrund:** Offwhite
**Layout:** Section-Header + 4-col Prozess-Cards (bestehende `.sp-process-card` Pattern)

**H2:** `"So entsteht deine Website."`
**Subtext:** `"In 4 Phasen zum Launch — transparent, termingebunden, ohne Überraschungen."`

**4 Schritte:**
1. **Analyse & Strategie** — Ziele, Wettbewerber, Keyword-Potenzial, SEO-Architektur planen
2. **Design & Konzept** — Wireframes in Figma, UI-Design, Feedback-Runden, Mobile-First
3. **Entwicklung** — Next.js-Entwicklung, CMS-Integration, Core Web Vitals Optimierung
4. **Launch & SEO** — Go-Live, Google Search Console, Analytics, initiale Keyword-Rankings

---

## Section 7 — TECHNOLOGIEN (Weiß, Logo-Grid)

**Hintergrund:** Weiß
**Layout:** Zentrierter Header + 2-Zeilen Logo-Grid

**H2:** `"Unser Stack."`
**Subtext:** `"Moderne Technologien für maximale Performance und Wartbarkeit."`

**Tech-Grid (6-8 Logos/Cards, einfache Border-Cards):**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Figma
- Vercel
- Google Search Console
- WordPress (für CMS-Projekte)

→ **Kein Bild nötig** — SVG-Logos oder einfache Text-Cards mit Icons

---

## Section 8 — ERGEBNISSE (Dark, Große Zahlen — NP Digital / Single Grain Style)

**Hintergrund:** Dunkel (`#1A1A1A`)
**Layout:** Zentrierter Header + 4-col Stats-Grid

**H2 (Playfair, weiß):** `"Zahlen, die sprechen."`

**4 große Stat-Callouts (AnimatedCounter-Komponente, primary gradient text):**
1. `96+` — Ø PageSpeed Score unserer Websites
2. `4–6` — Wochen bis zum Launch
3. `+180%` — Durchschn. Traffic nach 6 Monaten
4. `100%` — Mobile-First, WCAG-konform

→ **Kein Bild nötig** — AnimatedStat-Komponente (bereits im Projekt vorhanden)

---

## Section 9 — FAQ (Weiß, bestehendes Accordion-Muster)

**7 SEO-relevante Fragen:**

1. Was kostet eine professionelle Website?
2. Wie lange dauert die Entwicklung einer Website?
3. Was ist der Unterschied zwischen Webdesign und Webentwicklung?
4. Warum ist Next.js besser als WordPress für SEO?
5. Wie stellt ihr sicher, dass meine Website bei Google rankt?
6. Bietet ihr auch Website-Relaunch für bestehende Sites an?
7. Was passiert nach dem Launch — gibt es Support?

---

## Section 10 — CTA (Primary Gradient, starker Abschluss)

**Hintergrund:** Gradient von `primary` → `primary-dark`
**Layout:** Zentriert, volle Breite

**H2 (Playfair, weiß, groß):**
`"Bereit für eine Website,`
`die wirklich arbeitet?"`

**Subtext (weiß/80):**
`"Kostenloses Erstgespräch — wir analysieren deine aktuelle Situation und zeigen dir, was möglich ist."`

**CTA:** `"Jetzt Gespräch buchen →"` (weiß filled, dunkler Text)

---

## Implementierungs-Reihenfolge

1. `WebdesignMockup.tsx` erstellen (Browser-Frame-Mockup für Hero)
2. Nano Banana: 3 Portfolio-Bilder generieren
3. `page.tsx` für `/webdesign` implementieren (alle Sections)
4. Testen: Mobile, PageSpeed, Links

---

## Bild-Entscheidungen: Nano Banana vs. Image Generator

| Bild | Tool | Begründung |
|------|------|------------|
| portfolio-ecommerce.jpg | **Nano Banana** | Photorealistisches Laptop-Mockup, hohe Detailtiefe nötig |
| portfolio-b2b.jpg | **Nano Banana** | MacBook-Render, präzise Licht- und Materialqualität |
| portfolio-local.jpg | **Nano Banana** | Zwei-Device-Mockup, Komposition komplex |
| Hero Background Texture | **CSS** | radial-gradient, kein Bild |
| Tech-Stack Logos | **SVG inline** | Existieren als SVGs |
| Section Icons/Illustrations | **SVG inline** | Bestehende Muster aus dem Projekt |

**→ Fazit: 3 Bilder via Nano Banana, alle anderen via CSS oder SVG**
