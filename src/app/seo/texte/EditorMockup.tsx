"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Full article text that streams in word-by-word like ChatGPT        */
/* ------------------------------------------------------------------ */
const ARTICLE_CONTENT = [
  { type: "h1", text: "SEO Texte die überzeugen" },
  { type: "br" },
  {
    type: "p",
    text: "Professionelle SEO Texte sind der Schlüssel zu nachhaltiger Online-Sichtbarkeit. Sie verbinden strategische Keyword-Optimierung mit echtem Mehrwert für Ihre Zielgruppe.",
  },
  { type: "br" },
  { type: "h2", text: "Warum SEO Texte wichtig sind" },
  { type: "br" },
  {
    type: "p",
    text: "Gut optimierte Inhalte ranken nicht nur besser — sie überzeugen auch Ihre Besucher und steigern Conversions. Der Schlüssel liegt in der Balance zwischen Suchmaschinen-Relevanz und Leserfreundlichkeit.",
  },
  { type: "br" },
  {
    type: "p",
    text: "Unsere Texter erstellen Inhalte, die sowohl Google als auch Ihre Kunden begeistern.",
  },
];

export default function EditorMockup() {
  // How many words total have been revealed
  const [wordCount, setWordCount] = useState(0);
  const [animateScore, setAnimateScore] = useState(0);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [showStatusIndicators, setShowStatusIndicators] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [doneTyping, setDoneTyping] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Build flat word list with metadata
  const wordList = useRef<{ word: string; blockIndex: number; type: string }[]>(
    []
  );

  if (wordList.current.length === 0) {
    ARTICLE_CONTENT.forEach((block, blockIndex) => {
      if (block.type === "br") return;
      const words = block.text!.split(" ");
      words.forEach((word) => {
        wordList.current.push({ word, blockIndex, type: block.type });
      });
    });
  }

  const totalWords = wordList.current.length;

  // Stream words in — faster for headings, natural pace for paragraphs
  useEffect(() => {
    const startDelay = setTimeout(() => {
      let idx = 0;
      const tick = () => {
        if (idx < totalWords) {
          idx++;
          setWordCount(idx);
          // Vary speed: faster initial words, slight variation
          const delay = 40 + Math.random() * 30;
          timerRef.current = setTimeout(tick, delay);
        } else {
          setDoneTyping(true);
        }
      };
      tick();
    }, 800);

    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [totalWords]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Score counter — starts when typing begins
  useEffect(() => {
    const delay = setTimeout(() => {
      const target = 94;
      const duration = 2000;
      const start = performance.now();

      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimateScore(Math.round(eased * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, 1200);

    return () => clearTimeout(delay);
  }, []);

  // Progress bars
  useEffect(() => {
    const t = setTimeout(() => setAnimateProgress(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Status indicators
  useEffect(() => {
    const t = setTimeout(() => setShowStatusIndicators(true), 3000);
    return () => clearTimeout(t);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render the streamed content                                      */
  /* ---------------------------------------------------------------- */
  const renderContent = useCallback(() => {
    if (wordCount === 0) {
      return (
        <span
          className={`inline-block w-[2px] h-5 bg-primary ${cursorVisible ? "opacity-100" : "opacity-0"}`}
        />
      );
    }

    // Figure out which words are visible
    const visibleWords = wordList.current.slice(0, wordCount);

    // Group by block
    const blocks: { type: string; blockIndex: number; words: string[] }[] = [];
    visibleWords.forEach((w) => {
      const last = blocks[blocks.length - 1];
      if (last && last.blockIndex === w.blockIndex) {
        last.words.push(w.word);
      } else {
        blocks.push({ type: w.type, blockIndex: w.blockIndex, words: [w.word] });
      }
    });

    const isLastWord = wordCount >= totalWords;
    const cursor = !isLastWord && (
      <span
        className={`inline-block w-[2px] h-[1em] bg-primary ml-0.5 translate-y-[2px] transition-opacity duration-100 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
      />
    );

    return blocks.map((block, i) => {
      const isLast = i === blocks.length - 1;
      const text = block.words.join(" ");

      if (block.type === "h1") {
        return (
          <div key={block.blockIndex} className="mb-3">
            <span className="text-lg font-bold text-dark leading-snug">
              {text}
              {isLast && cursor}
            </span>
          </div>
        );
      }

      if (block.type === "h2") {
        return (
          <div key={block.blockIndex} className="mb-2 mt-4">
            <span className="text-sm font-semibold text-primary leading-snug">
              {text}
              {isLast && cursor}
            </span>
          </div>
        );
      }

      return (
        <div key={block.blockIndex} className="mb-1">
          <span className="text-xs text-muted leading-relaxed">
            {text}
            {isLast && cursor}
          </span>
        </div>
      );
    });
  }, [wordCount, cursorVisible, totalWords]);

  return (
    <div className="relative hero-dashboard">
      <div className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Editor Header */}
        <div className="bg-dark px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-white/70 ml-2">content-editor.txt</span>
        </div>

        <div className="grid grid-cols-3 gap-0">
          {/* Editor Content — streaming text */}
          <div className="col-span-2 p-6 bg-white min-h-[320px]">
            {renderContent()}
          </div>

          {/* SEO Scoring Sidebar */}
          <div className="col-span-1 p-6 bg-offwhite border-l border-border">
            <div className="space-y-6">
              {/* Overall Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wide">
                    SEO Score
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {animateScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-[1500ms] ease-out"
                    style={{ width: animateProgress ? "94%" : "0%" }}
                  />
                </div>
              </div>

              {/* Keyword Density */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted">Keywords</span>
                  <span className="text-sm font-semibold text-dark">2.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-secondary h-1.5 rounded-full transition-all duration-[1500ms] ease-out"
                    style={{
                      width: animateProgress ? "85%" : "0%",
                      transitionDelay: "200ms",
                    }}
                  />
                </div>
              </div>

              {/* Readability */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted">Lesbarkeit</span>
                  <span className="text-sm font-semibold text-dark">A+</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-[1500ms] ease-out"
                    style={{
                      width: animateProgress ? "95%" : "0%",
                      transitionDelay: "400ms",
                    }}
                  />
                </div>
              </div>

              {/* Word Count */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted">Wörter</span>
                  <span className="text-sm font-semibold text-dark">1,247</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-secondary h-1.5 rounded-full transition-all duration-[1500ms] ease-out"
                    style={{
                      width: animateProgress ? "78%" : "0%",
                      transitionDelay: "600ms",
                    }}
                  />
                </div>
              </div>

              {/* Links */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted">Links</span>
                  <span className="text-sm font-semibold text-dark">12/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-[1500ms] ease-out"
                    style={{
                      width: animateProgress ? "80%" : "0%",
                      transitionDelay: "800ms",
                    }}
                  />
                </div>
              </div>

              {/* Status Indicators */}
              <div className="pt-4 border-t border-border">
                <div
                  className={`flex items-center gap-2 mb-2 transition-all duration-300 ${
                    showStatusIndicators
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-dark">
                    Meta-Daten OK
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    showStatusIndicators
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: "150ms" }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-dark">
                    Struktur OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Footer */}
        <div className="bg-offwhite px-6 py-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-muted">
            <span>Zeile 24, Spalte 18</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${doneTyping ? "bg-green-500" : "bg-yellow-500"}`}
            />
            <span className="text-xs text-muted">
              {doneTyping ? "Optimiert" : "Generiert..."}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Decoration */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
    </div>
  );
}
