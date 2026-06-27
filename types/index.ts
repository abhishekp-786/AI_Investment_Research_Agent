/**
 * Core type definitions for the Investment Research Agent
 */

export interface ResearchRequest {
  company: string;
  includeStockData?: boolean;
  includeHistoricalData?: boolean;
}

export interface CompanyProfile {
  name: string;
  ticker?: string;
  sector?: string;
  industry?: string;
  marketCap?: number;
  website?: string;
  description?: string;
  founded?: number;
  employees?: number;
}

export interface FinancialMetrics {
  revenue?: number;
  revenueGrowth?: number;
  netIncome?: number;
  grossMargin?: number;
  operatingMargin?: number;
  netMargin?: number;
  peRatio?: number;
  pbRatio?: number;
  debtToEquity?: number;
  currentRatio?: number;
  quickRatio?: number;
  freeCashFlow?: number;
  operatingCashFlow?: number;
  eps?: number;
  roa?: number;
  roe?: number;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export interface CompetitorInfo {
  name: string;
  marketPosition: string;
  strengths: string[];
  marketShare?: number;
}

export interface InvestmentRecommendation {
  company: string;
  recommendation: "INVEST" | "PASS";
  confidence: number; // 0-100
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  summary: string;
  positiveFactors: string[];
  negativeFactors: string[];
  swot: SWOTAnalysis;
  longTermOutlook: string;
  reasoning: string;
  sources: string[];
  financials: FinancialMetrics;
  news: NewsItem[];
  competitors?: CompetitorInfo[];
  researchTimestamp: string;
  aiModel: string;
}

export interface ResearchData {
  company: string;
  profile: CompanyProfile;
  financials: FinancialMetrics;
  news: NewsItem[];
  competitors?: CompetitorInfo[];
  analysisText?: string;
  researchTimestamp: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ResearchProgress {
  status: "idle" | "researching" | "analyzing" | "complete" | "error";
  progress: number; // 0-100
  currentStep: string;
  error?: string;
}
