"use client";

import { useState, useEffect } from "react";

interface AuditCategory {
  title: string;
  description: string;
  score: number;
  iconType: "success" | "warning" | "error";
}

const categories: AuditCategory[] = [
  {
    title: "Technisches SEO",
    description: "12 Checks bestanden",
    score: 92,
    iconType: "success",
  },
  {
    title: "On-Page Optimierung",
    description: "8 Verbesserungen möglich",
    score: 74,
    iconType: "warning",
  },
  {
    title: "Content-Qualität",
    description: "15 Seiten optimierbar",
    score: 68,
    iconType: "warning",
  },
  {
    title: "Backlink-Profil",
    description: "Kritische Probleme erkannt",
    score: 42,
    iconType: "error",
  },
  {
    title: "Mobile Optimierung",
    description: "Alle Tests bestanden",
    score: 95,
    iconType: "success",
  },
  {
    title: "Ladegeschwindigkeit",
    description: "Optimale Performance",
    score: 88,
    iconType: "success",
  },
];

function getScoreColor(score: number): string {
  if (score >= 90) return "green";
  if (score >= 60) return "amber";
  return "red";
}

function useCountUp(target: number, duration: number, startAnimation: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOutQuad * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, duration, startAnimation]);

  return count;
}

function CategoryRow({
  category,
  index,
  startAnimation,
}: {
  category: AuditCategory;
  index: number;
  startAnimation: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const delay = index * 200;
  const animatedScore = useCountUp(category.score, 1500, isVisible);
  const color = getScoreColor(category.score);

  useEffect(() => {
    if (!startAnimation) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [startAnimation, delay]);

  const bgColorClass = {
    green: "bg-green-100",
    amber: "bg-amber-100",
    red: "bg-red-100",
  }[color];

  const textColorClass = {
    green: "text-green-600",
    amber: "text-amber-600",
    red: "text-red-600",
  }[color];

  const hoverColorClass = {
    green: "hover:bg-green-50/50",
    amber: "hover:bg-amber-50/50",
    red: "hover:bg-red-50/50",
  }[color];

  const iconPath = {
    success: "M4.5 12.75l6 6 9-13.5",
    warning:
      "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    error: "M6 18L18 6M6 6l12 12",
  }[category.iconType];

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border border-border bg-offwhite p-4 transition-all duration-500 ${hoverColorClass}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(50px)",
        transitionDelay: "0ms",
      }}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColorClass} transition-transform duration-300`}
        style={{
          transform: isVisible ? "scale(1)" : "scale(0)",
          transitionDelay: `${delay}ms`,
        }}
      >
        <svg
          className={`h-6 w-6 ${textColorClass}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="text-base font-semibold text-dark">{category.title}</h4>
        <p className="text-sm text-muted">{category.description}</p>
      </div>
      <div className="text-right">
        <p
          className={`text-2xl font-bold transition-colors duration-500 ${textColorClass}`}
          style={{
            color: isVisible ? undefined : "#9ca3af",
          }}
        >
          {animatedScore}
        </p>
        <p className="text-xs text-muted">von 100</p>
      </div>
    </div>
  );
}

export default function AuditMockup() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showGrade, setShowGrade] = useState(false);
  const healthScore = useCountUp(78, 2000, startAnimation);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (healthScore === 78) {
      const timer = setTimeout(() => {
        setShowGrade(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [healthScore]);

  return (
    <div className="hero-dashboard mx-auto max-w-4xl">
      <div className="relative rounded-2xl border-2 border-border bg-white p-8 shadow-2xl">
        {/* Overall Score */}
        <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-1">
              SEO Health Score
            </h3>
            <p className="text-4xl font-bold text-dark">{healthScore}/100</p>
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-secondary bg-secondary/5">
            <span
              className="text-2xl font-bold text-secondary transition-opacity duration-500"
              style={{
                opacity: showGrade ? 1 : 0,
              }}
            >
              B
            </span>
          </div>
        </div>

        {/* Audit Categories */}
        <div className="space-y-4">
          {categories.map((category, index) => (
            <CategoryRow
              key={category.title}
              category={category}
              index={index}
              startAnimation={startAnimation}
            />
          ))}
        </div>

        {/* Report Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <p className="text-sm text-muted">Letzte Analyse: Heute um 14:32 Uhr</p>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            Vollständigen Report ansehen
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-secondary/10 blur-2xl" />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </div>
  );
}
