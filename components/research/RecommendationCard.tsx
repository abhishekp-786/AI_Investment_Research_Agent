/**
 * Investment Recommendation Card Component
 */

"use client";

import React from "react";
import { InvestmentRecommendation } from "@/types";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { formatPercentage } from "@/utils/helpers";

interface RecommendationCardProps {
  recommendation: InvestmentRecommendation;
}

const getRiskColor = (level: string): string => {
  const colors: Record<string, string> = {
    LOW: "text-green-500",
    MEDIUM: "text-yellow-500",
    HIGH: "text-orange-500",
    VERY_HIGH: "text-red-500",
  };
  return colors[level] || "text-gray-500";
};

const getRiskBg = (level: string): string => {
  const bg: Record<string, string> = {
    LOW: "bg-green-500/10",
    MEDIUM: "bg-yellow-500/10",
    HIGH: "bg-orange-500/10",
    VERY_HIGH: "bg-red-500/10",
  };
  return bg[level] || "bg-gray-500/10";
};

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps): JSX.Element {
  const isPositive = recommendation.recommendation === "INVEST";

  return (
    <div className="bg-card rounded-lg border border-border p-8 animate-scale-in">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">{recommendation.company}</h2>
          <p className="text-muted-foreground">Investment Analysis</p>
        </div>

        {/* Recommendation Badge */}
        <div
          className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 ${
            isPositive
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          {recommendation.recommendation}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
        {/* Confidence */}
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-2">Confidence</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${recommendation.confidence}%` }}
              />
            </div>
            <span className="text-lg font-bold min-w-fit">
              {formatPercentage(recommendation.confidence, 0)}
            </span>
          </div>
        </div>

        {/* Risk Level */}
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-2">Risk Level</p>
          <div
            className={`px-4 py-2 rounded-lg font-semibold inline-block ${getRiskBg(recommendation.riskLevel)} ${getRiskColor(recommendation.riskLevel)}`}
          >
            {recommendation.riskLevel}
          </div>
        </div>

        {/* Analysis Date */}
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-2">Analysis Date</p>
          <p className="font-semibold">
            {new Date(recommendation.researchTimestamp).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Summary</h3>
        <p className="text-foreground leading-relaxed">{recommendation.summary}</p>
      </div>

      {/* Positive & Negative Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Positives */}
        <div>
          <h4 className="font-semibold text-green-500 mb-4 flex items-center gap-2">
            <TrendingUp size={18} />
            Positive Factors
          </h4>
          <ul className="space-y-2">
            {recommendation.positiveFactors.map((factor, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-green-500 font-bold mt-1">+</span>
                <span className="text-foreground">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Negatives */}
        <div>
          <h4 className="font-semibold text-red-500 mb-4 flex items-center gap-2">
            <TrendingDown size={18} />
            Negative Factors
          </h4>
          <ul className="space-y-2">
            {recommendation.negativeFactors.map((factor, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-red-500 font-bold mt-1">-</span>
                <span className="text-foreground">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Long-term Outlook */}
      <div className="mb-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <AlertCircle size={18} className="text-primary" />
          Long-term Outlook
        </h4>
        <p className="text-sm text-foreground">{recommendation.longTermOutlook}</p>
      </div>

      {/* Reasoning */}
      <div className="mb-8">
        <h4 className="font-semibold text-lg mb-3">Detailed Reasoning</h4>
        <p className="text-foreground leading-relaxed text-sm whitespace-pre-wrap">
          {recommendation.reasoning}
        </p>
      </div>

      {/* AI Model Info */}
      <div className="pt-4 border-t border-border text-xs text-muted-foreground">
        <p>Analysis powered by {recommendation.aiModel}</p>
      </div>
    </div>
  );
}
