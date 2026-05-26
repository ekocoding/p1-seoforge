import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | SeoForge",
  description: "Datenschutzerklärung von SeoForge gemäß DSGVO",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <SubpageLayout>
      <main className="bg-white pt-20">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
          <h1 className="text-4xl text-dark mb-12 font-[family-name:var(--font-heading)]">
            Datenschutzerklärung
          </h1>

          <div className="space-y-10 text-base leading-relaxed text-dark">

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-heading)] mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-semibold mb-2">Allgemeine Hinweise</h3>
              <p className="text-muted">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-heading)] mb-4">2. Verantwortliche Stelle</h2>
              <p className="text-muted mb-2">Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="text-muted">
                <p className="font-semibold text-dark">Webdev Ex – Inh. Joel Heuchert</p>
                <p>Kurpfalzstraße 16</p>
                <p>68542 Heddesheim</p>
                <p>Deutschland</p>
                <p className="mt-2">E-Mail: <a href="mailto:info@seomannheim.com" className="text-primary hover:underline">info@seomannheim.com</a></p>
                <p>Telefon: <a href="tel:015203450695" className="text-primary hover:underline">0152 03450695</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-heading)] mb-4">3. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-semibold mb-2">Kontaktformular</h3>
              <p className="text-muted mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-heading)] mb-4">4. Server-Log-Dateien</h2>
              <p className="text-muted mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-1 mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-muted">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-[family-name:var(--font-heading)] mb-4">5. Ihre Rechte</h2>
              <p className="text-muted mb-4">Sie haben jederzeit das Recht:</p>
              <ul className="list-disc pl-6 text-muted space-y-1 mb-4">
                <li>unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                <li>die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                <li>die Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)</li>
                <li>der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
                <li>Ihre Daten in einem maschinenlesbaren Format zu erhalten (Art. 20 DSGVO)</li>
              </ul>
              <p className="text-muted">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:info@seomannheim.com" className="text-primary hover:underline">info@seomannheim.com</a>
              </p>
              <p className="text-muted mt-4">
                Sie haben zudem das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Aufsichtsbehörde für Baden-Württemberg ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.
              </p>
            </section>

          </div>
        </div>
      </main>
    </SubpageLayout>
  );
}
