"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function HomeContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          firmenname: form.get("firmenname"),
          email: form.get("email"),
          website: form.get("website"),
          message: form.get("message"),
          selectedServices: ["Kostenlose Erstanalyse"],
        }),
      });

      if (!response.ok) throw new Error("request failed");

      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Ihr Name"
            className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
          />
        </div>
        <div>
          <label htmlFor="firmenname" className="sr-only">Unternehmen</label>
          <input
            type="text"
            id="firmenname"
            name="firmenname"
            placeholder="Unternehmen"
            className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="sr-only">E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Ihre E-Mail-Adresse"
          className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
        />
      </div>

      <div>
        <label htmlFor="website" className="sr-only">Website</label>
        <input
          type="url"
          id="website"
          name="website"
          placeholder="Ihre Website-URL"
          className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
        />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Nachricht</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Wie können wir Ihnen helfen?"
          className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending"
          ? "Anfrage wird gesendet …"
          : status === "success"
            ? "Anfrage ist angekommen"
            : "Kostenlose Beratung anfordern"}
      </button>

      {status === "success" && (
        <p className="text-center text-sm font-semibold text-emerald-300" role="status">
          Danke – wir melden uns innerhalb von 24 Stunden.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-300" role="alert">
          Das Senden hat nicht funktioniert. Bitte nutzen Sie die Kontaktseite oder rufen Sie uns an.
        </p>
      )}
      <p className="text-center text-xs text-white/30">
        Ihre Daten werden vertraulich behandelt.
      </p>
    </form>
  );
}
