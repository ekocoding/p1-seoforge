"use client";

import { useState } from "react";

export default function OrderForm() {
  const [textType, setTextType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [wordCounts, setWordCounts] = useState<string[]>(["", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    setWordCounts(["", "", ""]);
  };

  const getVisibleFields = () => {
    switch (quantity) {
      case "1":
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      default:
        return 0;
    }
  };

  const visibleFields = getVisibleFields();
  const isDirectContact = quantity === "mehr";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/kontakt?source=text-order";
  };

  // Show direct contact form for large orders
  if (isDirectContact) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-dark mb-2">
            Individuelle Beratung erforderlich
          </h3>
          <p className="text-muted mb-6">
            Bei mehr als 3 Texten ist eine persönliche Absprache sinnvoll, um Ihr Projekt optimal zu planen.
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            Termin vereinbaren
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => setQuantity("")}
            className="text-sm text-muted hover:text-primary underline"
          >
            ← Zurück zur Auswahl
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name & Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            placeholder="Ihr Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            placeholder="ihre@email.de"
          />
        </div>
      </div>

      {/* Text Type & Quantity */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="textType" className="block text-sm font-medium text-dark mb-2">
            Art der Texte
          </label>
          <select
            id="textType"
            name="textType"
            required
            value={textType}
            onChange={(e) => setTextType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'right 1rem center', 
              backgroundSize: '1.5em' 
            }}
          >
            <option value="">Bitte wählen...</option>
            <option value="produkttexte">Produkttexte</option>
            <option value="blog-artikel">Blog-Artikel</option>
            <option value="landing-pages">Landing Pages</option>
            <option value="kategorietexte">Kategorietexte</option>
            <option value="website-texte">Website-Texte allgemein</option>
            <option value="sonstiges">Sonstiges</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-dark mb-2">
            Menge
          </label>
          <select
            id="quantity"
            name="quantity"
            required
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'right 1rem center', 
              backgroundSize: '1.5em' 
            }}
          >
            <option value="">Bitte wählen...</option>
            <option value="1">1 Text</option>
            <option value="2">2 Texte</option>
            <option value="3">3 Texte</option>
            <option value="mehr">Mehr als 3 Texte</option>
          </select>
        </div>
      </div>

      {/* Word Count Fields */}
      {visibleFields > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-sm font-medium text-dark">Gewünschte Wortmenge pro Text:</p>
          
          {Array.from({ length: visibleFields }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm text-muted w-16">Text {index + 1}:</span>
              <input
                type="number"
                min="100"
                max="5000"
                step="50"
                placeholder="z.B. 800"
                value={wordCounts[index]}
                onChange={(e) => {
                  const newWordCounts = [...wordCounts];
                  newWordCounts[index] = e.target.value;
                  setWordCounts(newWordCounts);
                }}
                className="flex-1 px-4 py-2 rounded-xl border border-border bg-white text-dark placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <span className="text-sm text-muted">Wörter</span>
            </div>
          ))}
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
          Details zu Ihrem Projekt
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
          placeholder="Zielgruppe, Themen, besondere Anforderungen..."
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          Anfrage senden
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <p className="text-xs text-muted">
          Rückmeldung innerhalb von 24 Stunden.
        </p>
      </div>
    </form>
  );
}
