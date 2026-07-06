import Link from "next/link";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRANCHEN-DATEN — 6 Branchen, ein gemeinsames Detail-Template.
   Content nahezu wortgetreu aus dem Branchen-Briefing; je Branche genau
   EIN interner Pflicht-Link im zweiten WARUM-Absatz.
═══════════════════════════════════════════════════════════════════════════ */

/* Layout-Varianten: gleiches Design-System, je Branche eigener Section-Mix */
export type HeroVariant = "split" | "zentriert" | "suchfeld";
export type HebelVariant = "grid" | "editorial" | "stack";

/* Daten für das branchenspezifische Signature-Mockup (statisches Beispiel-Panel) */
export type Signature =
  | {
      variant: "serp";
      panelTitle: string;
      query: string;
      mapsRows: { name: string; eigene?: boolean }[];
    }
  | {
      variant: "klickpreise";
      panelTitle: string;
      hinweis: string;
      rows: { gebiet: string; breite: number; wert: string }[];
      fazit: string;
      fazitWert: string;
    }
  | {
      variant: "strukturbaum";
      panelTitle: string;
      rows: { pfad: string; tiefe: 0 | 1 | 2; status: "INDEX" | "NOINDEX" | "CANONICAL" }[];
      fussnote: string;
    }
  | {
      variant: "businessprofil";
      panelTitle: string;
      betrieb: string;
      bewertung: string;
      anzahl: string;
      kategorie: string;
      ort: string;
      status: string;
      chips: string[];
    }
  | {
      variant: "funnel";
      panelTitle: string;
      stufen: { query: string; satz: string; highlight?: boolean }[];
    }
  | {
      variant: "kichat";
      panelTitle: string;
      frage: string;
      marke: string;
      quellen: string;
    };

export type Branche = {
  slug: string;
  name: string;
  kurzName: string;
  keyword: string;
  heroVariant: HeroVariant;
  hebelVariant: HebelVariant;
  /** Beispiel-Query für die Suchfeld-Zeile im „suchfeld“-Hero */
  heroQuery?: string;
  h1: { pre: string; grad: string; post?: string };
  subline: string;
  ctaLabel: string;
  warumTitle: { pre: string; grad: string };
  warumAbsaetze: ReactNode[];
  /** Signature-Modul: bei heroVariant "split" im Hero, sonst eigene Section nach WARUM */
  signature: Signature;
  /** H2 der eigenständigen Signature-Section (entfällt bei heroVariant "split") */
  signatureTitle?: { pre: string; grad: string };
  /** Zwei kurze Begleitsätze der Signature-Section (entfällt bei heroVariant "split") */
  signatureCopy?: string[];
  hebel: { titel: string; text: string }[];
  faq: { q: string; a: string }[];
  ctaSatz: { pre: string; grad: string };
  ctaButtonLabel: string;
  icon: ReactNode;
  accent: string;
};

const linkCls = "text-primary font-semibold hover:underline";

/* Inline-SVG im Stroke-Stil der Navbar-Icons (24×24, strokeWidth 1.8) */
const brancheIcon = (paths: ReactNode) => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);

