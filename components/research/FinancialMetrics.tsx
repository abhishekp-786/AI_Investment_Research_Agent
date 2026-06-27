/**
 * Financial Metrics Display Component
 */

"use client";

import React from "react";
import { FinancialMetrics } from "@/types";
import { formatPercentage, formatLargeNumber } from "@/utils/helpers";

interface FinancialMetricsProps {
  metrics: FinancialMetrics;
  isLoading?: boolean;
}

interface MetricItem {
  label: string;
  value: number | undefined;
  formatter: (value: number | undefined) => string;
  tooltip?: string;
}

export function FinancialMetricsDisplay({
  metrics,
  isLoading,
}: FinancialMetricsProps): JSX.Element {
  const metricsList: MetricItem[] = [
    {
      label: "Revenue",
      value: metrics.revenue,
      formatter: formatLargeNumber,
      tooltip: "Total annual revenue",
    },
    {
      label: "Net Income",
      value: metrics.netIncome,
      formatter: formatLargeNumber,
      tooltip: "Profit after all expenses",
    },
    {
      label: "Revenue Growth",
      value: metrics.revenueGrowth,
      formatter: formatPercentage,
      tooltip: "Year-over-year growth rate",
    },
    {
      label: "Gross Margin",
      value: metrics.grossMargin,
      formatter: formatPercentage,
      tooltip: "Percentage of revenue remaining after COGS",
    },
    {
      label: "Operating Margin",
      value: metrics.operatingMargin,
      formatter: formatPercentage,
      tooltip: "Operating income as percentage of revenue",
    },
    {
      label: "Net Margin",
      value: metrics.netMargin,
      formatter: formatPercentage,
      tooltip: "Net income as percentage of revenue",
    },
    {
      label: "P/E Ratio",
      value: metrics.peRatio,
      formatter: (v) => (v !== undefined ? v.toFixed(2) : "N/A"),
      tooltip: "Price-to-Earnings ratio",
    },
    {
      label: "P/B Ratio",
      value: metrics.pbRatio,
      formatter: (v) => (v !== undefined ? v.toFixed(2) : "N/A"),
      tooltip: "Price-to-Book ratio",
    },
    {
      label: "Debt-to-Equity",
      value: metrics.debtToEquity,
      formatter: (v) => (v !== undefined ? v.toFixed(2) : "N/A"),
      tooltip: "Total debt divided by total equity",
    },
    {
      label: "Current Ratio",
      value: metrics.currentRatio,
      formatter: (v) => (v !== undefined ? v.toFixed(2) : "N/A"),
      tooltip: "Current assets divided by current liabilities",
    },
    {
      label: "Free Cash Flow",
      value: metrics.freeCashFlow,
      formatter: formatLargeNumber,
      tooltip: "Cash available after capital expenditures",
    },
    {
      label: "ROA",
      value: metrics.roa,
      formatter: formatPercentage,
      tooltip: "Return on Assets",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Financial Metrics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsList.map((metric, i) => (
          <div
            key={i}
            className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-all group cursor-help"
            title={metric.tooltip}
          >
            <p className="text-muted-foreground text-sm font-medium mb-2">{metric.label}</p>
            <p className="text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors">
              {metric.formatter(metric.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
