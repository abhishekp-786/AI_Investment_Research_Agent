/**
 * Constants and configuration
 */

export const API_ENDPOINTS = {
  RESEARCH: "/api/research",
  RECOMMENDATION: "/api/research/recommendation",
};

export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};

export const RATE_LIMITS = {
  REQUESTS_PER_MINUTE: 10,
  REQUESTS_PER_HOUR: 100,
};

export const RECOMMENDATION_THRESHOLDS = {
  INVEST_CONFIDENCE_MIN: 70,
  PASS_CONFIDENCE_MAX: 50,
  HIGH_RISK_THRESHOLD: 70,
};

export const RESEARCH_TIMEOUT = 60000; // 60 seconds

export const SUPPORTED_SECTORS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Energy",
  "Consumer",
  "Industrial",
  "Materials",
  "Real Estate",
  "Utilities",
  "Communications",
];

export const RESEARCH_CATEGORIES = {
  COMPANY_OVERVIEW: "Company Overview",
  FINANCIAL_METRICS: "Financial Metrics",
  MARKET_ANALYSIS: "Market Analysis",
  COMPETITORS: "Competitors",
  NEWS_SENTIMENT: "News Sentiment",
  RISKS: "Risks",
  AI_INITIATIVES: "AI Initiatives",
};

export const ERROR_MESSAGES = {
  INVALID_COMPANY_NAME: "Invalid company name",
  RESEARCH_FAILED: "Failed to research company",
  API_RATE_LIMIT: "API rate limit exceeded. Please try again later",
  API_KEY_MISSING: "Required API key is missing",
  NETWORK_ERROR: "Network error occurred",
  TIMEOUT: "Request timeout",
};

export const SUCCESS_MESSAGES = {
  RESEARCH_COMPLETE: "Research completed successfully",
  RECOMMENDATION_GENERATED: "Investment recommendation generated",
};

export const CONFIDENCE_LEVELS = {
  VERY_HIGH: 90,
  HIGH: 75,
  MODERATE: 50,
  LOW: 25,
};

export const RISK_LEVELS = {
  VERY_HIGH: "VERY_HIGH",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};
