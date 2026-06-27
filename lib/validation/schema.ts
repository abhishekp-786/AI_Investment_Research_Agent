/**
 * Validation utilities using Zod for schema validation
 */

import { z } from "zod";

// Research request validation
export const researchRequestSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  includeStockData: z.boolean().optional(),
  includeHistoricalData: z.boolean().optional(),
});

export type ResearchRequestInput = z.infer<typeof researchRequestSchema>;

// Validate company name
export const validateCompanyName = (name: string): boolean => {
  if (!name || name.trim().length === 0) {
    return false;
  }
  if (name.length > 100) {
    return false;
  }
  // Allow alphanumeric, spaces, hyphens, and dots
  const regex = /^[a-zA-Z0-9\s\-\.&()]+$/;
  return regex.test(name);
};

// Validate API keys
export const validateApiKey = (key: string | undefined): boolean => {
  if (!key) {
    return false;
  }
  return key.length > 0 && key !== "your_api_key_here";
};

// Validate URL
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate confidence score
export const validateConfidenceScore = (score: number): boolean => {
  return score >= 0 && score <= 100;
};

// Sanitize company name for API calls
export const sanitizeCompanyName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, " ");
};
