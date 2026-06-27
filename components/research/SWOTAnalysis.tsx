/**
 * SWOT Analysis Display Component
 */

"use client";

import React from "react";
import { SWOTAnalysis } from "@/types";
import { Zap, AlertTriangle, Lightbulb, Crosshair } from "lucide-react";

interface SWOTDisplayProps {
  swot: SWOTAnalysis;
  isLoading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SWOTCategory {
  icon: any;
  label: string;
  color: string;
  bgColor: string;
  items: string[];
}

export function SWOTDisplay({ swot, isLoading }: SWOTDisplayProps): JSX.Element {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-4 bg-muted rounded w-5/6"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const categories: SWOTCategory[] = [
    {
      icon: Zap,
      label: "Strengths",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      items: swot.strengths,
    },
    {
      icon: AlertTriangle,
      label: "Weaknesses",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      items: swot.weaknesses,
    },
    {
      icon: Lightbulb,
      label: "Opportunities",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      items: swot.opportunities,
    },
    {
      icon: Crosshair,
      label: "Threats",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      items: swot.threats,
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">SWOT Analysis</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, i) => {
          const Icon = category.icon;
          return (
            <div
              key={i}
              className={`rounded-lg border border-border p-6 ${category.bgColor}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon size={24} className={category.color} />
                <h4 className="font-semibold text-lg">{category.label}</h4>
              </div>

              <ul className="space-y-3">
                {category.items.length > 0 ? (
                  category.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm">
                      <span className={`${category.color} font-bold mt-1`}>•</span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground italic">No data available</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