export const branchen: Branche[] = [
  /* ── 01 · Ärzte ────────────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-aerzte",
    name: "SEO für Ärzte",
    kurzName: "Ärzte",
    keyword: "SEO für Ärzte",
    heroVariant: "zentriert",
    hebelVariant: "editorial",
    signature: {
      variant: "serp",
      panelTitle: "Lokale Suche",
      query: "zahnarzt köln ehrenfeld",
      mapsRows: [
        { name: "Zahnarztpraxis Dr. Mustermann", eigene: true },
        { name: "Zahnzentrum am Beispielring" },
        { name: "Praxis Dr. Beispielmann" },
      ],
    },
    signatureTitle: { pre: "Das Ziel: Ihre Praxis ", grad: "im lokalen Suchergebnis." },
    signatureCopy: [
      "Bei lokalen Behandlungssuchen entscheidet der Kartenausschnitt mit den ersten drei Einträgen, welche Praxen ein Patient überhaupt wahrnimmt.",
      "Wir richten Unternehmensprofil, Bewertungssignale und Behandlungsseiten so aus, dass Ihre Praxis dort mit der eigenen Website vertreten ist — nicht nur über Portalprofile.",
    ],
    h1: {
      pre: "SEO für Ärzte: Sichtbar sein, wenn Patienten ",
      grad: "nach Symptomen und Behandlungen suchen",
    },
    subline:
      "Patienten googeln „Zahnarzt Implantat Kosten“ oder „Hautarzt Akne Berlin“ — nicht Ihren Praxisnamen. Wir sorgen dafür, dass Ihre Praxis in Google und in KI-Suchen wie ChatGPT bei genau diesen Anfragen erscheint.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihre Praxis anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für Ärzte" },
    warumAbsaetze: [
      <>
        Wer einen Arzttermin braucht, öffnet zuerst Google und tippt ein Symptom, eine Behandlung oder eine
        Fachrichtung ein, meist kombiniert mit dem Ort: „Kieferorthopäde Kosten Kinder Köln“, „Krampfadern OP
        ambulant Hamburg“. Kaum jemand sucht direkt nach dem Namen einer Praxis, die er noch nicht kennt. Genau
        bei diesen Suchanfragen entscheidet sich, ob ein neuer Patient überhaupt von Ihrer Praxis erfährt. Auf
        den ersten Ergebnisseiten stehen jedoch meistens Jameda, Doctolib oder große Portale, nicht die eigene
        Praxis-Website. Ohne gezielte SEO-Arbeit gehen Praxen in diesem Wettbewerb um Sichtbarkeit fast
        automatisch unter.
      </>,
      <>
        Bleibt die eigene Website unsichtbar, hängt die gesamte Neupatienten-Gewinnung von Portalprofilen ab,
        deren Darstellung, Bewertungssystem und Ranking-Logik Sie nicht kontrollieren. Gleichzeitig bewertet
        Google medizinische Inhalte besonders streng als YMYL-Thema („Your Money or Your Life“) und verlangt
        klare Nachweise fachlicher Kompetenz und Vertrauenswürdigkeit. Eine statische Website mit nur einer
        Leistungsseite reicht dafür in der Regel nicht aus. Wer heute volle Terminbücher hat, merkt das
        Sichtbarkeitsproblem oft erst, wenn Stammpatienten wegziehen oder in Rente gehen und der Nachschub
        ausbleibt. Deshalb verstehen wir SEO für Praxen nicht als einmaliges Projekt, sondern als{" "}
        <Link href="/seo/betreuung" className={linkCls}>laufende SEO-Betreuung</Link>, die mit neuen
        Suchtrends, Google-Updates und KI-Suchmaschinen mitwächst.
      </>,
    ],
    hebel: [
      {
        titel: "Behandlungsseiten statt Sammelseite",
        text: "Für jede Behandlung, jedes Symptom und jede Fachrichtung entsteht eine eigene Seite, die konkrete Suchanfragen wie „Wurzelbehandlung Ablauf“ oder „Rotlichttherapie Rücken“ beantwortet. Das erhöht die Trefferquote bei spezifischen Patientenfragen deutlich gegenüber einer einzigen allgemeinen Leistungsseite.",
      },
      {
        titel: "Google Business Profil",
        text: "Ihr Google-Unternehmensprofil, konsistente Adress- und Kontaktdaten sowie strukturierte Bewertungsprozesse entscheiden bei „Arzt in meiner Nähe“-Suchen mit. Wir richten diese Signale so aus, dass Ihre Praxis in der lokalen Suche und auf Google Maps zuverlässig auftaucht.",
      },
      {
        titel: "Vertrauenssignale für YMYL",
        text: "Qualifikationen, Werdegang und fachliche Autorität der Ärzte werden strukturiert auf der Website sichtbar gemacht, ergänzt durch technisches Markup wie Physician- oder MedicalOrganization-Schema. Das stärkt genau die E-E-A-T-Signale, die Google bei medizinischen Themen verlangt.",
      },
      {
        titel: "Unabhängigkeit von Portalen",
        text: "Wir bauen die Domain-Autorität Ihrer eigenen Praxis-Website auf, damit Sie bei Symptom- und Behandlungssuchen unabhängig von Jameda oder Doctolib gefunden werden. Das reduziert langfristig die Abhängigkeit von kostenpflichtigen Portal-Premiumprofilen.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis unsere Praxis bei Google besser sichtbar ist?",
        a: "Technische Anpassungen und das Google Business Profil zeigen oft innerhalb weniger Wochen erste Wirkung. Inhaltliche Themen- und Vertrauensarbeit für YMYL-Bereiche baut sich über mehrere Monate auf. Seriöse Prognosen für exakte Rankings gibt es nicht — wir arbeiten mit Google Search Console und Semrush an messbaren Zwischenzielen statt Versprechen.",
      },
      {
        q: "Lohnt sich SEO neben einem Jameda-Premiumprofil überhaupt?",
        a: "Jameda-Premium ist eine laufende Miete für Sichtbarkeit auf fremdem Terrain. Eine wachsende eigene Website ist ein Vermögenswert, der Ihnen gehört und über Jahre Reichweite aufbaut. Beides kann parallel laufen — SEO reduziert aber schrittweise die Abhängigkeit vom Portal.",
      },
      {
        q: "Bieten Sie auch Google Ads für Praxen an?",
        a: "Unser Kerngeschäft ist organische Sichtbarkeit in Google und in KI-Suchen. Ads bringen sofortige, aber kostenpflichtige Reichweite ohne bleibenden Wert nach Kampagnenende. Wir beraten Sie ehrlich dazu, wann Ads sinnvoll ergänzen und wann SEO allein die bessere Investition ist.",
      },
    ],
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Patienten Sie finden, ",
      grad: "bevor sie überhaupt nach Ihrem Praxisnamen suchen.",
    },
    ctaButtonLabel: "Praxis-Sichtbarkeit jetzt analysieren lassen",
    icon: brancheIcon(
      <>
        <path d="M11 3v2" />
        <path d="M5 3v2" />
        <path d="M5 4H4a2 2 0 0 0-2 2v3.5a6 6 0 0 0 12 0V6a2 2 0 0 0-2-2h-1" />
        <path d="M8 15.5a6 6 0 0 0 12 0V12" />
        <circle cx="20" cy="10" r="2" />
      </>
    ),
    accent: "Patienten suchen Symptome und Behandlungen — Ihre Praxis erscheint bei genau diesen Anfragen.",
  },

  /* ── 02 · Anwälte ──────────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-anwaelte",
    name: "SEO für Anwälte",
    kurzName: "Anwälte",
    keyword: "SEO für Anwälte",
    heroVariant: "split",
    hebelVariant: "grid",
    signature: {
      variant: "klickpreise",
      panelTitle: "Klickkosten je Rechtsgebiet",
      hinweis: "Google Ads — Klickpreis-Niveau, illustrativ",
      rows: [
        { gebiet: "Verkehrsrecht", breite: 92, wert: "€€€€" },
        { gebiet: "Familienrecht", breite: 76, wert: "€€€" },
        { gebiet: "Arbeitsrecht", breite: 62, wert: "€€€" },
        { gebiet: "Mietrecht", breite: 48, wert: "€€" },
      ],
      fazit: "Organisches Ranking",
      fazitWert: "0 € pro Klick",
    },
    h1: {
      pre: "SEO für Anwälte: Mandanten finden Sie über ihr Problem, ",
      grad: "nicht über den Paragrafen",
    },
    subline:
      "Mandanten googeln „Kündigung Abfindung Chancen“ oder „Scheidung Kosten Anwalt“, nie einen Gesetzesparagrafen. Wir bauen Ihre Kanzlei-Sichtbarkeit dort auf, wo Google Ads pro Klick am teuersten sind und organische Rankings am meisten wert sind.",
    ctaLabel: "Kanzlei-Sichtbarkeit kostenlos prüfen lassen",
    warumTitle: { pre: "Warum SEO ", grad: "für Anwälte" },
    warumAbsaetze: [
      <>
        Kaum ein Markt hat so hohe Cost-per-Click-Preise bei Google Ads wie der Kanzleimarkt — bei Fachgebieten
        wie Verkehrsrecht, Mietrecht oder Familienrecht kosten einzelne Klicks schnell zweistellige
        Euro-Beträge, ohne dass daraus ein Mandat wird. Mandanten formulieren ihre Suche zudem selten
        juristisch: Sie googeln „Fristlose Kündigung Wohnung was tun“ statt „§ 543 BGB“, „Abfindung Höhe
        berechnen“ statt „Kündigungsschutzklage“. Wer als Kanzlei nur seine Rechtsgebiete auf einer Seite
        auflistet, trifft diese Suchanfragen nicht. Ratgeber-Inhalte, die typische Laienfragen beantworten,
        entscheiden hier über Sichtbarkeit — nicht die juristische Fachsprache aus dem Aktenschrank.
      </>,
      <>
        Ohne aufgebaute organische Sichtbarkeit bleibt einer Kanzlei fast nur der Weg über teure Ads oder
        Anwaltsportale, bei denen mehrere Wettbewerber auf derselben Seite um denselben Mandanten werben. Jede
        Rechtsgebiets-Seite konkurriert zudem gegen etablierte Ratgeberportale und andere Kanzleien, die längst
        mit Content arbeiten. Deshalb setzen wir bei Kanzleien konsequent auf eine{" "}
        <Link href="/seo/content-strategie" className={linkCls}>Content-Strategie</Link>, die Mandantenfragen
        entlang des gesamten Rechtsfalls beantwortet — von der ersten Unsicherheit bis zur Entscheidung für
        eine Kanzlei. So sinkt die Abhängigkeit von Klickpreisen, die in umkämpften Rechtsgebieten jedes Jahr
        weiter steigen.
      </>,
    ],
    hebel: [
      {
        titel: "Ratgeber-Content nach Mandantenfrage",
        text: "Statt einer Seite pro Rechtsgebiet entstehen Inhalte zu konkreten Laienfragen wie „Abmahnung erhalten was tun“ oder „Erbe ausschlagen Frist“. Diese Seiten holen Mandanten in dem Moment ab, in dem das Problem entsteht, nicht erst bei der Anwaltssuche.",
      },
      {
        titel: "Starke Fachgebiets-Seiten",
        text: "Jedes Rechtsgebiet erhält eine eigene, tiefgehende Seite mit Zuständigkeiten, typischem Ablauf und Kostenrahmen, statt einer kurzen Aufzählung. Das verbessert die Relevanz für Suchanfragen mit klarer Rechtsgebiets-Absicht deutlich.",
      },
      {
        titel: "Lokale und überregionale Sichtbarkeit",
        text: "Manche Mandate sind ortsgebunden, etwa Familienrecht oder Mietrecht, andere sind überregional möglich, etwa IT-Recht oder Gesellschaftsrecht. Wir stimmen die SEO-Struktur je Fachgebiet darauf ab, statt alle Rechtsgebiete gleich zu behandeln.",
      },
      {
        titel: "Datenbasierte Konkurrenzanalyse",
        text: "Mit Ahrefs und Semrush prüfen wir, für welche Begriffe konkurrierende Kanzleien und Ratgeberportale tatsächlich ranken und wo Lücken entstehen. Das verhindert, dass Budget in aussichtslos umkämpfte Begriffe fließt.",
      },
    ],
    faq: [
      {
        q: "Wie schnell zeigt SEO für eine Kanzlei erste Ergebnisse?",
        a: "Strukturelle und technische Anpassungen setzen wir über unsere CI/CD-Umgebung innerhalb von Minuten live, sichtbare Verbesserungen bei Rankings brauchen aber je nach Rechtsgebiet mehrere Monate. Stark umkämpfte Gebiete wie Verkehrsrecht dauern länger als Nischenfelder. Wir berichten Zwischenstände über Search Console und Semrush statt pauschale Versprechen zu machen.",
      },
      {
        q: "Was kostet SEO im Vergleich zu Google Ads für Anwälte?",
        a: "Ads kosten pro Klick sofort und dauerhaft, ohne dass danach etwas bleibt. SEO ist eine Investition in Inhalte und Struktur, die über Jahre weiter Anfragen bringt, auch wenn kein Cent Klickbudget mehr fließt. Der konkrete Aufwand hängt von Rechtsgebiet und Wettbewerb ab und wird individuell kalkuliert.",
      },
      {
        q: "Warum reicht ein Eintrag auf Anwalt.de oder anwaltauskunft.de nicht aus?",
        a: "Auf Portalen stehen Sie direkt neben Wettbewerbern derselben Fachrichtung auf einer Seite, die Sie nicht gestalten. Eine eigene, gut auffindbare Kanzlei-Website zeigt Ihre Positionierung ungestört und baut echte Reichweite auf, die dem Portal nicht gehört, sondern Ihnen.",
      },
    ],
    ctaSatz: {
      pre: "Lassen Sie uns prüfen, für welche Mandantenfragen ",
      grad: "Ihre Kanzlei heute unsichtbar ist.",
    },
    ctaButtonLabel: "Kostenlose Sichtbarkeitsanalyse anfragen",
    icon: brancheIcon(
      <>
        <path d="M12 3.5v17" />
        <path d="M7.5 20.5h9" />
        <path d="M3.5 7h1.8c2 0 4.6-.9 6.7-1.9 2.1 1 4.7 1.9 6.7 1.9h1.8" />
        <path d="m4.8 9.5-2.3 6a4.3 4.3 0 0 0 5.4 0l-2.3-6Z" />
        <path d="m18.4 9.5-2.3 6a4.3 4.3 0 0 0 5.4 0l-2.3-6Z" />
      </>
    ),
    accent: "Mandanten suchen ihr Problem, nicht den Paragrafen — sichtbar, wo Klicks am teuersten sind.",
  },

  /* ── 03 · Online-Shops ─────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-online-shops",
    name: "SEO für Online-Shops",
    kurzName: "Online-Shops",
    keyword: "SEO für Online-Shops",
    heroVariant: "suchfeld",
    hebelVariant: "stack",
    heroQuery: "laufschuhe damen neutral größe 39",
    signature: {
      variant: "strukturbaum",
      panelTitle: "Indexierung im Shop",
      rows: [
        { pfad: "/laufschuhe", tiefe: 0, status: "INDEX" },
        { pfad: "/laufschuhe/damen", tiefe: 1, status: "INDEX" },
        { pfad: "?farbe=blau&groesse=39", tiefe: 2, status: "CANONICAL" },
        { pfad: "?sort=preis-aufsteigend", tiefe: 2, status: "NOINDEX" },
        { pfad: "/laufschuhe/herren", tiefe: 1, status: "INDEX" },
        { pfad: "?farbe=schwarz", tiefe: 2, status: "CANONICAL" },
      ],
      fussnote: "Crawling-Budget fließt in Kategorien — nicht in Filter-Varianten",
    },
    signatureTitle: { pre: "Eine Shop-Struktur, ", grad: "die Google versteht." },
    signatureCopy: [
      "Jede Filter- und Sortierkombination kann eine eigene URL erzeugen — für Google sind das konkurrierende Kopien derselben Kategorie.",
      "Die Tafel zeigt das Prinzip der Bereinigung: Kategorieseiten bleiben im Index, Parameter-Varianten werden per Canonical gebündelt oder gezielt ausgeschlossen.",
    ],
    h1: {
      pre: "SEO für Online-Shops: Kategorieseiten, die verkaufen, ",
      grad: "statt nur Ads, die kosten",
    },
    subline:
      "Jeder Klick auf Google Ads oder Amazon kostet Marge — jede organische Position bei einer Kategorie- oder Produktseite bringt Anfragen ohne laufende Klickkosten. Wir bringen Struktur in Ihren Shop, damit Google ihn versteht und Kunden das passende Produkt finden.",
    ctaLabel: "Shop kostenlos auf SEO-Potenzial prüfen lassen",
    warumTitle: { pre: "Warum SEO ", grad: "für Online-Shops" },
    warumAbsaetze: [
      <>
        Kunden suchen in zwei sehr unterschiedlichen Modi: breit nach einer Produktkategorie („Laufschuhe
        Damen“) oder gezielt nach einem konkreten Artikel mit Merkmalen („Laufschuhe Damen Neutral Größe 39“).
        Kategorie- und Produktseiten müssen deshalb unterschiedlich aufgebaut sein und unterschiedliche
        Suchintentionen bedienen, was in vielen Shopsystemen von Haus aus nicht sauber getrennt ist. Filter-
        und Sortierfunktionen erzeugen zudem oft Hunderte technisch fast identischer URLs, die Google als
        Duplicate Content einstuft und im schlimmsten Fall gar nicht mehr crawlt. Ohne bereinigte
        Seitenstruktur verpufft ein großer Teil des Sortiments für die organische Suche komplett.
      </>,
      <>
        Parallel dominiert Amazon bei vielen Produktsuchen die ersten Ergebnisse, und Werbebudget auf Google
        oder Meta frisst bei knappen Handelsmargen einen wachsenden Anteil des Umsatzes. Ein Shop, der
        ausschließlich über bezahlten Traffic wächst, bleibt bei jeder Anzeigenpreis-Erhöhung verwundbar.
        Organische Sichtbarkeit bei Kategorieseiten kostet dagegen keinen Cent pro Klick, sobald sie einmal
        aufgebaut ist. Genau deshalb ist{" "}
        <Link href="/seo/shop" className={linkCls}>Shop-SEO</Link> bei uns kein Zusatzmodul, sondern eine
        eigene Disziplin mit Fokus auf technische Sauberkeit, Kategoriestruktur und Produktdaten.
      </>,
    ],
    hebel: [
      {
        titel: "Kategorieseiten als Sichtbarkeits-Anker",
        text: "Kategorieseiten erhalten eigenständigen Text, klare interne Verlinkung und eine Struktur, die zur jeweiligen Suchintention passt, statt nur eine Produktliste zu sein. Sie tragen im Ranking meist mehr als einzelne Produktseiten mit geringem Suchvolumen.",
      },
      {
        titel: "Duplicate Content beheben",
        text: "Wir legen fest, welche Filter- und Sortier-URLs indexiert werden dürfen und welche über Canonical-Tags oder Parameter-Handling ausgeschlossen werden. Das lenkt das Crawling-Budget auf die Seiten, die tatsächlich ranken sollen.",
      },
      {
        titel: "Strukturierte Produktdaten",
        text: "Vollständige Produktbeschreibungen, saubere Attribute und Schema-Markup wie Product- und Review-Daten verbessern sowohl die Relevanz für Google als auch die Darstellung mit Sternen und Preis direkt in den Suchergebnissen.",
      },
      {
        titel: "Abgrenzung zu Amazon",
        text: "Wir positionieren Ihren eigenen Shop dort, wo Amazon schwächer ist: bei beratungsintensiven Suchanfragen, Marken-Content und Themen rund ums Produkt. So entsteht Sichtbarkeit, die nicht direkt gegen die Marktplatz-Übermacht antreten muss.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis sich Shop-SEO im Umsatz bemerkbar macht?",
        a: "Technische Korrekturen wie die Bereinigung von Duplicate Content wirken oft innerhalb weniger Wochen auf die Crawling-Effizienz. Rankings für umkämpfte Kategoriebegriffe brauchen mehrere Monate kontinuierlicher Arbeit. Über Search Console und Semrush verfolgen wir Zwischenschritte, statt feste Umsatzzahlen zu versprechen.",
      },
      {
        q: "Was kostet Shop-SEO im Vergleich zum laufenden Ads-Budget?",
        a: "Ads-Budget ist ein Dauerposten, der bei steigenden Klickpreisen die Marge weiter drückt. SEO-Aufwand fließt in Struktur und Inhalte, die auch ohne tägliches Klickbudget weiter Besucher bringen. Der konkrete Umfang hängt von Sortimentsgröße und Wettbewerbsdichte in Ihrer Kategorie ab.",
      },
      {
        q: "Lohnt sich SEO, wenn wir sowieso auch auf Amazon verkaufen?",
        a: "Ja, beide Kanäle bedienen unterschiedliche Kundentypen. Der eigene Shop erlaubt Markenaufbau, höhere Margen ohne Marktplatzgebühr und Kundendaten, die Ihnen gehören. SEO macht diesen Kanal zusätzlich zu Amazon planbar, statt komplett von einer Plattform abhängig zu sein.",
      },
    ],
    ctaSatz: {
      pre: "Zeigen wir Ihnen, welche Kategorieseiten in Ihrem Shop ",
      grad: "das größte ungenutzte Sichtbarkeitspotenzial haben.",
    },
    ctaButtonLabel: "Kostenlosen Shop-Check anfordern",
    icon: brancheIcon(
      <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    ),
    accent: "Kategorie- und Produktseiten, die organisch ranken — statt Marge an Ads abzugeben.",
  },

  /* ── 04 · Handwerker ───────────────────────────────────────────────────── */
  {
    slug: "seo-fuer-handwerker",
    name: "SEO für Handwerker",
    kurzName: "Handwerker",
    keyword: "SEO für Handwerker",
    heroVariant: "suchfeld",
    hebelVariant: "grid",
    heroQuery: "heizung notdienst wochenende",
    signature: {
      variant: "businessprofil",
      panelTitle: "Google Business Profil",
      betrieb: "Mustermann Haustechnik",
      bewertung: "4,9",
      anzahl: "127",
      kategorie: "SHK-Betrieb",
      ort: "Musterstadt",
      status: "Jetzt geöffnet",
      chips: ["Anrufen", "Route", "Website"],
    },
    signatureTitle: { pre: "Das Profil, das Kunden ", grad: "zuerst sehen." },
    signatureCopy: [
      "Bei „in meiner Nähe“-Suchen erscheint Ihr Unternehmensprofil mit Bewertungen, Öffnungszeiten und Route, noch bevor Ihre Website eine Rolle spielt.",
      "Wir pflegen dieses Profil als festen Bestandteil der SEO-Arbeit, damit Anrufe und Routenanfragen direkt bei Ihrem Betrieb ankommen.",
    ],
    h1: {
      pre: "SEO für Handwerker: ",
      grad: "Volle Auftragsbücher von morgen",
      post: " sichern, nicht nur die von heute",
    },
    subline:
      "Wer heute nach einem Elektriker oder Dachdecker sucht, tippt meist „[Gewerk] in meiner Nähe“ oder greift direkt zu MyHammer und Check24. Wir sorgen dafür, dass Ihr eigener Betrieb in Google und auf Google Maps gefunden wird, ohne Provisionen an Vermittlungsportale zahlen zu müssen.",
    ctaLabel: "Kostenlosen Sichtbarkeits-Check für Ihren Betrieb anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für Handwerker" },
    warumAbsaetze: [
      <>
        Handwerkersuche ist fast immer lokal und akut: „Heizung Notdienst Wochenende“, „Dachdecker Sturmschaden
        in der Nähe“, „Elektriker Zählerschrank Kosten“. Wer bei diesen Suchen nicht mit einem gepflegten
        Google Business Profil und einer auffindbaren Website erscheint, überlässt die Anfrage automatisch
        Portalen wie MyHammer oder Check24, die zwischen mehreren Betrieben vermitteln und dafür Gebühren
        verlangen. Diese Portale ranken bei vielen Suchanfragen besser als einzelne Handwerksbetriebe, weil sie
        systematisch an SEO arbeiten — der einzelne Betrieb tut das in der Regel nicht.
      </>,
      <>
        Volle Auftragsbücher fühlen sich heute gut an, sagen aber nichts über die Auslastung in sechs oder
        zwölf Monaten aus. Wer erst dann mit Sichtbarkeitsarbeit beginnt, wenn Anfragen spürbar zurückgehen,
        verliert wertvolle Zeit, denn Rankings bauen sich nicht über Nacht auf. Gleichzeitig fehlt im
        Tagesgeschäft zwischen Baustelle, Notdiensten und Angeboten schlicht die Zeit für Website-Pflege. Genau
        deshalb übernehmen wir die komplette{" "}
        <Link href="/seo/optimierung" className={linkCls}>SEO-Optimierung</Link> für Handwerksbetriebe als
        laufenden Prozess im Hintergrund, während Sie sich auf Ihre Aufträge konzentrieren.
      </>,
    ],
    hebel: [
      {
        titel: "Google Business Profil",
        text: "Aktuelle Öffnungszeiten, Fotos abgeschlossener Arbeiten, Leistungsbeschreibungen und ein strukturierter Umgang mit Bewertungen entscheiden bei „in meiner Nähe“-Suchen mit über Sichtbarkeit auf Google Maps. Wir richten und pflegen dieses Profil kontinuierlich.",
      },
      {
        titel: "Leistungsseiten je Gewerk",
        text: "Statt einer allgemeinen Leistungsseite entstehen einzelne Seiten für Kernleistungen wie Bad-Sanierung, Wärmepumpen-Einbau oder Dachsanierung, kombiniert mit den Orten, in denen Sie tatsächlich tätig sind. Das trifft konkrete lokale Suchanfragen viel genauer.",
      },
      {
        titel: "Weg von Vermittlungsportalen",
        text: "Wir bauen die eigene Website als Sichtbarkeits-Kanal auf, damit Anfragen direkt bei Ihnen landen statt über MyHammer oder Check24 verteilt zu werden, wo Sie mit mehreren Betrieben um denselben Auftrag konkurrieren.",
      },
      {
        titel: "Bewertungen sichtbar machen",
        text: "Abgeschlossene Projekte, Kundenstimmen und Zertifizierungen werden strukturiert auf der Website eingebunden. Das stärkt Vertrauen bei potenziellen Kunden und liefert Google zusätzliche Relevanzsignale für lokale Suchanfragen.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis wir über Google statt über Portale Anfragen bekommen?",
        a: "Das Google Business Profil zeigt oft nach wenigen Wochen erste Wirkung, da es kein klassisches Ranking-Rennen ist. Der Aufbau von Website-Sichtbarkeit für Leistungsseiten braucht mehrere Monate. Änderungen setzen wir technisch über unsere CI/CD-Umgebung innerhalb von Minuten um, das Ranking selbst braucht trotzdem Zeit.",
      },
      {
        q: "Was kostet SEO im Vergleich zu MyHammer- oder Check24-Gebühren?",
        a: "Portale verlangen laufende Provisionen oder Abo-Gebühren pro vermitteltem Kontakt, unabhängig vom Auftragswert. SEO ist eine Investition in die eigene Sichtbarkeit, die keine Provision pro Auftrag kostet. Der Umfang richtet sich nach Gewerk, Einzugsgebiet und Wettbewerb vor Ort.",
      },
      {
        q: "Brauchen wir SEO überhaupt, wenn wir schon bei MyHammer gelistet sind?",
        a: "Ein Portal-Eintrag allein macht Sie von dessen Konditionen und Sichtbarkeitslogik abhängig. Eine eigene, gut auffindbare Website ergänzt das, indem Anfragen direkt und ohne Vermittlungsgebühr bei Ihnen eingehen und Sie sich von anderen gelisteten Betrieben abheben.",
      },
    ],
    ctaSatz: {
      pre: "Sprechen Sie mit uns darüber, wie Ihr Betrieb ",
      grad: "auch ohne Portal-Umweg gefunden wird.",
    },
    ctaButtonLabel: "Jetzt Sichtbarkeit prüfen lassen",
    icon: brancheIcon(
      <path d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
    ),
    accent: "Gefunden in Google und auf Google Maps — ohne Provisionen an Vermittlungsportale.",
  },

  /* ── 05 · Immobilienmakler ─────────────────────────────────────────────── */
  {
    slug: "seo-fuer-immobilienmakler",
    name: "SEO für Immobilienmakler",
    kurzName: "Immobilienmakler",
    keyword: "SEO für Immobilienmakler",
    heroVariant: "zentriert",
    hebelVariant: "stack",
    signature: {
      variant: "funnel",
      panelTitle: "Eigentümer-Suchen",
      stufen: [
        {
          query: "was ist meine wohnung wert",
          satz: "Der erste Impuls — lange bevor ein Makler oder ein Portal eine Rolle spielt.",
        },
        {
          query: "immobilie verkaufen ablauf",
          satz: "Die konkrete Planung: Eigentümer vergleichen jetzt Wege mit und ohne Makler.",
        },
        {
          query: "makler [stadt]",
          satz: "Hier gewinnt Ihre Website — nicht das Portal.",
          highlight: true,
        },
      ],
    },
    signatureTitle: { pre: "Drei Suchen — ", grad: "alle vor dem Portal." },
    signatureCopy: [
      "Vom ersten Wertgefühl bis zur Maklerwahl arbeiten sich Eigentümer über mehrere Suchanfragen an die Verkaufsentscheidung heran.",
      "Wer jede dieser Suchen mit eigenen Inhalten besetzt, führt das Erstgespräch, bevor das Objekt auf einem Portal erscheint — genau dort setzen wir an.",
    ],
    h1: {
      pre: "SEO für Immobilienmakler: Eigentümer finden, ",
      grad: "bevor sie beim Portal landen",
    },
    subline:
      "Verkaufswillige Eigentümer googeln zuerst „Was ist meine Immobilie wert“, nicht den Namen eines Maklerbüros. Wir sorgen dafür, dass genau diese Eigentümer-Anfragen bei Ihnen ankommen, nicht nur bei ImmoScout24.",
    ctaLabel: "Kostenlose SEO-Analyse für Ihr Maklerbüro anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für Immobilienmakler" },
    warumAbsaetze: [
      <>
        Bei Immobiliensuchen dominieren Portale wie ImmoScout24 oder Immowelt die Suchergebnisse fast
        vollständig, sobald jemand nach einem konkreten Objekt sucht. Die wirklich wertvolle Suchanfrage liegt
        aber woanders: Eigentümer, die über einen Verkauf nachdenken, googeln „Immobilie verkaufen ohne Makler“
        oder „Was ist meine Wohnung wert“, lange bevor sie ein Exposé einstellen. Wer bei diesen Anfragen
        sichtbar ist, bekommt Eigentümer-Leads, die deutlich seltener und wertvoller sind als reine
        Interessenten-Anfragen auf ein bereits eingestelltes Objekt. Genau hier entscheidet SEO, nicht die
        Portal-Präsenz.
      </>,
      <>
        Objektseiten veralten zudem automatisch, sobald eine Immobilie verkauft ist, und hinterlassen tote
        Links oder inhaltsleere Seiten, wenn niemand sie pflegt. Ohne aufgebaute lokale Autorität rund um Ihr
        Vertriebsgebiet bleibt einem Maklerbüro nur, auf Portalen mitzubieten und für Premium-Platzierungen zu
        zahlen, während der eigentliche Erstkontakt zum Eigentümer meist schon vorher stattgefunden hat.
        Deshalb setzen wir bei Maklern gezielt auf{" "}
        <Link href="/seo/beratung" className={linkCls}>SEO-Beratung</Link>, die Eigentümer-Suchanfragen, lokale
        Marktkompetenz und eine saubere Objektseiten-Struktur zusammenbringt.
      </>,
    ],
    hebel: [
      {
        titel: "Eigentümer-Content als Lead-Quelle",
        text: "Seiten zu Themen wie Immobilienbewertung, Verkaufsablauf oder Erbimmobilie verkaufen sprechen gezielt Eigentümer statt Käufer an. Diese Suchanfragen haben geringeren Wettbewerbsdruck durch Portale und deutlich höheren Wert pro Anfrage.",
      },
      {
        titel: "Lokale Marktautorität aufbauen",
        text: "Inhalte zu Stadtteilen, Preisentwicklungen und lokalen Besonderheiten positionieren Ihr Büro als Marktkenner vor Ort. Das stärkt sowohl Google-Rankings als auch das Vertrauen von Eigentümern, die einen ortskundigen Makler suchen.",
      },
      {
        titel: "Objektseiten technisch pflegen",
        text: "Verkaufte oder vermietete Objekte werden strukturiert umgeleitet oder archiviert statt als tote Seiten stehen zu bleiben. Das verhindert Qualitätsverluste im Google-Index durch veraltete oder leere Inhalte.",
      },
      {
        titel: "Google Business Profil",
        text: "Ein gepflegtes Profil je Standort, konsistente Kontaktdaten und lokale Verlinkung verbessern die Sichtbarkeit bei „Makler in meiner Nähe“-Suchen, unabhängig von der Portal-Präsenz.",
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis wir eigene Eigentümer-Leads über Google bekommen?",
        a: "Lokale Signale wie das Google Business Profil wirken oft innerhalb weniger Wochen. Content zu Eigentümerthemen wie Immobilienbewertung braucht mehrere Monate, um gegen etablierte Portale und Ratgeberseiten zu ranken. Zwischenstände verfolgen wir über Search Console und Semrush.",
      },
      {
        q: "Was kostet SEO im Vergleich zu Premium-Platzierungen auf ImmoScout24?",
        a: "Premium-Platzierungen sind laufende Ausgaben pro Objekt oder Zeitraum, ohne dass danach etwas bleibt. SEO baut eine eigene Sichtbarkeit auf, die auch zwischen zwei Objekten weiter Eigentümer-Anfragen bringt. Der Aufwand richtet sich nach Vertriebsgebiet und Wettbewerbsdichte.",
      },
      {
        q: "Ersetzt eine eigene Website die Präsenz auf ImmoScout24?",
        a: "Nein, beide ergänzen sich. Das Portal bringt Käufer zu bereits eingestellten Objekten, die eigene Website erreicht Eigentümer, bevor überhaupt ein Objekt existiert. SEO verschafft Ihnen damit einen Kanal, den kein Wettbewerber über dasselbe Portal-Listing erreichen kann.",
      },
    ],
    ctaSatz: {
      pre: "Lassen Sie uns gemeinsam prüfen, ",
      grad: "wie viele Eigentümer-Anfragen Ihnen aktuell entgehen.",
    },
    ctaButtonLabel: "Jetzt Maklerbüro-Sichtbarkeit analysieren",
    icon: brancheIcon(
      <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
    ),
    accent: "Eigentümer-Anfragen erreichen Ihr Büro, bevor sie beim Portal landen.",
  },

  /* ── 06 · SaaS ─────────────────────────────────────────────────────────── */
  {
    slug: "saas-seo",
    name: "SaaS SEO",
    kurzName: "SaaS",
    keyword: "SaaS SEO",
    heroVariant: "split",
    hebelVariant: "editorial",
    signature: {
      variant: "kichat",
      panelTitle: "KI-Suche",
      frage: "Welches Tool für automatische Rechnungsbuchung, DSGVO-konform?",
      marke: "ihre-software.de",
      quellen: "Quellen: 3 Vergleichsseiten",
    },
    h1: {
      pre: "SaaS SEO: Sichtbar sein, ",
      grad: "wenn ChatGPT und Google Ihre Software empfehlen",
    },
    subline:
      "B2B-Einkäufer vergleichen Software heute über Google-Suchen wie „[Tool] Alternative“ und fragen zunehmend direkt ChatGPT oder Perplexity nach einer Empfehlung. Wir bauen Sichtbarkeit auf, die in beiden Suchwelten funktioniert.",
    ctaLabel: "Kostenlose GEO- und SEO-Analyse für Ihr SaaS anfragen",
    warumTitle: { pre: "Warum SEO ", grad: "für SaaS" },
    warumAbsaetze: [
      <>
        Deutsche B2B-Software-Nischen haben oft ein kleines Suchvolumen, aber Nutzer mit hoher Kaufkraft und
        klarer Kaufabsicht — wer „[Kategorie] Software DSGVO-konform“ oder „[Tool A] vs [Tool B]“ sucht, steht
        kurz vor einer Kaufentscheidung, nicht am Anfang einer allgemeinen Recherche. Gleichzeitig suchen viele
        Einkäufer eher nach ihrem Problem als nach einer Produktkategorie: „Rechnungen automatisch buchen“
        statt „Buchhaltungssoftware Feature XY“. Wer nur Feature-Listen und Produktseiten hat, verpasst genau
        diese Problem-Suchen, obwohl sie oft mehr Volumen bringen als reine Markenbegriffe.
      </>,
      <>
        Vergleichs- und Alternative-Seiten entscheiden bei Software-Käufen zunehmend über die Vorauswahl, und
        wer hier keine eigene, ehrliche Seite hat, überlässt diese Kaufphase vollständig Bewertungsportalen
        oder der Konkurrenz. Gegen VC-finanzierte Wettbewerber mit großen Content-Teams hilft dabei kein
        einzelner Blogartikel, sondern ein aufgebauter Content-Moat aus Problem-, Vergleichs- und
        Anwendungsfall-Seiten. Parallel verändert sich gerade, wie Software überhaupt gefunden wird: Immer mehr
        Einkäufer fragen ChatGPT oder Perplexity direkt nach einer Tool-Empfehlung, statt zehn Tabs mit
        Google-Ergebnissen zu öffnen. Genau darauf zielt unsere{" "}
        <Link href="/geo/optimierung" className={linkCls}>GEO-Optimierung</Link> — Inhalte so aufzubauen, dass
        KI-Systeme Ihre Software überhaupt als Antwort kennen und nennen.
      </>,
    ],
    hebel: [
      {
        titel: "Problem- statt Feature-Seiten",
        text: "Inhalte orientieren sich an konkreten Aufgaben Ihrer Zielgruppe statt an internen Feature-Namen. Das trifft Suchanfragen, die potenzielle Kunden tatsächlich eingeben, lange bevor sie Ihren Produktnamen kennen.",
      },
      {
        titel: "Vergleichs- und Alternative-Seiten",
        text: "Eigene, faire Vergleichsseiten zu direkten Wettbewerbern und „Alternative zu“-Seiten besetzen genau die Suchphase kurz vor der Kaufentscheidung. Ohne eigene Version dieser Seiten übernehmen das Bewertungsportale oder Wettbewerber.",
      },
      {
        titel: "Content-Moat gegen Konkurrenz",
        text: "Statt einzelner Artikel bauen wir zusammenhängende Themencluster auf, die ein Suchfeld strukturell besetzen. Das ist schwerer zu kopieren als einzelne Blogbeiträge und schwerer mit reinem Ads-Budget zu verdrängen.",
      },
      {
        titel: "KI-Sichtbarkeit durch GEO",
        text: "Wir strukturieren Inhalte so, dass KI-Suchsysteme sie als Quelle für Empfehlungen nutzen können, etwa durch klare Fakten, Vergleichsstrukturen und eindeutige Aussagen statt vager Marketingtexte. Das wirkt zusätzlich zu klassischen Google-Rankings.",
      },
    ],
    faq: [
      {
        q: "Lohnt sich SEO bei so kleinem Suchvolumen in unserer Nische?",
        a: "Ja, gerade bei B2B-Software zählt weniger die Suchmenge als die Kaufkraft und Kaufnähe der Suchenden. Wenige, aber hochrelevante Anfragen mit klarer Kaufabsicht bringen oft mehr Umsatz als große Volumina im Consumer-Bereich. Wir priorisieren deshalb gezielt nach Abschlusswahrscheinlichkeit statt nach reinem Suchvolumen.",
      },
      {
        q: "Was ist der Unterschied zwischen klassischem SEO und GEO für uns?",
        a: "SEO sorgt für Sichtbarkeit in klassischen Google-Ergebnissen, GEO dafür, dass KI-Systeme wie ChatGPT oder Perplexity Ihre Software überhaupt kennen und als Antwort nennen. Beide Disziplinen nutzen teils dieselben Inhalte, brauchen aber unterschiedliche Struktur und Aufbereitung, die wir aus einer Hand umsetzen.",
      },
      {
        q: "Wie schnell können wir mit Vergleichsseiten gegen größere Wettbewerber bestehen?",
        a: "Einzelne Seiten können über unsere CI/CD-Umgebung innerhalb von Minuten live gehen, Rankings gegen etablierte, gut verlinkte Wettbewerber brauchen aber kontinuierliche Arbeit über mehrere Monate. Mit Ahrefs und Semrush identifizieren wir Lücken, die auch mit kleinerem Content-Team realistisch zu besetzen sind.",
      },
    ],
    ctaSatz: {
      pre: "Lassen Sie uns gemeinsam prüfen, ob Ihre Software heute ",
      grad: "in ChatGPT-Antworten und Google-Rankings überhaupt vorkommt.",
    },
    ctaButtonLabel: "Jetzt GEO-Potenzial analysieren",
    icon: brancheIcon(
      <path d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    ),
    accent: "Sichtbarkeit, die in Google-Rankings und in KI-Empfehlungen zugleich funktioniert.",
  },
];
