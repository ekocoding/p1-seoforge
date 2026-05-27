import type { Article } from './types'

export const articles: Article[] = [
  {
    slug: 'orphan-pages',
    type: 'glossar',
    thema: 'technical-seo',
    title: 'Was sind Orphan Pages?',
    excerpt: 'Orphan Pages sind Unterseiten, die von keiner anderen internen Seite verlinkt werden — unsichtbar für Crawler, schädlich für das Ranking.',
    readTime: '3 min',
    publishDate: '2026-05-22',
    lastUpdated: '2026-05-22',
    published: true,
    serviceLinks: [
      { label: 'SEO-Audit anfragen', href: '/seo/audit' },
      { label: 'Technisches SEO', href: '/wissen/technical-seo' },
    ],
    relatedSlugs: ['crawl-budget', 'log-file-analyse'],
    content: `
<h2 id="definition">Definition: Was ist eine Orphan Page?</h2>
<p>Eine <strong>Orphan Page</strong> (dt. verwaiste Seite) ist eine URL auf deiner Website, die von keiner anderen internen Seite verlinkt wird. Der Begriff kommt aus der Netzwerktheorie: Die Seite hat keine "Eltern" — kein Link führt zu ihr.</p>
<p>Für Suchmaschinen ist das ein Problem: Googlebots folgen beim Crawlen internen Links. Eine Seite ohne eingehende interne Links wird entweder gar nicht gefunden oder nur über die XML-Sitemap entdeckt — was ineffizient ist und das Crawl-Budget belastet.</p>

<h2 id="wie-entstehen-orphan-pages">Wie entstehen Orphan Pages?</h2>
<p>Orphan Pages entstehen meist unbeabsichtigt:</p>
<ul>
<li>Alte Seiten, deren interne Links beim Relaunch entfernt wurden</li>
<li>Landing Pages, die für Ads erstellt, aber nie intern verlinkt wurden</li>
<li>Seiten, die aus dem Navigationsmenü gelöscht, aber nicht deindexiert wurden</li>
<li>Automatisch generierte URLs (z. B. durch Filter oder Pagination)</li>
</ul>

<h2 id="auswirkungen-seo">Auswirkungen auf SEO</h2>
<p>Verwaiste Seiten haben drei direkte Nachteile:</p>
<ul>
<li><strong>Kein Link Juice:</strong> Ohne interne Links erhält die Seite keine Linkstärke aus dem restlichen Linkgraph der Website.</li>
<li><strong>Crawling-Probleme:</strong> Googlebot findet die Seite möglicherweise nicht oder crawlt sie seltener.</li>
<li><strong>Crawl-Budget-Verschwendung:</strong> Wenn verwaiste Seiten gecrawlt werden, verbrauchen sie Budget, das wichtigere Seiten benötigen würden.</li>
</ul>

<h2 id="orphan-pages-finden">Orphan Pages finden</h2>
<p>Orphan Pages lassen sich mit Tools wie Screaming Frog, Ahrefs Site Audit oder der Google Search Console identifizieren. Der Prozess:</p>
<ol>
<li>Alle gecrawlten URLs der Website exportieren</li>
<li>Alle URLs aus der XML-Sitemap exportieren</li>
<li>Die Differenz bilden: URLs in der Sitemap, aber nicht gecrawlt = potenzielle Orphans</li>
</ol>

<h2 id="loesungen">Lösung: Was tun mit Orphan Pages?</h2>
<p>Je nach Seite gibt es drei Optionen:</p>
<ul>
<li><strong>Intern verlinken:</strong> Wenn die Seite wertvoll ist, von relevanten Seiten darauf verlinken.</li>
<li><strong>Noindex setzen:</strong> Wenn die Seite nicht indexiert werden soll (z. B. Danke-Seiten nach Formularen).</li>
<li><strong>Löschen und 301-Weiterleiten:</strong> Wenn die Seite keinen Wert hat und Duplikat-Content riskiert.</li>
</ul>
`
  },
  {
    slug: 'crawl-budget',
    type: 'glossar',
    thema: 'technical-seo',
    title: 'Was ist das Crawl Budget?',
    excerpt: 'Das Crawl Budget bestimmt, wie viele Seiten Googlebot pro Zeitraum crawlt — für große Websites ein entscheidender technischer SEO-Faktor.',
    readTime: '3 min',
    publishDate: '2026-05-23',
    lastUpdated: '2026-05-23',
    published: true,
    serviceLinks: [
      { label: 'SEO-Audit anfragen', href: '/seo/audit' },
      { label: 'Technisches SEO', href: '/wissen/technical-seo' },
    ],
    relatedSlugs: ['orphan-pages', 'log-file-analyse'],
    content: `
<h2 id="definition">Definition: Was ist das Crawl Budget?</h2>
<p>Das <strong>Crawl Budget</strong> bezeichnet die Anzahl der URLs, die Googlebot innerhalb eines bestimmten Zeitraums auf einer Website crawlt. Google selbst hat diesen Begriff geprägt und er setzt sich aus zwei Faktoren zusammen: der <em>Crawl Rate</em> (wie schnell Googlebot crawlen darf, ohne den Server zu überlasten) und der <em>Crawl Demand</em> (wie viel Interesse Google an den Seiten zeigt).</p>

<h2 id="warum-wichtig">Warum ist das Crawl Budget wichtig?</h2>
<p>Für kleine Websites mit wenigen hundert Seiten ist das Crawl Budget meist kein Thema — Googlebot crawlt alle relevanten Seiten problemlos. Kritisch wird es bei:</p>
<ul>
<li>E-Commerce-Shops mit tausenden Produktseiten</li>
<li>Websites mit vielen generierten URLs (Filter, Sorting, Pagination)</li>
<li>Websites nach einem Relaunch mit vielen neuen URLs</li>
<li>Nachrichtenportalen mit hoher Veröffentlichungsfrequenz</li>
</ul>
<p>Wenn das Crawl Budget verschwendet wird, werden wichtige neue oder aktualisierte Seiten möglicherweise nicht rechtzeitig gecrawlt und indexiert.</p>

<h2 id="crawl-budget-verschwenden">Was verschwendet das Crawl Budget?</h2>
<p>Typische Crawl-Budget-Fresser:</p>
<ul>
<li><strong>Facettierte Navigation:</strong> Filter-URLs wie <code>?farbe=rot&amp;groesse=xl</code> können Tausende Duplikate erzeugen</li>
<li><strong>Session-IDs in URLs:</strong> Jede Session erzeugt eine neue URL</li>
<li><strong>Soft-404-Seiten:</strong> Seiten, die inhaltlich leer sind, aber 200 zurückgeben</li>
<li><strong>Unendliche Kalender-Links:</strong> Kalender-Widgets ohne Ende-Datum</li>
<li><strong>Orphan Pages:</strong> Verwaiste Seiten ohne Inhaltswert</li>
</ul>

<h2 id="optimierung">Crawl Budget optimieren</h2>
<p>Die wichtigsten Maßnahmen:</p>
<ol>
<li><strong>Robots.txt nutzen:</strong> Unwichtige URL-Muster vom Crawl ausschließen</li>
<li><strong>Canonical Tags setzen:</strong> Duplikate auf die Hauptversion konsolidieren</li>
<li><strong>Noindex für Nicht-SEO-Seiten:</strong> Danke-Seiten, interne Suchen, Sortierungsseiten</li>
<li><strong>Interne Verlinkung optimieren:</strong> Wichtige Seiten häufiger verlinken</li>
<li><strong>Server-Performance verbessern:</strong> Schnellere Antwortzeiten = mehr Crawls pro Zeiteinheit</li>
</ol>

<h2 id="monitoring">Crawl Budget überwachen</h2>
<p>Die Google Search Console zeigt unter <em>Crawling-Statistiken</em>, wie viele Seiten täglich gecrawlt werden. Eine Log File Analyse gibt noch detailliertere Einblicke, welche URLs Googlebot wie häufig besucht.</p>
`
  },
  {
    slug: 'log-file-analyse',
    type: 'glossar',
    thema: 'technical-seo',
    title: 'Was ist eine Log File Analyse?',
    excerpt: 'Die Log File Analyse wertet Server-Logs aus, um das Crawl-Verhalten von Googlebot zu verstehen — eine der präzisesten Methoden im technischen SEO.',
    readTime: '4 min',
    publishDate: '2026-05-24',
    lastUpdated: '2026-05-24',
    published: true,
    serviceLinks: [
      { label: 'SEO-Audit anfragen', href: '/seo/audit' },
      { label: 'Technisches SEO', href: '/wissen/technical-seo' },
    ],
    relatedSlugs: ['crawl-budget', 'orphan-pages'],
    content: `
<h2 id="definition">Definition: Was ist eine Log File Analyse?</h2>
<p>Eine <strong>Log File Analyse</strong> (auch: Server Log Analyse) wertet die Zugriffsprotokoll-Dateien eines Webservers aus, um zu verstehen, wie Suchmaschinen-Crawler — insbesondere Googlebot — eine Website crawlen. Server-Logs zeichnen jeden HTTP-Request auf: welche URL wurde aufgerufen, welcher User Agent, wann, mit welchem Status-Code.</p>
<p>Im Gegensatz zu Tools wie der Google Search Console zeigen Log Files das <em>tatsächliche</em> Crawl-Verhalten in Echtzeit — ungefiltert und vollständig.</p>

<h2 id="was-steht-in-log-files">Was steht in Server Log Files?</h2>
<p>Ein typischer Log-Eintrag enthält:</p>
<ul>
<li><strong>IP-Adresse:</strong> Wer hat die Anfrage gemacht (z. B. Googlebot-IP)</li>
<li><strong>Timestamp:</strong> Datum und Uhrzeit des Requests</li>
<li><strong>HTTP-Methode und URL:</strong> Welche Seite wurde abgerufen</li>
<li><strong>Status-Code:</strong> 200 (OK), 301 (Redirect), 404 (Not Found), 500 (Server Error)</li>
<li><strong>User Agent:</strong> Welcher Crawler oder Browser hat die Anfrage gestellt</li>
<li><strong>Übertragene Bytes:</strong> Größe der Antwort</li>
</ul>

<h2 id="warum-wichtig-seo">Warum ist die Log File Analyse für SEO wichtig?</h2>
<p>Mit einer Log File Analyse lässt sich Folgendes herausfinden:</p>
<ul>
<li>Welche Seiten crawlt Googlebot häufig — und welche gar nicht?</li>
<li>Werden 404-Fehler oder Redirects konsistent gecrawlt (Budget-Verschwendung)?</li>
<li>Gibt es Seiten, die gecrawlt, aber nie indexiert werden?</li>
<li>Wie verteilt sich das Crawl-Budget auf verschiedene Bereiche der Website?</li>
<li>Werden neue Seiten zeitnah nach der Veröffentlichung gecrawlt?</li>
</ul>

<h2 id="tools">Tools für die Log File Analyse</h2>
<p>Für die Auswertung von Server-Logs gibt es mehrere Ansätze:</p>
<ul>
<li><strong>Screaming Frog Log File Analyser:</strong> Dediziertes Desktop-Tool, sehr nutzerfreundlich</li>
<li><strong>Semrush Log File Analyser:</strong> Cloud-basiert, in die SEO-Suite integriert</li>
<li><strong>Excel / Google Sheets:</strong> Für kleinere Log-Dateien mit Pivot-Auswertung</li>
<li><strong>ELK Stack (Elasticsearch + Kibana):</strong> Für Enterprise-Setups mit sehr großen Logs</li>
</ul>

<h2 id="wer-braucht-log-file-analyse">Wer braucht eine Log File Analyse?</h2>
<p>Die Log File Analyse lohnt sich vor allem für:</p>
<ul>
<li>Websites mit mehr als 5.000 URLs</li>
<li>E-Commerce-Shops mit komplexen URL-Strukturen</li>
<li>Websites nach einem Relaunch (Crawl-Verhalten des neuen Setups prüfen)</li>
<li>Situationen, in denen Rankings trotz guten Contents einbrechen</li>
</ul>
`
  },
  {
    slug: 'content-pruning',
    type: 'glossar',
    thema: 'on-page',
    title: 'Was ist Content Pruning?',
    excerpt: 'Content Pruning bezeichnet das strategische Bereinigen schwacher Inhalte — um die Gesamtqualität der Website zu steigern und Rankings zu verbessern.',
    readTime: '3 min',
    publishDate: '2026-05-25',
    lastUpdated: '2026-05-25',
    published: true,
    serviceLinks: [
      { label: 'SEO-Texte anfragen', href: '/seo/texte' },
      { label: 'Content-Strategie', href: '/seo/content-strategie' },
    ],
    relatedSlugs: ['orphan-pages', 'nap-konsistenz'],
    content: `
<h2 id="definition">Definition: Was ist Content Pruning?</h2>
<p><strong>Content Pruning</strong> (dt. Inhaltsbereinigung) bezeichnet den Prozess, schwache, veraltete oder irrelevante Inhalte auf einer Website zu identifizieren und zu entfernen, zu aktualisieren oder zu konsolidieren. Der Begriff kommt aus der Gärtnerei: wie beim Beschneiden eines Baumes werden unnötige "Äste" entfernt, damit der Rest stärker wächst.</p>
<p>Das Ziel ist, Google zu signalisieren, dass die gesamte Website qualitativ hochwertige Inhalte bietet — nicht nur einige Seiten.</p>

<h2 id="warum-content-pruning">Warum Content Pruning für SEO?</h2>
<p>Google bewertet nicht nur einzelne Seiten, sondern auch die Gesamtqualität einer Domain. Viele schwache Seiten können die Wahrnehmung der gesamten Website negativ beeinflussen — ein Konzept, das Google mit dem Begriff <em>Content Quality</em> in seinen Quality Rater Guidelines beschreibt.</p>
<p>Konkrete Vorteile durch Content Pruning:</p>
<ul>
<li>Verbesserung des Crawl-Budgets: Googlebot crawlt weniger Ballast, mehr wertvolle Seiten</li>
<li>Reduzierung von Keyword-Kannibalisierung: Mehrere schwache Seiten zum gleichen Thema werden konsolidiert</li>
<li>Stärkere Signale für die verbleibenden Seiten durch interne Link-Konsolidierung</li>
</ul>

<h2 id="welche-inhalte-kommen-weg">Welche Inhalte werden entfernt?</h2>
<p>Typische Kandidaten für Content Pruning:</p>
<ul>
<li><strong>Thin Content:</strong> Seiten mit weniger als 200 Wörtern ohne echten Informationswert</li>
<li><strong>Veraltete Inhalte:</strong> Artikel über Events, Produkte oder Themen, die nicht mehr relevant sind</li>
<li><strong>Duplikat-Content:</strong> Seiten, die dasselbe Thema wie eine stärkere Seite behandeln</li>
<li><strong>Seiten ohne Traffic oder Backlinks:</strong> Seiten, die seit Jahren keine Besucher mehr erhalten</li>
<li><strong>Keyword-Kannibalen:</strong> Mehrere Seiten, die für dasselbe Keyword ranken wollen</li>
</ul>

<h2 id="pruning-prozess">Der Content-Pruning-Prozess</h2>
<ol>
<li><strong>Inventar erstellen:</strong> Alle URLs der Website crawlen und exportieren</li>
<li><strong>Daten zusammenführen:</strong> Traffic (Google Analytics), Rankings (Search Console), Backlinks (Ahrefs) je URL</li>
<li><strong>Entscheidung treffen:</strong> Für jede schwache Seite: Löschen, Aktualisieren oder Zusammenführen?</li>
<li><strong>Umsetzen:</strong> Seiten entfernen (mit 301-Redirect auf relevante Seite) oder überarbeiten</li>
<li><strong>Monitoren:</strong> Nach 4–8 Wochen Effekte auf Rankings und Crawl-Budget beobachten</li>
</ol>

<h2 id="wann-sinnvoll">Wann ist Content Pruning sinnvoll?</h2>
<p>Content Pruning lohnt sich besonders nach einem Google Core Update, wenn Rankings ohne klaren Grund eingebrochen sind — oft liegt das an zu vielen schwachen Seiten, die das Gesamtbild der Website verschlechtern.</p>
`
  },
  {
    slug: 'nap-konsistenz',
    type: 'glossar',
    thema: 'local-seo',
    title: 'Was ist NAP-Konsistenz?',
    excerpt: 'NAP steht für Name, Address, Phone — die Konsistenz dieser Angaben über alle Online-Verzeichnisse hinweg ist ein wichtiger Rankingfaktor für Local SEO.',
    readTime: '3 min',
    publishDate: '2026-05-26',
    lastUpdated: '2026-05-26',
    published: true,
    serviceLinks: [
      { label: 'Local SEO anfragen', href: '/geo/optimierung' },
      { label: 'GEO-Beratung', href: '/geo/beratung' },
    ],
    relatedSlugs: ['content-pruning'],
    content: `
<h2 id="definition">Definition: Was bedeutet NAP?</h2>
<p><strong>NAP</strong> steht für <em>Name, Address, Phone Number</em> — also Name des Unternehmens, Adresse und Telefonnummer. NAP-Konsistenz bedeutet, dass diese drei Angaben auf allen Online-Plattformen (Google Business Profile, Yelp, Gelbe Seiten, Branchenverzeichnisse etc.) identisch sind.</p>
<p>Für Suchmaschinen sind konsistente NAP-Daten ein Vertrauenssignal: Sie bestätigen, dass das Unternehmen real, stabil und am angegebenen Standort aktiv ist.</p>

<h2 id="warum-wichtig-local-seo">Warum ist NAP-Konsistenz für Local SEO wichtig?</h2>
<p>Google gleicht Unternehmensdaten aus hunderten Quellen ab, um zu entscheiden, welche lokalen Ergebnisse in der Karte und im Local Pack angezeigt werden. Widersprüchliche NAP-Daten erzeugen Verwirrung:</p>
<ul>
<li>Google kann nicht sicher sein, ob es sich um dasselbe Unternehmen handelt</li>
<li>Das Vertrauen in die Angaben sinkt — was sich negativ auf Rankings auswirkt</li>
<li>Nutzer finden falsche Kontaktdaten und rufen möglicherweise eine falsche Nummer an</li>
</ul>

<h2 id="typische-nap-fehler">Typische NAP-Inkonsistenzen</h2>
<p>Kleine Unterschiede, die große Auswirkungen haben können:</p>
<ul>
<li><strong>Straßenabkürzungen:</strong> "Hauptstr." vs. "Hauptstraße" vs. "Hauptstrasse"</li>
<li><strong>Telefonnummernformate:</strong> +49 621 123456 vs. 0621 123456 vs. 0621/123456</li>
<li><strong>Firmennamenvarianten:</strong> "Muster GmbH" vs. "Muster GmbH &amp; Co. KG" vs. "Muster"</li>
<li><strong>Veraltete Daten:</strong> Alter Firmenname oder alte Adresse nach einem Umzug noch in Verzeichnissen</li>
</ul>

<h2 id="nap-pruefen">NAP-Konsistenz prüfen</h2>
<p>So lässt sich die eigene NAP-Konsistenz überprüfen:</p>
<ol>
<li>Google-Suche nach dem Firmennamen + Stadt — welche Daten werden angezeigt?</li>
<li>Wichtige Verzeichnisse manuell prüfen: Google Business Profile, Bing Places, Yelp, Gelbe Seiten, Das Örtliche, Cylex</li>
<li>Tools wie Moz Local, Whitespark oder BrightLocal für automatisierte Citation-Audits nutzen</li>
</ol>

<h2 id="nap-korrigieren">NAP-Daten korrigieren</h2>
<p>Bei Inkonsistenzen gilt: Erst das Google Business Profile als "Master-Datensatz" korrekt setzen, dann alle anderen Verzeichnisse schrittweise angleichen. Priorität haben dabei Verzeichnisse mit hoher Domain Authority und solche, die Google als Datenquelle bekanntermaßen nutzt.</p>
<p>Neu gegründete Unternehmen sollten von Beginn an ein einheitliches NAP-Format festlegen und dieses konsequent in allen Anmeldungen verwenden.</p>
`
  },
]

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getArticlesByType(type: Article['type']): Article[] {
  return articles.filter(a => a.type === type)
}

export function getArticlesByThema(thema: Article['thema']): Article[] {
  return articles.filter(a => a.thema === thema)
}

export function getRelatedArticles(slug: string): Article[] {
  const article = getArticleBySlug(slug)
  if (!article) return []
  return article.relatedSlugs
    .map(s => getArticleBySlug(s))
    .filter(Boolean) as Article[]
}
