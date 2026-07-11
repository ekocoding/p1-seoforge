"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Globaler, fail-open Scroll-Reveal-Controller.
 * Inhalte bleiben ohne JavaScript sichtbar. Erst nach erfolgreicher
 * Initialisierung aktiviert `reveal-ready` die verdeckten Startzustände.
 */
export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-hidden"));

    if (!("IntersectionObserver" in window) || elements.length === 0) {
      root.classList.remove("reveal-ready");
      elements.forEach((element) => element.classList.add("scroll-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scroll-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -7% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [pathname]);

  return null;
}
