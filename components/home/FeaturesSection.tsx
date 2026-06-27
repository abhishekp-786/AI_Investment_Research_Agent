/**
 * Features Section
 */

"use client";

import React from "react";
import { TrendingUp, Zap, BarChart3, Shield, Clock, Database } from "lucide-react";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Real-time Analysis",
    description: "Get up-to-date company analysis with latest market data",
  },
  {
    icon: Zap,
    title: "Instant Recommendations",
    description: "Receive investment recommendations in seconds, not hours",
  },
  {
    icon: BarChart3,
    title: "Detailed Metrics",
    description: "Access comprehensive financial metrics and ratios",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Understand potential risks with detailed risk analysis",
  },
  {
    icon: Clock,
    title: "Historical Data",
    description: "Review historical performance and trends",
  },
  {
    icon: Database,
    title: "Multiple Sources",
    description: "Data aggregated from multiple reliable sources",
  },
];

export function FeaturesSection(): JSX.Element {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for intelligent investment research and decision-making
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-lg border border-border p-8 hover:border-primary/50 transition-all group"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <Icon size={24} className="text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
