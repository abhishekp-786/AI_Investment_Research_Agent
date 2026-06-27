/**
 * Custom hook for research data fetching
 */

"use client";

import { useState, useCallback } from "react";
import { InvestmentRecommendation, ResearchProgress } from "@/types";
import { APIError, handleError } from "@/utils/errors";
import toast from "react-hot-toast";

interface UseResearchReturn {
  recommendation: InvestmentRecommendation | null;
  isLoading: boolean;
  error: string | null;
  progress: ResearchProgress;
  research: (companyName: string) => Promise<void>;
  reset: () => void;
}

export function useResearch(): UseResearchReturn {
  const [recommendation, setRecommendation] = useState<InvestmentRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<ResearchProgress>({
    status: "idle",
    progress: 0,
    currentStep: "",
  });

  const research = useCallback(async (companyName: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setProgress({
      status: "researching",
      progress: 10,
      currentStep: "Initializing research...",
    });

    try {
      setProgress({
        status: "researching",
        progress: 20,
        currentStep: "Gathering company information...",
      });

      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company: companyName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new APIError(response.status, data.error || "Failed to fetch research");
      }

      const data = await response.json();

      if (!data.success) {
        throw new APIError(500, data.error || "Invalid response from server");
      }

      setProgress({
        status: "complete",
        progress: 100,
        currentStep: "Analysis complete!",
      });

      setRecommendation(data.data);
      toast.success("Research completed successfully");
    } catch (err) {
      const { message } = handleError(err);
      setError(message);
      setProgress({
        status: "error",
        progress: 0,
        currentStep: message,
        error: message,
      });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback((): void => {
    setRecommendation(null);
    setError(null);
    setProgress({
      status: "idle",
      progress: 0,
      currentStep: "",
    });
  }, []);

  return {
    recommendation,
    isLoading,
    error,
    progress,
    research,
    reset,
  };
}
