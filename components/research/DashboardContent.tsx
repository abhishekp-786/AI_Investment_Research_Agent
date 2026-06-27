"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CompanyInput } from "@/components/home/CompanyInput";
import { RecommendationCard } from "@/components/research/RecommendationCard";
import { FinancialMetricsDisplay } from "@/components/research/FinancialMetrics";
import { SWOTDisplay } from "@/components/research/SWOTAnalysis";
import { NewsDisplay } from "@/components/research/NewsDisplay";
import {
  SkeletonRecommendation,
  SkeletonGrid,
} from "@/components/common/SkeletonLoaders";
import { useResearch } from "@/hooks/useResearch";
import { Navigation } from "@/components/common/Navigation";
import { Footer } from "@/components/common/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function DashboardContent(): JSX.Element {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const [autoFetch, setAutoFetch] = useState(true);

  const { recommendation, isLoading, error, research, reset } = useResearch();

  useEffect(() => {
    if (company && autoFetch) {
      research(company);
      setAutoFetch(false);
    }
  }, [company, autoFetch, research]);

  const handleSearch = async (companyName: string): Promise<void> => {
    reset();
    await research(companyName);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Back Button & Header */}
        <div className="container-custom py-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary/90 mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-2">Investment Research Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Enter a company name to get AI-powered investment analysis
          </p>
        </div>

        {/* Search Section */}
        <div className="container-custom mb-16">
          <CompanyInput onSearch={handleSearch} />
        </div>

        {/* Results Section */}
        <div className="container-custom pb-20">
          {isLoading && (
            <div className="space-y-8">
              <SkeletonRecommendation />
              <div>
                <h3 className="text-2xl font-bold mb-6">Financial Metrics</h3>
                <SkeletonGrid />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-red-500 mb-2">Error</h3>
              <p className="text-foreground">{error}</p>
            </div>
          )}

          {recommendation && (
            <div className="space-y-12">
              {/* Recommendation */}
              <RecommendationCard recommendation={recommendation} />

              {/* Financial Metrics */}
              <FinancialMetricsDisplay
                metrics={recommendation.financials}
                isLoading={isLoading}
              />

              {/* SWOT Analysis */}
              <SWOTDisplay swot={recommendation.swot} isLoading={isLoading} />

              {/* News */}
              <NewsDisplay news={recommendation.news} isLoading={isLoading} />

              {/* Sources */}
              {recommendation.sources.length > 0 && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-2xl font-bold mb-6">Sources</h3>
                  <ul className="space-y-2">
                    {recommendation.sources.map((source, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex gap-2">
                        <span className="text-primary">•</span>
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && !recommendation && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2">Ready to Research</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a company name above to get started with AI-powered investment analysis
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
