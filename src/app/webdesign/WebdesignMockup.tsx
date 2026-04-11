"use client";

import { useState, useEffect } from "react";

export default function WebdesignMockup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearTimeout(startDelay);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="relative w-full max-w-xl mx-auto"
    >
      {/* Browser frame */}
      <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#1e1e1e" }}>
        {/* Browser chrome */}
        <div className="px-4 py-3 flex items-center gap-3" style={{ background: "#2a2a2a" }}>
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {/* URL bar */}
          <div className="flex-1 rounded-md px-3 py-1.5 flex items-center gap-2" style={{ background: "#3a3a3a" }}>
            <svg className="w-3 h-3 shrink-0" style={{ color: "#888" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs" style={{ color: "#aaa", fontFamily: "monospace" }}>ihr-unternehmen.de</span>
          </div>
        </div>

        {/* Website interior */}
        <div className="bg-white overflow-hidden">
          {/* Mini header */}
          <div
            className="px-5 py-3 flex items-center justify-between border-b border-gray-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.4s ease 0.3s",
            }}
          >
            {/* Logo placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ background: "#C2722A" }} />
              <div className="h-3 w-20 rounded-sm bg-gray-200" />
            </div>
            {/* Nav items */}
            <div className="flex items-center gap-4 hidden sm:flex">
              {["Leistungen", "Referenzen", "Über uns"].map((item) => (
                <div key={item} className="h-2 rounded-sm bg-gray-200" style={{ width: `${item.length * 5}px` }} />
              ))}
              <div className="rounded-full px-3 py-1 text-white text-xs font-semibold" style={{ background: "#C2722A", fontSize: "9px" }}>
                Kontakt
              </div>
            </div>
          </div>

          {/* Hero section */}
          <div
            className="px-5 py-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s",
            }}
          >
            <div className="max-w-xs">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 mb-3" style={{ borderColor: "rgba(194,114,42,0.3)", background: "rgba(194,114,42,0.06)" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#C2722A" }} />
                <span className="text-xs font-medium" style={{ color: "#C2722A", fontSize: "9px" }}>Webdesign & SEO</span>
              </div>

              {/* Headline with cursor */}
              <h2 className="font-bold text-gray-900 leading-tight mb-2" style={{ fontSize: "15px" }}>
                Ihre Website,{" "}
                <span style={{ color: "#C2722A" }}>
                  neu gedacht
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                    style={{
                      background: "#C2722A",
                      opacity: showCursor ? 1 : 0,
                      transition: "opacity 0.1s",
                      verticalAlign: "text-bottom",
                    }}
                  />
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-gray-500 mb-4 leading-relaxed" style={{ fontSize: "9px" }}>
                Professionelles Webdesign mit eingebautem SEO — für mehr Sichtbarkeit und mehr Anfragen.
              </p>

              {/* CTA button */}
              <div
                className="inline-flex items-center gap-1.5 rounded-full text-white font-semibold px-4 py-1.5"
                style={{ background: "#C2722A", fontSize: "9px" }}
              >
                Jetzt starten
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div
            className="px-5 pb-5 grid grid-cols-3 gap-2.5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s",
            }}
          >
            {[
              { icon: "⚡", label: "96+ PageSpeed" },
              { icon: "🎨", label: "UI/UX Design" },
              { icon: "📈", label: "SEO-optimiert" },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-xl p-3 text-center border"
                style={{
                  borderColor: "#E5E3DF",
                  background: "#F8F7F5",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.4s ease ${0.8 + i * 0.1}s, transform 0.4s ease ${0.8 + i * 0.1}s`,
                }}
              >
                <div className="text-base mb-1">{card.icon}</div>
                <div className="font-semibold text-gray-800" style={{ fontSize: "8px" }}>{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-white text-xs font-medium shadow-lg border"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.2)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease 1s",
          fontSize: "11px",
        }}
      >
        ⚡ Ø 97/100 PageSpeed Score
      </div>
    </div>
  );
}
